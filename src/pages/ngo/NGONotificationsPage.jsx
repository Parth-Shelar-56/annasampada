import React from 'react';

const NGONotificationsPage = () => {
  const notifications = [
    {
      id: 1,
      user: 'Rajesh Kumar',
      foodType: 'Cooked Rice & Curry',
      quantity: '5 kg',
      location: '2.3 km away',
      time: '15 mins ago',
      status: 'pending'
    },
    {
      id: 2,
      user: 'Priya Sharma',
      foodType: 'Fresh Vegetables',
      quantity: '8 kg',
      location: '1.5 km away',
      time: '1 hour ago',
      status: 'pending'
    },
    {
      id: 3,
      user: 'Amit Patel',
      foodType: 'Packaged Snacks',
      quantity: '3 kg',
      location: '4.2 km away',
      time: '2 hours ago',
      status: 'pending'
    }
  ];
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-green-800 dark:text-green-200 animate-slide-down">
        Donation Requests
      </h1>
      
      <div className="space-y-4">
        {notifications.map((notif, idx) => (
          <div
            key={notif.id}
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6 animate-fade-in 
                       hover:shadow-xl transition-all duration-300"
            style={{ animationDelay: `${idx * 0.1}s`, animationFillMode: 'both' }}
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-teal-500 
                                  rounded-full flex items-center justify-center text-white text-xl">
                    {notif.user.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                      {notif.user}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{notif.time}</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🍽️</span>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Food Type</p>
                      <p className="font-medium text-gray-800 dark:text-white">{notif.foodType}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">⚖️</span>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Quantity</p>
                      <p className="font-medium text-gray-800 dark:text-white">{notif.quantity}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">📍</span>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Location</p>
                      <p className="font-medium text-gray-800 dark:text-white">{notif.location}</p>
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
                  Ignore
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {notifications.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📭</div>
          <p className="text-xl text-gray-600 dark:text-gray-300">No pending requests</p>
        </div>
      )}
    </div>
  );
};

export default NGONotificationsPage;