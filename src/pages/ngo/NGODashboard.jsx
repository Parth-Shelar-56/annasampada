import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import ThemeToggle from '../../components/layout/ThemeToggle';
import ChatbotWidget from '../../components/layout/ChatbotWidget';
import NGOHomePage from './NGOHomePage';
import NGONotificationsPage from './NGONotificationsPage';
import NGOCompostPage from './NGOCompostPage';
import NGOPredictPage from './NGOPredictPage';
import AboutPage from '../shared/AboutPage';
import ProfilePage from '../shared/ProfilePage';

const NGODashboard = () => {
  const navLinks = [
    { to: '/ngo-dashboard', label: 'Home' },
    { to: '/ngo-dashboard/notifications', label: 'Notifications' },
    { to: '/ngo-dashboard/compost', label: 'Compost' },
    { to: '/ngo-dashboard/predict', label: 'Predict' },
    { to: '/ngo-dashboard/about', label: 'About' },
    { to: '/ngo-dashboard/profile', label: 'Profile' }
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-cyan-50 
                    dark:from-gray-900 dark:via-green-900 dark:to-teal-900 
                    transition-colors duration-500">
      <ThemeToggle />
      <Navbar links={navLinks} />
      <ChatbotWidget />
      <Routes>
        <Route index element={<NGOHomePage />} />
        <Route path="notifications" element={<NGONotificationsPage />} />
        <Route path="compost" element={<NGOCompostPage />} />
        <Route path="predict" element={<NGOPredictPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Routes>
    </div>
  );
};

export default NGODashboard;