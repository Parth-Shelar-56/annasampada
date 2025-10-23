import React from "react";
import { CheckCircle2 } from "lucide-react";

export default function Stepper({ currentStep }) {
  const steps = ["Select Food", "Enter Details"];
  return (
    <div className="flex items-center w-full mb-8">
      {steps.map((label, index) => (
        <React.Fragment key={index}>
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300
                ${
                  currentStep > index
                    ? "bg-green-600 text-white"
                    : currentStep === index
                    ? "bg-green-200 dark:bg-green-700 text-green-700 dark:text-green-100 border-2 border-green-600"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-500"
                }`}
            >
              {currentStep > index ? <CheckCircle2 size={20} /> : index + 1}
            </div>
            <span
              className={`mt-2 text-sm font-medium ${
                currentStep >= index
                  ? "text-gray-900 dark:text-gray-100"
                  : "text-gray-400"
              }`}
            >
              {label}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`flex-1 h-1 mx-4 transition-all duration-300 ${
                currentStep > index
                  ? "bg-green-600"
                  : "bg-gray-200 dark:bg-gray-700"
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
