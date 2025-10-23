# Food Freshness Predictor

## Project Overview
This web application predicts the freshness or spoilage state of common food items (Cooked Rice, Milk, Paneer) based on user input. It features a dynamic UI that adapts to the selected food, incorporating specific validation rules and constraints (e.g., milk boiling, paneer storage). Predictions are powered by dedicated machine learning models for each food type hosted on a Python Flask backend.

## Features
* **Multi-Food Support:** Predicts spoilage for Cooked Rice, Milk (Pasteurized, UHT, Raw/Loose), and Paneer (Cooked, Raw).
* **Dynamic UI:** Presents a tailored input form specific to the selected food item.
* **Conditional Logic:** Shows/hides questions based on previous answers (e.g., "Was Boiled?" for milk, "Storage Container" for raw paneer).
* **Robust Validation:** Includes real-time input checks, serial flow (disabling fields), and cross-field validation (e.g., room temp hours vs. total time).
* **ML Model Integration:** Connects to a Flask backend hosting separate ML models.
* **Clear Results:** Displays predictions (Fresh, Stale, Spoiled) with safety indicators and confidence levels.
* **Scalable Architecture:** Designed for easy addition of new food types in both backend (routes/preprocessing) and frontend (Manager/Specialist pattern).

## Tech Stack
**Backend:**
* Python 3.x
* Flask
* Pandas
* Scikit-learn (Logistic Regression, Random Forest)
* XGBoost
* Joblib

**Frontend:**
* React
* Framer Motion (Animations)
* Lucide React (Icons)
* Tailwind CSS (Styling)

**Development:**
* Node.js & npm

## Setup and Installation
**Prerequisites:**
* Python 3.x
* Node.js and npm

### Backend Setup
1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Create and activate a virtual environment (recommended):
    ```bash
    # Create the environment
    python -m venv venv
    
    # Windows activation:
    .\venv\Scripts\activate
    
    # macOS/Linux activation:
    source venv/bin/activate
    ```
3.  Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```

### Frontend Setup
1.  Navigate to your frontend project directory:
    ```bash
    cd ../annasampada 
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```

## Backend Architecture

### 1. Model Training (train_*.py Scripts)
* **Data Handling:** Loads raw CSV, preprocesses using Ordinal & One-Hot Encoding (handling conditional features), and saves processed data.
* **Model Selection:** Compares multiple classifiers (e.g., Logistic Regression, Random Forest, XGBoost) via a "bake-off".
* **Saving Artifacts:** Retrains the best model on all data and saves:
    * Model object (`*.joblib`)
    * Feature column list (`*_columns.json`)
    * Configuration file (`*_config.json`) specifying model/column filenames.

### 2. Flask API (app.py)
* **Initialization:** Sets up Flask app with CORS.
* **Model Loading:** Loads models, scalers, and config files on startup, using relative paths within the ML subdirectories.
* **API Routes:** Provides distinct endpoints for each food type:
    * `/api/predict` (Rice)
    * `/api/predict_milk`
    * `/api/predict/paneer`
* **Preprocessing Logic:** Includes dedicated functions/logic within each route to:
    * Validate incoming JSON.
    * Apply the exact encoding/scaling used during training.
    * Align features using the loaded column lists.
    * Implement "Safety Rules" for immediate spoilage detection.
* **Prediction & Response:** Feeds processed data to the correct model and maps the output code to a user-friendly JSON (status, message, is_safe).

### Running the Backend
1.  Navigate to the `backend` directory.
2.  Activate the virtual environment.
3.  Start the server:
    ```bash
    python app.py
    ```
    The server typically runs at `http://localhost:5000`.

## Frontend Architecture (UserPredictPage.jsx)

The frontend is implemented within a single file (`UserPredictPage.jsx`) utilizing a Manager/Specialist pattern.

* **App Component (Manager):**
    * Manages global state: `step`, `foodType`, `result`, `loading`, `apiError`.
    * Handles navigation (`handleNext`, `handleBack`).
    * Normalizes food types for routing.
    * Conditionally renders the correct Specialist form (RiceForm, MilkForm, PaneerForm, UnsupportedFoodForm).
    * Passes props (callbacks, loading state) down to the active form.
    * Renders result or error cards.

* **Specialist Form Components (RiceForm, MilkForm, PaneerForm):**
    * Defined as constants within the file.
    * **Self-Contained:** Manage their own `formData` and `errors`.
    * **Specific Validation:** Use `useEffect` / `useCallback` for real-time, food-specific validation (serial flow, cross-field checks).
    * **Specific API Call:** Contain their own `handlePredict` function to build the correct payload and call the correct fetch URL, using callbacks to update the parent `App` state.
    * **UI:** Render necessary `InputGroup`/`SelectGroup` components with conditional logic (`AnimatePresence`).

* **Helper Components:**
    * Reusable UI elements (Stepper, InputGroup, SelectGroup, ResultCard, ApiErrorCard) are defined within the same file.

### Running the Frontend
1.  Navigate to the frontend project directory.
2.  Start the development server:
    ```bash
    npm run dev 
    ```
    Access the app in your browser (e.g., `http://localhost:5173`).

## Future Work
* Add support for more food items (e.g., 'Roti', 'Dal').
* Implement user accounts for saving prediction history.
* Refine model accuracy with more data or feature engineering.
* Potentially refactor the frontend into separate files if the single-file approach becomes difficult to maintain.