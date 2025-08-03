import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Clock,
  User,
  DollarSign,
  Plus,
  ShoppingCart,
} from 'lucide-react-native';
import { OrderCard } from '@/components/OrderCard';
import { CreateOrderModal } from '@/components/CreateOrderModal';
import { OrderService } from '@/services/OrderService';
import { Order, OrderStatus } from '@/types/Order';
import { useTheme } from '@/hooks/useTheme';

export default function OrdersScreen() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | 'all'>(
    'all'
  );
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { colors, shadows } = useTheme();

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const orderData = await OrderService.getAllOrders();
      setOrders(orderData);
    } catch (error) {
      Alert.alert('Error', 'Failed to load orders');
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadOrders();
    setRefreshing(false);
  };

  const handleStatusUpdate = async (
    orderId: string,
    newStatus: OrderStatus
  ) => {
    try {
      await OrderService.updateOrderStatus(orderId, newStatus);
      await loadOrders();
    } catch (error) {
      Alert.alert('Error', 'Failed to update order status');
    }
  };

  const handleCreateOrder = async (orderData: any) => {
    try {
      await OrderService.createOrder(orderData);
      setShowCreateModal(false);
      await loadOrders();
    } catch (error) {
      Alert.alert('Error', 'Failed to create order');
    }
  };

  const filteredOrders =
    selectedStatus === 'all'
      ? orders
      : orders.filter((order) => order.status === selectedStatus);

  const statusFilters = [
    { key: 'all', label: 'All', color: '#666' },
    { key: 'new', label: 'New', color: '#FF6B35' },
    { key: 'preparing', label: 'Preparing', color: '#FFB800' },
    { key: 'ready', label: 'Ready', color: '#2D5016' },
    { key: 'completed', label: 'Completed', color: '#888' },
  ];

  const todayStats = {
    totalOrders: orders.length,
    revenue: orders.reduce((sum, order) => sum + order.total, 0),
    avgOrderTime: 18,
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <Text style={[styles.title, { color: colors.text }]}>Order Management</Text>
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: colors.primary }]}
          onPress={() => setShowCreateModal(true)}
        >
          <Plus size={24} color={colors.card} />
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <View style={[styles.statCard, { backgroundColor: colors.card }, shadows.small]}>
          <View style={[styles.statIcon, { backgroundColor: colors.primaryContainer }]}>
            <ShoppingCart size={20} color={colors.primary} />
          </View>
          <Text style={[styles.statValue, { color: colors.text }]}>{todayStats.totalOrders}</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Orders Today</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.card }, shadows.small]}>
          <View style={[styles.statIcon, { backgroundColor: colors.secondaryContainer }]}>
            <DollarSign size={20} color={colors.secondary} />
          </View>
          <Text style={[styles.statValue, { color: colors.text }]}>₹{todayStats.revenue.toFixed(0)}</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Revenue</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.card }, shadows.small]}>
          <View style={[styles.statIcon, { backgroundColor: colors.primaryContainer }]}>
            <Clock size={20} color={colors.warning} />
          </View>
          <Text style={[styles.statValue, { color: colors.text }]}>{todayStats.avgOrderTime}m</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Avg Time</Text>
        </View>
      </View>

      <View style={styles.filtersContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={statusFilters}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.filterButton,
                { backgroundColor: colors.card, borderColor: colors.border },
                selectedStatus === item.key && [styles.filterButtonActive, { borderColor: colors.primary, backgroundColor: colors.primaryContainer }],
              ]}
              onPress={() => setSelectedStatus(item.key as OrderStatus | 'all')}
            >
              <Text
                style={[
                  styles.filterText,
                  { color: selectedStatus === item.key ? colors.primary : colors.textSecondary },
                  selectedStatus === item.key && styles.filterTextActive,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <FlatList
        data={filteredOrders}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <OrderCard order={item} onStatusUpdate={handleStatusUpdate} />
        )}
        contentContainerStyle={styles.ordersList}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <ShoppingCart size={48} color="#ccc" />
            <Text style={styles.emptyText}>No orders found</Text>
            <Text style={styles.emptySubtext}>
              Orders will appear here when they're placed
            </Text>
          </View>
        }
      />

      <CreateOrderModal
        visible={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateOrder}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  filtersContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  filterButtonActive: {
    borderWidth: 2,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
  },
  filterTextActive: {
    fontWeight: '600',
  },
  ordersList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
    textAlign: 'center',
  },
});