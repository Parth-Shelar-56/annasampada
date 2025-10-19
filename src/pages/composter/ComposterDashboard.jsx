import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import ThemeToggle from '../../components/layout/ThemeToggle';
import ChatbotWidget from '../../components/layout/ChatbotWidget';
import ComposterHomePage from './ComposterHomePage';
import ComposterNotificationsPage from './ComposterNotificationsPage';
import AboutPage from '../shared/AboutPage';
import ProfilePage from '../shared/ProfilePage';

const ComposterDashboard = () => {
  const navLinks = [
    { to: '/composter-dashboard', label: 'Home' },
    { to: '/composter-dashboard/notifications', label: 'Notifications' },
    { to: '/composter-dashboard/about', label: 'About' },
    { to: '/composter-dashboard/profile', label: 'Profile' }
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-cyan-50 
                    dark:from-gray-900 dark:via-green-900 dark:to-teal-900 
                    transition-colors duration-500">
      <ThemeToggle />
      <Navbar links={navLinks} />
      <ChatbotWidget />
      <Routes>
        <Route index element={<ComposterHomePage />} />
        <Route path="notifications" element={<ComposterNotificationsPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Routes>
    </div>
  );
};

export default ComposterDashboard;