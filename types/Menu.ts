export type MenuItem = {
  id: number;
  name: string;
  category: string;
  fullPrice: number;
  image: string;
  description: string;
  isVeg: boolean;
  halfPrice?: number;
};

export type MenuCategory = {
  id: string;
  name: string;
  sortOrder?: number;
};

export interface CreateMenuItemData {
  name: string;
  description: string;
  category: string;
  price: number;
  available: boolean;
  preparationTime: number;
}

export interface MenuCategory {
  id: string;
  name: string;
  sortOrder: number;
}