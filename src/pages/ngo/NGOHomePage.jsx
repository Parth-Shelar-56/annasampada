import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import VerificationBadge from '../../components/auth/VerificationBadge';

const NGOHomePage = () => {
  const { verificationStatus } = useAuth();

  const stats = [
    { label: 'Pending Requests', value: '7', icon: '📬', color: 'from-orange-400 to-red-500' },
    { label: 'Total Donations', value: '142', icon: '🍽️', color: 'from-green-400 to-teal-500' },
    { label: 'People Fed', value: '856', icon: '👥', color: 'from-teal-400 to-cyan-500' },
    { label: 'Food Received', value: '320 kg', icon: '⚖️', color: 'from-cyan-400 to-blue-500' }
  ];

  const pendingRequests = [
    { donor: 'Rajesh Kumar', food: 'Cooked Rice & Curry', qty: '5 kg', distance: '2.3 km', time: '15 mins ago' },
    { donor: 'Priya Sharma', food: 'Fresh Vegetables', qty: '8 kg', distance: '1.5 km', time: '1 hour ago' },
    { donor: 'Amit Patel', food: 'Packaged Snacks', qty: '3 kg', distance: '4.2 km', time: '2 hours ago' }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Section */}
      <div className="mb-8 animate-slide-down">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-bold text-green-800 dark:text-green-200 mb-2">
              Hope Foundation Dashboard 🏢
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Managing donations and helping communities
            </p>
          </div>
          <VerificationBadge 
            verified={verificationStatus.verified} 
            pending={verificationStatus.pending} 
          />
        </div>
      </div>

      {/* Verification Alert */}
      {verificationStatus.pending && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-200 
                        dark:border-yellow-800 rounded-3xl p-6 mb-8 animate-fade-in">
          <div className="flex items-start gap-4">
            <svg className="w-8 h-8 text-yellow-600 dark:text-yellow-400 flex-shrink-0" 
                 fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div>
              <h3 className="font-bold text-yellow-800 dark:text-yellow-300 mb-2">
                Account Verification in Progress
              </h3>
              <p className="text-yellow-700 dark:text-yellow-400 mb-3">
                Your NGO registration documents are being reviewed. This typically takes 2-3 business days.
                You can browse the platform but cannot accept donations until verified.
              </p>
              <Link 
                to="/ngo-dashboard/profile" 
                className="text-yellow-800 dark:text-yellow-300 underline hover:no-underline"
              >
                View submission status →
              </Link>
            </div>
          </div>
        </div>
      )}

      {!verificationStatus.verified && !verificationStatus.pending && (
        <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 
                        dark:border-red-800 rounded-3xl p-6 mb-8 animate-fade-in">
          <div className="flex items-start gap-4">
            <svg className="w-8 h-8 text-red-600 dark:text-red-400 flex-shrink-0" 
                 fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <div>
              <h3 className="font-bold text-red-800 dark:text-red-300 mb-2">
                Verification Required
              </h3>
              <p className="text-red-700 dark:text-red-400 mb-3">
                Your account needs to be verified before you can accept donations. Please submit your NGO registration documents.
              </p>
              <Link 
                to="/ngo-dashboard/profile" 
                className="inline-block px-6 py-2 bg-red-600 text-white rounded-xl 
                           hover:bg-red-700 transition-all duration-300"
              >
                Complete Verification
              </Link>
            </div>
          </div>
        </div>
      )}

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

      {/* Pending Donation Requests */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-8 animate-fade-in 
                      animation-delay-600">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Latest Donation Requests
          </h2>
          <Link 
            to="/ngo-dashboard/notifications" 
            className="text-green-600 dark:text-green-400 hover:underline"
          >
            View All →
          </Link>
        </div>

        {verificationStatus.verified ? (
          <div className="space-y-4">
            {pendingRequests.map((request, idx) => (
              <div
                key={idx}
                className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 
                           p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 
                           dark:hover:bg-gray-600 transition-all duration-300"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-teal-500 
                                    rounded-full flex items-center justify-center text-white">
                      {request.donor.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-white">
                        {request.donor}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{request.time}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <span className="text-gray-600 dark:text-gray-300">
                      🍽️ {request.food}
                    </span>
                    <span className="text-gray-600 dark:text-gray-300">
                      ⚖️ {request.qty}
                    </span>
                    <span className="text-gray-600 dark:text-gray-300">
                      📍 {request.distance}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-green-600 dark:bg-green-500 text-white 
                                     rounded-xl hover:bg-green-700 dark:hover:bg-green-600 
                                     transition-all duration-300 text-sm">
                    Accept
                  </button>
                  <button className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 
                                     dark:text-gray-300 rounded-xl hover:bg-gray-300 
                                     dark:hover:bg-gray-500 transition-all duration-300 text-sm">
                    Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔒</div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Complete verification to start accepting donations
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NGOHomePage;