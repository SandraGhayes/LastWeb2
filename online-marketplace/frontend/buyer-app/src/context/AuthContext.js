// src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Check for existing token on app load
  useEffect(() => {
    console.log('🔐 AuthProvider - useEffect running');
    const token = localStorage.getItem('token');
    console.log('🔐 AuthProvider - Found token in localStorage:', !!token);

    if (token) {
      console.log('🔐 AuthProvider - Setting isAuthenticated to true');
      setIsAuthenticated(true);
      // You can optionally fetch user data here
      // authService.getCurrentUser().then(setUser).catch(() => {});
    } else {
      console.log('🔐 AuthProvider - No token found, user is not authenticated');
    }

    setLoading(false);
    console.log('🔐 AuthProvider - Loading set to false');
  }, []);

  const login = async (email, password) => {
    console.log('🔐 AuthProvider - login called with:', email);
    try {
      const data = await authService.login(email, password);
      console.log('🔐 AuthProvider - Login successful');

      // Update state
      setIsAuthenticated(true);
      setUser(data.user || { email });

      console.log('🔐 AuthProvider - isAuthenticated set to true');
      return { success: true };
    } catch (error) {
      console.error('🔐 AuthProvider - Login failed:', error);
      return {
        success: false,
        error: error.message || 'Invalid email or password'
      };
    }
  };

  const register = async (userData) => {
    console.log('🔐 AuthProvider - register called');
    try {
      await authService.register(userData);
      console.log('🔐 AuthProvider - Registration successful');

      // Auto-login after registration
      return await login(userData.email, userData.password);
    } catch (error) {
      console.error('🔐 AuthProvider - Registration failed:', error);
      return {
        success: false,
        error: error.message || 'Registration failed'
      };
    }
  };

  const logout = async () => {
    console.log('🔐 AuthProvider - logout called');
    try {
      await authService.logout();
    } catch (error) {
      console.error('🔐 AuthProvider - Logout error:', error);
    } finally {
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  const value = {
    isAuthenticated,
    loading,
    user,
    login,
    register,
    logout
  };

  console.log('🔐 AuthProvider - Rendering with state:', { isAuthenticated, loading });

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
