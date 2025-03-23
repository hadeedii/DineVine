import React, { useState } from "react";
import { View, Text, FlatList, TextInput, TouchableOpacity } from "react-native";
import styles from "../components/styles/menuStyle";

interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
}

export default function BuffetMenu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { id: "1", name: "Chicken Wings", price: 8, category: "Starter" },
    { id: "2", name: "Grilled Steak", price: 15, category: "Main Course" },
    { id: "3", name: "Chocolate Cake", price: 6, category: "Dessert" },
  ]);

  const categories = ["All", "Starter", "Main Course", "Dessert"];
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [newItem, setNewItem] = useState<MenuItem>({
    id: "",
    name: "",
    price: 0,
    category: "",
  });
  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  let filteredMenu = selectedCategory === "All"
    ? menuItems
    : menuItems.filter((item) => item.category === selectedCategory);

  if (searchQuery) {
    filteredMenu = filteredMenu.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (priceFilter) {
    filteredMenu = filteredMenu.filter((item) => item.price <= parseInt(priceFilter));
  }

  const addItem = () => {
    if (newItem.name && newItem.price && newItem.category) {
      setMenuItems([...menuItems, { ...newItem, id: Date.now().toString(), price: Number(newItem.price) }]);
      setNewItem({ id: "", name: "", price: 0, category: "" });
    }
  };

  const startEditing = (item: MenuItem) => {
    setEditingItemId(item.id);
    setNewItem({ ...item });
  };

  const saveEdit = () => {
    setMenuItems(menuItems.map((item) =>
      item.id === editingItemId ? { ...item, ...newItem, price: Number(newItem.price) } : item
    ));
    setEditingItemId(null);
    setNewItem({ id: "", name: "", price: 0, category: "" });
  };

  const deleteItem = (id: string) => {
    setMenuItems(menuItems.filter((item) => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🍽️ Buffet Menu</Text>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search by dish name"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TextInput
          style={styles.input}
          placeholder="Max Price"
          keyboardType="numeric"
          value={priceFilter}
          onChangeText={setPriceFilter}
        />
      </View>

      <View style={styles.categoryContainer}>
        <FlatList
          horizontal
          data={categories}
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.filterButton, selectedCategory === item && styles.selectedButton]}
              onPress={() => setSelectedCategory(item)}
            >
              <Text style={[styles.filterText, selectedCategory === item && styles.selectedText]}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Dish Name"
        value={newItem.name}
        onChangeText={(text) => setNewItem({ ...newItem, name: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        keyboardType="numeric"
        value={newItem.price.toString()}
        onChangeText={(text) => setNewItem({ ...newItem, price: Number(text) })}
      />
      <TextInput
        style={styles.input}
        placeholder="Category"
        value={newItem.category}
        onChangeText={(text) => setNewItem({ ...newItem, category: text })}
      />

      {editingItemId ? (
        <TouchableOpacity style={styles.saveButton} onPress={saveEdit}>
          <Text style={styles.saveButtonText}>💾 Save Changes</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.addButton} onPress={addItem}>
          <Text style={styles.addButtonText}>➕ Add Item</Text>
        </TouchableOpacity>
      )}

      <FlatList
        data={filteredMenu}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View>
              <Text style={styles.name}>{item.name}</Text>
              <Text>${item.price}</Text>
              <Text style={styles.category}>📌 {item.category}</Text>
            </View>
            <View style={styles.buttonGroup}>
              <TouchableOpacity style={styles.editButton} onPress={() => startEditing(item)}>
                <Text style={styles.buttonText}>✏️ Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={() => deleteItem(item.id)}>
                <Text style={styles.buttonText}>🗑️ Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.menuList}
      />
    </View>
  );
}
