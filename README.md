# Christoffel's Menu App

This is a cross-platform mobile application designed for Christoffel, a private chef, to efficiently manage and present a dynamic menu. It is built using **React Native** and **TypeScript**.

The application is structured around a tab navigation system allowing easy access to the core features: viewing the **Menu**, **Adding New Items**, and **Filtering** the menu list.

## 1. Features

The current implementation covers the core requirements for menu management and viewing, as outlined in the project specifications:

| Feature | Description | Design Alignment |
| :--- | :--- | :--- |
| **Menu Viewing** | Displays a list of all current menu items with their title, description, and price. | home layout
| **Add New Item** | Provides a dedicated form for chefs to input **Dish Name**, **Description**, **Course Type**, and **Price**.| Add Menu Items 
| **Filter** | Allows users to filter the menu list by **Category** and **Availability** (implementation is based on the design which suggests filtering by course/category). |Filter Screen Design 
| **Navigation** | Uses **Bottom Tab Navigation** for primary screens (Menu, Add, Filter)| Navigation Flow Diagram

## 2. Technology Stack

* **Framework:** React Native
* **Language:** TypeScript
* **Navigation:** `@react-navigation/native`, `@react-navigation/bottom-tabs`
* **Components:** `View`, `Text`, `FlatList`, `TextInput`, `Button`, `Switch`, `Picker`

## 3. Code Structure

The project uses a component-based structure, separating concerns into dedicated files:

├── App.tsx             # Main component, sets up Tab Navigation (Menu, Add, Filter).
├── MenuItemsScreen.tsx # Displays the list of menu items (renamed from Homescreen.tsx).
├── AddScreen.tsx       # Form for adding new menu items.
├── FilterScreen.tsx    # Screen for applying filters to the menu list.
└── types.ts            # TypeScript interface definitions (MenuItem) and navigation parameter types.

I will create the **README.md** and **CHANGELOG.md** files based on the React Native code provided previously (for `App.tsx`, `MenuItemsScreen.tsx`, `AddScreen.tsx`, `FilterScreen.tsx`, and `types.ts`) and the design specifications from the uploaded documents (`mast 2 (3).pdf` and `mast 12.png`).

The README will document the project, its structure, and how it aligns with the design specifications. The CHANGELOG will track the transformation from the initial skeleton code to the current feature set.

## README.md

## 4. Design-to-Code Implementation Notes

The current code implements the functional requirements while adopting key design principles from the provided UI documents.

### MenuItemsScreen (Home Screen)
* **Initial State:** Contains placeholder menu items for demonstration.
* **Updates:** Receives new items from `AddScreen` via **navigation parameters**.
* **Summary:** The code structure is ready to implement the "Total Items" and "Avg Price" summary cards as seen in the design.
* **Item Structure:** Currently shows Title, Description, and Price. The design's **Expandable Card** (`[+]` icon) and **Delete Icon** features are not yet implemented but can be added using `TouchableOpacity`.
  
## Menu Display: Renders a scrollable list of food and drink items.
* ** Real-time Metrics (Calculations): Utilizes useMemo to efficiently compute and display key statistics at the top of the menu:
* ** Total Item Count on the menu.
* ** Final Price Range (Lowest and Highest price item on the menu).
* ** Average Price for each defined category (Main, Appetizer, Dessert, Drink).
* ** Dynamic Addition: Supports adding new menu items via navigation parameters (e.g., from an implied AddScreen).

### AddScreen
* **Input Fields:** Implements **Title (Dish Name)**, **Description**, **Category (Course Type)**, and **Price** using `TextInput`.
* **Course Selection:** The current `AddScreen` uses a `TextInput` for **Category**. This should be updated to a **Dropdown/Picker** component to enforce the "preset course list" and "constrained input" design element.
* **Live Preview:** The design includes a **Live Preview**. This feature is not implemented in the current code but can be added using state variables to render a preview component.

### FilterScreen
* **Controls:** Implements a **Category Picker** and an **Availability Switch** based on the overall design goal to access filtering options.
* **Functionality:** The `handleApplyFilters` function is a placeholder that currently only navigates back, but is structured to pass filter values to the `MenuItemsScreen`.

## Feature

## Details
State
* ** Manages states for selectedCategory, isAvailable, minPrice, and maxPrice.

## Validation
* ** Checks for valid positive numbers and ensures minPrice is not greater than maxPrice.

## Navigation
* ** Logs the applied filter object to the console and navigates back (or would pass filters to the Menu screen in a real application).

### Advanced Filtering (FilterScreen)

* ** Category Filter: Allows selection from predefined categories (Main, Appetizer, Dessert, Drink).
* ** Availability Toggle: A switch to filter and show only currently available items.
* ** Price Range Input: Text inputs for specifying minimum and maximum price constraints, with validation checks to ensure numerical and logical input (min < max).
* ** Visual Feedback: Displays the calculated price range immediately after applying filters.

---

# Christoffel's Menu App

This is a cross-platform mobile application designed for Christoffel, a private chef, to efficiently manage and present a dynamic menu. It is built using **React Native** and **TypeScript**.

The application is structured around a tab navigation system allowing easy access to the core features: viewing the **Menu**, **Adding New Items**, and **Filtering** the menu list.

## 1. Features

The current implementation covers the core requirements for menu management and viewing, as outlined in the project specifications:

| Feature | Description | Design Alignment |
| :--- | :--- | :--- |
| **Menu Viewing** | Displays a list of all current menu items with their title, description, and price. | Home Layout / Menu Items Screen. |
| **Add New Item** | Provides a dedicated form for chefs to input **Dish Name**, **Description**, **Course Type**, and **Price**. | Add Menu Items Design Screen. |
| **Filter** | Allows users to filter the menu list by **Category** and **Availability** (implementation is based on the design which suggests filtering by course/category). | Filter Screen Design. |
| **Navigation** | Uses **Bottom Tab Navigation** for primary screens (Menu, Add, Filter). | Navigation Flow Diagram. |

## 2. Technology Stack

* **Framework:** React Native
* **Language:** TypeScript
* **Navigation:** `@react-navigation/native`, `@react-navigation/bottom-tabs`
* **Components:** `View`, `Text`, `FlatList`, `TextInput`, `Button`, `Switch`, `Picker`

## 3. Code Structure

The project uses a component-based structure, separating concerns into dedicated files:

## CHANGELOG.md

```markdown
# Changelog

## Version 1.0.0 (Initial Code Drop) - Based on UI Requirements (Part 1) and Initial Code Structure

### 🔄 Refactoring & Renaming
* **RENAMED:** `Homescreen.tsx` to **`MenuItemsScreen.tsx`** for improved clarity regarding the screen's purpose.
* **UPDATED:** `types.ts` to include navigation parameter definitions (`RootTabParamList`) to support passing data between screens.

### ✨ New Features
* **[Menu Tab]:** Implemented the **`MenuItemsScreen`** which displays a static list of initial menu items. It also includes `useEffect` logic to dynamically add new items received via navigation parameters.
* **[Add Tab]:** Updated **`AddScreen`** to:
    * Include a `category` state and `TextInput` to fulfill the `MenuItem` interface requirements.
    * Implement **data passing** via `navigation.navigate('Menu', { newItem })` to ensure the newly added item is displayed immediately on the Menu screen.
* ** Introduced **`FilterScreen.tsx`**, a new component designed according to the UI specification.
    * Includes a **Category Picker** and **Availability Switch** for selection.
    * Includes `minPrice` and `maxPrice` inputs for price range filtering.
    * The `handleApplyFilters` function is a placeholder for sending filter logic to the `MenuItemsScreen`.

### 🛠️ Improvements & Fixes
* **Navigation:** Updated `App.tsx` to use `createBottomTabNavigator` with three screens: `Menu`, `Add`, and `Filter`.
* **Typing:** Enhanced type safety across all components using custom navigation props defined in `types.ts`.

##Screenshot##
** <img width="1869" height="521" alt="Screenshot 2025-10-06 190146" src="https://github.com/user-attachments/assets/e8457d39-ccb7-4f00-be38-e9eb659362d6" /> **
** <img width="1912" height="682" alt="Screenshot 2025-10-06 190231" src="https://github.com/user-attachments/assets/0c609e45-d3a6-4276-b757-66e3d0e82c29" /> **
*** Youtube link: https://youtu.be/Eg9hcG7jPKI ###

## 📊 Real-Time Analytics
** Menu statistics (total items, total value, average price)
** Category-wise breakdown with average prices
** Visual summary section with progress indicators

## 🔧 Interactive Features
** Quick view modal with detailed item information
** Wishlist functionality with local storage
** Order buttons for immediate action
** Availability indicators with color coding

## 🎯 Enhanced UX
** Category filtering with chip selection
** Animated item loading
** Empty states with helpful messaging
** Floating Action Button for adding items

### Enhanced Validation & Feedback
## Input Validation
** Price validation with specific error messages
** Range validation for min/max prices
** Visual indicators for invalid inputs

### User Feedback
** Filter summary in success alerts
** Visual counters for active filters
** Clear feedback on all interactions
** Confirmation dialogs for reset actions

Youtube Link:










