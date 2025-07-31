export type OrderStatus = 'new' | 'preparing' | 'ready' | 'completed';

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  specialInstructions?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone?: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: Date;
  estimatedReadyTime?: Date;
  notes?: string;
  orderType: 'dine-in' | 'takeout' | 'delivery';
  tableNumber?: string;
}

export interface CreateOrderData {
  customerName: string;
  customerPhone?: string;
  items: Omit<OrderItem, 'id'>[];
  notes?: string;
  orderType: 'dine-in' | 'takeout' | 'delivery';
  tableNumber?: string;
}