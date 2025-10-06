import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export interface MenuItem {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
  isAvailable: boolean;
}

// Defining a type for the tab parameters to allow passing data.
export type RootTabParamList = {
  Menu: { newItem?: Omit<MenuItem, 'id'> } | undefined;
  Add: undefined;
  Filter: undefined;
};

// Types for Navigation Props
export type MenuScreenNavigationProp = StackNavigationProp<RootTabParamList, 'Menu'>;
export type AddScreenNavigationProp = StackNavigationProp<RootTabParamList, 'Add'>;

export type MenuScreenRouteProp = RouteProp<RootTabParamList, 'Menu'>;