import React, { useEffect, useMemo } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { MenuItem, MenuScreenRouteProp, MenuScreenNavigationProp } from './types';

interface MenuItemsScreenProps {
  navigation: MenuScreenNavigationProp;
  route: MenuScreenRouteProp;
}

const initialMenuItems: MenuItem[] = [
  { id: '1', title: 'Classic Burger', description: 'Beef patty with lettuce and tomato', price: 12.50, category: 'Main', isAvailable: true },
  { id: '2', title: 'Caesar Salad', description: 'Romaine lettuce, croutons, parmesan cheese', price: 9.00, category: 'Appetizer', isAvailable: true },
  { id: '3', title: 'Spaghetti Carbonara', description: 'Pasta with pancetta, egg, and cheese', price: 14.75, category: 'Main', isAvailable: true },
  { id: '4', title: 'Tiramisu', description: 'Coffee-flavoured Italian dessert', price: 7.50, category: 'Dessert', isAvailable: true },
  { id: '5', title: 'Iced Tea', description: 'Refreshing sweet iced tea', price: 3.00, category: 'Drink', isAvailable: true },
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

  // --- NEW FEATURE: Calculate Averages ---
  // We use useMemo to efficiently calculate stats only when menuItems changes.
  const { totalItems, categoryAverages } = useMemo(() => {
    // 1. Calculate total items
    const total = menuItems.length;

    // 2. Group items by category and sum totals
    const stats = menuItems.reduce((acc, item) => {
        const category = item.category || 'Uncategorized'; // Handle missing category
        if (!acc[category]) {
            acc[category] = { total: 0, count: 0 };
        }
        acc[category].total += item.price;
        acc[category].count += 1;
        return acc;
    }, {} as { [key: string]: { total: number, count: number } });

    // 3. Calculate the average for each category
    const averages = Object.keys(stats).map(category => ({
        category: category,
        count: stats[category].count,
        average: stats[category].total / stats[category].count,
    }));
    
    return { totalItems: total, categoryAverages: averages };
  }, [menuItems]); // Dependency array: only recalculate if menuItems changes

  // --- NEW FEATURE: Render Header Component ---
  // This component will render at the top of the FlatList and scroll with it.
  const renderHeader = () => (
    <>
      <Text style={styles.title}>Menu Items</Text>

      {/* This View contains the new features */}
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Menu Summary</Text>
        
        {/* Feature 1: Total number of menu items */}
        <Text style={styles.summaryText}>Total Items: {totalItems}</Text>
        
        {/* Feature 2: Average price by course/category */}
        <Text style={styles.summarySubtitle}>Average Price by Category:</Text>
        {categoryAverages.length > 0 ? (
            categoryAverages.map(avg => (
                <Text key={avg.category} style={styles.summaryText}>
                    - {avg.category} ({avg.count} items): ${avg.average.toFixed(2)}
                </Text>
            ))
        ) : (
            <Text style={styles.summaryText}>No items to calculate averages.</Text>
        )}
      </View>
    </>
  );

  return (
    <View style={styles.container}>
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
        // --- UPDATED: Use ListHeaderComponent to show title and summary ---
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={<Text>No menu items available.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9', // Added a light bg color
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  // --- NEW STYLES for Summary Section ---
  summaryContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#eee',
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
  },
  summarySubtitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 6,
  },
  summaryText: {
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
  },
  // --- END NEW STYLES ---
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff', // Give items a white background
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








// import React, { useEffect } from 'react';
// import { View, Text, FlatList, StyleSheet } from 'react-native';
// import { MenuItem, MenuScreenRouteProp, MenuScreenNavigationProp } from './types';

// interface MenuItemsScreenProps {
//   navigation: MenuScreenNavigationProp;
//   route: MenuScreenRouteProp;
// }

// const initialMenuItems: MenuItem[] = [
//   { id: '1', title: 'Classic Burger', description: 'Beef patty with lettuce and tomato', price: 12.50, category: 'Main', isAvailable: true },
//   { id: '2', title: 'Caesar Salad', description: 'Romaine lettuce, croutons, parmesan cheese', price: 9.00, category: 'Appetizer', isAvailable: true },
// ];

// const MenuItemsScreen: React.FC<MenuItemsScreenProps> = ({ route }) => {
//   const [menuItems, setMenuItems] = React.useState<MenuItem[]>(initialMenuItems);

//   // Effect to listen for new item passed from the AddScreen
//   useEffect(() => {
//     if (route.params?.newItem) {
//       const newItem = route.params.newItem;
//       // Simple item creation logic
//       const newMenuItem: MenuItem = {
//         ...newItem,
//         id: Date.now().toString(), // Generate a unique ID
//         isAvailable: true, // Defaulting availability
//       };
//       setMenuItems((currentItems) => [...currentItems, newMenuItem]);
      
//       // Clear the param so it doesn't add again on next focus
//       // NOTE: This requires using the navigation prop from a component to set params, 
//       // but for simplicity, we'll let it handle in the state update. 
//       // A more robust solution would be global state management.
//     }
//   }, [route.params?.newItem]);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Menu Items</Text>
//       <FlatList
//         data={menuItems}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <View style={styles.item}>
//             <Text style={styles.itemTitle}>{item.title} - {item.category}</Text>
//             <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
//             <Text style={styles.itemDescription}>{item.description}</Text>
//           </View>
//         )}
//         ListEmptyComponent={<Text>No menu items available.</Text>}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   item: {
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
//   itemTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//   },
//   itemDescription: {
//     fontSize: 14,
//     color: '#333',
//     marginTop: 4,
//   },
//   itemPrice: {
//     fontSize: 16,
//     color: 'green',
//     marginTop: 4,
//   },
// });

// export default MenuItemsScreen;








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