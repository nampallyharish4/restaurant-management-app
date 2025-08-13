import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Database types
export interface Database {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          user_id: string;
          role: 'owner' | 'waiter' | 'chef';
          full_name: string | null;
          created_at: string;
        };
        Insert: {
          user_id: string;
          role: 'owner' | 'waiter' | 'chef';
          full_name?: string | null;
          created_at?: string;
        };
        Update: {
          user_id?: string;
          role?: 'owner' | 'waiter' | 'chef';
          full_name?: string | null;
          created_at?: string;
        };
      };
      menu_categories: {
        Row: {
          id: number;
          name: string;
          created_by: string | null;
          created_at: string;
        };
        Insert: {
          name: string;
          created_by?: string | null;
          created_at?: string;
        };
        Update: {
          id?: number;
          name?: string;
          created_by?: string | null;
          created_at?: string;
        };
      };
      menu_items: {
        Row: {
          id: number;
          category_id: number;
          name: string;
          description: string | null;
          price: number;
          is_available: boolean;
          created_by: string | null;
          updated_at: string;
        };
        Insert: {
          category_id: number;
          name: string;
          description?: string | null;
          price: number;
          is_available?: boolean;
          created_by?: string | null;
          updated_at?: string;
        };
        Update: {
          id?: number;
          category_id?: number;
          name?: string;
          description?: string | null;
          price?: number;
          is_available?: boolean;
          created_by?: string | null;
          updated_at?: string;
        };
      };
      orders: {
        Row: {
          id: number;
          table_number: number;
          status: 'pending' | 'in_kitchen' | 'ready' | 'served' | 'canceled';
          placed_by: string | null;
          created_at: string;
        };
        Insert: {
          table_number: number;
          status?: 'pending' | 'in_kitchen' | 'ready' | 'served' | 'canceled';
          placed_by?: string | null;
          created_at?: string;
        };
        Update: {
          id?: number;
          table_number?: number;
          status?: 'pending' | 'in_kitchen' | 'ready' | 'served' | 'canceled';
          placed_by?: string | null;
          created_at?: string;
        };
      };
      order_items: {
        Row: {
          id: number;
          order_id: number;
          menu_item_id: number;
          quantity: number;
          notes: string | null;
        };
        Insert: {
          order_id: number;
          menu_item_id: number;
          quantity: number;
          notes?: string | null;
        };
        Update: {
          id?: number;
          order_id?: number;
          menu_item_id?: number;
          quantity?: number;
          notes?: string | null;
        };
      };
    };
    Functions: {
      current_role: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
    };
  };
}

export type UserRole = 'owner' | 'waiter' | 'chef';