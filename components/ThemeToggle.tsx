import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  AccessibilityInfo,
} from 'react-native';
import { Sun, Moon, Monitor } from 'lucide-react-native';
import { useTheme, ThemeMode } from '@/contexts/ThemeContext';

interface ThemeToggleProps {
  variant?: 'button' | 'segmented';
  showLabels?: boolean;
}

export function ThemeToggle({ variant = 'button', showLabels = true }: ThemeToggleProps) {
  const { themeMode, isDark, colors, setThemeMode, toggleTheme } = useTheme();

  const handleThemeChange = (mode: ThemeMode) => {
    setThemeMode(mode);
    
    // Announce theme change for screen readers
    const announcement = `Theme changed to ${mode === 'system' ? 'system default' : mode} mode`;
    AccessibilityInfo.announceForAccessibility(announcement);
  };

  if (variant === 'segmented') {
    return (
      <View style={[styles.segmentedContainer, { backgroundColor: colors.surfaceVariant }]}>
        {(['light', 'dark', 'system'] as ThemeMode[]).map((mode) => {
          const isSelected = themeMode === mode;
          const Icon = mode === 'light' ? Sun : mode === 'dark' ? Moon : Monitor;
          
          return (
            <TouchableOpacity
              key={mode}
              style={[
                styles.segmentedButton,
                isSelected && [
                  styles.segmentedButtonActive,
                  { backgroundColor: colors.primary }
                ]
              ]}
              onPress={() => handleThemeChange(mode)}
              accessibilityRole="button"
              accessibilityLabel={`Switch to ${mode} theme`}
              accessibilityState={{ selected: isSelected }}
              accessibilityHint={`Activates ${mode} theme mode`}
            >
              <Icon 
                size={18} 
                color={isSelected ? colors.onPrimary : colors.textSecondary} 
              />
              {showLabels && (
                <Text style={[
                  styles.segmentedButtonText,
                  { color: isSelected ? colors.onPrimary : colors.textSecondary }
                ]}>
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  return (
    <TouchableOpacity
      style={[
        styles.toggleButton,
        { 
          backgroundColor: colors.surface,
          borderColor: colors.border,
        }
      ]}
      onPress={toggleTheme}
      accessibilityRole="button"
      accessibilityLabel={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      accessibilityHint="Toggles between light and dark theme"
      accessibilityState={{ checked: isDark }}
    >
      <View style={[
        styles.toggleIndicator,
        { backgroundColor: colors.primary },
        isDark && styles.toggleIndicatorDark
      ]}>
        {isDark ? (
          <Moon size={16} color={colors.onPrimary} />
        ) : (
          <Sun size={16} color={colors.onPrimary} />
        )}
      </View>
      {showLabels && (
        <Text style={[styles.toggleLabel, { color: colors.text }]}>
          {isDark ? 'Dark' : 'Light'} Mode
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  // Segmented control styles
  segmentedContainer: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 4,
    gap: 2,
  },
  segmentedButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    gap: 6,
    minHeight: 44, // Minimum touch target size
  },
  segmentedButtonActive: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  segmentedButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
  
  // Toggle button styles
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
    minHeight: 44, // Minimum touch target size
  },
  toggleIndicator: {
    width: 32,
    height: 20,
    borderRadius: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleIndicatorDark: {
    alignItems: 'flex-end',
  },
  toggleLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
});