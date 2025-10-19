import React from 'react';

const UserNGOConnectPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-green-800 dark:text-green-200 animate-slide-down">
        Connect with NGOs
      </h1>
      
      <div className="grid lg:grid-cols-2 gap-8">
        {/* FOOD DONATION FORM START */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 animate-fade-in">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
            Donation Details
          </h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Food Type
              </label>
              <input
                type="text"
                placeholder="e.g., Cooked Rice, Fresh Vegetables"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 
                           dark:border-gray-600 dark:bg-gray-700 dark:text-white
                           focus:border-green-500 dark:focus:border-green-400 
                           focus:outline-none transition-all duration-300"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Quantity (in kg)
              </label>
              <input
                type="number"
                placeholder="5"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 
                           dark:border-gray-600 dark:bg-gray-700 dark:text-white
                           focus:border-green-500 dark:focus:border-green-400 
                           focus:outline-none transition-all duration-300"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Pickup Address
              </label>
              <textarea
                rows="3"
                placeholder="Enter your complete address"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 
                           dark:border-gray-600 dark:bg-gray-700 dark:text-white
                           focus:border-green-500 dark:focus:border-green-400 
                           focus:outline-none transition-all duration-300"
              ></textarea>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Available Until
              </label>
              <input
                type="datetime-local"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 
                           dark:border-gray-600 dark:bg-gray-700 dark:text-white
                           focus:border-green-500 dark:focus:border-green-400 
                           focus:outline-none transition-all duration-300"
              />
            </div>
            
            <button className="w-full py-4 bg-green-600 dark:bg-green-500 text-white rounded-xl 
                               hover:bg-green-700 dark:hover:bg-green-600 transform hover:scale-105 
                               transition-all duration-300 shadow-lg font-semibold">
              Notify Nearby NGOs
            </button>
          </div>
        </div>
        {/* FOOD DONATION FORM END */}
        
        {/* MAP PLACEHOLDER START */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 animate-fade-in 
                        animation-delay-200">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
            Nearby NGOs
          </h2>
          
          <div className="bg-gradient-to-br from-green-100 to-teal-100 dark:from-gray-700 
                          dark:to-gray-600 rounded-xl h-96 flex items-center justify-center 
                          mb-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-green-600 rounded-full 
                              animate-ping"></div>
              <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-teal-600 rounded-full 
                              animate-ping animation-delay-200"></div>
              <div className="absolute top-2/3 left-1/3 w-3 h-3 bg-cyan-600 rounded-full 
                              animate-ping animation-delay-400"></div>
            </div>
            <div className="text-center z-10">
              <svg className="w-16 h-16 mx-auto mb-4 text-green-600 dark:text-green-400" 
                   fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="text-gray-600 dark:text-gray-300 font-medium">
                Interactive Map (Demo)
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Showing 3 NGOs within 5km radius
              </p>
            </div>
          </div>
          
          <div className="space-y-3">
            {[
              { name: 'Hope Foundation', distance: '1.2 km', rating: 4.8 },
              { name: 'Food For All', distance: '2.5 km', rating: 4.6 },
              { name: 'Care & Share NGO', distance: '3.8 km', rating: 4.9 }
            ].map((ngo, idx) => (
              <div key={idx} 
                   className="flex items-center justify-between p-4 bg-gray-50 
                              dark:bg-gray-700 rounded-xl hover:shadow-md 
                              transition-all duration-300">
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">{ngo.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{ngo.distance} away</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-500">★</span>
                  <span className="font-medium text-gray-700 dark:text-gray-300">{ngo.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* MAP PLACEHOLDER END */}
      </div>
    </div>
  );
};

export default UserNGOConnectPage;