import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { MenuItem, MenuScreenRouteProp, MenuScreenNavigationProp } from './types';

interface MenuItemsScreenProps {
  navigation: MenuScreenNavigationProp;
  route: MenuScreenRouteProp;
}

const initialMenuItems: MenuItem[] = [
  { id: '1', title: 'Classic Burger', description: 'Beef patty with lettuce and tomato', price: 12.50, category: 'Main', isAvailable: true },
  { id: '2', title: 'Caesar Salad', description: 'Romaine lettuce, croutons, parmesan cheese', price: 9.00, category: 'Appetizer', isAvailable: true },
];

const MenuItemsScreen: React.FC<MenuItemsScreenProps> = ({ route }) => {
  const [menuItems, setMenuItems] = React.useState<MenuItem[]>(initialMenuItems);

  // Effect to listen for new item passed from the AddScreen
  useEffect(() => {
    if (route.params?.newItem) {
      const newItem = route.params.newItem;
      // Simple item creation logic
      const newMenuItem: MenuItem = {
        ...newItem,
        id: Date.now().toString(), // Generate a unique ID
        isAvailable: true, // Defaulting availability
      };
      setMenuItems((currentItems) => [...currentItems, newMenuItem]);
      
      // Clear the param so it doesn't add again on next focus
      // NOTE: This requires using the navigation prop from a component to set params, 
      // but for simplicity, we'll let it handle in the state update. 
      // A more robust solution would be global state management.
    }
  }, [route.params?.newItem]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu Items</Text>
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemTitle}>{item.title} - {item.category}</Text>
            <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
            <Text style={styles.itemDescription}>{item.description}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>No menu items available.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  itemDescription: {
    fontSize: 14,
    color: '#333',
    marginTop: 4,
  },
  itemPrice: {
    fontSize: 16,
    color: 'green',
    marginTop: 4,
  },
});

export default MenuItemsScreen;








/*

import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
// Assuming 'types.ts' defines MenuItem, but we'll define a simple one here for clarity.
// import { MenuItem } from './types'; 

// ---
// 1. Simple MenuItem type definition (you should move this to a 'types.ts' file)
interface MenuItem {
  id: string;
  title: string;
  price: number; // Added price for a simple meal item
}
// ---

interface HomeScreenProps {
  // Navigation prop included for completeness, though not used in this simplified view
  navigation: any; 
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  // ---
  // 2. Add placeholder meal data directly to the state initializer
  const [menuItems, setMenuItems] = React.useState<MenuItem[]>([
    { id: '1', title: 'Classic Cheeseburger', price: 12.99 },
    { id: '2', title: 'Grilled Chicken Salad', price: 10.50 },
    { id: '3', title: 'Vegetarian Pasta', price: 14.75 },
    { id: '4', title: 'Steak Frites', price: 24.99 },
    { id: '5', title: 'Soup of the Day', price: 6.00 },
  ]);
  // ---

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Delicious Menu Items</Text>
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          // Display the item's title AND price
          <View style={styles.item}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemPrice}>$ {item.price.toFixed(2)}</Text>
          </View>
        )}
        // Add a small footer/separator for better visual grouping
        ItemSeparatorComponent={() => <View style={styles.separator} />} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8', // Light background for better contrast
  },
  title: {
    fontSize: 26, // Slightly larger title
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  item: {
    flexDirection: 'row', // Arrange title and price side-by-side
    justifyContent: 'space-between', // Push title to left and price to right
    alignItems: 'center',
    paddingVertical: 12, // Reduced padding for a simpler list look
    paddingHorizontal: 5,
    backgroundColor: '#fff', // White background for each item
  },
  separator: {
    height: 1,
    backgroundColor: '#eee', // Very light gray separator
  },
  itemTitle: {
    fontSize: 17,
    fontWeight: '500', // Medium font weight
    color: '#333',
  },
  itemPrice: {
    fontSize: 17,
    fontWeight: 'bold', // Price stands out
    color: '#1e88e5', // A nice blue color for prices
  },
});

export default HomeScreen;

*/