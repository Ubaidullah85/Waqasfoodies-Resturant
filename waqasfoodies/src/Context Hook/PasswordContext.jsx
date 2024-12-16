import React, { createContext, useContext, useState } from "react";
import "../Context Hook/PasswordContext.css";
// Create context
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);

  const authorize = (password) => {
    const correctPassword = "admin123"; // Set your password here
    if (password === correctPassword) {
      setIsAuthorized(true);
    } else {
      alert("Incorrect password, please try again.");
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthorized, authorize }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
