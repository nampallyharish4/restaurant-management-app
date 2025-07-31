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
import { Plus, Search, CreditCard as Edit3, Trash2 } from 'lucide-react-native';
import { MenuService } from '@/services/MenuService';
import { MenuItem, MenuCategory } from '@/types/Menu';
import { CreateMenuItemModal } from '@/components/CreateMenuItemModal';
import { menuData } from '../../data/menuData';

export default function MenuScreen() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

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

  const renderMenuItem = ({ item }: { item: MenuItem }) => (
    <View style={styles.menuCard}>
      <Image source={{ uri: item.image }} style={styles.menuItemImage} />
      <View style={styles.menuItemContent}>
        <View style={styles.menuItemInfo}>
          <Text style={styles.menuItemName}>{item.name}</Text>
          <Text style={styles.menuItemDescription}>{item.description}</Text>
          <View style={styles.menuItemMeta}>
            <Text style={styles.menuItemPrice}>₹{item.fullPrice}</Text>
            <Text
              style={{
                color: item.isVeg ? 'green' : 'red',
                fontWeight: 'bold',
              }}
            >
              {item.isVeg ? 'Veg' : 'Non-Veg'}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

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
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Menu Management</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowCreateModal(true)}
        >
          <Plus size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search menu items..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <View style={{ marginTop: 12, marginBottom: 12 }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '700',
            marginLeft: 16,
            marginBottom: 8,
          }}
        >
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
                selectedCategory === item.id && styles.categoryCardActive,
              ]}
              onPress={() => setSelectedCategory(item.id)}
              activeOpacity={0.8}
            >
              <View style={styles.categoryIcon}>
                <Image
                  source={{
                    uri:
                      item.image ||
                      'https://cdn-icons-png.flaticon.com/512/1046/1046857.png',
                  }}
                  style={styles.categoryIconImage}
                />
              </View>
              <Text
                style={[
                  styles.categoryCardLabel,
                  selectedCategory === item.id &&
                    styles.categoryCardLabelActive,
                ]}
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={{ paddingLeft: 8, paddingRight: 8, alignItems: 'center', minHeight: 140 }}
          style={{ minHeight: 140 }}
        />
      </View>

      {getSections().map((section) => (
        <View key={section.title} style={{ marginBottom: 24 }}>
          <Text style={styles.sectionHeader}>{section.title}</Text>
          <FlatList
            data={section.data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderMenuItem}
            numColumns={4}
            columnWrapperStyle={{ justifyContent: 'flex-start' }}
            contentContainerStyle={{}}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>No menu items found</Text>
                <Text style={styles.emptySubtext}>
                  Add items to get started
                </Text>
              </View>
            }
          />
        </View>
      ))}

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
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
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#1a1a1a',
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginRight: 8,
    backgroundColor: '#fff',
  },
  categoryButtonActive: {
    borderColor: '#FF6B35',
    backgroundColor: '#fff5f2',
  },
  categoryText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  categoryTextActive: {
    color: '#FF6B35',
    fontWeight: '600',
  },
  menuList: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  menuCard: {
    flex: 1,
    margin: 6,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
    padding: 8,
    minWidth: 0,
    maxWidth: '100%',
  },
  menuItemContent: {
    flex: 1,
    padding: 16,
  },
  menuItemInfo: {
    flex: 1,
  },
  menuItemName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 4,
  },
  menuItemDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
  },
  menuItemMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuItemPrice: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2D5016',
    textAlign: 'center',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
  menuItemActions: {
    marginLeft: 12,
    gap: 8,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },
  menuItemImage: {
    width: 64,
    height: 64,
    borderRadius: 12,
    marginBottom: 8,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 24,
    marginBottom: 8,
    color: '#FF6B35',
    marginLeft: 8,
  },
  // --- CATEGORY CARD STYLES FOR UNIFORM SIZE ---
  categoryCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    width: CATEGORY_CARD_WIDTH,
    height: CATEGORY_CARD_HEIGHT,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#eee',
    padding: 0,
    overflow: 'hidden',
  },
  categoryCardActive: { borderColor: '#FF6B35', backgroundColor: '#fff5f2' },
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
    resizeMode: 'cover',
    alignSelf: 'center',
  },
  categoryCardLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
    textAlign: 'center',
    paddingHorizontal: 4,
    width: CATEGORY_CARD_WIDTH - 8,
    minHeight: 36,
    maxHeight: 36,
    lineHeight: 18,
    flexShrink: 1,
  },
  categoryCardLabelActive: { color: '#FF6B35', fontWeight: '700' },
});
