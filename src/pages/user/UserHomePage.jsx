import React from 'react';
import { Link } from 'react-router-dom';

const UserHomePage = () => {
  const stats = [
    { label: 'Food Items Tracked', value: '24', icon: '🍎', color: 'from-green-400 to-teal-500' },
    { label: 'Donations Made', value: '8', icon: '🤝', color: 'from-teal-400 to-cyan-500' },
    { label: 'Waste Composted', value: '12 kg', icon: '♻️', color: 'from-cyan-400 to-blue-500' },
    { label: 'CO₂ Saved', value: '18 kg', icon: '🌍', color: 'from-blue-400 to-indigo-500' }
  ];

  const recentActivities = [
    { action: 'Donated rice to Hope Foundation', time: '2 hours ago', icon: '🍚' },
    { action: 'Composted vegetable waste', time: '1 day ago', icon: '🥬' },
    { action: 'Predicted food freshness', time: '2 days ago', icon: '🔍' }
  ];

  const quickActions = [
    { title: 'Predict Freshness', desc: 'Check food quality', link: '/user-dashboard/predict', icon: '🔍', color: 'bg-green-500' },
    { title: 'Donate Food', desc: 'Connect with NGOs', link: '/user-dashboard/ngo-connect', icon: '🤝', color: 'bg-teal-500' },
    { title: 'Compost Waste', desc: 'Request pickup', link: '/user-dashboard/composter', icon: '♻️', color: 'bg-cyan-500' }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Section */}
      <div className="mb-8 animate-slide-down">
        <h1 className="text-4xl font-bold text-green-800 dark:text-green-200 mb-2">
          Welcome back, Demo User! 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Here's your food waste management overview
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6 animate-fade-in 
                       hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            style={{ animationDelay: `${idx * 0.1}s`, animationFillMode: 'both' }}
          >
            <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${stat.color} mb-4`}>
              <span className="text-3xl">{stat.icon}</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-1">
              {stat.value}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {quickActions.map((action, idx) => (
          <Link
            key={idx}
            to={action.link}
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6 animate-fade-in 
                       hover:shadow-xl transform hover:scale-105 transition-all duration-300 
                       group"
            style={{ animationDelay: `${0.4 + idx * 0.1}s`, animationFillMode: 'both' }}
          >
            <div className={`inline-flex p-4 rounded-2xl ${action.color} text-white mb-4 
                            group-hover:scale-110 transition-transform duration-300`}>
              <span className="text-3xl">{action.icon}</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
              {action.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">{action.desc}</p>
          </Link>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-8 animate-fade-in 
                      animation-delay-800">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          Recent Activity
        </h2>
        <div className="space-y-4">
          {recentActivities.map((activity, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl 
                         hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300"
            >
              <div className="text-3xl">{activity.icon}</div>
              <div className="flex-1">
                <p className="text-gray-800 dark:text-white font-medium">
                  {activity.action}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserHomePage;