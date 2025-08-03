import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Appearance, ColorSchemeName } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeColors {
  // Background colors
  background: string;
  surface: string;
  surfaceVariant: string;
  
  // Text colors
  text: string;
  textSecondary: string;
  textTertiary: string;
  
  // Primary colors
  primary: string;
  primaryContainer: string;
  onPrimary: string;
  onPrimaryContainer: string;
  
  // Secondary colors
  secondary: string;
  secondaryContainer: string;
  onSecondary: string;
  onSecondaryContainer: string;
  
  // Status colors
  success: string;
  warning: string;
  error: string;
  info: string;
  
  // Border and divider colors
  border: string;
  divider: string;
  
  // Shadow colors
  shadow: string;
  
  // Card and overlay colors
  card: string;
  overlay: string;
}

const lightTheme: ThemeColors = {
  background: '#ffffff',
  surface: '#f8f9fa',
  surfaceVariant: '#e9ecef',
  
  text: '#1a1a1a',
  textSecondary: '#666666',
  textTertiary: '#999999',
  
  primary: '#FF6B35',
  primaryContainer: '#fff5f2',
  onPrimary: '#ffffff',
  onPrimaryContainer: '#FF6B35',
  
  secondary: '#2D5016',
  secondaryContainer: '#f0f8e8',
  onSecondary: '#ffffff',
  onSecondaryContainer: '#2D5016',
  
  success: '#28a745',
  warning: '#FFB800',
  error: '#dc3545',
  info: '#17a2b8',
  
  border: '#e0e0e0',
  divider: '#f0f0f0',
  
  shadow: '#000000',
  
  card: '#ffffff',
  overlay: 'rgba(0, 0, 0, 0.5)',
};

const darkTheme: ThemeColors = {
  background: '#121212',
  surface: '#1e1e1e',
  surfaceVariant: '#2d2d2d',
  
  text: '#ffffff',
  textSecondary: '#b3b3b3',
  textTertiary: '#808080',
  
  primary: '#FF8A65',
  primaryContainer: '#3d1a0d',
  onPrimary: '#000000',
  onPrimaryContainer: '#FF8A65',
  
  secondary: '#81C784',
  secondaryContainer: '#1b2e0f',
  onSecondary: '#000000',
  onSecondaryContainer: '#81C784',
  
  success: '#4caf50',
  warning: '#ff9800',
  error: '#f44336',
  info: '#2196f3',
  
  border: '#404040',
  divider: '#2d2d2d',
  
  shadow: '#000000',
  
  card: '#1e1e1e',
  overlay: 'rgba(0, 0, 0, 0.7)',
};

interface ThemeContextType {
  themeMode: ThemeMode;
  isDark: boolean;
  colors: ThemeColors;
  shadows: {
    small: object;
    medium: object;
    large: object;
  };
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = '@theme_mode';

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [themeMode, setThemeModeState] = useState<ThemeMode>('system');
  const [systemColorScheme, setSystemColorScheme] = useState<ColorSchemeName>(
    Appearance.getColorScheme()
  );

  // Determine if dark mode should be active
  const isDark = themeMode === 'dark' || 
    (themeMode === 'system' && systemColorScheme === 'dark');

  // Get current theme colors
  const colors = isDark ? darkTheme : lightTheme;

  // Get theme-appropriate shadows
  const shadows = {
    small: {
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: isDark ? 0.3 : 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    medium: {
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDark ? 0.4 : 0.15,
      shadowRadius: 4,
      elevation: 4,
    },
    large: {
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: isDark ? 0.5 : 0.2,
      shadowRadius: 8,
      elevation: 8,
    },
  };

  // Load saved theme preference
  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
          setThemeModeState(savedTheme as ThemeMode);
        }
      } catch (error) {
        console.error('Failed to load theme preference:', error);
      }
    };

    loadThemePreference();
  }, []);

  // Listen to system color scheme changes
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setSystemColorScheme(colorScheme);
    });

    return () => subscription?.remove();
  }, []);

  // Save theme preference
  const setThemeMode = async (mode: ThemeMode) => {
    try {
      setThemeModeState(mode);
      await AsyncStorage.setItem(THEME_STORAGE_KEY, mode);
    } catch (error) {
      console.error('Failed to save theme preference:', error);
    }
  };

  // Toggle between light and dark (skipping system)
  const toggleTheme = () => {
    const newMode = isDark ? 'light' : 'dark';
    setThemeMode(newMode);
  };

  const value: ThemeContextType = {
    themeMode,
    isDark,
    colors,
    shadows,
    setThemeMode,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}