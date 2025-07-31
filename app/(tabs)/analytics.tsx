import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TrendingUp, DollarSign, Clock, Users } from 'lucide-react-native';
import { AnalyticsService } from '@/services/AnalyticsService';
import { AnalyticsData } from '@/types/Analytics';

export default function AnalyticsScreen() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const data = await AnalyticsService.getDailyAnalytics();
      setAnalytics(data);
    } catch (error) {
      console.error('Failed to load analytics:', error);
    }
  };

  if (!analytics) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading analytics...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Analytics</Text>
        <Text style={styles.subtitle}>Today's Performance</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.metricsGrid}>
          <View style={styles.metricCard}>
            <View style={styles.metricIcon}>
              <DollarSign size={24} color="#2D5016" />
            </View>
            <Text style={styles.metricValue}>
              ₹{analytics.totalRevenue.toFixed(0)}
            </Text>
            <Text style={styles.metricLabel}>Total Revenue</Text>
            <Text style={[styles.metricChange, { color: '#2D5016' }]}>
              +{analytics.revenueChange}% from yesterday
            </Text>
          </View>

          <View style={styles.metricCard}>
            <View style={styles.metricIcon}>
              <TrendingUp size={24} color="#FF6B35" />
            </View>
            <Text style={styles.metricValue}>{analytics.totalOrders}</Text>
            <Text style={styles.metricLabel}>Total Orders</Text>
            <Text style={[styles.metricChange, { color: '#FF6B35' }]}>
              +{analytics.ordersChange}% from yesterday
            </Text>
          </View>

          <View style={styles.metricCard}>
            <View style={styles.metricIcon}>
              <Clock size={24} color="#FFB800" />
            </View>
            <Text style={styles.metricValue}>{analytics.avgOrderTime}m</Text>
            <Text style={styles.metricLabel}>Avg Order Time</Text>
            <Text style={[styles.metricChange, { color: '#2D5016' }]}>
              -{analytics.timeImprovement}m faster
            </Text>
          </View>

          <View style={styles.metricCard}>
            <View style={styles.metricIcon}>
              <Users size={24} color="#6B46C1" />
            </View>
            <Text style={styles.metricValue}>{analytics.uniqueCustomers}</Text>
            <Text style={styles.metricLabel}>Unique Customers</Text>
            <Text style={[styles.metricChange, { color: '#6B46C1' }]}>
              +{analytics.newCustomers} new today
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Items</Text>
          {analytics.popularItems.map((item, index) => (
            <View key={item.id} style={styles.popularItem}>
              <View style={styles.itemRank}>
                <Text style={styles.rankNumber}>{index + 1}</Text>
              </View>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemSales}>{item.orderCount} orders</Text>
              </View>
              <Text style={styles.itemRevenue}>₹{item.revenue.toFixed(0)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Status Distribution</Text>
          <View style={styles.statusGrid}>
            {analytics.orderStatusDistribution.map((status) => (
              <View key={status.status} style={styles.statusCard}>
                <Text style={styles.statusCount}>{status.count}</Text>
                <Text style={styles.statusLabel}>{status.status}</Text>
                <Text style={styles.statusPercentage}>
                  {((status.count / analytics.totalOrders) * 100).toFixed(1)}%
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hourly Performance</Text>
          <View style={styles.hourlyChart}>
            {analytics.hourlyData.map((hour) => (
              <View key={hour.hour} style={styles.hourlyBar}>
                <View
                  style={[
                    styles.barFill,
                    {
                      height: `${
                        (hour.orders /
                          Math.max(
                            ...analytics.hourlyData.map((h) => h.orders)
                          )) *
                        100
                      }%`,
                    },
                  ]}
                />
                <Text style={styles.hourLabel}>{hour.hour}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 20,
  },
  metricCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  metricIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  metricChange: {
    fontSize: 12,
    fontWeight: '600',
  },
  section: {
    marginTop: 24,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  popularItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  itemRank: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rankNumber: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  itemSales: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  itemRevenue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D5016',
  },
  statusGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statusCard: {
    flex: 1,
    minWidth: '22%',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  statusCount: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  statusLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    textTransform: 'capitalize',
  },
  statusPercentage: {
    fontSize: 12,
    color: '#FF6B35',
    fontWeight: '600',
    marginTop: 2,
  },
  hourlyChart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 120,
    gap: 8,
  },
  hourlyBar: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
    justifyContent: 'flex-end',
  },
  barFill: {
    width: '100%',
    backgroundColor: '#FF6B35',
    borderRadius: 2,
    minHeight: 4,
  },
  hourLabel: {
    fontSize: 10,
    color: '#666',
    marginTop: 8,
  },
});
