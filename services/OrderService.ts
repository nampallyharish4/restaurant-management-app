import { Order, CreateOrderData, OrderStatus } from '@/types/Order';

export class OrderService {
  private static orders: Order[] = [];

  static async getAllOrders(): Promise<Order[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return [...this.orders].sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  static async getOrderById(id: string): Promise<Order | null> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return this.orders.find((order) => order.id === id) || null;
  }

  static async createOrder(data: CreateOrderData): Promise<Order> {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const newOrder: Order = {
      id: Date.now().toString(),
      orderNumber: `#${String(this.orders.length + 1).padStart(3, '0')}`,
      customerName: data.customerName,
      customerPhone: data.customerPhone,
      items: data.items.map((item, index) => ({
        ...item,
        id: `${Date.now()}-${index}`,
      })),
      total: data.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ),
      status: 'new',
      createdAt: new Date(),
      notes: data.notes,
      orderType: data.orderType,
      tableNumber: data.tableNumber,
    };

    this.orders.unshift(newOrder);
    return newOrder;
  }

  static async updateOrderStatus(
    id: string,
    status: OrderStatus
  ): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 200));

    const order = this.orders.find((o) => o.id === id);
    if (order) {
      order.status = status;
    }
  }

  static async deleteOrder(id: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    this.orders = this.orders.filter((order) => order.id !== id);
  }
}
