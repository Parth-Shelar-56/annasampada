import React from 'react';
import { useAuth } from '../../context/AuthContext';

const ProfilePage = () => {
  const { user, role } = useAuth();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-green-800 dark:text-green-200 animate-slide-down">
        My Profile
      </h1>
      
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 animate-fade-in">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-teal-500 
                            rounded-full flex items-center justify-center text-4xl text-white">
              {role === 'user' ? '👤' : role === 'ngo' ? '🏢' : '♻️'}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Demo User</h2>
              <p className="text-gray-600 dark:text-gray-300">demo@example.com</p>
              <span className="inline-block mt-2 px-4 py-1 bg-green-100 dark:bg-green-900 
                             text-green-700 dark:text-green-300 rounded-full text-sm capitalize">
                {role} Account
              </span>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                defaultValue="Demo User"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 
                           dark:border-gray-600 dark:bg-gray-700 dark:text-white
                           focus:border-green-500 dark:focus:border-green-400 
                           focus:outline-none transition-all duration-300"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                defaultValue="demo@example.com"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 
                           dark:border-gray-600 dark:bg-gray-700 dark:text-white
                           focus:border-green-500 dark:focus:border-green-400 
                           focus:outline-none transition-all duration-300"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                defaultValue="+91 98765 43210"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 
                           dark:border-gray-600 dark:bg-gray-700 dark:text-white
                           focus:border-green-500 dark:focus:border-green-400 
                           focus:outline-none transition-all duration-300"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Address
              </label>
              <textarea
                rows="3"
                defaultValue="123 Green Street, Eco City, 400001"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 
                           dark:border-gray-600 dark:bg-gray-700 dark:text-white
                           focus:border-green-500 dark:focus:border-green-400 
                           focus:outline-none transition-all duration-300"
              ></textarea>
            </div>
            
            <button className="w-full py-3 bg-green-600 dark:bg-green-500 text-white rounded-xl 
                               hover:bg-green-700 dark:hover:bg-green-600 transform hover:scale-105 
                               transition-all duration-300 shadow-lg font-semibold">
              Save Changes
            </button>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 animate-fade-in 
                        animation-delay-200">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
            Account Statistics
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
              <p className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">42</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Total Donations</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
              <p className="text-2xl font-bold text-teal-600 dark:text-teal-400 mb-1">128 kg</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Food Saved</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;