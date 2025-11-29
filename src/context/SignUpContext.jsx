import React, { createContext, useContext, useState } from "react";

// Create context
const SignupContext = createContext();

// Provider component
export const SignupProvider = ({ children }) => {
  const [organizationData, setOrganizationData] = useState({});
  const [adminData, setAdminData] = useState({});
  const [ambulanceData, setAmbulanceData] = useState({});

  const value = {
    organizationData,
    setOrganizationData,
    adminData,
    setAdminData,
    ambulanceData,
    setAmbulanceData,
  };

  return (
    <SignupContext.Provider value={value}>
      {children}
    </SignupContext.Provider>
  );
};

// Custom hook for easier usage
export const useSignup = () => useContext(SignupContext);
