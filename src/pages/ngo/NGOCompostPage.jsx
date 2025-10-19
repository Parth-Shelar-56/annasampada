import React from 'react';

const NGOCompostPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-green-800 dark:text-green-200 animate-slide-down">
        Send to Composter
      </h1>
      
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 animate-fade-in">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
            Compost Request Details
          </h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Waste Type
              </label>
              <select className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 
                                 dark:border-gray-600 dark:bg-gray-700 dark:text-white
                                 focus:border-green-500 dark:focus:border-green-400 
                                 focus:outline-none transition-all duration-300">
                <option>Select waste type</option>
                <option>Spoiled Food</option>
                <option>Vegetable Waste</option>
                <option>Fruit Waste</option>
                <option>Mixed Organic</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Estimated Weight (kg)
              </label>
              <input
                type="number"
                placeholder="15"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 
                           dark:border-gray-600 dark:bg-gray-700 dark:text-white
                           focus:border-green-500 dark:focus:border-green-400 
                           focus:outline-none transition-all duration-300"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Pickup Location
              </label>
              <textarea
                rows="3"
                placeholder="Enter pickup address"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 
                           dark:border-gray-600 dark:bg-gray-700 dark:text-white
                           focus:border-green-500 dark:focus:border-green-400 
                           focus:outline-none transition-all duration-300"
              ></textarea>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Available Date
              </label>
              <input
                type="date"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 
                           dark:border-gray-600 dark:bg-gray-700 dark:text-white
                           focus:border-green-500 dark:focus:border-green-400 
                           focus:outline-none transition-all duration-300"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Additional Notes
              </label>
              <textarea
                rows="3"
                placeholder="Any special instructions..."
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 
                           dark:border-gray-600 dark:bg-gray-700 dark:text-white
                           focus:border-green-500 dark:focus:border-green-400 
                           focus:outline-none transition-all duration-300"
              ></textarea>
            </div>
            
            <button className="w-full py-4 bg-green-600 dark:bg-green-500 text-white rounded-xl 
                               hover:bg-green-700 dark:hover:bg-green-600 transform hover:scale-105 
                               transition-all duration-300 shadow-lg font-semibold">
              Request Compost Pickup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NGOCompostPage;