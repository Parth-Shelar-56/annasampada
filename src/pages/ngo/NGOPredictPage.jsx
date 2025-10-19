import React, { useState } from 'react';

const NGOPredictPage = () => {
  const [showResult, setShowResult] = useState(false);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-green-800 dark:text-green-200 animate-slide-down">
        Technical Food Analysis
      </h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 mb-8 animate-fade-in">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          Environmental & Food Data
        </h2>
        
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Food Type
              </label>
              <input
                type="text"
                placeholder="e.g., Cooked Rice"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 
                           dark:border-gray-600 dark:bg-gray-700 dark:text-white
                           focus:border-green-500 dark:focus:border-green-400 
                           focus:outline-none transition-all duration-300"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Storage Duration (days)
              </label>
              <input
                type="number"
                placeholder="3"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 
                           dark:border-gray-600 dark:bg-gray-700 dark:text-white
                           focus:border-green-500 dark:focus:border-green-400 
                           focus:outline-none transition-all duration-300"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Temperature (°C)
              </label>
              <input
                type="number"
                placeholder="25"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 
                           dark:border-gray-600 dark:bg-gray-700 dark:text-white
                           focus:border-green-500 dark:focus:border-green-400 
                           focus:outline-none transition-all duration-300"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Humidity (%)
              </label>
              <input
                type="number"
                placeholder="65"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 
                           dark:border-gray-600 dark:bg-gray-700 dark:text-white
                           focus:border-green-500 dark:focus:border-green-400 
                           focus:outline-none transition-all duration-300"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Methane Level (ppm)
              </label>
              <input
                type="number"
                placeholder="120"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 
                           dark:border-gray-600 dark:bg-gray-700 dark:text-white
                           focus:border-green-500 dark:focus:border-green-400 
                           focus:outline-none transition-all duration-300"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                pH Level
              </label>
              <input
                type="number"
                step="0.1"
                placeholder="6.5"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 
                           dark:border-gray-600 dark:bg-gray-700 dark:text-white
                           focus:border-green-500 dark:focus:border-green-400 
                           focus:outline-none transition-all duration-300"
              />
            </div>
          </div>
          
          <button
            onClick={() => setShowResult(true)}
            className="w-full py-4 bg-green-600 dark:bg-green-500 text-white rounded-xl 
                       hover:bg-green-700 dark:hover:bg-green-600 transform hover:scale-105 
                       transition-all duration-300 shadow-lg font-semibold"
          >
            Analyze Food Quality
          </button>
        </div>
      </div>
      
      {showResult && (
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 animate-fade-in">
          <div className="text-center mb-6">
            <div className="inline-block p-6 bg-gradient-to-br from-red-400 to-orange-500 
                            rounded-full mb-4">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              Quality: Poor - Not Safe for Consumption
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              High decomposition detected. Recommend immediate composting.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 border-2 border-red-200 
                            dark:border-red-800">
              <p className="text-sm text-red-600 dark:text-red-400 mb-1">Temperature</p>
              <p className="text-2xl font-bold text-red-700 dark:text-red-300">High Risk</p>
            </div>
            
            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4 border-2 
                            border-orange-200 dark:border-orange-800">
              <p className="text-sm text-orange-600 dark:text-orange-400 mb-1">Methane</p>
              <p className="text-2xl font-bold text-orange-700 dark:text-orange-300">Elevated</p>
            </div>
            
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-4 border-2 
                            border-yellow-200 dark:border-yellow-800">
              <p className="text-sm text-yellow-600 dark:text-yellow-400 mb-1">pH Level</p>
              <p className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">Acidic</p>
            </div>
          </div>
          
          <button className="w-full py-4 bg-gradient-to-r from-green-500 to-teal-500 
                             text-white rounded-xl hover:shadow-lg transform hover:scale-105 
                             transition-all duration-300 font-semibold">
            Send to Composter Immediately
          </button>
        </div>
      )}
    </div>
  );
};

export default NGOPredictPage;