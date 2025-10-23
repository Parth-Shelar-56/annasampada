import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  // Icons for App/Rice
  Salad,
  Hourglass,
  Clock,
  Wind,
  Eye,
  Archive,
  Thermometer,
  ChevronLeft,
  Loader2,
  AlertCircle,
  CheckCircle2,
  ShieldOff,

  // Icons for Milk
  CalendarDays,
  Flame,
  Droplets,
  Milk // Added Milk icon
} from 'lucide-react';



// ==================================================================
// --- DATA CONSTANTS ---
// ==================================================================

const foodTypes = ['Cooked Rice', 'Milk', 'Paneer', 'Roti', 'Dal'];

// --- Rice Options ---
const riceSmellOptions = ['Normal', 'Stale/Slightly Off', 'Sour/Fermented', 'Foul/Musty'];
const riceAppearanceOptions = ['Normal/Glossy', 'Dull/Dry', 'Slimy/Discolored', 'Visible Mold'];
const riceStorageOptions = ['Refrigerator', 'Room Temperature'];
const riceCoolingOptions = ['Cooled in shallow container', 'Left to cool in deep pot', 'Not Applicable'];

// --- Milk Options ---
// Define Milk Types explicitly if needed for selection or logic later
const milkTypes = ['Pasteurized (Pouch/Bottle)', 'UHT (Carton)', 'Raw/Loose'];

const milkStorageOptions = [
  { label: 'Refrigerator', value: 'Refrigerator' },
  { label: 'Room Temperature', value: 'Room Temperature' },
];

const milkBoiledOptions = [
  { label: 'Yes', value: 'Yes' },
  { label: 'No', value: 'No' },
];

// *** CORRECTED: Use string labels as values for Milk selects ***
const milkSmellOptions = [
  { label: 'Normal/Fresh', value: 'Normal/Fresh' },
  { label: 'Sour', value: 'Sour' },
  { label: 'Bitter/Unpleasant', value: 'Bitter/Unpleasant' },
  { label: 'Rancid/Soapy', value: 'Rancid/Soapy' },
];

const milkConsistencyOptions = [
  { label: 'Normal/Smooth', value: 'Normal/Smooth' },
  { label: 'Thicker than usual', value: 'Thicker than usual' },
  { label: 'Small Lumps', value: 'Small Lumps' },
  { label: 'Thick Curds', value: 'Thick Curds' },
];


// ==================================================================
// --- MAIN APP COMPONENT ---
// ==================================================================
export default function App() {

  // --- High-Level State ---
  const [step, setStep] = useState(0);
  const [selectedFoodBaseType, setSelectedFoodBaseType] = useState(''); // 'Cooked Rice' or 'Milk'
  const [selectedMilkSubType, setSelectedMilkSubType] = useState(''); // Specific milk type if 'Milk' is chosen

  // --- Shared Output State ---
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  // Animation variants
  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  // --- Event Handlers for App ---
  const handleNext = () => {
    // Determine the final foodType string to pass down
    let finalFoodType = selectedFoodBaseType;
    if (selectedFoodBaseType === 'Milk' && selectedMilkSubType) {
      finalFoodType = selectedMilkSubType;
    }

    if (finalFoodType && (selectedFoodBaseType !== 'Milk' || selectedMilkSubType)) {
       setStep(1);
    }
  };


  const handleBack = () => {
    setStep(0);
    setResult(null);
    setApiError(null);
    // Reset milk subtype if going back from step 1 and base type was Milk
    if (selectedFoodBaseType === 'Milk') {
        setSelectedMilkSubType('');
    }
  };

  // Determine the actual foodType string based on selections
   const effectiveFoodType = useMemo(() => {
    if (selectedFoodBaseType === 'Milk' && selectedMilkSubType) {
      return selectedMilkSubType;
    }
    return selectedFoodBaseType;
  }, [selectedFoodBaseType, selectedMilkSubType]);


  // Props to pass down
  const formProps = {
    handleBack,
    setResult,
    setLoading,
    setApiError,
    foodType: effectiveFoodType, // Pass the derived effective food type
    stepVariants,
    loading,
  };


  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 sm:p-8 transition-colors duration-300 font-inter">

      <h1 className="text-3xl sm:text-4xl font-bold text-green-700 dark:text-green-300 mb-6 text-center">
        Food Freshness Predictor
      </h1>

      {/* --- Main Form Card --- */}
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 sm:p-10 transition-colors duration-300">
        <Stepper currentStep={step} />

        <div className="relative overflow-hidden min-h-[450px]"> {/* Ensure consistent height */}
          <AnimatePresence mode="wait">

            {/* --- STEP 0: Food Selection --- */}
            {step === 0 && (
              <motion.div
                key="step0"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="py-8 space-y-6" // Added space-y for spacing
              >
                <SelectGroup
                  label="Select Food Type"
                  name="foodBaseType" // Use specific state variable
                  value={selectedFoodBaseType}
                  onChange={(e) => {
                      setSelectedFoodBaseType(e.target.value);
                      setSelectedMilkSubType(''); // Reset milk subtype if base changes
                  }}
                  icon={<Salad className="w-5 h-5 text-gray-400" />}
                  helperText="Select the main food item."
                >
                  <option value="">Choose a food item...</option>
                  {foodTypes.map(f => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </SelectGroup>

                {/* Conditional Milk Subtype Selector */}
                <AnimatePresence>
                 {selectedFoodBaseType === 'Milk' && (
                     <motion.div
                       initial={{ opacity: 0, height: 0 }}
                       animate={{ opacity: 1, height: 'auto' }}
                       exit={{ opacity: 0, height: 0 }}
                       transition={{ duration: 0.3 }}
                       className="overflow-hidden"
                     >
                       <SelectGroup
                         label="Select Milk Type"
                         name="milkSubType" // Use specific state variable
                         value={selectedMilkSubType}
                         onChange={(e) => setSelectedMilkSubType(e.target.value)}
                         icon={<Milk className="w-5 h-5 text-gray-400" />} // Milk icon
                         helperText="Specify the type of milk."
                       >
                         <option value="">Choose milk type...</option>
                         {milkTypes.map(mt => (
                           <option key={mt} value={mt}>{mt}</option>
                         ))}
                       </SelectGroup>
                     </motion.div>
                   )}
                </AnimatePresence>


                <button
                  onClick={handleNext}
                  // Disable if base type is not selected, OR if base type is Milk but subtype isn't selected
                  disabled={!selectedFoodBaseType || (selectedFoodBaseType === 'Milk' && !selectedMilkSubType)}
                  className="mt-4 w-full py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                >
                  Next
                </button>
              </motion.div>
            )}

            {/* --- STEP 1: Specialist Form "Router" --- */}
            {step === 1 && (
              <>
                {/* --- Render RiceForm if effectiveFoodType is 'Cooked Rice' --- */}
                {effectiveFoodType === 'Cooked Rice' && (
                  <RiceForm {...formProps} />
                )}

                {/* --- Render MilkForm if effectiveFoodType is ANY of the known milk types --- */}
                {/* Check if the calculated effectiveFoodType is present in the milkTypes array */}
                {milkTypes.includes(effectiveFoodType) && (
                  // Pass the effectiveFoodType down correctly
                  <MilkForm {...formProps} foodType={effectiveFoodType} />
                )}

                {/* --- Render Fallback/Unsupported Form --- */}
                {/* Show this ONLY IF it's not Rice AND it's not found in the milkTypes array AND it's not empty */}
                {effectiveFoodType !== 'Cooked Rice' &&
                 !milkTypes.includes(effectiveFoodType) &&
                 effectiveFoodType !== '' && (
                  <UnsupportedFoodForm {...formProps} foodType={effectiveFoodType}/> // Pass foodType for the message
                )}
              </>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* --- Output Section --- */}
      <div className="w-full max-w-2xl mt-8">
        <AnimatePresence>
          {apiError && <ApiErrorCard message={apiError} />}
          {result && <ResultCard result={result} />}
        </AnimatePresence>
      </div>
    </div>
  );
}


// ==================================================================
// --- RICE FORM ---
// ==================================================================
const RiceForm = ({ handleBack, setResult, setLoading, setApiError, stepVariants, loading }) => {

  // --- Internal State ---
  const [formData, setFormData] = useState({
    hoursSinceCooking: '',
    initialHoursAtRoom: '',
    observedSmell: 'Normal', // Default value
    observedAppearance: 'Normal/Glossy', // Default value
    storageLocation: 'Refrigerator', // Default value
    coolingMethod: 'Not Applicable', // Default value
  });
  const [errors, setErrors] = useState({});

  // --- Validation ---
  const validateForm = useCallback((currentStep) => {
    const newErrors = {};
    const { hoursSinceCooking, initialHoursAtRoom } = formData;

    // Validate only if values are present or on final submit (currentStep === 1)
    if (hoursSinceCooking !== '' || currentStep === 1) {
       if (isNaN(hoursSinceCooking) || parseFloat(hoursSinceCooking) < 0) {
           newErrors.hoursSinceCooking = 'Must be a valid number (0 or more).';
       }
    }
    if (initialHoursAtRoom !== '' || currentStep === 1) {
       if (isNaN(initialHoursAtRoom) || parseFloat(initialHoursAtRoom) < 0) {
           newErrors.initialHoursAtRoom = 'Must be a valid number (0 or more).';
       }
    }

    // Cross-field validation only if both are valid numbers
    if (
        hoursSinceCooking !== '' && initialHoursAtRoom !== '' &&
        !isNaN(hoursSinceCooking) && !isNaN(initialHoursAtRoom) &&
        !newErrors.hoursSinceCooking && !newErrors.initialHoursAtRoom &&
        parseFloat(initialHoursAtRoom) > parseFloat(hoursSinceCooking)
    ) {
        newErrors.initialHoursAtRoom = 'Room temp hours cannot exceed total hours.';
    }

    // Check required fields on submit
    if (currentStep === 1) {
        if(formData.hoursSinceCooking.trim() === '') newErrors.hoursSinceCooking = 'This field is required.';
        if(formData.initialHoursAtRoom.trim() === '') newErrors.initialHoursAtRoom = 'This field is required.';
        if(!formData.observedSmell) newErrors.observedSmell = 'Please select a smell.'; // Assuming dropdowns always have a value, but good practice
        if(!formData.observedAppearance) newErrors.observedAppearance = 'Please select appearance.';
        if(!formData.storageLocation) newErrors.storageLocation = 'Please select storage.';
        if(!formData.coolingMethod) newErrors.coolingMethod = 'Please select cooling method.';
    }


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);


  // --- Real-time Validation Effect ---
   useEffect(() => {
    // Validate immediately on change, but don't prevent typing (currentStep = 0)
    validateForm(0);
  }, [formData, validateForm]);


  // --- Event Handlers ---
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Input validation for number fields
    if (name === 'hoursSinceCooking' || name === 'initialHoursAtRoom') {
      if (value.length > 4) return; // Limit length
      // Allow empty string, numbers, and a single decimal point
      if (value !== '' && !/^\d*\.?\d*$/.test(value)) return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // --- Serial Flow / Submit Button Disabling Logic ---
  const canSubmit = useMemo(() => {
     // Check if all fields have values and there are no current errors
     return (
         formData.hoursSinceCooking.trim() !== '' &&
         formData.initialHoursAtRoom.trim() !== '' &&
         formData.observedSmell &&
         formData.observedAppearance &&
         formData.storageLocation &&
         formData.coolingMethod &&
         Object.keys(errors).length === 0 // Ensure no validation errors exist
     );
  }, [formData, errors]);


  // --- API Call ---
  const handlePredict = async () => {
    setApiError(null);
    setResult(null);

    // Final validation check before submitting
    if (!validateForm(1)) {
        console.log("Final validation failed", errors);
        return;
    }


    setLoading(true);
    try {
      const payload = {
        hours_since_cooking: parseFloat(formData.hoursSinceCooking),
        initial_hours_at_room_temp: parseFloat(formData.initialHoursAtRoom),
        observed_smell: formData.observedSmell,
        observed_appearance: formData.observedAppearance,
        storage_location: formData.storageLocation,
        cooling_method: formData.coolingMethod,
      };

      // *** CORRECTED FETCH URL ***
      const res = await fetch('http://localhost:5000/api/predict', { // Corrected endpoint for Rice
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
           console.error("API Error Response (Rice):", data);
           throw new Error(data.error || `Request failed with status ${res.status}`);
      }
      setResult(data);

    } catch (err) {
      console.error("Fetch Error (Rice):", err);
      setApiError(err.message || 'Failed to connect to the prediction service.');
    } finally {
      setLoading(false);
    }
  };

  // Determine which fields should be enabled based on previous valid inputs
  const hoursSinceCookingValid = formData.hoursSinceCooking.trim() !== '' && !errors.hoursSinceCooking;
  const initialHoursValid = formData.initialHoursAtRoom.trim() !== '' && !errors.initialHoursAtRoom && hoursSinceCookingValid;
  const smellValid = formData.observedSmell && initialHoursValid; // Check if smell has a value
  const appearanceValid = formData.observedAppearance && smellValid;
  const storageValid = formData.storageLocation && appearanceValid;
  // const coolingValid = formData.coolingMethod && storageValid; // Used for submit button


  return (
    <motion.div
      key="step-rice"
      variants={stepVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.3 }}
      className="py-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        <InputGroup
          label="Hours Since Cooking"
          name="hoursSinceCooking"
          type="number" // Use text for better control with regex, but keep number semantics
          value={formData.hoursSinceCooking}
          onChange={handleChange}
          icon={<Hourglass className="w-5 h-5 text-gray-400" />}
          error={errors.hoursSinceCooking}
          placeholder="e.g., 12"
          maxLength={4}
          // No disabled prop needed for the first input
        />
        <InputGroup
          label="Hours at Room Temp (Initial)"
          name="initialHoursAtRoom"
          type="number" // Use text for better control
          value={formData.initialHoursAtRoom}
          onChange={handleChange}
          icon={<Clock className="w-5 h-5 text-gray-400" />}
          error={errors.initialHoursAtRoom}
          placeholder="e.g., 2"
          maxLength={4}
          disabled={!hoursSinceCookingValid} // Disable based on previous field validity
          helperText={hoursSinceCookingValid ? `Cannot be more than ${formData.hoursSinceCooking || 'total'} hours` : "Enter hours since cooking first."}
        />
        <SelectGroup
          label="Observed Smell"
          name="observedSmell"
          value={formData.observedSmell}
          onChange={handleChange}
          icon={<Wind className="w-5 h-5 text-gray-400" />}
          error={errors.observedSmell}
          disabled={!initialHoursValid} // Disable based on previous field validity
        >
          {/* Add a default disabled option if needed, though default state handles it */}
          {/* <option value="" disabled>Select smell...</option> */}
          {riceSmellOptions.map(s => (<option key={s} value={s}>{s}</option>))}
        </SelectGroup>
        <SelectGroup
          label="Observed Appearance"
          name="observedAppearance"
          value={formData.observedAppearance}
          onChange={handleChange}
          icon={<Eye className="w-5 h-5 text-gray-400" />}
           error={errors.observedAppearance}
          disabled={!smellValid} // Disable based on previous field validity
        >
          {riceAppearanceOptions.map(a => (<option key={a} value={a}>{a}</option>))}
        </SelectGroup>
        <SelectGroup
          label="Storage Location"
          name="storageLocation"
          value={formData.storageLocation}
          onChange={handleChange}
          icon={<Archive className="w-5 h-5 text-gray-400" />}
           error={errors.storageLocation}
          disabled={!appearanceValid} // Disable based on previous field validity
        >
          {riceStorageOptions.map(s => (<option key={s} value={s}>{s}</option>))}
        </SelectGroup>
        <SelectGroup
          label="Cooling Method"
          name="coolingMethod"
          value={formData.coolingMethod}
          onChange={handleChange}
          icon={<Thermometer className="w-5 h-5 text-gray-400" />}
          error={errors.coolingMethod}
          disabled={!storageValid} // Disable based on previous field validity
        >
          {riceCoolingOptions.map(c => (<option key={c} value={c}>{c}</option>))}
        </SelectGroup>
      </div>

      <div className="flex justify-between items-center mt-10">
        <button
          type="button"
          onClick={handleBack}
          className="flex items-center gap-2 px-5 py-3 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>
        <button
          type="button"
          onClick={handlePredict}
          disabled={loading || !canSubmit} // Use derived state for disabling
          className="flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition-all disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed min-w-[180px]"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Analyzing...
            </>
          ) : (
            'Predict Freshness'
          )}
        </button>
      </div>
    </motion.div>
  );
};


// ==================================================================
// --- MILK FORM ---
// ==================================================================
const MilkForm = ({ handleBack, setResult, setLoading, setApiError, foodType, stepVariants, loading }) => {

  // --- Internal State ---
  const [formData, setFormData] = useState({
    // Initialize based on the foodType to ensure consistency if needed
    days_since_open_or_purchase: '',
    was_boiled: '', // Start empty, handle conditional rendering
    storage_location: 'Refrigerator', // Default
    cumulative_hours_at_room_temp: '',
    observed_smell: milkSmellOptions[0].value, // Default to 'Normal/Fresh' VALUE
    observed_consistency: milkConsistencyOptions[0].value, // Default to 'Normal/Smooth' VALUE
  });
  const [errors, setErrors] = useState({});

   // --- Derived State for Cross-Field Validation ---
   const maxHours = useMemo(() => {
     const days = parseFloat(formData.days_since_open_or_purchase);
     if (!isNaN(days) && days >= 0) {
       // Calculate max hours based on days
       return Math.round(days * 24 * 100) / 100; // Round to 2 decimal places if needed
     }
     return null; // Return null if days is invalid
   }, [formData.days_since_open_or_purchase]);

   // Determine if the 'was_boiled' question should be shown
   const showBoiledQuestion = useMemo(() => {
      // Use the effective foodType passed from the App component
      return foodType === 'Pasteurized (Pouch/Bottle)' || foodType === 'Raw/Loose';
   }, [foodType]);


  // --- Validation ---
  const validateForm = useCallback((isSubmitting = false) => {
    const newErrors = {};
    const { days_since_open_or_purchase, was_boiled, cumulative_hours_at_room_temp } = formData;
    // No need to recalculate showBoiledQuestion, use the memoized one

    // Validate Days
    if (days_since_open_or_purchase !== '' || isSubmitting) {
        if (isNaN(days_since_open_or_purchase) || parseFloat(days_since_open_or_purchase) < 0) {
            newErrors.days_since_open_or_purchase = 'Must be a valid number (0 or more).';
        }
    }

    // Validate Was Boiled (only if shown and submitting)
    if (showBoiledQuestion && isSubmitting && !was_boiled) {
        newErrors.was_boiled = 'Please select an option.';
    }

    // Validate Cumulative Hours
    if (cumulative_hours_at_room_temp !== '' || isSubmitting) {
        if (isNaN(cumulative_hours_at_room_temp) || parseFloat(cumulative_hours_at_room_temp) < 0) {
            newErrors.cumulative_hours_at_room_temp = 'Must be a valid number (0 or more).';
        } else if (maxHours !== null && parseFloat(cumulative_hours_at_room_temp) > maxHours) {
            // Only apply max hours check if maxHours is a valid number
            newErrors.cumulative_hours_at_room_temp = `Cannot exceed total time (${maxHours} hours).`;
        }
    }

    // Check required fields on submit (dropdowns usually have a default)
    if (isSubmitting) {
        if(formData.days_since_open_or_purchase.trim() === '') newErrors.days_since_open_or_purchase = 'This field is required.';
        if(formData.cumulative_hours_at_room_temp.trim() === '') newErrors.cumulative_hours_at_room_temp = 'This field is required.';
        if(!formData.storage_location) newErrors.storage_location = 'Please select storage.';
        if(!formData.observed_smell) newErrors.observed_smell = 'Please select smell.';
        if(!formData.observed_consistency) newErrors.observed_consistency = 'Please select consistency.';
    }


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, showBoiledQuestion, maxHours]);


  // --- Real-time Validation Effect ---
   useEffect(() => {
    // Validate on change without forcing required errors immediately
    validateForm(false);
  }, [formData, validateForm]);


  // --- Event Handlers ---
  const handleChange = (e) => {
    const { name, value, type } = e.target;

    // Input validation for number fields
    if (name === 'days_since_open_or_purchase' || name === 'cumulative_hours_at_room_temp') {
        if (value.length > 5) return; // Limit length (e.g., 99.99 or 120.0)
        // Allow empty string, numbers, and a single decimal point
        if (value !== '' && !/^\d*\.?\d*$/.test(value)) return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));

    // Reset cumulative hours if days change and current hours exceed new max
    if (name === 'days_since_open_or_purchase') {
      const daysValue = parseFloat(value);
      const currentHours = parseFloat(formData.cumulative_hours_at_room_temp);
      if (!isNaN(daysValue) && daysValue >= 0 && !isNaN(currentHours)) {
          const newMaxHours = daysValue * 24;
          if (currentHours > newMaxHours) {
              setFormData(prev => ({ ...prev, cumulative_hours_at_room_temp: '' })); // Reset or clamp
              // Optionally trigger validation again here if needed
          }
      } else if (value === '' || isNaN(daysValue) || daysValue < 0) {
          // If days becomes invalid, reset cumulative hours if it was relying on the max
           if (formData.cumulative_hours_at_room_temp !== '') {
               // Re-validate cumulative hours without a valid max
               validateForm(false); // Re-run validation logic
           }
      }
    }
  };


  // --- Serial Flow / Submit Button Disabling Logic ---
   const canSubmit = useMemo(() => {
     // Check if all *relevant* fields have values and there are no current errors
     const requiredFieldsFilled =
         formData.days_since_open_or_purchase.trim() !== '' &&
         (!showBoiledQuestion || formData.was_boiled) && // Only check was_boiled if shown
         formData.storage_location &&
         formData.cumulative_hours_at_room_temp.trim() !== '' &&
         formData.observed_smell &&
         formData.observed_consistency;

     return requiredFieldsFilled && Object.keys(errors).length === 0;
   }, [formData, errors, showBoiledQuestion]);



  // --- API Call ---
  const handlePredict = async () => {
    setApiError(null);
    setResult(null);

    // Final validation check before submitting
    if (!validateForm(true)) { // Pass true to enforce required checks
         console.log("Final milk validation failed", errors);
        return;
    }

    setLoading(true);
    try {
      // *** CORRECTED PAYLOAD CONSTRUCTION ***
      const payload = {
        // Send the actual foodType string (e.g., "Raw/Loose")
        'milk_type': foodType,
        'days_since_open_or_purchase': parseFloat(formData.days_since_open_or_purchase),
        // Send boolean true/false for was_boiled
        'was_boiled': showBoiledQuestion ? (formData.was_boiled === 'Yes') : false, // Default to false if not shown
        'storage_location': formData.storage_location,
        'cumulative_hours_at_room_temp': parseFloat(formData.cumulative_hours_at_room_temp),
        // Send the selected string labels directly
        'observed_smell': formData.observed_smell,
        'observed_consistency': formData.observed_consistency,
      };

      console.log("Sending Milk Payload:", payload); // Debug: Check payload before sending

      // *** CORRECTED FETCH URL (ensure it matches backend) ***
      const res = await fetch('http://localhost:5000/api/predict_milk', { // Correct endpoint
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
           console.error("API Error Response (Milk):", data); // Log the actual error from backend
           throw new Error(data.error || `Request failed with status ${res.status}`);
      }
      setResult(data);

    } catch (err) {
      console.error("Fetch Error (Milk):", err); // Log fetch/network errors
      // Provide a user-friendly message for network issues
      setApiError(err.message.includes('Failed to fetch') ? 'Cannot connect to the prediction service. Please ensure it is running.' : err.message);
    } finally {
      setLoading(false);
    }
  };

  // Determine which fields should be enabled (Serial Flow)
   const daysValid = formData.days_since_open_or_purchase.trim() !== '' && !errors.days_since_open_or_purchase;
   const boiledValid = !showBoiledQuestion || (formData.was_boiled !== '' && !errors.was_boiled); // Check if selected
   const storageValid = formData.storage_location && boiledValid;
   const cumulativeHoursValid = formData.cumulative_hours_at_room_temp.trim() !== '' && !errors.cumulative_hours_at_room_temp && storageValid;
   const smellValid = formData.observed_smell && cumulativeHoursValid;
   // const consistencyValid = formData.observed_consistency && smellValid; // Used for submit button check


  return (
    <motion.div
      key="step-milk"
      variants={stepVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.3 }}
      className="py-8"
    >
      <div className="space-y-6"> {/* Use space-y for consistent vertical spacing */}
        <InputGroup
          label="Days Since Open / Purchase"
          name="days_since_open_or_purchase"
          type="number" // Keep type="number" for semantics, validation handles format
          placeholder="e.g., 2.5"
          value={formData.days_since_open_or_purchase}
          onChange={handleChange}
          icon={<CalendarDays className="w-5 h-5 text-gray-400" />}
          error={errors.days_since_open_or_purchase}
          helperText="Enter 0 for today."
          maxLength={5} // Allow slightly more for decimals like 14.0
          // First input, no disabled prop needed
        />

        {/* Conditional Rendering for 'Was Boiled?' */}
        <AnimatePresence>
          {showBoiledQuestion && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }} // Adjusted animation
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden" // Keep overflow hidden
            >
              <SelectGroup
                label="Was it Boiled?"
                name="was_boiled"
                value={formData.was_boiled}
                onChange={handleChange}
                icon={<Flame className="w-5 h-5 text-gray-400" />}
                error={errors.was_boiled}
                disabled={!daysValid} // Disable based on previous field validity
              >
                <option value="">Select...</option> {/* Unselected option */}
                {milkBoiledOptions.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </SelectGroup>
            </motion.div>
          )}
        </AnimatePresence>

        <SelectGroup
          label="Storage Location"
          name="storage_location"
          value={formData.storage_location}
          onChange={handleChange}
          icon={<Archive className="w-5 h-5 text-gray-400" />}
          error={errors.storage_location}
          disabled={!boiledValid} // Disable based on previous field validity
        >
          {milkStorageOptions.map(o => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </SelectGroup>

        <InputGroup
          label="Cumulative Hours at Room Temp"
          name="cumulative_hours_at_room_temp"
          type="number" // Keep type="number"
          placeholder="e.g., 4"
          value={formData.cumulative_hours_at_room_temp}
          onChange={handleChange}
          icon={<Clock className="w-5 h-5 text-gray-400" />}
          error={errors.cumulative_hours_at_room_temp}
          disabled={!storageValid} // Disable based on previous field validity
          maxLength={5} // Allow decimals like 12.5
          max={maxHours !== null ? maxHours : undefined} // HTML5 max attribute
          helperText={
            daysValid && maxHours !== null // Ensure maxHours is calculated
              ? `Total hours left out (cumulative). Max: ${maxHours} hours.`
              : !daysValid ? "Please enter valid 'Days' first." : "Total hours left out (cumulative)."
          }
        />

        <SelectGroup
          label="Observed Smell"
          name="observed_smell"
          value={formData.observed_smell}
          onChange={handleChange}
          icon={<Wind className="w-5 h-5 text-gray-400" />}
          error={errors.observed_smell}
          disabled={!cumulativeHoursValid} // Disable based on previous field validity
        >
          {milkSmellOptions.map(o => (
            <option key={o.value} value={o.value}>{o.label}</option> // Use label for display, value for submission
          ))}
        </SelectGroup>

        <SelectGroup
          label="Observed Consistency"
          name="observed_consistency"
          value={formData.observed_consistency}
          onChange={handleChange}
          icon={<Droplets className="w-5 h-5 text-gray-400" />}
          error={errors.observed_consistency}
          disabled={!smellValid} // Disable based on previous field validity
        >
          {milkConsistencyOptions.map(o => (
            <option key={o.value} value={o.value}>{o.label}</option> // Use label for display, value for submission
          ))}
        </SelectGroup>
      </div>

      <div className="flex items-center justify-between mt-10">
        <button
          type="button"
          onClick={handleBack}
          className="flex items-center gap-2 px-5 py-3 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>
        <button
          type="button"
          onClick={handlePredict}
          disabled={loading || !canSubmit} // Use derived state
          className="flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition-all disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed min-w-[180px]"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Analyzing...
            </>
          ) : (
            'Predict Freshness'
          )}
        </button>
      </div>
    </motion.div>
  );
};



// ==================================================================
// --- UNSUPPORTED FORM ---
// ==================================================================
const UnsupportedFoodForm = ({ foodType, handleBack, stepVariants }) => {
  return (
    <motion.div
      key="step1-unsupported"
      variants={stepVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.3 }}
      className="py-8"
    >
      <div className="flex flex-col items-center justify-center text-center h-full min-h-[300px]">
        <AlertCircle className="w-16 h-16 text-yellow-500 mb-4" />
        <h2 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-gray-100">
          Prediction Not Available
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Predictions for <span className="font-semibold">{foodType}</span> are not yet supported.
        </p>
        <button
          onClick={handleBack}
          className="py-3 px-6 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-all duration-300 font-semibold flex items-center"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Go Back
        </button>
      </div>
    </motion.div>
  );
};

// ==================================================================
// --- HELPER COMPONENTS ---
// ==================================================================

// --- Stepper --- (No changes needed)
const Stepper = ({ currentStep }) => {
  const steps = ['Select Food', 'Enter Details'];
  return (
    <div className="flex items-center w-full mb-8">
      {steps.map((label, index) => (
        <React.Fragment key={index}>
          <div className="flex flex-col items-center text-center"> {/* Added text-center */}
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${ // Increased size/font
                currentStep > index
                  ? 'bg-green-600 text-white'
                  : currentStep === index
                  ? 'bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200 border-2 border-green-500' // Adjusted current step style
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400' // Adjusted inactive style
              } transition-all duration-300`}
            >
              {currentStep > index ? <CheckCircle2 size={24} /> : index + 1}
            </div>
            <span className={`mt-2 text-xs w-20 ${ // Fixed width for labels
              currentStep >= index ? 'text-gray-900 dark:text-gray-100 font-medium' : 'text-gray-400 dark:text-gray-500'
            }`}>
              {label}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`flex-1 h-1 mx-2 sm:mx-4 ${ // Adjusted margin
                currentStep > index ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-700' // Adjusted colors
              } transition-all duration-300`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};


// --- InputGroup --- (No changes needed, but ensure number validation works well)
const InputGroup = ({ label, name, type, value, onChange, icon, error, placeholder, helperText, maxLength, max, disabled = false }) => (
    <div className="mb-4"> {/* Increased bottom margin slightly */}
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"> {/* Increased bottom margin */}
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10"> {/* Ensure icon is above input */}
          {icon}
        </div>
        <input
          id={name}
          name={name}
          type={type} // Use text for better control if needed, rely on validation
          inputMode={type === 'number' ? 'decimal' : 'text'} // Hint for mobile keyboards
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          maxLength={maxLength}
          max={max} // HTML5 max validation (less reliable than JS)
          disabled={disabled}
          className={`w-full pl-10 pr-4 py-2.5 rounded-md border-2 bg-gray-50 dark:bg-gray-700 dark:text-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-200 shadow-sm
            ${error
              ? 'border-red-400 dark:border-red-600 focus:border-red-500 focus:ring-red-500' // Adjusted error colors
              : 'border-gray-300 dark:border-gray-600 focus:border-green-500 dark:focus:border-green-400 focus:ring-green-500' // Adjusted normal colors
            }
            ${disabled ? 'opacity-60 cursor-not-allowed bg-gray-100 dark:bg-gray-800' : 'hover:border-gray-400 dark:hover:border-gray-500'} {/* Adjusted disabled/hover styles */}
          `}
          // Add step="any" for number inputs to allow decimals easily if type="number"
          step={type === 'number' ? "any" : undefined}
        />
         {/* Optional: Add clear button or other adornments here */}
      </div>
      {/* Error and Helper Text - Adjusted spacing and alignment */}
      <div className="mt-1.5 min-h-[1.2em] text-xs">
          {error && <p className="text-red-600 dark:text-red-400 flex items-center"><AlertCircle size={14} className="mr-1 flex-shrink-0" /> {error}</p>}
          {!error && helperText && <p className="text-gray-500 dark:text-gray-400">{helperText}</p>}
      </div>
    </div>
  );

// --- SelectGroup --- (No changes needed)
const SelectGroup = ({ label, name, value, onChange, icon, error, children, helperText, disabled = false }) => (
    <div className="mb-4"> {/* Consistent margin */}
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
          {icon}
        </div>
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`w-full pl-10 pr-10 py-2.5 rounded-md border-2 bg-gray-50 dark:bg-gray-700 dark:text-gray-100 text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-200 shadow-sm
             ${error
              ? 'border-red-400 dark:border-red-600 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300 dark:border-gray-600 focus:border-green-500 dark:focus:border-green-400 focus:ring-green-500'
            }
            ${disabled ? 'opacity-60 cursor-not-allowed bg-gray-100 dark:bg-gray-800' : 'hover:border-gray-400 dark:hover:border-gray-500'}
            ${!value ? 'text-gray-400 dark:text-gray-500' : ''} /* Style placeholder option */
          `}
        >
          {children}
        </select>
        {/* Chevron Icon */}
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <svg className="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </div>
      </div>
       {/* Error and Helper Text */}
       <div className="mt-1.5 min-h-[1.2em] text-xs">
          {error && <p className="text-red-600 dark:text-red-400 flex items-center"><AlertCircle size={14} className="mr-1 flex-shrink-0" /> {error}</p>}
          {!error && helperText && <p className="text-gray-500 dark:text-gray-400">{helperText}</p>}
      </div>
    </div>
  );


// --- ApiErrorCard --- (No changes needed)
const ApiErrorCard = ({ message }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    className="rounded-xl p-6 shadow-lg text-center border-2 border-red-500 bg-red-50 dark:bg-red-900/30"
  >
    <div className="flex justify-center mb-3">
      <AlertCircle className="w-12 h-12 text-red-500" />
    </div>
    <h2 className="text-xl font-bold mb-2 text-red-800 dark:text-red-200">
      Prediction Failed
    </h2>
    <p className="text-red-700 dark:text-red-300 text-sm">{message}</p>
  </motion.div>
);

// --- ResultCard --- (No changes needed)
const ResultCard = ({ result }) => {
  const { status, message, is_safe } = result;

  const isSafe = is_safe === true;
  const isUnsafe = is_safe === false;
   // Handle the 'None' case from backend (Python None -> JS null)
   const isCaution = is_safe === null || is_safe === undefined;


   const borderColor = isSafe ? 'border-green-500' : isUnsafe ? 'border-red-500' : 'border-yellow-500';
   const bgColor = isSafe ? 'bg-green-50 dark:bg-green-900/30' : isUnsafe ? 'bg-red-50 dark:bg-red-900/30' : 'bg-yellow-50 dark:bg-yellow-900/30';
   const iconColor = isSafe ? 'text-green-500' : isUnsafe ? 'text-red-500' : 'text-yellow-500';
   const titleColor = isSafe ? 'text-green-800 dark:text-green-200' : isUnsafe ? 'text-red-800 dark:text-red-200' : 'text-yellow-800 dark:text-yellow-200';
   const textColor = isSafe ? 'text-green-700 dark:text-green-300' : isUnsafe ? 'text-red-700 dark:text-red-300' : 'text-yellow-700 dark:text-yellow-300'; // Corrected typo

   // Choose icon based on is_safe state
   const Icon = isSafe ? CheckCircle2 : isUnsafe ? ShieldOff : AlertCircle; // AlertCircle for caution/null


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className={`rounded-xl p-6 shadow-lg text-center border-2 ${borderColor} ${bgColor}`}
    >
      <div className="flex justify-center mb-3">
        <Icon className={`w-12 h-12 ${iconColor}`} />
      </div>
      <h2 className={`text-2xl font-bold mb-2 ${titleColor}`}>
        {status}
      </h2>
      <p className={`text-md ${textColor}`}>{message}</p>
    </motion.div>
  );
};