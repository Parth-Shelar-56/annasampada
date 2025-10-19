import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [verificationStatus, setVerificationStatus] = useState({
    verified: false,
    pending: false,
    documents: []
  });
  
  const login = (userData, userRole, verification = { verified: false, pending: false }) => {
    setUser(userData);
    setRole(userRole);
    setVerificationStatus(verification);
  };
  
  const logout = () => {
    setUser(null);
    setRole(null);
    setVerificationStatus({ verified: false, pending: false, documents: [] });
  };
  
  return (
    <AuthContext.Provider value={{ user, role, verificationStatus, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);