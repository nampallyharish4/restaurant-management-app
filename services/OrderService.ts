
import { Order, CreateOrderData, OrderStatus } from '@/types/Order';
import { DatabaseService } from './DatabaseService';

export class OrderService {
  static async getAllOrders(): Promise<Order[]> {
    try {
      DatabaseService.initialize();
      const dbOrders = DatabaseService.getAllOrders();
      
      return dbOrders.map(order => ({
        id: order.id,
        orderNumber: order.orderNumber,
        customerName: order.customerName,
        customerPhone: order.customerPhone || undefined,
        items: [], // Items will be loaded separately if needed
        total: order.total,
        status: order.status as OrderStatus,
        createdAt: new Date(order.createdAt),
        notes: order.notes || undefined,
        orderType: order.orderType as 'dine-in' | 'takeout' | 'delivery',
        tableNumber: order.tableNumber || undefined
      }));
    } catch (error) {
      console.error('Error fetching orders:', error);
      return [];
    }
  }

  static async getOrderById(id: string): Promise<Order | null> {
    try {
      DatabaseService.initialize();
      const dbOrder = DatabaseService.getOrderById(id);
      
      if (!dbOrder) return null;
      
      return {
        id: dbOrder.id,
        orderNumber: dbOrder.orderNumber,
        customerName: dbOrder.customerName,
        customerPhone: dbOrder.customerPhone || undefined,
        items: dbOrder.items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          specialInstructions: item.specialInstructions || undefined
        })),
        total: dbOrder.total,
        status: dbOrder.status as OrderStatus,
        createdAt: new Date(dbOrder.createdAt),
        notes: dbOrder.notes || undefined,
        orderType: dbOrder.orderType as 'dine-in' | 'takeout' | 'delivery',
        tableNumber: dbOrder.tableNumber || undefined
      };
    } catch (error) {
      console.error('Error fetching order:', error);
      return null;
    }
  }

  static async createOrder(data: CreateOrderData): Promise<Order> {
    try {
      DatabaseService.initialize();
      
      const dbOrder = DatabaseService.createOrder({
        customerName: data.customerName,
        customerPhone: data.customerPhone,
        items: data.items,
        notes: data.notes,
        orderType: data.orderType,
        tableNumber: data.tableNumber
      });

      return {
        id: dbOrder.id,
        orderNumber: dbOrder.orderNumber,
        customerName: dbOrder.customerName,
        customerPhone: dbOrder.customerPhone || undefined,
        items: dbOrder.items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          specialInstructions: item.specialInstructions || undefined
        })),
        total: dbOrder.total,
        status: dbOrder.status as OrderStatus,
        createdAt: new Date(dbOrder.createdAt),
        notes: dbOrder.notes || undefined,
        orderType: dbOrder.orderType as 'dine-in' | 'takeout' | 'delivery',
        tableNumber: dbOrder.tableNumber || undefined
      };
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }

  static async updateOrderStatus(
    id: string,
    status: OrderStatus
  ): Promise<void> {
    try {
      DatabaseService.initialize();
      DatabaseService.updateOrderStatus(id, status);
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  }

  static async deleteOrder(id: string): Promise<void> {
    try {
      DatabaseService.initialize();
      DatabaseService.deleteOrder(id);
    } catch (error) {
      console.error('Error deleting order:', error);
      throw error;
    }
  }
}
