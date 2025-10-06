import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Keyboard } from 'react-native';
import { AddScreenNavigationProp } from './types';

interface AddScreenProps {
  navigation: AddScreenNavigationProp;
}

const AddScreen: React.FC<AddScreenProps> = ({ navigation }) => {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [category, setCategory] = React.useState('');

  const handleAddItem = () => {
    const priceValue = parseFloat(price);
    
    if (!title || !description || !price || !category || isNaN(priceValue)) {
      Alert.alert('Incomplete Fields', 'Please fill out all fields correctly.');
      return;
    }

    const newItem = {
      title,
      description,
      price: priceValue,
      category,
      // id and isAvailable will be handled in MenuItemsScreen
    };

    // Pass the new item data back to the 'Menu' screen via navigation params
    navigation.navigate('Menu', { newItem });

    // Clear the form
    setTitle('');
    setDescription('');
    setPrice('');
    setCategory('');
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Menu Item</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Title (e.g., 'Spaghetti Bolognese')"
        value={title}
        onChangeText={setTitle}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Description (e.g., 'House-made sauce and fresh basil')"
        value={description}
        onChangeText={setDescription}
        multiline={true}
      />

      <TextInput
        style={styles.input}
        placeholder="Category (e.g., 'Pasta', 'Appetizer')"
        value={category}
        onChangeText={setCategory}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Price (e.g., 15.99)"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      
      <Button title="Add Item" onPress={handleAddItem} disabled={!title || !price || !category} />
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 16,
    borderRadius: 4,
    minHeight: 40,
  },
});

export default AddScreen;








/*import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { MenuItem } from './types';

interface AddScreenProps {
  navigation: any;
}

const AddScreen: React.FC<AddScreenProps> = ({ navigation }) => {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [price, setPrice] = React.useState('');

  const handleAddItem = () => {
    // Handle adding new menu item
    console.log('Adding new item:', { title, description, price });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Menu Item</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      
      <Button title="Add Item" onPress={handleAddItem} />
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 16,
    borderRadius: 4,
  },
});

export default AddScreen;

*/