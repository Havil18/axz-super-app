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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStoredAuth();
  }, []);

  const loadStoredAuth = async () => {
    try {
      const [storedEmail, storedId, storedToken] = await Promise.all([
        storage.getItem('userEmail'),
        storage.getItem('userId'),
        storage.getItem('accessToken'),
      ]);

      if (storedEmail && storedId && storedToken) {
        setUserEmail(storedEmail);
        setUserId(storedId);
        setAccessToken(storedToken);
      }
    } catch (error) {
      console.error('Error loading auth data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateAuthData = async (email, id, token) => {
    try {
      if (email && id && token) {
        await Promise.all([
          storage.setItem('userEmail', email),
          storage.setItem('userId', id),
          storage.setItem('accessToken', token),
        ]);
        setUserEmail(email);
        setUserId(id);
        setAccessToken(token);
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
      ]);
      setUserEmail('');
      setUserId('');
      setAccessToken('');
    } catch (error) {
      console.error('Error clearing auth data:', error);
    }
  };

  return (
    <UserContext.Provider 
      value={{ 
        userEmail, 
        userId, 
        accessToken, 
        isLoading,
        updateAuthData,
        logout
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext); 