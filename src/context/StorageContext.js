import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StorageContext = createContext();

export function useStorage() {
  return useContext(StorageContext);
}

export function StorageProvider({ children }) {
  const [userProgress, setUserProgress] = useState({});
  const [settings, setSettings] = useState({
    selectedLevels: ['principiante', 'intermedio'],
    dailyGoal: 10,
    soundEnabled: true,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Cargar datos al iniciar
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const progressData = await AsyncStorage.getItem('userProgress');
      const settingsData = await AsyncStorage.getItem('settings');

      if (progressData) {
        setUserProgress(JSON.parse(progressData));
      }

      if (settingsData) {
        setSettings(JSON.parse(settingsData));
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveProgress = async (openingId, progressData) => {
    try {
      const newProgress = {
        ...userProgress,
        [openingId]: progressData
      };
      
      setUserProgress(newProgress);
      await AsyncStorage.setItem('userProgress', JSON.stringify(newProgress));
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  const getProgress = (openingId) => {
    return userProgress[openingId] || null;
  };

  const saveSettings = async (newSettings) => {
    try {
      setSettings(newSettings);
      await AsyncStorage.setItem('settings', JSON.stringify(newSettings));
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  const resetProgress = async () => {
    try {
      setUserProgress({});
      await AsyncStorage.removeItem('userProgress');
    } catch (error) {
      console.error('Error resetting progress:', error);
    }
  };

  const value = {
    userProgress,
    settings,
    isLoading,
    saveProgress,
    getProgress,
    saveSettings,
    resetProgress,
  };

  return (
    <StorageContext.Provider value={value}>
      {children}
    </StorageContext.Provider>
  );
}
