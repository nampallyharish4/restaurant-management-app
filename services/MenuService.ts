
import { MenuItem, MenuCategory, CreateMenuItemData } from '@/types/Menu';
import { DatabaseService } from './DatabaseService';

export class MenuService {
  static async getAllMenuItems(): Promise<MenuItem[]> {
    try {
      DatabaseService.initialize();
      const dbItems = DatabaseService.getAllMenuItems();
      
      return dbItems.map(item => ({
        id: parseInt(item.id),
        name: item.name,
        category: item.category,
        fullPrice: item.fullPrice,
        halfPrice: item.halfPrice || undefined,
        image: item.image,
        description: item.description,
        isVeg: Boolean(item.isVeg)
      }));
    } catch (error) {
      console.error('Error fetching menu items:', error);
      return [];
    }
  }

  static async getCategories(): Promise<MenuCategory[]> {
    try {
      DatabaseService.initialize();
      const categories = DatabaseService.getCategories();
      
      return categories.map(cat => ({
        id: cat.id,
        name: cat.name,
        sortOrder: cat.sortOrder
      }));
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  }

  static async getMenuItemsByCategory(categoryId: string): Promise<MenuItem[]> {
    try {
      DatabaseService.initialize();
      const dbItems = DatabaseService.getMenuItemsByCategory(categoryId);
      
      return dbItems.map(item => ({
        id: parseInt(item.id),
        name: item.name,
        category: item.category,
        fullPrice: item.fullPrice,
        halfPrice: item.halfPrice || undefined,
        image: item.image,
        description: item.description,
        isVeg: Boolean(item.isVeg)
      }));
    } catch (error) {
      console.error('Error fetching menu items by category:', error);
      return [];
    }
  }

  static async createMenuItem(data: CreateMenuItemData): Promise<MenuItem> {
    try {
      DatabaseService.initialize();
      
      const dbItem = DatabaseService.createMenuItem({
        name: data.name,
        description: data.description,
        category: data.category,
        fullPrice: data.price,
        halfPrice: undefined,
        image: '',
        isVeg: true,
        available: data.available,
        preparationTime: data.preparationTime
      });

      return {
        id: parseInt(dbItem.id),
        name: dbItem.name,
        category: dbItem.category,
        fullPrice: dbItem.fullPrice,
        halfPrice: dbItem.halfPrice || undefined,
        image: dbItem.image,
        description: dbItem.description,
        isVeg: Boolean(dbItem.isVeg)
      };
    } catch (error) {
      console.error('Error creating menu item:', error);
      throw error;
    }
  }

  static async updateMenuItem(
    id: string,
    data: Partial<CreateMenuItemData>
  ): Promise<MenuItem> {
    try {
      DatabaseService.initialize();
      
      const updateData: any = {};
      if (data.name) updateData.name = data.name;
      if (data.description) updateData.description = data.description;
      if (data.category) updateData.category = data.category;
      if (data.price) updateData.fullPrice = data.price;
      if (data.available !== undefined) updateData.available = data.available;
      if (data.preparationTime) updateData.preparationTime = data.preparationTime;
      
      const dbItem = DatabaseService.updateMenuItem(id, updateData);

      return {
        id: parseInt(dbItem.id),
        name: dbItem.name,
        category: dbItem.category,
        fullPrice: dbItem.fullPrice,
        halfPrice: dbItem.halfPrice || undefined,
        image: dbItem.image,
        description: dbItem.description,
        isVeg: Boolean(dbItem.isVeg)
      };
    } catch (error) {
      console.error('Error updating menu item:', error);
      throw error;
    }
  }

  static async deleteMenuItem(id: string): Promise<void> {
    try {
      DatabaseService.initialize();
      DatabaseService.deleteMenuItem(id);
    } catch (error) {
      console.error('Error deleting menu item:', error);
      throw error;
    }
  }

  static async toggleItemAvailability(id: string): Promise<MenuItem> {
    try {
      DatabaseService.initialize();
      const item = DatabaseService.getMenuItemById(id);
      if (!item) throw new Error('Menu item not found');

      const updated = DatabaseService.updateMenuItem(id, {
        available: !item.available
      });

      return {
        id: parseInt(updated.id),
        name: updated.name,
        category: updated.category,
        fullPrice: updated.fullPrice,
        halfPrice: updated.halfPrice || undefined,
        image: updated.image,
        description: updated.description,
        isVeg: Boolean(updated.isVeg)
      };
    } catch (error) {
      console.error('Error toggling item availability:', error);
      throw error;
    }
  }
}
