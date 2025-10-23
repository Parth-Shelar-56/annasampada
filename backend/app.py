import pandas as pd
import joblib
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import numpy as np # Needed for safe ordinal mapping
import warnings
import json

# Suppress warnings
warnings.filterwarnings('ignore')


# Initialize Flask App
app = Flask(__name__)
# Enable CORS
CORS(app)

# --- 1. LOAD MODELS AND SCALERS ---

# --- Rice Model ---
rice_model_path = os.path.join('ML', 'rice', 'rice_model.joblib')
try:
    rice_model = joblib.load(rice_model_path)
    print("--- Rice Model loaded successfully ---")
except Exception as e:
    rice_model = None
    print(f"Error loading Rice Model: {e}")

# --- Milk Model & Scaler ---
milk_model_path = os.path.join('ML', 'milk', 'xgboost_milk_spoilage_model.joblib')
milk_scaler_path = os.path.join('ML', 'milk', 'scaler_milk_spoilage.joblib')

try:
    milk_model = joblib.load(milk_model_path)
    print("--- Milk Model loaded successfully ---")
except Exception as e:
    milk_model = None
    print(f"Error loading Milk Model: {e}")

try:
    milk_scaler = joblib.load(milk_scaler_path)
    print("--- Milk Scaler loaded successfully ---")
except Exception as e:
    milk_scaler = None
    print(f"Error loading Milk Scaler: {e}")

# --- Load Paneer Model and Config ---
paneer_model = None # Initialize to None
paneer_model_columns = [] # Initialize to empty list
paneer_model_dir = os.path.join('ML', 'paneer') # Define the directory for paneer files
paneer_config_filepath = os.path.join(paneer_model_dir, 'paneer_model_config.json') # Correct path to config

try:
    # 1. Load the new config file using the correct path
    with open(paneer_config_filepath, 'r') as f:
        paneer_config = json.load(f)
    
    # Filenames from config are likely relative to the paneer_model_dir
    model_filename_relative = paneer_config['model_file']
    columns_filename_relative = paneer_config['columns_file']
    
    # Construct the full paths relative to the script location
    model_filepath = os.path.join(paneer_model_dir, model_filename_relative)
    columns_filepath = os.path.join(paneer_model_dir, columns_filename_relative)
    
    # 2. Load the winning model and its columns using the full paths
    paneer_model = joblib.load(model_filepath)
    with open(columns_filepath, 'r') as f: # Open the columns json file correctly
        paneer_model_columns = json.load(f)
    
    print(f"--- PANEER MODEL LOADED ---")
    print(f"Config File: {paneer_config_filepath}")
    print(f"Model File: {model_filepath}")
    print(f"Columns File: {columns_filepath}")
    
except FileNotFoundError:
    print(f"FATAL ERROR: Could not find Paneer config '{paneer_config_filepath}' or its referenced files.")
    print("Please ensure the config file exists and contains correct paths relative to the 'ML/paneer' directory.")
    print("Run 'train_paneer_model.py' if needed.")
    # Keep paneer_model as None and paneer_model_columns as []
    
except Exception as e: # Catch other potential errors during loading
    print(f"FATAL ERROR: An error occurred loading the Paneer model or config: {e}")
    # Keep paneer_model as None and paneer_model_columns as []


# --- 2. RICE: DEFINE PREPROCESSING & VALIDATION LOGIC ---
rice_smell_map = { 'Normal': 0, 'Stale/Slightly Off': 1, 'Sour/Fermented': 2, 'Foul/Musty': 3 }
rice_appearance_map = { 'Normal/Glossy': 0, 'Dull/Dry': 1, 'Slimy/Discolored': 2, 'Visible Mold': 3 }
RICE_MODEL_FEATURES = [
    'hours_since_cooking', 'initial_hours_at_room_temp', 'smell_encoded', 'appearance_encoded',
    'storage_location_Refrigerator', 'storage_location_Room Temperature',
    'cooling_method_Cooled in shallow container', 'cooling_method_Left to cool in deep pot',
    'cooling_method_Not Applicable'
]
rice_result_map = {
    0: {'status': 'Fresh', 'message': 'Fresh - Safe to consume', 'is_safe': True},
    1: {'status': 'Stale', 'message': 'Stale - Safe but reduced quality', 'is_safe': True},
    2: {'status': 'Unsafe', 'message': 'Potentially Unsafe - Risk of toxins', 'is_safe': False},
    3: {'status': 'Spoiled', 'message': 'Spoiled - Do not consume', 'is_safe': False},
    4: {'status': 'Molded', 'message': 'Extremely Spoiled - Do not consume', 'is_safe': False} # Corrected index for Molded
}

def preprocess_and_validate_rice(data):
    try:
        hours_since_cooking = float(data['hours_since_cooking'])
        initial_hours = float(data['initial_hours_at_room_temp'])
    except ValueError:
        return None, "Error: Hour inputs must be numbers."
    except KeyError:
        return None, "Error: Missing required fields for rice."

    if initial_hours > hours_since_cooking:
        return None, "Error: 'Hours at Room Temp' cannot be greater than 'Total Hours Since Cooking'."

    storage = data.get('storage_location')
    cooling = data.get('cooling_method')
    smell = data.get('observed_smell')
    appearance = data.get('observed_appearance')

    # Rice Safety Rules
    if appearance == 'Visible Mold':
        return rice_result_map[4], None # Use correct index 4
    if appearance == 'Slimy/Discolored':
        return rice_result_map[3], None
    if smell in ['Sour/Fermented', 'Foul/Musty']:
        return rice_result_map[3], None

    # Rice Preprocessing
    smell_encoded = rice_smell_map.get(smell, 0)
    appearance_encoded = rice_appearance_map.get(appearance, 0)
    storage_location_Refrigerator = 1 if storage == 'Refrigerator' else 0
    storage_location_Room_Temperature = 1 if storage == 'Room Temperature' else 0
    cooling_method_Shallow = 1 if cooling == 'Cooled in shallow container' else 0
    cooling_method_Deep = 1 if cooling == 'Left to cool in deep pot' else 0
    cooling_method_NA = 1 if cooling == 'Not Applicable' else 0

    data_for_df = {
        'hours_since_cooking': [hours_since_cooking],
        'initial_hours_at_room_temp': [initial_hours],
        'smell_encoded': [smell_encoded],
        'appearance_encoded': [appearance_encoded],
        'storage_location_Refrigerator': [storage_location_Refrigerator],
        'storage_location_Room Temperature': [storage_location_Room_Temperature],
        'cooling_method_Cooled in shallow container': [cooling_method_Shallow],
        'cooling_method_Left to cool in deep pot': [cooling_method_Deep],
        'cooling_method_Not Applicable': [cooling_method_NA]
    }

    # Ensure all expected columns are present, fill missing with 0
    features_df = pd.DataFrame(columns=RICE_MODEL_FEATURES)
    # Use pd.concat instead of append
    features_df = pd.concat([features_df, pd.DataFrame(data_for_df)], ignore_index=True)
    features_df = features_df.fillna(0)
    features_df = features_df[RICE_MODEL_FEATURES] # Ensure order

    return features_df, None


# --- 3. MILK: DEFINE PREPROCESSING & VALIDATION LOGIC ---
milk_smell_order = ['Normal/Fresh', 'Sour', 'Bitter/Unpleasant', 'Rancid/Soapy']
milk_consistency_order = ['Normal/Smooth', 'Thicker than usual', 'Small Lumps', 'Thick Curds']

MILK_MODEL_FEATURES = [ # Must match columns used for training milk model
    'days_since_open_or_purchase', 'was_boiled', 'cumulative_hours_at_room_temp',
    'observed_smell', 'observed_consistency', 'milk_type_Raw/Loose',
    'milk_type_UHT (Carton)', 'storage_location_Room Temperature'
]
MILK_SCALED_COLS = [ # Must match columns scaled during training milk model
    'days_since_open_or_purchase', 'cumulative_hours_at_room_temp',
    'observed_smell', 'observed_consistency'
]
milk_result_map = {
    0: {'status': 'Fresh', 'message': '✅ Fresh - Safe to consume', 'is_safe': True},
    # Index 1 is handled dynamically below
    2: {'status': 'Spoiled', 'message': '🚫 Spoiled - Do not consume', 'is_safe': False}
}
MILK_SEVERE_SMELL = ['Rancid/Soapy']
MILK_SEVERE_CONSISTENCY = ['Thick Curds']

def preprocess_and_validate_milk(data):
    """
    Validates, preprocesses, and scales input data for the milk spoilage model.
    Returns: (pd.DataFrame or dict, str or None) - Scaled features or safety rule result, error message.
    """
    required_fields = [
        'milk_type', 'days_since_open_or_purchase', 'was_boiled', 'storage_location',
        'cumulative_hours_at_room_temp', 'observed_smell', 'observed_consistency'
    ]
    if not all(field in data for field in required_fields):
        missing = [field for field in required_fields if field not in data]
        return None, f"Error: Missing required fields for milk: {', '.join(missing)}"

    try:
        days = float(data['days_since_open_or_purchase'])
        room_temp_hours = float(data['cumulative_hours_at_room_temp'])
        if isinstance(data['was_boiled'], str):
             was_boiled_input = data['was_boiled'].lower() == 'true' or data['was_boiled'].lower() == 'yes'
        else:
             was_boiled_input = bool(data['was_boiled'])
    except (ValueError, TypeError):
        return None, "Error: Numeric inputs (days, hours) must be valid numbers, 'was_boiled' must be boolean/string for milk."

    if days < 0 or room_temp_hours < 0:
         return None, "Error: Days and hours cannot be negative for milk."

    milk_type = data.get('milk_type')
    storage = data.get('storage_location')
    smell = data.get('observed_smell')
    consistency = data.get('observed_consistency')

    valid_milk_types = ['Pasteurized (Pouch/Bottle)', 'UHT (Carton)', 'Raw/Loose']
    valid_storage = ['Refrigerator', 'Room Temperature']
    if milk_type not in valid_milk_types: return None, f"Error: Invalid milk_type '{milk_type}'. Must be one of {valid_milk_types}"
    if storage not in valid_storage: return None, f"Error: Invalid storage_location '{storage}'. Must be one of {valid_storage}"
    if smell not in milk_smell_order: return None, f"Error: Invalid observed_smell '{smell}'. Expected one of: {', '.join(milk_smell_order)}"
    if consistency not in milk_consistency_order: return None, f"Error: Invalid observed_consistency '{consistency}'. Expected one of: {', '.join(milk_consistency_order)}"

    if smell in MILK_SEVERE_SMELL or consistency in MILK_SEVERE_CONSISTENCY:
        return milk_result_map[2], None # Return 'Spoiled' JSON

    try:
        smell_encoded = float(milk_smell_order.index(smell))
        consistency_encoded = float(milk_consistency_order.index(consistency))
    except ValueError:
         return None, "Error: Could not encode milk smell or consistency."

    was_boiled_encoded = 1 if was_boiled_input else 0
    milk_type_Raw_Loose = 1.0 if milk_type == 'Raw/Loose' else 0.0
    milk_type_UHT_Carton = 1.0 if milk_type == 'UHT (Carton)' else 0.0
    storage_location_Room_Temperature = 1.0 if storage == 'Room Temperature' else 0.0

    data_for_df = {
        'days_since_open_or_purchase': [days],
        'was_boiled': [was_boiled_encoded],
        'cumulative_hours_at_room_temp': [room_temp_hours],
        'observed_smell': [smell_encoded],
        'observed_consistency': [consistency_encoded],
        'milk_type_Raw/Loose': [milk_type_Raw_Loose],
        'milk_type_UHT (Carton)': [milk_type_UHT_Carton],
        'storage_location_Room Temperature': [storage_location_Room_Temperature]
    }

    try:
        features_df = pd.DataFrame(columns=MILK_MODEL_FEATURES)
        # Use pd.concat instead of append
        features_df = pd.concat([features_df, pd.DataFrame(data_for_df)], ignore_index=True)
        features_df = features_df.fillna(0.0)
        features_df = features_df[MILK_MODEL_FEATURES] # Ensure order
    except Exception as e:
         return None, f"Error creating milk feature DataFrame: {str(e)}"

    if milk_scaler is None: return None, "Error: Milk Scaler is not loaded."
    try:
        features_df[MILK_SCALED_COLS] = milk_scaler.transform(features_df[MILK_SCALED_COLS])
    except ValueError as ve:
         return None, f"Error applying milk scaling: Check feature count/names. Details: {str(ve)}"
    except Exception as e:
        return None, f"Error applying milk scaling: {str(e)}"

    return features_df, None # Scaled features


# --- 4. DEFINE API ENDPOINTS ---

# --- RICE Endpoint ---
@app.route('/api/predict', methods=['POST'])
def predict_rice():
    if rice_model is None: return jsonify({'error': 'Rice Model is not loaded.'}), 500
    try:
        data = request.json
        if not data: return jsonify({'error': 'No input data provided for rice'}), 400

        processed_input, error = preprocess_and_validate_rice(data)
        if error: return jsonify({'error': error, 'is_safe': False, 'status': 'Error'}), 400
        if isinstance(processed_input, dict): return jsonify(processed_input) # Safety rule triggered
        if not isinstance(processed_input, pd.DataFrame): return jsonify({'error': 'Rice preprocessing failed.'}), 500

        prediction_index = rice_model.predict(processed_input)[0]
        result = rice_result_map.get(int(prediction_index), {'status': 'Error', 'message': '🚫 Unknown prediction', 'is_safe': False})
        return jsonify(result)
    except Exception as e:
        app.logger.error(f"Rice Prediction error: {str(e)}")
        return jsonify({'error': 'An unexpected error occurred.'}), 500

# --- MILK Endpoint ---
@app.route('/api/predict_milk', methods=['POST'])
def predict_milk():
    if milk_model is None or milk_scaler is None: return jsonify({'error': 'Milk Model/Scaler not loaded.'}), 500
    try:
        data = request.json
        if not data: return jsonify({'error': 'No input data provided for milk'}), 400

        was_boiled_input_raw = data.get('was_boiled')
        if isinstance(was_boiled_input_raw, str):
            was_boiled_original = was_boiled_input_raw.lower() == 'true' or was_boiled_input_raw.lower() == 'yes'
        else:
            was_boiled_original = bool(was_boiled_input_raw)

        processed_input, error = preprocess_and_validate_milk(data)
        if error: return jsonify({'error': error, 'is_safe': False, 'status': 'Error'}), 400
        if isinstance(processed_input, dict): return jsonify(processed_input) # Safety rule triggered
        if not isinstance(processed_input, pd.DataFrame): return jsonify({'error': 'Milk preprocessing failed.'}), 500

        prediction_index = int(milk_model.predict(processed_input)[0])

        if prediction_index == 1:
            if was_boiled_original:
                 result = {'status': 'Starting', 'message': '⚠️ Starting to Spoil - Consume soon only after re-boiling thoroughly. Quality may be reduced.', 'is_safe': None}
            else:
                 result = {'status': 'Unsafe', 'message': '❌ Potentially Unsafe - Discard. Do not consume raw or unboiled milk once it starts spoiling.', 'is_safe': False}
        else:
            result = milk_result_map.get(prediction_index, {'status': 'Error', 'message': '🚫 Unknown prediction index', 'is_safe': False})

        return jsonify(result)
    except Exception as e:
        app.logger.error(f"Milk Prediction error: {str(e)}")
        return jsonify({'error': 'An unexpected error occurred.'}), 500

# --- PANEER Endpoint ---
@app.route('/api/predict/paneer', methods=['POST'])
def predict_paneer():
    # Use the globally loaded paneer_model and paneer_model_columns
    global paneer_model, paneer_model_columns 
    
    if paneer_model is None or not paneer_model_columns: # Check if loading failed
        return jsonify({'error': 'Paneer model or columns list not loaded properly. Check server logs.'}), 500

    try:
        # 1. Get JSON data from React
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No input data provided for paneer'}), 400

        # 2. Convert the simple JSON into a single-row DataFrame
        input_df = pd.DataFrame([data])

        # --- VALIDATION (Add basic checks) ---
        required_paneer_fields = ['days_since_purchase_or_cooked', 'is_cooked', 'paneer_type', 'storage_location', 'observed_smell', 'texture_surface']
        if not all(field in input_df.columns for field in required_paneer_fields):
             missing = [field for field in required_paneer_fields if field not in input_df.columns]
             return jsonify({'error': f"Missing required paneer fields: {', '.join(missing)}"}), 400

        # Optional: Add more specific validation (e.g., check if values are in expected lists)
        
        # 3. Apply the *exact* same pre-processing as in training
        
        # --- Ordinal (Manual) Mapping ---
        smell_map = {
            'Normal/Sweetish': 0, 'Sour/Acidic': 1,
            'Foul/Ammoniacal': 2, 'Soapy/Rancid': 3
        }
        texture_map = {
            'Normal/Firm': 0, 'Hard/Rubbery': 1, 'Slimy/Sticky': 2
        }
        
        # Apply maps safely
        if 'observed_smell' in input_df.columns:
            input_df['observed_smell'] = input_df['observed_smell'].map(smell_map).astype('Int64').astype(float) # Use Int64 then float
        if 'texture_surface' in input_df.columns:
            input_df['texture_surface'] = input_df['texture_surface'].map(texture_map).astype('Int64').astype(float) # Use Int64 then float
        
        # Ensure numeric columns are float and handle potential errors
        numeric_cols = ['days_since_purchase_or_cooked']
        for col in numeric_cols:
             if col in input_df.columns:
                  # Coerce errors to NaN, then fill NaN with 0 or a suitable default
                  input_df[col] = pd.to_numeric(input_df[col], errors='coerce').fillna(0).astype(float) 

        # --- One-Hot Encoding ---
        # Define ALL possible categorical columns that need one-hot encoding based on training
        all_categorical_cols = ['is_cooked', 'paneer_type', 'storage_location', 'storage_container_raw']
        
        # Only include columns present in the input
        categorical_features_in_input = [col for col in all_categorical_cols if col in input_df.columns]
        
        # Convert relevant columns to category type BEFORE get_dummies
        for col in categorical_features_in_input:
            input_df[col] = input_df[col].astype('category')
            
        # Perform one-hot encoding
        input_df_processed = pd.get_dummies(input_df, 
                                            columns=categorical_features_in_input, 
                                            drop_first=True)


        # 4. Align DataFrame to the "shopping list" of columns
        # Use paneer_model_columns loaded globally
        final_input_df = pd.DataFrame(columns=paneer_model_columns)
        # Use concat to merge, ensuring alignment
        final_input_df = pd.concat([final_input_df, input_df_processed], ignore_index=True)
        # Fill NA that might arise from concat or missing columns
        final_input_df = final_input_df.fillna(0.0).astype(float) # Ensure all are float
        
        # Re-order and select only the columns the model expects, handle potential missing columns
        try:
             final_input_df = final_input_df[paneer_model_columns]
        except KeyError as e:
             # This indicates a mismatch between input and expected columns after processing
             app.logger.error(f"Column mismatch error: {e}. Expected: {paneer_model_columns}. Got: {final_input_df.columns.tolist()}")
             return jsonify({'error': f"Internal server error: Column mismatch during paneer prediction. Missing: {e}"}), 500


        # 5. Make prediction
        prediction_code = paneer_model.predict(final_input_df)[0]
        prediction_proba = paneer_model.predict_proba(final_input_df)[0]
        confidence = max(prediction_proba) * 100

        # 6. Map prediction code (0, 1, 2, 3) back to a status message
        status_map = {
            0: "Fresh",
            1: "Good (Use Soon)",
            2: "Stale (Use with Caution)",
            3: "Spoiled (Do Not Eat)"
        }
        status = status_map.get(int(prediction_code), "Unknown")
        message = f"Prediction: {status}. Confidence: {confidence:.2f}%"
        is_safe = bool(int(prediction_code) < 3) # Safe if 0, 1, or 2

        # 7. Return JSON response to React
        return jsonify({
            'status': status,
            'message': message,
            'is_safe': is_safe,
            'prediction_code': int(prediction_code),
            'confidence': f"{confidence:.2f}%"
        })

    except Exception as e:
        app.logger.error(f"Paneer Prediction error: {str(e)}") # Log the error
        return jsonify({'error': f'An error occurred during paneer prediction: {str(e)}'}), 500


# --- 5. RUN THE APP ---
if __name__ == '__main__':
    # Make sure the ML directories exists relative to this script
    script_dir = os.path.dirname(__file__) if '__file__' in locals() else '.' # Handle interactive use
    ml_rice_dir = os.path.join(script_dir, 'ML', 'rice')
    ml_milk_dir = os.path.join(script_dir, 'ML', 'milk')
    
    # Corrected path check for paneer files relative to script_dir
    paneer_model_dir_check = os.path.join(script_dir, 'ML', 'paneer') # The directory
    paneer_config_path_check = os.path.join(paneer_model_dir_check, 'paneer_model_config.json') # The config file inside it
    
    if not os.path.exists(ml_rice_dir): print(f"Warning: Rice directory '{ml_rice_dir}' not found.")
    if not os.path.exists(ml_milk_dir): print(f"Warning: Milk directory '{ml_milk_dir}' not found.")
    if not os.path.exists(paneer_config_path_check): print(f"Warning: Paneer config '{paneer_config_path_check}' not found. Run training script.")
    
    # Check if files listed in paneer config actually exist (using paths relative to paneer_model_dir_check)
    if os.path.exists(paneer_config_path_check):
        try:
             with open(paneer_config_path_check, 'r') as f:
                  config = json.load(f)
             # Construct full paths from script_dir + paneer_model_dir + relative filename
             model_file_check = os.path.join(paneer_model_dir_check, config['model_file'])
             cols_file_check = os.path.join(paneer_model_dir_check, config['columns_file'])
             if not os.path.exists(model_file_check): print(f"Warning: Paneer model file '{model_file_check}' from config not found.")
             if not os.path.exists(cols_file_check): print(f"Warning: Paneer columns file '{cols_file_check}' from config not found.")
        except Exception as e:
             print(f"Warning: Error reading paneer config or checking files: {e}")


    app.run(host='0.0.0.0', port=5000, debug=True) # debug=True helps during development

