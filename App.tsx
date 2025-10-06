import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddScreen from './AddScreen';
import MenuItemsScreen from './MenuItemsScreen'; // Renamed from HomeScreen
import FilterScreen from './FilterScreen'; // New Screen

// Defining a type for the tab parameters to allow passing data, 
// specifically for passing new items back to MenuItemsScreen.
// This is a minimal example, a state manager would be better.
export type RootTabParamList = {
  Menu: { newItem?: Omit<MenuItem, 'id'> } | undefined;
  Add: undefined;
  Filter: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

// Main App Component with Tab Navigation
function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Menu">
        <Tab.Screen 
          name="Menu" 
          component={MenuItemsScreen}
          options={{ tabBarLabel: 'Menu' }}
        />
        <Tab.Screen 
          name="Add" 
          component={AddScreen}
          options={{ tabBarLabel: 'Add New' }}
        />
        <Tab.Screen 
          name="Filter" 
          component={FilterScreen}
          options={{ tabBarLabel: 'Filter' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;








/*import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './MenuItemsScreen';
import AddScreen from './AddScreen';
import { MenuItem } from './types';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Main App Component with Tab Navigation
function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ tabBarLabel: 'Home' }}
        />
        <Tab.Screen 
          name="Add" 
          component={AddScreen}
          options={{ tabBarLabel: 'Add New' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;

*/