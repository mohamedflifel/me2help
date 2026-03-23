import React, { createContext, useState } from 'react';
import { AuthUser } from '../types';
import { getStoredUser, setStoredUser, clearStorage } from '../utils/storage';

export interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (user: AuthUser) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(getStoredUser());

  const login = (userData: AuthUser) => {
    setUser(userData);
    setStoredUser(userData);
  };

  const logout = () => {
    setUser(null);
    clearStorage();
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
