import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, Switch, TextInput, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // You may need to install this library: @react-native-picker/picker
import { RootTabParamList } from './types';
import { StackNavigationProp } from '@react-navigation/stack';

// Define the navigation prop type for better type safety
type FilterScreenNavigationProp = StackNavigationProp<RootTabParamList, 'Filter'>;

interface FilterScreenProps {
  navigation: FilterScreenNavigationProp;
}

const CATEGORIES = ['All', 'Main', 'Appetizer', 'Dessert', 'Drink'];

const FilterScreen: React.FC<FilterScreenProps> = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isAvailable, setIsAvailable] = useState<boolean>(false);
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');

  const handleApplyFilters = () => {
    // 1. Validate Price Inputs
    const minP = parseFloat(minPrice);
    const maxP = parseFloat(maxPrice);

    if (minPrice && (isNaN(minP) || minP < 0)) {
        Alert.alert('Invalid Price', 'Minimum price must be a valid positive number.');
        return;
    }
    if (maxPrice && (isNaN(maxP) || maxP < 0)) {
        Alert.alert('Invalid Price', 'Maximum price must be a valid positive number.');
        return;
    }
    if (minP > 0 && maxP > 0 && minP > maxP) {
        Alert.alert('Price Error', 'Minimum price cannot be greater than maximum price.');
        return;
    }

    const filters = {
      category: selectedCategory === 'All' ? undefined : selectedCategory,
      isAvailable: isAvailable ? true : undefined, // Only pass true if switch is on
      minPrice: minP > 0 ? minP : undefined,
      maxPrice: maxP > 0 ? maxP : undefined,
    };

    // 2. In a real app, you would pass these filters back to the 'Menu' screen 
    // using navigation params or a global state manager (Context/Redux).
    
    // Example using navigation (requires updating MenuItemsScreen to read the params):
    // navigation.navigate('Menu', { filters });
    
    // For now, we will just navigate back to the Menu screen.
    console.log('Applying Filters:', filters);
    alert(`Filters applied: Category=${filters.category || 'All'}, Available=${!!filters.isAvailable}, Price Range: $${filters.minPrice || 0} - $${filters.maxPrice || 'Max'}`);
    navigation.navigate('Menu');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Filter Menu Items</Text>

      {/* Filter by Category */}
      <View style={styles.filterSection}>
        <Text style={styles.filterLabel}>Category:</Text>
        <View style={styles.pickerContainer}>
            <Picker
                selectedValue={selectedCategory}
                onValueChange={(itemValue) => setSelectedCategory(itemValue)}
                style={styles.picker}
            >
                {CATEGORIES.map((cat) => (
                    <Picker.Item key={cat} label={cat} value={cat} />
                ))}
            </Picker>
        </View>
      </View>
      
      {/* Filter by Availability */}
      <View style={styles.filterSection}>
        <Text style={styles.filterLabel}>Show Only Available Items:</Text>
        <Switch
          value={isAvailable}
          onValueChange={setIsAvailable}
        />
      </View>

      {/* Filter by Price Range */}
      <View style={styles.filterSection}>
        <Text style={styles.filterLabel}>Price Range:</Text>
        <View style={styles.priceInputs}>
            <TextInput
                style={styles.input}
                placeholder="Min Price"
                keyboardType="numeric"
                value={minPrice}
                onChangeText={setMinPrice}
            />
            <TextInput
                style={styles.input}
                placeholder="Max Price"
                keyboardType="numeric"
                value={maxPrice}
                onChangeText={setMaxPrice}
            />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button 
          title="Apply Filters" 
          onPress={handleApplyFilters} 
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  filterSection: {
    marginBottom: 25,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  filterLabel: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  priceInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 4,
    width: '48%',
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 40,
  }
});

export default FilterScreen;








/*
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

interface FilterScreenProps {
  navigation: any;
}

const FilterScreen: React.FC<FilterScreenProps> = ({ navigation }) => {
  const handleApplyFilters = () => {
    // Logic to apply filters and navigate back to MenuItemsScreen (Menu tab)
    // For now, it just navigates.
    navigation.navigate('Menu');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filter Menu</Text>
      <Text style={styles.text}>
        This screen would contain options to filter menu items by category, price range, availability, etc.
      </Text>

      <Button title="Apply Filters and View Menu" onPress={handleApplyFilters} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 16,
    color: '#666',
  },
});

export default FilterScreen;

*/