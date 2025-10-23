import React from 'react';
import { AlertCircle } from 'lucide-react';

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

export default InputGroup;