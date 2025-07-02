import React, { createContext, useContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

export const UserContext = createContext();

// Storage adapter to handle both web and mobile platforms
const storage = {
  async getItem(key) {
    if (Platform.OS === 'web') {
      return localStorage.getItem(key);
    }
    return await SecureStore.getItemAsync(key);
  },
  async setItem(key, value) {
    if (Platform.OS === 'web') {
      localStorage.setItem(key, value);
      return;
    }
    return await SecureStore.setItemAsync(key, value);
  },
  async removeItem(key) {
    if (Platform.OS === 'web') {
      localStorage.removeItem(key);
      return;
    }
    return await SecureStore.deleteItemAsync(key);
  }
};

export function UserProvider({ children }) {
  const [userEmail, setUserEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [expiresAt, setExpiresAt] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStoredAuth();
  }, []);

  const loadStoredAuth = async () => {
    try {
      const [storedEmail, storedId, storedToken, storedExpiresAt, storedRefreshToken] = await Promise.all([
        storage.getItem('userEmail'),
        storage.getItem('userId'),
        storage.getItem('accessToken'),
        storage.getItem('expiresAt'),
        storage.getItem('refreshToken'),
      ]);

      if (storedEmail && storedId && storedToken && storedExpiresAt && storedRefreshToken) {
        setUserEmail(storedEmail);
        setUserId(storedId);
        setAccessToken(storedToken);
        setExpiresAt(storedExpiresAt);
        setRefreshToken(storedRefreshToken);
      }
    } catch (error) {
      console.error('Error loading auth data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateAuthData = async (email, id, token, expiresAtValue, refreshTokenValue) => {
    try {
      if (email && id && token && expiresAtValue && refreshTokenValue) {
        await Promise.all([
          storage.setItem('userEmail', email),
          storage.setItem('userId', id),
          storage.setItem('accessToken', token),
          storage.setItem('expiresAt', expiresAtValue.toString()),
          storage.setItem('refreshToken', refreshTokenValue),
        ]);
        setUserEmail(email);
        setUserId(id);
        setAccessToken(token);
        setExpiresAt(expiresAtValue.toString());
        setRefreshToken(refreshTokenValue);
      }
    } catch (error) {
      console.error('Error saving auth data:', error);
    }
  };

  const logout = async () => {
    try {
      await Promise.all([
        storage.removeItem('userEmail'),
        storage.removeItem('userId'),
        storage.removeItem('accessToken'),
        storage.removeItem('expiresAt'),
        storage.removeItem('refreshToken'),
      ]);
      setUserEmail('');
      setUserId('');
      setAccessToken('');
      setExpiresAt('');
      setRefreshToken('');
    } catch (error) {
      console.error('Error clearing auth data:', error);
    }
  };

  // Helper to check if token is expired
  const isTokenExpired = () => {
    if (!expiresAt) return true;
    const now = Math.floor(Date.now() / 1000);
    return now >= parseInt(expiresAt, 10);
  };

  // Function to refresh the access token using the refresh token
  const refreshAccessToken = async () => {
    if (!refreshToken) return false;
    try {
      const response = await fetch('https://zygpupmeradizrachnqj.supabase.co/auth/v1/token?grant_type=refresh_token', {
        method: 'POST',
        headers: {
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5Z3B1cG1lcmFkaXpyYWNobnFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczMDkwMDMsImV4cCI6MjA2Mjg4NTAwM30.u6cJkMkw17DSmapGl3dgG7NPOh5--PPnRHr8ZWy6WXo',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });
      const data = await response.json();
      if (response.ok && data.access_token) {
        await updateAuthData(
          userEmail,
          userId,
          data.access_token,
          data.expires_at,
          data.refresh_token || refreshToken
        );
        return data.access_token;
      } else {
        await logout();
        return null;
      }
    } catch (error) {
      await logout();
      return null;
    }
  };

  // Function to get a valid access token (refresh if needed)
  const getValidAccessToken = async () => {
    if (!accessToken || isTokenExpired()) {
      return await refreshAccessToken();
    }
    return accessToken;
  };

  return (
    <UserContext.Provider 
      value={{ 
        userEmail, 
        userId, 
        accessToken, 
        expiresAt,
        refreshToken,
        isLoading,
        updateAuthData,
        logout,
        getValidAccessToken
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext); 