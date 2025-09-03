import React, { createContext, useState } from 'react';

export const AuthorizationContext = createContext();

export const AuthorizationProvider = ({ children }) => {
  const [token, settoken] = useState(localStorage.getItem("token")|| null);

  return (
    <AuthorizationContext.Provider value={{token,settoken}}>
      {children}
    </AuthorizationContext.Provider>
  );
};
