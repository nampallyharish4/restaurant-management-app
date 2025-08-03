
import Database from 'better-sqlite3';
import { MenuItem } from '@/types/Menu';
import { Order, OrderItem } from '@/types/Order';

interface DBMenuItem extends Omit<MenuItem, 'id'> {
  id: string;
  available: boolean;
  preparationTime: number;
  createdAt: string;
  updatedAt: string;
}

interface DBOrder extends Omit<Order, 'id' | 'createdAt'> {
  id: string;
  createdAt: string;
  updatedAt: string;
}

interface DBOrderItem extends OrderItem {
  orderId: string;
}

export class DatabaseService {
  private static db: Database.Database | null = null;

  static initialize() {
    if (this.db) return;

    try {
      this.db = new Database('restaurant.db');
      this.createTables();
      this.seedInitialData();
      console.log('Database initialized successfully');
    } catch (error) {
      console.error('Failed to initialize database:', error);
      throw error;
    }
  }

  private static createTables() {
    if (!this.db) throw new Error('Database not initialized');

    // Menu items table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS menu_items (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        category TEXT NOT NULL,
        fullPrice REAL NOT NULL,
        halfPrice REAL,
        image TEXT,
        isVeg BOOLEAN NOT NULL DEFAULT 0,
        available BOOLEAN NOT NULL DEFAULT 1,
        preparationTime INTEGER NOT NULL DEFAULT 15,
        createdAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Orders table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS orders (
        id TEXT PRIMARY KEY,
        orderNumber TEXT NOT NULL UNIQUE,
        customerName TEXT NOT NULL,
        customerPhone TEXT,
        total REAL NOT NULL,
        status TEXT NOT NULL DEFAULT 'new',
        orderType TEXT NOT NULL,
        tableNumber TEXT,
        notes TEXT,
        createdAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Order items table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS order_items (
        id TEXT PRIMARY KEY,
        orderId TEXT NOT NULL,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        quantity INTEGER NOT NULL,
        specialInstructions TEXT,
        FOREIGN KEY (orderId) REFERENCES orders (id) ON DELETE CASCADE
      )
    `);

    // Categories table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS categories (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL UNIQUE,
        sortOrder INTEGER NOT NULL DEFAULT 0,
        createdAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }

  private static seedInitialData() {
    if (!this.db) return;

    // Check if data already exists
    const menuCount = this.db.prepare('SELECT COUNT(*) as count FROM menu_items').get() as { count: number };
    if (menuCount.count > 0) return;

    // Import menu data
    const { menuData, menuCategories } = require('@/data/menuData');

    // Insert categories
    const insertCategory = this.db.prepare(`
      INSERT OR IGNORE INTO categories (id, name, sortOrder)
      VALUES (?, ?, ?)
    `);

    menuCategories.forEach((category: string, index: number) => {
      insertCategory.run(
        category.toLowerCase().replace(/\s+/g, '-'),
        category,
        index
      );
    });

    // Insert menu items
    const insertMenuItem = this.db.prepare(`
      INSERT INTO menu_items (
        id, name, description, category, fullPrice, halfPrice, 
        image, isVeg, available, preparationTime
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    menuData.forEach((item: MenuItem) => {
      insertMenuItem.run(
        item.id.toString(),
        item.name,
        item.description,
        item.category,
        item.fullPrice,
        item.halfPrice || null,
        item.image,
        item.isVeg ? 1 : 0,
        1, // available
        15 // default preparation time
      );
    });

    console.log('Initial data seeded successfully');
  }

  // Menu Items Methods
  static getAllMenuItems(): DBMenuItem[] {
    if (!this.db) throw new Error('Database not initialized');
    
    const stmt = this.db.prepare(`
      SELECT * FROM menu_items ORDER BY category, name
    `);
    return stmt.all() as DBMenuItem[];
  }

  static getMenuItemsByCategory(category: string): DBMenuItem[] {
    if (!this.db) throw new Error('Database not initialized');
    
    const stmt = this.db.prepare(`
      SELECT * FROM menu_items WHERE category = ? ORDER BY name
    `);
    return stmt.all(category) as DBMenuItem[];
  }

  static createMenuItem(data: Omit<DBMenuItem, 'id' | 'createdAt' | 'updatedAt'>): DBMenuItem {
    if (!this.db) throw new Error('Database not initialized');
    
    const id = Date.now().toString();
    const now = new Date().toISOString();
    
    const stmt = this.db.prepare(`
      INSERT INTO menu_items (
        id, name, description, category, fullPrice, halfPrice,
        image, isVeg, available, preparationTime, createdAt, updatedAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    stmt.run(
      id, data.name, data.description, data.category, data.fullPrice,
      data.halfPrice || null, data.image, data.isVeg ? 1 : 0,
      data.available ? 1 : 0, data.preparationTime, now, now
    );
    
    return this.getMenuItemById(id)!;
  }

  static getMenuItemById(id: string): DBMenuItem | null {
    if (!this.db) throw new Error('Database not initialized');
    
    const stmt = this.db.prepare('SELECT * FROM menu_items WHERE id = ?');
    return (stmt.get(id) as DBMenuItem) || null;
  }

  static updateMenuItem(id: string, data: Partial<Omit<DBMenuItem, 'id' | 'createdAt' | 'updatedAt'>>): DBMenuItem {
    if (!this.db) throw new Error('Database not initialized');
    
    const updates: string[] = [];
    const values: any[] = [];
    
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'isVeg' || key === 'available') {
        updates.push(`${key} = ?`);
        values.push(value ? 1 : 0);
      } else {
        updates.push(`${key} = ?`);
        values.push(value);
      }
    });
    
    updates.push('updatedAt = ?');
    values.push(new Date().toISOString());
    values.push(id);
    
    const stmt = this.db.prepare(`
      UPDATE menu_items SET ${updates.join(', ')} WHERE id = ?
    `);
    stmt.run(...values);
    
    return this.getMenuItemById(id)!;
  }

  static deleteMenuItem(id: string): void {
    if (!this.db) throw new Error('Database not initialized');
    
    const stmt = this.db.prepare('DELETE FROM menu_items WHERE id = ?');
    stmt.run(id);
  }

  // Orders Methods
  static getAllOrders(): DBOrder[] {
    if (!this.db) throw new Error('Database not initialized');
    
    const stmt = this.db.prepare(`
      SELECT * FROM orders ORDER BY createdAt DESC
    `);
    return stmt.all() as DBOrder[];
  }

  static getOrderById(id: string): (DBOrder & { items: DBOrderItem[] }) | null {
    if (!this.db) throw new Error('Database not initialized');
    
    const orderStmt = this.db.prepare('SELECT * FROM orders WHERE id = ?');
    const order = orderStmt.get(id) as DBOrder;
    
    if (!order) return null;
    
    const itemsStmt = this.db.prepare('SELECT * FROM order_items WHERE orderId = ?');
    const items = itemsStmt.all(id) as DBOrderItem[];
    
    return { ...order, items };
  }

  static createOrder(data: {
    customerName: string;
    customerPhone?: string;
    items: Omit<OrderItem, 'id'>[];
    notes?: string;
    orderType: 'dine-in' | 'takeout' | 'delivery';
    tableNumber?: string;
  }): DBOrder & { items: DBOrderItem[] } {
    if (!this.db) throw new Error('Database not initialized');
    
    const orderId = Date.now().toString();
    const orderNumber = `#${String(this.getAllOrders().length + 1).padStart(3, '0')}`;
    const total = data.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const now = new Date().toISOString();
    
    // Insert order
    const orderStmt = this.db.prepare(`
      INSERT INTO orders (
        id, orderNumber, customerName, customerPhone, total,
        status, orderType, tableNumber, notes, createdAt, updatedAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    orderStmt.run(
      orderId, orderNumber, data.customerName, data.customerPhone || null,
      total, 'new', data.orderType, data.tableNumber || null,
      data.notes || null, now, now
    );
    
    // Insert order items
    const itemStmt = this.db.prepare(`
      INSERT INTO order_items (id, orderId, name, price, quantity, specialInstructions)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    
    const items: DBOrderItem[] = data.items.map((item, index) => {
      const itemId = `${orderId}-${index}`;
      itemStmt.run(
        itemId, orderId, item.name, item.price,
        item.quantity, item.specialInstructions || null
      );
      
      return {
        id: itemId,
        orderId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        specialInstructions: item.specialInstructions
      };
    });
    
    return {
      id: orderId,
      orderNumber,
      customerName: data.customerName,
      customerPhone: data.customerPhone,
      total,
      status: 'new' as const,
      orderType: data.orderType,
      tableNumber: data.tableNumber,
      notes: data.notes,
      createdAt: now,
      updatedAt: now,
      items
    };
  }

  static updateOrderStatus(id: string, status: string): void {
    if (!this.db) throw new Error('Database not initialized');
    
    const stmt = this.db.prepare(`
      UPDATE orders SET status = ?, updatedAt = ? WHERE id = ?
    `);
    stmt.run(status, new Date().toISOString(), id);
  }

  static deleteOrder(id: string): void {
    if (!this.db) throw new Error('Database not initialized');
    
    const stmt = this.db.prepare('DELETE FROM orders WHERE id = ?');
    stmt.run(id);
  }

  static getCategories(): { id: string; name: string; sortOrder: number }[] {
    if (!this.db) throw new Error('Database not initialized');
    
    const stmt = this.db.prepare('SELECT * FROM categories ORDER BY sortOrder');
    return stmt.all() as { id: string; name: string; sortOrder: number }[];
  }

  static close() {
    if (this.db) {
      this.db.close();
      this.db = null;
    }
  }
}
