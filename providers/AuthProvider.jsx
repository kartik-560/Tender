'use client';

import React, { createContext, useContext, useEffect } from 'react';
import useAuthStore from '../store/useAuthStore';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const auth = useAuthStore();

  useEffect(() => {
    auth.initialize();
  }, []);

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
