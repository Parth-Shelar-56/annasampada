import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';

// Auth Pages
import LandingPage from './pages/auth/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';

// Dashboards
import UserDashboard from './pages/user/UserDashboard';
import NGODashboard from './pages/ngo/NGODashboard';
import ComposterDashboard from './pages/composter/ComposterDashboard';

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/user-dashboard/*" element={<UserDashboard />} />
            <Route path="/ngo-dashboard/*" element={<NGODashboard />} />
            <Route path="/composter-dashboard/*" element={<ComposterDashboard />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;