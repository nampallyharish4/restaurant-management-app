import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Clock, User, MapPin } from 'lucide-react-native';
import { Order, OrderStatus } from '@/types/Order';

interface OrderCardProps {
  order: Order;
  onStatusUpdate: (orderId: string, newStatus: OrderStatus) => void;
}

export function OrderCard({ order, onStatusUpdate }: OrderCardProps) {
  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'new': return '#FF6B35';
      case 'preparing': return '#FFB800';
      case 'ready': return '#2D5016';
      case 'completed': return '#888';
      default: return '#666';
    }
  };

  const getNextStatus = (currentStatus: OrderStatus): OrderStatus | null => {
    switch (currentStatus) {
      case 'new': return 'preparing';
      case 'preparing': return 'ready';
      case 'ready': return 'completed';
      default: return null;
    }
  };

  const getStatusLabel = (status: OrderStatus) => {
    switch (status) {
      case 'new': return 'Accept Order';
      case 'preparing': return 'Mark Ready';
      case 'ready': return 'Complete';
      default: return 'Completed';
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffMinutes < 60) {
      return `${diffMinutes}m ago`;
    } else {
      const diffHours = Math.floor(diffMinutes / 60);
      return `${diffHours}h ${diffMinutes % 60}m ago`;
    }
  };

  const nextStatus = getNextStatus(order.status);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.orderInfo}>
          <Text style={styles.orderNumber}>{order.orderNumber}</Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) }]}>
            <Text style={styles.statusText}>{order.status.toUpperCase()}</Text>
          </View>
        </View>
        <Text style={styles.orderTime}>{formatTime(order.createdAt)}</Text>
      </View>

      <View style={styles.customerInfo}>
        <View style={styles.customerDetail}>
          <User size={16} color="#666" />
          <Text style={styles.customerText}>{order.customerName}</Text>
        </View>
        {order.tableNumber && (
          <View style={styles.customerDetail}>
            <MapPin size={16} color="#666" />
            <Text style={styles.customerText}>Table {order.tableNumber}</Text>
          </View>
        )}
        <View style={styles.customerDetail}>
          <Text style={styles.orderType}>{order.orderType.toUpperCase()}</Text>
        </View>
      </View>

      <View style={styles.itemsList}>
        {order.items.map((item, index) => (
          <View key={index} style={styles.item}>
            <Text style={styles.itemQuantity}>{item.quantity}x</Text>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
          </View>
        ))}
      </View>

      {order.notes && (
        <View style={styles.notesContainer}>
          <Text style={styles.notesLabel}>Notes:</Text>
          <Text style={styles.notesText}>{order.notes}</Text>
        </View>
      )}

      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalAmount}>${order.total.toFixed(2)}</Text>
        </View>
        {nextStatus && (
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: getStatusColor(nextStatus) }]}
            onPress={() => onStatusUpdate(order.id, nextStatus)}
          >
            <Text style={styles.actionButtonText}>{getStatusLabel(order.status)}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  orderNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#fff',
  },
  orderTime: {
    fontSize: 12,
    color: '#666',
  },
  customerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 12,
    flexWrap: 'wrap',
  },
  customerDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  customerText: {
    fontSize: 14,
    color: '#666',
  },
  orderType: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FF6B35',
    backgroundColor: '#fff5f2',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  itemsList: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 12,
    marginBottom: 12,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  itemQuantity: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF6B35',
    width: 32,
  },
  itemName: {
    flex: 1,
    fontSize: 14,
    color: '#1a1a1a',
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D5016',
  },
  notesContainer: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  notesLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginBottom: 4,
  },
  notesText: {
    fontSize: 14,
    color: '#1a1a1a',
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  totalLabel: {
    fontSize: 16,
    color: '#666',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2D5016',
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
});