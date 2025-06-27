import React, { createContext, useContext, useState, useMemo } from 'react';

const lightTheme = {
  mode: 'light',
  background: '#f4f6fa',
  card: '#fff',
  text: '#23272f',
  primary: '#007AFF',
  accent: '#00B894',
  secondary: '#555',
  border: '#e3eaf2',
  shadow: '#007aff11',
  cta: '#007AFF',
  ctaText: '#fff',
  button: '#fff',
  buttonText: '#007AFF',
};

const darkTheme = {
  mode: 'dark',
  background: '#181c23',
  card: '#23272f',
  text: '#f4f6fa',
  primary: '#4f8cff',
  accent: '#00B894',
  secondary: '#bbb',
  border: '#23272f',
  shadow: '#00000033',
  cta: '#23272f',
  ctaText: '#4f8cff',
  button: '#23272f',
  buttonText: '#4f8cff',
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(lightTheme);
  const toggleTheme = () => setTheme(theme.mode === 'light' ? darkTheme : lightTheme);
  const value = useMemo(() => ({ theme, toggleTheme }), [theme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext); 