import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { UserRole } from '@/lib/supabase';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: UserRole[];
  fallbackPath?: string;
}

export function ProtectedRoute({ 
  children, 
  requiredRoles,
  fallbackPath = '/auth/signin' 
}: ProtectedRouteProps) {
  const { user, userProfile, loading, hasRole } = useAuth();
  const { colors } = useTheme();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace(fallbackPath);
        return;
      }

      if (requiredRoles && !hasRole(requiredRoles)) {
        router.replace('/(tabs)');
        return;
      }
    }
  }, [user, userProfile, loading, requiredRoles, fallbackPath, hasRole]);

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[styles.loadingText, { color: colors.textSecondary }]}>
          Loading...
        </Text>
      </View>
    );
  }

  if (!user) {
    return null;
  }

  if (requiredRoles && !hasRole(requiredRoles)) {
    return (
      <View style={[styles.accessDeniedContainer, { backgroundColor: colors.background }]}>
        <Text style={[styles.accessDeniedTitle, { color: colors.text }]}>
          Access Denied
        </Text>
        <Text style={[styles.accessDeniedText, { color: colors.textSecondary }]}>
          You don't have permission to access this area.
        </Text>
      </View>
    );
  }

  return <>{children}</>;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  accessDeniedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  accessDeniedTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  accessDeniedText: {
    fontSize: 16,
    textAlign: 'center',
  },
});