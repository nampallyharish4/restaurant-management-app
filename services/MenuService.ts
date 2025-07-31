import { MenuItem, MenuCategory, CreateMenuItemData } from '@/types/Menu';

export class MenuService {
  private static menuItems: MenuItem[] = [];
  private static categories: MenuCategory[] = [];

  static async getAllMenuItems(): Promise<MenuItem[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return [...this.menuItems];
  }

  static async getCategories(): Promise<MenuCategory[]> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return [...this.categories].sort((a, b) => a.sortOrder - b.sortOrder);
  }

  static async getMenuItemsByCategory(categoryId: string): Promise<MenuItem[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return this.menuItems.filter((item) => item.category === categoryId);
  }

  static async createMenuItem(data: CreateMenuItemData): Promise<MenuItem> {
    await new Promise((resolve) => setTimeout(resolve, 400));

    const newItem: MenuItem = {
      ...data,
      id: Date.now().toString(),
    };

    this.menuItems.push(newItem);
    return newItem;
  }

  static async updateMenuItem(
    id: string,
    data: Partial<CreateMenuItemData>
  ): Promise<MenuItem> {
    await new Promise((resolve) => setTimeout(resolve, 400));

    const index = this.menuItems.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error('Menu item not found');
    }

    this.menuItems[index] = { ...this.menuItems[index], ...data };
    return this.menuItems[index];
  }

  static async deleteMenuItem(id: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    this.menuItems = this.menuItems.filter((item) => item.id !== id);
  }

  static async toggleItemAvailability(id: string): Promise<MenuItem> {
    const item = this.menuItems.find((i) => i.id === id);
    if (!item) {
      throw new Error('Menu item not found');
    }

    item.available = !item.available;
    return item;
  }
}
