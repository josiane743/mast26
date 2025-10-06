# Christoffel's Menu App

This is a cross-platform mobile application designed for Christoffel, a private chef, to efficiently manage and present a dynamic menu. It is built using **React Native** and **TypeScript**.

The application is structured around a tab navigation system allowing easy access to the core features: viewing the **Menu**, **Adding New Items**, and **Filtering** the menu list.

## 1. Features

The current implementation covers the core requirements for menu management and viewing, as outlined in the project specifications:

| Feature | Description | Design Alignment |
| :--- | :--- | :--- |
| **Menu Viewing** | Displays a list of all current menu items with their title, description, and price. Home Layout / Menu Items Screen. 
| **Add New Item** | Provides a dedicated form for chefs to input **Dish Name**, **Description**, **Course Type**, and **Price**. Add Menu Items Design Screen. 
| **Filter** | Allows users to filter the menu list by **Category** and **Availability** (implementation is based on the design which suggests filtering by course/category). Filter Screen Design. 
| **Navigation** | Uses **Bottom Tab Navigation** for primary screens (Menu, Add, Filter).Navigation Flow Diagram. 

## 2. Technology Stack

* **Framework:** React Native
* **Language:** TypeScript
* **Navigation:** `@react-navigation/native`, `@react-navigation/bottom-tabs`
* **Components:** `View`, `Text`, `FlatList`, `TextInput`, `Button`, `Switch`, `Picker`

## 3. Code Structure

The project uses a component-based structure, separating concerns into dedicated files:
