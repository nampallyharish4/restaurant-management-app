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
  price: number;
  category: string;
  available: boolean;
  preparationTime: number;
  ingredients?: string[];
  allergens?: string[];
}
