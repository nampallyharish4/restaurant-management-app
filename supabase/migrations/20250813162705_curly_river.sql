/*
  # Restaurant Management System Schema

  1. New Tables
    - `user_profiles`
      - `user_id` (uuid, primary key, references auth.users)
      - `role` (text, check constraint for owner/waiter/chef)
      - `full_name` (text)
      - `created_at` (timestamptz)
    
    - `menu_categories`
      - `id` (bigserial, primary key)
      - `name` (text, unique)
      - `created_by` (uuid, references auth.users)
      - `created_at` (timestamptz)
    
    - `menu_items`
      - `id` (bigserial, primary key)
      - `category_id` (bigint, references menu_categories)
      - `name` (text)
      - `description` (text)
      - `price` (numeric)
      - `is_available` (boolean)
      - `created_by` (uuid, references auth.users)
      - `updated_at` (timestamptz)
    
    - `orders`
      - `id` (bigserial, primary key)
      - `table_number` (int)
      - `status` (order_status enum)
      - `placed_by` (uuid, references auth.users)
      - `created_at` (timestamptz)
    
    - `order_items`
      - `id` (bigserial, primary key)
      - `order_id` (bigint, references orders)
      - `menu_item_id` (bigint, references menu_items)
      - `quantity` (int)
      - `notes` (text)

  2. Security
    - Enable RLS on all tables
    - Add role-based policies for owner, waiter, and chef roles
    - Create helper function to get current user role from JWT

  3. Functions
    - `current_role()` - Helper function to extract role from JWT app_metadata
*/

-- Users and roles
CREATE TABLE IF NOT EXISTS public.user_profiles (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('owner','waiter','chef')),
  full_name text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Menu domain
CREATE TABLE IF NOT EXISTS public.menu_categories (
  id bigserial PRIMARY KEY,
  name text NOT NULL UNIQUE,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.menu_categories ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS public.menu_items (
  id bigserial PRIMARY KEY,
  category_id bigint NOT NULL REFERENCES public.menu_categories(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  price numeric(10,2) NOT NULL CHECK (price >= 0),
  is_available boolean DEFAULT true,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;

-- Orders (for waiter/chef workflow)
DO $$ BEGIN
  CREATE TYPE order_status AS ENUM ('pending','in_kitchen','ready','served','canceled');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS public.orders (
  id bigserial PRIMARY KEY,
  table_number int NOT NULL CHECK (table_number > 0),
  status order_status NOT NULL DEFAULT 'pending',
  placed_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS public.order_items (
  id bigserial PRIMARY KEY,
  order_id bigint NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  menu_item_id bigint NOT NULL REFERENCES public.menu_items(id),
  quantity int NOT NULL CHECK (quantity > 0),
  notes text
);

ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Helper to read role from JWT app_metadata
CREATE OR REPLACE FUNCTION public.current_role()
RETURNS text LANGUAGE sql STABLE AS $$
  SELECT COALESCE(
    (auth.jwt() -> 'app_metadata' ->> 'role'),
    COALESCE(
      (SELECT role FROM public.user_profiles WHERE user_id = auth.uid()),
      'waiter'
    )
  )
$$;

-- RLS Policies

-- User Profiles Policies
CREATE POLICY "Users can view all profiles" ON public.user_profiles
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile" ON public.user_profiles
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" ON public.user_profiles
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Owners can manage all profiles" ON public.user_profiles
  FOR ALL TO authenticated
  USING (public.current_role() = 'owner');

-- Menu Categories Policies
CREATE POLICY "Everyone can view menu categories" ON public.menu_categories
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Owners can manage menu categories" ON public.menu_categories
  FOR ALL TO authenticated
  USING (public.current_role() = 'owner');

-- Menu Items Policies
CREATE POLICY "Everyone can view menu items" ON public.menu_items
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Owners can manage menu items" ON public.menu_items
  FOR ALL TO authenticated
  USING (public.current_role() = 'owner');

-- Orders Policies
CREATE POLICY "Everyone can view orders" ON public.orders
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Waiters and owners can create orders" ON public.orders
  FOR INSERT TO authenticated
  WITH CHECK (public.current_role() IN ('waiter', 'owner'));

CREATE POLICY "Waiters, chefs, and owners can update orders" ON public.orders
  FOR UPDATE TO authenticated
  USING (public.current_role() IN ('waiter', 'chef', 'owner'));

CREATE POLICY "Owners can delete orders" ON public.orders
  FOR DELETE TO authenticated
  USING (public.current_role() = 'owner');

-- Order Items Policies
CREATE POLICY "Everyone can view order items" ON public.order_items
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Waiters and owners can manage order items" ON public.order_items
  FOR ALL TO authenticated
  USING (public.current_role() IN ('waiter', 'owner'));

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.user_profiles (user_id, role, full_name)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'role', 'waiter'),
    COALESCE(new.raw_user_meta_data->>'full_name', '')
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create user profile on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Insert some sample menu categories
INSERT INTO public.menu_categories (name) VALUES
  ('Veg Starters'),
  ('Non-Veg Starters'),
  ('Indian Veg Curries'),
  ('Indian Non-Veg Curries'),
  ('Tandoori Rotis'),
  ('Tandoori Non-Veg'),
  ('Veg Biryanis'),
  ('Non-Veg Biryanis'),
  ('Chinese Food')
ON CONFLICT (name) DO NOTHING;