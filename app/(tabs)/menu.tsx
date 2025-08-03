
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  TextInput,
  Image,
  SectionList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Search, CreditCard as Edit3, Trash2, ShoppingCart, Minus } from 'lucide-react-native';
import { MenuService } from '@/services/MenuService';
import { MenuItem, MenuCategory } from '@/types/Menu';
import { CreateMenuItemModal } from '@/components/CreateMenuItemModal';
import { menuData } from '../../data/menuData';
import { useTheme } from '@/contexts/ThemeContext';

interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

export default function MenuScreen() {
  const { colors } = useTheme();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    loadMenuData();
  }, []);

  const loadMenuData = async () => {
    try {
      const [items, cats] = await Promise.all([
        MenuService.getAllMenuItems(),
        MenuService.getCategories(),
      ]);
      setMenuItems(items);
      setCategories(cats);
    } catch (error) {
      Alert.alert('Error', 'Failed to load menu data');
    }
  };

  const handleCreateItem = async (itemData: any) => {
    try {
      if (editingItem) {
        await MenuService.updateMenuItem(editingItem.id.toString(), itemData);
      } else {
        await MenuService.createMenuItem(itemData);
      }
      setShowCreateModal(false);
      setEditingItem(null);
      await loadMenuData();
    } catch (error) {
      Alert.alert('Error', 'Failed to save menu item');
    }
  };

  const handleDeleteItem = async (itemId: number) => {
    Alert.alert(
      'Delete Item',
      'Are you sure you want to delete this menu item?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await MenuService.deleteMenuItem(itemId.toString());
              await loadMenuData();
            } catch (error) {
              Alert.alert('Error', 'Failed to delete menu item');
            }
          },
        },
      ]
    );
  };

  const addToCart = (menuItem: MenuItem) => {
    const existingItem = cartItems.find(item => item.menuItem.id === menuItem.id);
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.menuItem.id === menuItem.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, { menuItem, quantity: 1 }]);
    }
  };

  const updateCartQuantity = (menuItemId: number, delta: number) => {
    setCartItems(cartItems.map(item => {
      if (item.menuItem.id === menuItemId) {
        const newQuantity = Math.max(0, item.quantity + delta);
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
      }
      return item;
    }).filter(Boolean) as CartItem[]);
  };

  const removeFromCart = (menuItemId: number) => {
    setCartItems(cartItems.filter(item => item.menuItem.id !== menuItemId));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.menuItem.fullPrice * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const placeOrder = () => {
    if (cartItems.length === 0) {
      Alert.alert('Empty Cart', 'Please add items to cart before placing order');
      return;
    }
    
    Alert.alert(
      'Place Order',
      `Total: ₹${getTotalPrice().toFixed(2)}\nItems: ${getTotalItems()}\n\nProceed with order?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Place Order',
          onPress: () => {
            Alert.alert('Success', 'Order placed successfully!');
            setCartItems([]);
            setShowCart(false);
          },
        },
      ]
    );
  };

  const filteredItems = menuData.filter((item) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      item.category.toLowerCase().replace(/\s+/g, '-') === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Helper to group menuData by category
  const getSections = () => {
    if (selectedCategory === 'all') {
      // Group all items by category
      const grouped: { [key: string]: MenuItem[] } = {};
      menuData.forEach((item) => {
        if (!grouped[item.category]) grouped[item.category] = [];
        grouped[item.category].push(item);
      });
      return Object.keys(grouped).map((category) => ({
        title: category,
        data: grouped[category],
      }));
    } else {
      // Only show selected category
      const filtered = menuData.filter(
        (item) =>
          item.category.toLowerCase().replace(/\s+/g, '-') === selectedCategory
      );
      const categoryName = filtered[0]?.category || '';
      return filtered.length > 0
        ? [{ title: categoryName, data: filtered }]
        : [];
    }
  };

  const renderMenuItem = ({ item }: { item: MenuItem }) => {
    const cartItem = cartItems.find(cartItem => cartItem.menuItem.id === item.id);
    
    return (
      <View style={[styles.menuCard, { backgroundColor: colors.card }]}>
        <Image source={{ uri: item.image }} style={styles.menuItemImage} />
        <View style={styles.menuItemContent}>
          <View style={styles.menuItemInfo}>
            <Text style={[styles.menuItemName, { color: colors.text }]}>{item.name}</Text>
            <Text style={[styles.menuItemDescription, { color: colors.textSecondary }]}>{item.description}</Text>
            <View style={styles.menuItemMeta}>
              <Text style={[styles.menuItemPrice, { color: colors.secondary }]}>₹{item.fullPrice}</Text>
              <Text
                style={{
                  color: item.isVeg ? colors.success : colors.error,
                  fontWeight: 'bold',
                  fontSize: 12,
                }}
              >
                {item.isVeg ? '🟢 Veg' : '🔴 Non-Veg'}
              </Text>
            </View>
            <View style={styles.cartControls}>
              {cartItem ? (
                <View style={styles.quantityControls}>
                  <TouchableOpacity
                    style={[styles.quantityButton, { backgroundColor: colors.primaryContainer, borderColor: colors.primary }]}
                    onPress={() => updateCartQuantity(item.id, -1)}
                  >
                    <Minus size={16} color={colors.primary} />
                  </TouchableOpacity>
                  <Text style={[styles.quantityText, { color: colors.text }]}>{cartItem.quantity}</Text>
                  <TouchableOpacity
                    style={[styles.quantityButton, { backgroundColor: colors.primaryContainer, borderColor: colors.primary }]}
                    onPress={() => updateCartQuantity(item.id, 1)}
                  >
                    <Plus size={16} color={colors.primary} />
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  style={[styles.addToCartButton, { backgroundColor: colors.primary }]}
                  onPress={() => addToCart(item)}
                >
                  <Plus size={16} color={colors.onPrimary} />
                  <Text style={[styles.addToCartText, { color: colors.onPrimary }]}>Add</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </View>
    );
  };

  // Add image URLs for each category
  const categoryCards = [
    {
      id: 'veg-starters',
      name: 'Veg Starters',
      image:
        'https://res.cloudinary.com/dy4isewfc/image/upload/v1753091192/Kaveri/Veg%20Starters/432be9f374ad1d1efcd5f3bccd3aa0c1_rnrxx3.webp',
    },
    {
      id: 'nonveg-starters',
      name: 'Non-Veg Starters',
      image:
        'https://res.cloudinary.com/dy4isewfc/image/upload/v1753092746/Kaveri/Non%20Veg%20Starter/Chicken-65-720x720_elvuvo.jpg',
    },
    {
      id: 'indian-veg-curries',
      name: 'Indian Veg Curries',
      image:
        'https://res.cloudinary.com/dy4isewfc/image/upload/v1753172849/Kaveri/Indian%20Veg%20Curries/360_F_716752017_lXCS6ToclcncnWRmtXQtEQgqEFiOXPTE_hrtxt3.jpg',
    },
    {
      id: 'indian-nonveg-curries',
      name: 'Indian Non-Veg Curries',
      image:
        'https://res.cloudinary.com/dy4isewfc/image/upload/v1753173896/Kaveri/indian%20Non%20veg%20Curries/2386980170_wy7veb.jpg',
    },
    {
      id: 'tandoori-rotis',
      name: 'Tandoori Rotis',
      image:
        'https://res.cloudinary.com/dy4isewfc/image/upload/v1753209211/Kaveri/indian%20Non%20veg%20Curries/9ba060b2-plain-naan-bombay-scaled_gyet2v.jpg',
    },
    {
      id: 'tandoori-nonveg',
      name: 'Tandoori Non-Veg',
      image:
        'https://res.cloudinary.com/dy4isewfc/image/upload/v1753209964/Kaveri/Tandoori%20Non%20Veg/Tandoori-chicken-recipe_palates-desire_l60nvl.jpg',
    },
    {
      id: 'veg-biryanis',
      name: 'Veg Biryanis',
      image:
        'https://res.cloudinary.com/dy4isewfc/image/upload/v1753210817/Kaveri/Veg%20Biryanis/maxresdefault_zrbrrh.jpg',
    },
    {
      id: 'nonveg-biryanis',
      name: 'Non-Veg Biryanis',
      image:
        'https://res.cloudinary.com/dy4isewfc/image/upload/v1753251829/Kaveri/Non%20Veg%20Biryanis/pngtree-top-view-of-chicken-biryani-indian-food-delicious-ramadan-iftar-meal-image_15585911_osejhh.png',
    },
    {
      id: 'chinese-food',
      name: 'Chinese Food',
      image:
        'https://res.cloudinary.com/dy4isewfc/image/upload/v1753255249/Kaveri/Chinese%20Foods/5c54d05cca6ab7802eab031c_fried-rice-website-thumbnail-_ddbiaa_cbgd3x.png',
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <Text style={[styles.title, { color: colors.text }]}>Menu Management</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={[styles.cartButton, { backgroundColor: colors.primaryContainer }]}
            onPress={() => setShowCart(!showCart)}
          >
            <ShoppingCart size={20} color={colors.primary} />
            {getTotalItems() > 0 && (
              <View style={[styles.cartBadge, { backgroundColor: colors.error }]}>
                <Text style={[styles.cartBadgeText, { color: colors.onError }]}>
                  {getTotalItems()}
                </Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setShowCreateModal(true)}
          >
            <Plus size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <View style={[styles.searchInputContainer, { backgroundColor: colors.surface }]}>
          <Search size={20} color={colors.textSecondary} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search menu items..."
            placeholderTextColor={colors.textTertiary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {showCart && (
        <View style={[styles.cartContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.cartHeader}>
            <Text style={[styles.cartTitle, { color: colors.text }]}>Cart ({getTotalItems()} items)</Text>
            <Text style={[styles.cartTotal, { color: colors.secondary }]}>₹{getTotalPrice().toFixed(2)}</Text>
          </View>
          {cartItems.length > 0 ? (
            <>
              <FlatList
                data={cartItems}
                keyExtractor={(item) => item.menuItem.id.toString()}
                renderItem={({ item }) => (
                  <View style={[styles.cartItem, { borderBottomColor: colors.border }]}>
                    <View style={styles.cartItemInfo}>
                      <Text style={[styles.cartItemName, { color: colors.text }]}>{item.menuItem.name}</Text>
                      <Text style={[styles.cartItemPrice, { color: colors.textSecondary }]}>₹{item.menuItem.fullPrice} x {item.quantity}</Text>
                    </View>
                    <View style={styles.cartItemControls}>
                      <TouchableOpacity
                        style={[styles.quantityButton, { backgroundColor: colors.primaryContainer, borderColor: colors.primary }]}
                        onPress={() => updateCartQuantity(item.menuItem.id, -1)}
                      >
                        <Minus size={14} color={colors.primary} />
                      </TouchableOpacity>
                      <Text style={[styles.quantityText, { color: colors.text }]}>{item.quantity}</Text>
                      <TouchableOpacity
                        style={[styles.quantityButton, { backgroundColor: colors.primaryContainer, borderColor: colors.primary }]}
                        onPress={() => updateCartQuantity(item.menuItem.id, 1)}
                      >
                        <Plus size={14} color={colors.primary} />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.removeButton, { backgroundColor: colors.errorContainer }]}
                        onPress={() => removeFromCart(item.menuItem.id)}
                      >
                        <Trash2 size={14} color={colors.error} />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
                style={styles.cartList}
                showsVerticalScrollIndicator={false}
              />
              <TouchableOpacity
                style={[styles.placeOrderButton, { backgroundColor: colors.primary }]}
                onPress={placeOrder}
              >
                <Text style={[styles.placeOrderText, { color: colors.onPrimary }]}>
                  Place Order - ₹{getTotalPrice().toFixed(2)}
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <Text style={[styles.emptyCartText, { color: colors.textSecondary }]}>Your cart is empty</Text>
          )}
        </View>
      )}

      <View style={styles.categoriesSection}>
        <Text style={[styles.categoriesTitle, { color: colors.text }]}>
          Categories
        </Text>
        <FlatList
          data={[
            {
              id: 'all',
              name: 'All Items',
              image: 'https://cdn-icons-png.flaticon.com/512/1046/1046857.png',
            },
            ...categoryCards,
          ]}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.categoryCard,
                { backgroundColor: colors.card, borderColor: colors.border },
                selectedCategory === item.id && [
                  styles.categoryCardActive, 
                  { borderColor: colors.primary, backgroundColor: colors.primaryContainer }
                ],
              ]}
              onPress={() => setSelectedCategory(item.id)}
              activeOpacity={0.7}
            >
              <View style={styles.categoryIcon}>
                <Image
                  source={{
                    uri: item.image || 'https://cdn-icons-png.flaticon.com/512/1046/1046857.png',
                  }}
                  style={styles.categoryIconImage}
                  resizeMode="cover"
                />
              </View>
              <Text
                style={[
                  styles.categoryCardLabel,
                  { color: colors.textSecondary },
                  selectedCategory === item.id && [
                    styles.categoryCardLabelActive,
                    { color: colors.primary }
                  ],
                ]}
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.categoriesScrollContent}
          style={styles.categoriesScrollContainer}
          snapToInterval={CATEGORY_CARD_WIDTH + 12}
          decelerationRate="fast"
          bounces={false}
        />
      </View>

      <FlatList
        data={getSections()}
        keyExtractor={(section) => section.title}
        renderItem={({ item: section }) => (
          <View style={{ marginBottom: 24 }}>
            <Text style={[styles.sectionHeader, { color: colors.primary }]}>{section.title}</Text>
            <FlatList
              data={section.data}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderMenuItem}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 8 }}
              ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
            />
          </View>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>No menu items found</Text>
            <Text style={[styles.emptySubtext, { color: colors.textTertiary }]}>
              Add items to get started
            </Text>
          </View>
        }
      />

      <CreateMenuItemModal
        visible={showCreateModal}
        onClose={() => {
          setShowCreateModal(false);
          setEditingItem(null);
        }}
        onSubmit={handleCreateItem}
        categories={categories}
        editingItem={editingItem}
      />
    </SafeAreaView>
  );
}

const CATEGORY_CARD_WIDTH = 110;
const CATEGORY_CARD_HEIGHT = 130;
const CATEGORY_ICON_SIZE = 72;
const CATEGORY_IMAGE_SIZE = 60;
const CATEGORY_CARD_SPACING = 12;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cartButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  addButton: {
    backgroundColor: '#FF6B35',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
  },
  cartContainer: {
    margin: 16,
    borderRadius: 12,
    borderWidth: 1,
    maxHeight: 300,
  },
  cartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  cartTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  cartTotal: {
    fontSize: 18,
    fontWeight: '700',
  },
  cartList: {
    maxHeight: 150,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
  },
  cartItemInfo: {
    flex: 1,
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  cartItemPrice: {
    fontSize: 14,
  },
  cartItemControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    minWidth: 20,
    textAlign: 'center',
  },
  removeButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeOrderButton: {
    margin: 16,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  placeOrderText: {
    fontSize: 16,
    fontWeight: '600',
  },
  emptyCartText: {
    textAlign: 'center',
    padding: 20,
    fontSize: 16,
  },
  menuCard: {
    width: 200,
    borderRadius: 12,
    alignItems: 'center',
    padding: 12,
    marginVertical: 4,
  },
  menuItemContent: {
    flex: 1,
    width: '100%',
  },
  menuItemInfo: {
    flex: 1,
  },
  menuItemName: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  menuItemDescription: {
    fontSize: 12,
    marginBottom: 8,
    lineHeight: 16,
    textAlign: 'center',
  },
  menuItemMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  menuItemPrice: {
    fontSize: 16,
    fontWeight: '700',
  },
  cartControls: {
    alignItems: 'center',
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 4,
  },
  addToCartText: {
    fontSize: 14,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
  },
  emptySubtext: {
    fontSize: 14,
    marginTop: 8,
  },
  menuItemImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginBottom: 8,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 24,
    marginBottom: 12,
    marginLeft: 8,
  },
  // Categories Section
  categoriesSection: {
    marginTop: 12,
    marginBottom: 16,
  },
  categoriesTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 16,
    marginBottom: 12,
  },
  categoriesScrollContainer: {
    minHeight: 140,
    maxHeight: 140,
  },
  categoriesScrollContent: {
    paddingLeft: 16,
    paddingRight: 16,
    alignItems: 'center',
    minHeight: 140,
  },
  
  // Category Card Styles
  categoryCard: {
    borderRadius: 12,
    width: CATEGORY_CARD_WIDTH,
    height: CATEGORY_CARD_HEIGHT,
    marginRight: CATEGORY_CARD_SPACING,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    padding: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryCardActive: {
    transform: [{ scale: 1.02 }],
    shadowOpacity: 0.15,
    elevation: 6,
  },
  categoryIcon: {
    width: CATEGORY_ICON_SIZE,
    height: CATEGORY_ICON_SIZE,
    borderRadius: CATEGORY_ICON_SIZE / 2,
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  categoryIconImage: {
    width: CATEGORY_IMAGE_SIZE,
    height: CATEGORY_IMAGE_SIZE,
    borderRadius: CATEGORY_IMAGE_SIZE / 2,
    alignSelf: 'center',
  },
  categoryCardLabel: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    paddingHorizontal: 4,
    width: CATEGORY_CARD_WIDTH - 16,
    minHeight: 32,
    maxHeight: 32,
    lineHeight: 16,
    flexShrink: 1,
  },
  categoryCardLabelActive: { 
    fontWeight: '700',
    fontSize: 13,
  },
});
