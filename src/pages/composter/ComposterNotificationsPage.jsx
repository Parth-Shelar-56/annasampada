import React, { useState } from 'react';

const ComposterNotificationsPage = () => {
  const [activeTab, setActiveTab] = useState('users');
  
  const userRequests = [
    { id: 1, name: 'Rajesh Kumar', type: 'Vegetable Peels', weight: '5 kg', location: '1.2 km', time: '30 mins ago' },
    { id: 2, name: 'Priya Sharma', type: 'Fruit Waste', weight: '3 kg', location: '2.5 km', time: '1 hour ago' }
  ];
  
  const ngoRequests = [
    { id: 1, name: 'Hope Foundation', type: 'Spoiled Food', weight: '15 kg', location: '3.8 km', time: '2 hours ago' },
    { id: 2, name: 'Food For All', type: 'Mixed Organic', weight: '20 kg', location: '4.2 km', time: '3 hours ago' }
  ];
  
  const activeRequests = activeTab === 'users' ? userRequests : ngoRequests;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-green-800 dark:text-green-200 animate-slide-down">
        Compost Requests
      </h1>
      
      {/* TABS START */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setActiveTab('users')}
          className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 
                     ${activeTab === 'users'
                       ? 'bg-green-600 dark:bg-green-500 text-white shadow-lg'
                       : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                     }`}
        >
          From Users ({userRequests.length})
        </button>
        <button
          onClick={() => setActiveTab('ngos')}
          className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 
                     ${activeTab === 'ngos'
                       ? 'bg-green-600 dark:bg-green-500 text-white shadow-lg'
                       : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                     }`}
        >
          From NGOs ({ngoRequests.length})
        </button>
      </div>
      {/* TABS END */}
      
      <div className="space-y-4">
        {activeRequests.map((request, idx) => (
          <div
            key={request.id}
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6 animate-fade-in 
                       hover:shadow-xl transition-all duration-300"
            style={{ animationDelay: `${idx * 0.1}s`, animationFillMode: 'both' }}
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-teal-500 
                                  rounded-full flex items-center justify-center text-white text-xl">
                    {activeTab === 'users' ? '👤' : '🏢'}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                      {request.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{request.time}</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">♻️</span>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Waste Type</p>
                      <p className="font-medium text-gray-800 dark:text-white">{request.type}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">⚖️</span>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Weight</p>
                      <p className="font-medium text-gray-800 dark:text-white">{request.weight}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">📍</span>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Distance</p>
                      <p className="font-medium text-gray-800 dark:text-white">{request.location}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button className="px-6 py-3 bg-green-600 dark:bg-green-500 text-white 
                                   rounded-xl hover:bg-green-700 dark:hover:bg-green-600 
                                   transform hover:scale-105 transition-all duration-300">
                  Accept
                </button>
                <button className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 
                                   dark:text-gray-300 rounded-xl hover:bg-gray-300 
                                   dark:hover:bg-gray-600 transition-all duration-300">
                  Decline
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComposterNotificationsPage;