import React from "react";
import { AlertCircle } from "lucide-react";

export default function SelectGroup({
  label,
  name,
  value,
  onChange,
  icon,
  error,
  children,
  helperText,
  disabled = false,
}) {
  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
      >
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
          className={`w-full pl-10 pr-10 py-2.5 rounded-md border-2 bg-gray-50 dark:bg-gray-700 dark:text-gray-100 appearance-none
            ${
              error
                ? "border-red-500 dark:border-red-600 focus:ring-red-400"
                : "border-gray-300 dark:border-gray-600 focus:ring-green-400"
            }
            ${disabled ? "opacity-60 cursor-not-allowed" : ""}
            transition-all duration-300`}
        >
          {children}
        </select>
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {error && (
        <p className="mt-1 text-xs text-red-600 dark:text-red-400 flex items-center">
          <AlertCircle size={14} className="mr-1" /> {error}
        </p>
      )}
      {!error && helperText && (
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{helperText}</p>
      )}
    </div>
  );
}
