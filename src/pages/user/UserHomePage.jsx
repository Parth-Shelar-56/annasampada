import React from 'react';
import { Link } from 'react-router-dom';
import { Handshake, Search, Gift, Leaf, MessageSquare } from "lucide-react";
import Footer from '../../components/layout/Footer';

const UserHomePage = () => {
  const recentActivities = [
    { action: 'Donated rice to Hope Foundation', time: '2 hours ago', icon: <Gift className="w-5 h-5 text-green-600" /> },
    { action: 'Composted vegetable waste', time: '1 day ago', icon: <Leaf className="w-5 h-5 text-teal-600" /> },
    { action: 'Predicted food freshness', time: '2 days ago', icon: <Search className="w-5 h-5 text-cyan-600" /> },
  ];

  const quickActions = [
  { title: 'Predict Freshness', desc: 'Check food quality', link: '/user-dashboard/predict', icon: <Search className="w-6 h-6" />, color: 'bg-green-500' },
  { title: 'Donate Food', desc: 'Connect with NGOs', link: '/user-dashboard/ngo-connect', icon: <Handshake className="w-6 h-6" />, color: 'bg-teal-500' },
  { title: 'Talk to Anna', desc: 'Chat with our AI assistant', link: '#', icon: <MessageSquare className="w-6 h-6" />, color: 'bg-cyan-500', openChat: true },
  ];


  return (
    <div className="home-page-bg min-h-screen flex flex-col">
      <div className="container mx-auto px-4 py-10 flex-1">
        
        {/* Welcome Section */}
        <div className="mb-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-3xl shadow-lg p-8 border border-gray-200 dark:border-gray-700 animate-slide-down">
          <h1 className="text-4xl font-semibold text-gray-900 dark:text-white mb-3">
            Welcome back, Demo User
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Here’s your food waste management overview.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {quickActions.map((action, idx) => (
  action.openChat ? (
    <button
      key={idx}
      onClick={() => window.dispatchEvent(new Event('openChatbot'))}
      className="w-full text-left bg-white dark:bg-gray-800 rounded-3xl shadow-md p-6 
                 hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
    >
      <div className={`inline-flex p-4 rounded-2xl ${action.color} text-white mb-4 
                      group-hover:scale-110 transition-transform duration-300`}>
        {action.icon}
      </div>
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{action.title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{action.desc}</p>
    </button>
  ) : (
    <Link
      key={idx}
      to={action.link}
      className="bg-white dark:bg-gray-800 rounded-3xl shadow-md p-6 
                 hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
    >
      <div className={`inline-flex p-4 rounded-2xl ${action.color} text-white mb-4 
                      group-hover:scale-110 transition-transform duration-300`}>
        {action.icon}
      </div>
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{action.title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{action.desc}</p>
    </Link>
  )
))}


        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivities.map((activity, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 
                           rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 
                           transition-all duration-300"
              >
                <div>{activity.icon}</div>
                <div className="flex-1">
                  <p className="text-gray-800 dark:text-white font-medium">{activity.action}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer type="dashboard" />
    </div>
  );
};

export default UserHomePage;
