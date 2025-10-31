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

// 1. Define the shape of the filters
export interface Filters {
  category?: string;
  isAvailable?: boolean;
  minPrice?: number;
  maxPrice?: number;
}

// 2. Update RootTabParamList to accept *either* a new item or filters
export type RootTabParamList = {
  Menu: { 
    newItem?: Omit<MenuItem, 'id'>;
    filters?: Filters;
  } | undefined;
  Add: undefined;
  Filter: undefined;
};

// 3. Define all navigation/route prop types for type-safety
export type MenuScreenNavigationProp = StackNavigationProp<RootTabParamList, 'Menu'>;
export type MenuScreenRouteProp = RouteProp<RootTabParamList, 'Menu'>;

export type AddScreenNavigationProp = StackNavigationProp<RootTabParamList, 'Add'>;
export type AddScreenRouteProp = RouteProp<RootTabParamList, 'Add'>;

export type FilterScreenNavigationProp = StackNavigationProp<RootTabParamList, 'Filter'>;
export type FilterScreenRouteProp = RouteProp<RootTabParamList, 'Filter'>;