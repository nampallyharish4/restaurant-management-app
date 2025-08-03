import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { X, Plus, Minus } from 'lucide-react-native';
import { MenuService } from '@/services/MenuService';
import { MenuItem } from '@/types/Menu';
import { OrderItem } from '@/types/Order';
import { useTheme } from '@/hooks/useTheme';

interface CreateOrderModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (orderData: CreateOrderData) => void;
}

interface OrderItem {
  menuItem: MenuItem;
  quantity: number;
  specialInstructions?: string;
}

export function CreateOrderModal({ visible, onClose, onSubmit }: CreateOrderModalProps) {
  const { colors, shadows } = useTheme();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [orderType, setOrderType] = useState<'dine-in' | 'takeout' | 'delivery'>('dine-in');
  const [tableNumber, setTableNumber] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (visible) {
      loadMenuItems();
    }
  }, [visible]);

  const loadMenuItems = async () => {
    try {
      const items = await MenuService.getAllMenuItems();
      setMenuItems(items.filter(item => item.available));
    } catch (error) {
      Alert.alert('Error', 'Failed to load menu items');
    }
  };

  const handleAddItem = (menuItem: MenuItem) => {
    const existingItem = orderItems.find(item => item.menuItem.id === menuItem.id);
    if (existingItem) {
      setOrderItems(orderItems.map(item =>
        item.menuItem.id === menuItem.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setOrderItems([...orderItems, { menuItem, quantity: 1 }]);
    }
  };

  const handleUpdateQuantity = (menuItemId: string, delta: number) => {
    setOrderItems(orderItems.map(item => {
      if (item.menuItem.id === menuItemId) {
        const newQuantity = Math.max(0, item.quantity + delta);
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
      }
      return item;
    }).filter(Boolean) as OrderItem[]);
  };

  const handleSubmit = () => {
    if (!customerName.trim()) {
      Alert.alert('Error', 'Please enter customer name');
      return;
    }

    if (orderItems.length === 0) {
      Alert.alert('Error', 'Please add at least one item');
      return;
    }

    if (orderType === 'dine-in' && !tableNumber.trim()) {
      Alert.alert('Error', 'Please enter table number for dine-in orders');
      return;
    }

    const orderData: CreateOrderData = {
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim() || undefined,
      items: orderItems.map(item => ({
        name: item.menuItem.name,
        price: item.menuItem.price,
        quantity: item.quantity,
        specialInstructions: item.specialInstructions,
      })),
      notes: notes.trim() || undefined,
      orderType,
      tableNumber: orderType === 'dine-in' ? tableNumber.trim() : undefined,
    };

    onSubmit(orderData);
    handleClose();
  };

  const handleClose = () => {
    setCustomerName('');
    setCustomerPhone('');
    setOrderType('dine-in');
    setTableNumber('');
    setNotes('');
    setOrderItems([]);
    onClose();
  };

  const total = orderItems.reduce((sum, item) => sum + (item.menuItem.price * item.quantity), 0);

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
          <Text style={[styles.title, { color: colors.text }]}>Create New Order</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <X size={24} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Customer Information</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
              placeholder="Customer Name *"
              placeholderTextColor={colors.textSecondary}
              value={customerName}
              onChangeText={setCustomerName}
            />
            <TextInput
              style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
              placeholder="Phone Number"
              placeholderTextColor={colors.textSecondary}
              value={customerPhone}
              onChangeText={setCustomerPhone}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Order Type</Text>
            <View style={styles.orderTypeContainer}>
              {(['dine-in', 'takeout', 'delivery'] as const).map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.orderTypeButton,
                    orderType === type && styles.orderTypeButtonActive
                  ]}
                  onPress={() => setOrderType(type)}
                >
                  <Text style={[
                    styles.orderTypeText,
                    orderType === type && styles.orderTypeTextActive
                  ]}>
                    {type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            {orderType === 'dine-in' && (
              <TextInput
                style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
                placeholder="Table Number *"
                placeholderTextColor={colors.textSecondary}
                value={tableNumber}
                onChangeText={setTableNumber}
              />
            )}
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Menu Items</Text>
            {menuItems.map((menuItem) => {
              const orderItem = orderItems.find(item => item.menuItem.id === menuItem.id);
              return (
                <View key={menuItem.id} style={[styles.menuItemCard, { backgroundColor: colors.card }, shadows.small]}>
                  <View style={styles.menuItemInfo}>
                    <Text style={[styles.menuItemName, { color: colors.text }]}>{menuItem.name}</Text>
                    <Text style={[styles.menuItemPrice, { color: colors.secondary }]}>₹{menuItem.fullPrice.toFixed(2)}</Text>
                  </View>
                  <View style={styles.quantityControls}>
                    {orderItem ? (
                      <>
                        <TouchableOpacity
                          style={[styles.quantityButton, { backgroundColor: colors.primaryContainer, borderColor: colors.primary }]}
                          onPress={() => handleUpdateQuantity(menuItem.id, -1)}
                        >
                          <Minus size={16} color={colors.primary} />
                        </TouchableOpacity>
                        <Text style={[styles.quantityText, { color: colors.text }]}>{orderItem.quantity}</Text>
                        <TouchableOpacity
                          style={[styles.quantityButton, { backgroundColor: colors.primaryContainer, borderColor: colors.primary }]}
                          onPress={() => handleUpdateQuantity(menuItem.id, 1)}
                        >
                          <Plus size={16} color={colors.primary} />
                        </TouchableOpacity>
                      </>
                    ) : (
                      <TouchableOpacity
                        style={[styles.addButton, { backgroundColor: colors.primary }]}
                        onPress={() => handleAddItem(menuItem)}
                      >
                        <Plus size={16} color={colors.onPrimary} />
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              );
            })}
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Special Instructions</Text>
            <TextInput
              style={[styles.input, styles.textArea, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
              placeholder="Any special instructions or notes..."
              placeholderTextColor={colors.textSecondary}
              value={notes}
              onChangeText={setNotes}
              multiline
              numberOfLines={3}
            />
          </View>
        </ScrollView>

        <View style={[styles.footer, { backgroundColor: colors.card, borderTopColor: colors.border }]}>
          <View style={styles.totalContainer}>
            <Text style={[styles.totalLabel, { color: colors.textSecondary }]}>Total: </Text>
            <Text style={[styles.totalAmount, { color: colors.secondary }]}>${total.toFixed(2)}</Text>
          </View>
          <TouchableOpacity
            style={[
              styles.submitButton, { backgroundColor: colors.primary },
              orderItems.length === 0 && styles.submitButtonDisabled
            ]}
            onPress={handleSubmit}
            disabled={orderItems.length === 0}
          >
            <Text style={[styles.submitButtonText, { color: colors.onPrimary }]}>Create Order</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  closeButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  orderTypeContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  orderTypeButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  orderTypeButtonActive: {
    borderColor: '#FF6B35',
    backgroundColor: '#fff5f2',
  },
  orderTypeText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  orderTypeTextActive: {
    color: '#FF6B35',
    fontWeight: '600',
  },
  menuItemCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  menuItemInfo: {
    flex: 1,
  },
  menuItemName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  menuItemPrice: {
    fontSize: 14,
    fontWeight: '600',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fff5f2',
    borderWidth: 1,
    borderColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    minWidth: 24,
    textAlign: 'center',
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 18,
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: '700',
  },
  submitButton: {
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#ccc',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});