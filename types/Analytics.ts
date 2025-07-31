export interface PopularItem {
  id: string;
  name: string;
  orderCount: number;
  revenue: number;
}

export interface OrderStatusDistribution {
  status: string;
  count: number;
}

export interface HourlyData {
  hour: string;
  orders: number;
  revenue: number;
}

export interface AnalyticsData {
  totalRevenue: number;
  totalOrders: number;
  avgOrderTime: number;
  uniqueCustomers: number;
  revenueChange: number;
  ordersChange: number;
  timeImprovement: number;
  newCustomers: number;
  popularItems: PopularItem[];
  orderStatusDistribution: OrderStatusDistribution[];
  hourlyData: HourlyData[];
}