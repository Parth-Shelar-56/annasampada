import React, { useState } from 'react';

const UserPredictPage = () => {
  const [showResult, setShowResult] = useState(false);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-green-800 dark:text-green-200 animate-slide-down">
        Food Freshness Predictor
      </h1>
      
      {/* PREDICT FORM START */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 mb-8 animate-fade-in">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          Upload Food Details
        </h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Food Image
            </label>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 
                            rounded-xl p-8 text-center hover:border-green-500 
                            dark:hover:border-green-400 transition-all duration-300 cursor-pointer">
              <svg className="w-12 h-12 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-gray-600 dark:text-gray-300">Click to upload food image</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Food Type
              </label>
              <select className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 
                                 dark:border-gray-600 dark:bg-gray-700 dark:text-white
                                 focus:border-green-500 dark:focus:border-green-400 
                                 focus:outline-none transition-all duration-300">
                <option>Select food type</option>
                <option>Vegetables</option>
                <option>Fruits</option>
                <option>Dairy</option>
                <option>Meat</option>
                <option>Grains</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Purchase Date
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
                Storage Method
              </label>
              <select className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 
                                 dark:border-gray-600 dark:bg-gray-700 dark:text-white
                                 focus:border-green-500 dark:focus:border-green-400 
                                 focus:outline-none transition-all duration-300">
                <option>Select storage</option>
                <option>Refrigerator</option>
                <option>Freezer</option>
                <option>Room Temperature</option>
                <option>Pantry</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Unusual Odor?
              </label>
              <div className="flex gap-4 mt-3">
                <label className="flex items-center">
                  <input type="radio" name="odor" className="mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">Yes</span>
                </label>
                <label className="flex items-center">
                  <input type="radio" name="odor" className="mr-2" defaultChecked />
                  <span className="text-gray-700 dark:text-gray-300">No</span>
                </label>
              </div>
            </div>
          </div>
          
          <button
            onClick={() => setShowResult(true)}
            className="w-full py-4 bg-green-600 dark:bg-green-500 text-white rounded-xl 
                       hover:bg-green-700 dark:hover:bg-green-600 transform hover:scale-105 
                       transition-all duration-300 shadow-lg font-semibold"
          >
            Analyze Food Freshness
          </button>
        </div>
      </div>
      {/* PREDICT FORM END */}
      
      {/* RESULT CARD START */}
      {showResult && (
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 animate-fade-in">
          <div className="text-center mb-6">
            <div className="inline-block p-6 bg-gradient-to-br from-yellow-400 to-orange-500 
                            rounded-full mb-4">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              Freshness: Moderate
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              This food is still consumable but should be used soon
            </p>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 mb-6">
            <h4 className="font-semibold text-gray-800 dark:text-white mb-3">Recommendation:</h4>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Best consumed within 2-3 days. Consider cooking or donating if you won't use it soon.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 bg-green-100 dark:bg-green-900 text-green-700 
                             dark:text-green-300 rounded-full text-sm">
                Safe to Eat
              </span>
              <span className="px-4 py-2 bg-yellow-100 dark:bg-yellow-900 text-yellow-700 
                             dark:text-yellow-300 rounded-full text-sm">
                Use Soon
              </span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            <button className="py-3 px-6 bg-gradient-to-r from-green-500 to-teal-500 
                               text-white rounded-xl hover:shadow-lg transform hover:scale-105 
                               transition-all duration-300">
              Send to NGO
            </button>
            <button className="py-3 px-6 bg-gradient-to-r from-teal-500 to-cyan-500 
                               text-white rounded-xl hover:shadow-lg transform hover:scale-105 
                               transition-all duration-300">
              Send to Compost
            </button>
            <button className="py-3 px-6 bg-gradient-to-r from-cyan-500 to-blue-500 
                               text-white rounded-xl hover:shadow-lg transform hover:scale-105 
                               transition-all duration-300">
              Ask Anna.AI
            </button>
          </div>
        </div>
      )}
      {/* RESULT CARD END */}
    </div>
  );
};

export default UserPredictPage;