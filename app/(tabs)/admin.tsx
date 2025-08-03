
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Database,
  RefreshCw,
  Trash2,
  BarChart3,
  Users,
  ShoppingBag,
} from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

interface DatabaseStats {
  menuItems: number;
  categories: number;
  orders: number;
  totalRevenue: number;
}

export default function AdminScreen() {
  const { colors, shadows } = useTheme();
  const [stats, setStats] = useState<DatabaseStats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    setLoading(true);
    try {
      // In a real app, you'd fetch this from your API
      // For demo purposes, we'll simulate the data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStats({
        menuItems: 42,
        categories: 9,
        orders: 127,
        totalRevenue: 12450.75,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
      Alert.alert('Error', 'Failed to load database statistics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const refreshDatabase = () => {
    Alert.alert(
      'Refresh Database',
      'This will reload all data from the database. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Refresh', onPress: fetchStats },
      ]
    );
  };

  const backupDatabase = () => {
    Alert.alert(
      'Backup Database',
      'Create a backup of the current database?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Backup',
          onPress: () => {
            // Simulate backup process
            Alert.alert('Success', 'Database backup created successfully!');
          },
        },
      ]
    );
  };

  const clearOrders = () => {
    Alert.alert(
      'Clear Orders',
      'This will delete all orders from the database. This action cannot be undone!',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: () => {
            // Simulate clearing orders
            Alert.alert('Success', 'All orders have been cleared!');
            fetchStats();
          },
        },
      ]
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      backgroundColor: colors.surface,
    },
    title: {
      fontSize: 24,
      fontWeight: '700',
      color: colors.text,
      textAlign: 'center',
    },
    content: {
      flex: 1,
      padding: 20,
    },
    statsContainer: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 16,
    },
    statsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
    },
    statCard: {
      flex: 1,
      minWidth: '45%',
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
      ...shadows.medium,
    },
    statIcon: {
      marginBottom: 8,
    },
    statValue: {
      fontSize: 24,
      fontWeight: '700',
      color: '#FF6B35',
      marginBottom: 4,
    },
    statLabel: {
      fontSize: 14,
      color: colors.textSecondary,
      textAlign: 'center',
    },
    actionsContainer: {
      marginTop: 24,
    },
    actionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      ...shadows.small,
    },
    actionIcon: {
      marginRight: 12,
    },
    actionText: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      flex: 1,
    },
    dangerButton: {
      backgroundColor: '#FFF5F5',
    },
    dangerText: {
      color: '#E53E3E',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingText: {
      marginTop: 12,
      fontSize: 16,
      color: colors.textSecondary,
    },
  });

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Database Admin</Text>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF6B35" />
          <Text style={styles.loadingText}>Loading database statistics...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Database Admin</Text>
      </View>

      <ScrollView style={styles.content}>
        {stats && (
          <View style={styles.statsContainer}>
            <Text style={styles.sectionTitle}>Database Statistics</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <ShoppingBag size={32} color="#FF6B35" style={styles.statIcon} />
                <Text style={styles.statValue}>{stats.menuItems}</Text>
                <Text style={styles.statLabel}>Menu Items</Text>
              </View>

              <View style={styles.statCard}>
                <Database size={32} color="#10B981" style={styles.statIcon} />
                <Text style={styles.statValue}>{stats.categories}</Text>
                <Text style={styles.statLabel}>Categories</Text>
              </View>

              <View style={styles.statCard}>
                <Users size={32} color="#3B82F6" style={styles.statIcon} />
                <Text style={styles.statValue}>{stats.orders}</Text>
                <Text style={styles.statLabel}>Total Orders</Text>
              </View>

              <View style={styles.statCard}>
                <BarChart3 size={32} color="#8B5CF6" style={styles.statIcon} />
                <Text style={styles.statValue}>₹{stats.totalRevenue.toFixed(2)}</Text>
                <Text style={styles.statLabel}>Total Revenue</Text>
              </View>
            </View>
          </View>
        )}

        <View style={styles.actionsContainer}>
          <Text style={styles.sectionTitle}>Database Actions</Text>

          <TouchableOpacity style={styles.actionButton} onPress={refreshDatabase}>
            <RefreshCw size={24} color="#10B981" style={styles.actionIcon} />
            <Text style={styles.actionText}>Refresh Database</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={backupDatabase}>
            <Database size={24} color="#3B82F6" style={styles.actionIcon} />
            <Text style={styles.actionText}>Create Backup</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionButton, styles.dangerButton]} 
            onPress={clearOrders}
          >
            <Trash2 size={24} color="#E53E3E" style={styles.actionIcon} />
            <Text style={[styles.actionText, styles.dangerText]}>Clear All Orders</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
