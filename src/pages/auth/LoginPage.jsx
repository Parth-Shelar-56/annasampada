import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ThemeToggle from '../../components/layout/ThemeToggle';
import { useAuth } from '../../context/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data based on email
      let role = 'user';
      let verified = true;
      let pending = false;
      
      if (formData.email.includes('ngo')) {
        role = 'ngo';
        verified = false;
        pending = true;
      } else if (formData.email.includes('composter')) {
        role = 'composter';
        verified = true;
        pending = false;
      }
      
      const userData = {
        id: 1,
        name: 'Demo User',
        email: formData.email,
        role: role
      };
      
      const verificationStatus = {
        verified: verified,
        pending: pending
      };
      
      // Update auth context
      login(userData, role, verificationStatus);
      
      // Navigate to dashboard
      navigate(`/${role}-dashboard`);
      
    } catch (error) {
      setErrors({ password: 'Invalid email or password' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-cyan-50 
                    dark:from-gray-900 dark:via-green-900 dark:to-teal-900 
                    transition-colors duration-500 flex items-center justify-center px-4">
      <ThemeToggle />
      
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 w-full max-w-md 
                      animate-scale-in">
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-gradient-to-br from-green-500 to-teal-500 
                          rounded-full mb-4">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Login to continue managing food waste
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border-2 ${
                errors.email 
                  ? 'border-red-500' 
                  : 'border-gray-200 dark:border-gray-600 focus:border-green-500'
              } dark:bg-gray-700 dark:text-white focus:outline-none transition-all duration-300`}
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border-2 ${
                errors.password 
                  ? 'border-red-500' 
                  : 'border-gray-200 dark:border-gray-600 focus:border-green-500'
              } dark:bg-gray-700 dark:text-white focus:outline-none transition-all duration-300`}
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.password}</p>
            )}
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-green-600 to-teal-600 
                       text-white rounded-xl hover:from-green-700 hover:to-teal-700 
                       transform hover:scale-105 transition-all duration-300 shadow-lg 
                       disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Logging in...
              </div>
            ) : (
              'Login'
            )}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            Don't have an account?{' '}
            <Link to="/signup" className="text-green-600 dark:text-green-400 hover:underline font-semibold">
              Sign Up
            </Link>
          </p>
        </div>
        
        <div className="mt-4 text-center">
          <Link to="/" className="text-sm text-gray-500 dark:text-gray-400 hover:text-green-600">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;