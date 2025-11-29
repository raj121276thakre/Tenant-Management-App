// frontend/src/contexts/AppContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../utils/translations';

/**
 * AppSettingsProvider (JS version)
 * Provides: darkMode, language, user, updateUser, changePassword, t(...)
 *
 * Usage:
 *  import { AppSettingsProvider, useAppSettings } from './contexts/AppContext';
 */

const AppSettingsContext = createContext(null);

export const useAppSettings = () => {
  const ctx = useContext(AppSettingsContext);
  if (!ctx) {
    throw new Error('useAppSettings must be used within AppSettingsProvider');
  }
  return ctx;
};

export const AppSettingsProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  const [language, setLanguageState] = useState(() => {
    const saved = localStorage.getItem('language');
    return saved || 'en';
  });

  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 234 567 8900',
    password: 'password123',
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const toggleDarkMode = () => setDarkMode((v) => !v);

  const setLanguage = (lang) => setLanguageState(lang);

  const updateUser = (updates) => setUser((prev) => ({ ...prev, ...updates }));

  const changePassword = (oldPassword, newPassword) => {
    if (user.password === oldPassword) {
      setUser((prev) => ({ ...prev, password: newPassword }));
      return true;
    }
    return false;
  };

  const t = (key) => {
    // safe lookup — fall back to english if not present
    return (translations[language] && translations[language][key]) || translations.en[key] || key;
  };

  const value = {
    darkMode,
    toggleDarkMode,
    language,
    setLanguage,
    user,
    updateUser,
    changePassword,
    t,
  };

  return <AppSettingsContext.Provider value={value}>{children}</AppSettingsContext.Provider>;
};

export default AppSettingsContext;
