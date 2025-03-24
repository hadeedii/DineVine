import React, { useState } from "react";
import { View, Text, FlatList, TextInput, Button, Alert, TouchableOpacity } from "react-native";
import { styles } from "../components/styles/restaurantStyles";

// Initial restaurant data
const initialRestaurants = [
  { id: '1', name: 'Restaurant A' },
  { id: '2', name: 'Restaurant B' },
  { id: '3', name: 'Restaurant C' },
];

export default function RestaurantsScreen() {
  const [restaurants, setRestaurants] = useState(initialRestaurants);
  const [newRestaurant, setNewRestaurant] = useState<string>("");

  const handleAddRestaurant = () => {
    if (newRestaurant.trim() !== "") {
      setRestaurants((prevRestaurants) => [
        ...prevRestaurants,
        { id: Math.random().toString(), name: newRestaurant },
      ]);
      setNewRestaurant("");
    } else {
      Alert.alert("Error", "Restaurant name cannot be empty");
    }
  };

  const handleUpdateRestaurant = (id: string) => {
    Alert.prompt("Update Restaurant", "Enter new name", [
      { text: "Cancel", style: "cancel" },
      { 
        text: "OK",
        onPress: (updatedName) => {
          if (updatedName && updatedName.trim() !== "") {
            setRestaurants((prevRestaurants) =>
              prevRestaurants.map((restaurant) =>
                restaurant.id === id ? { ...restaurant, name: updatedName } : restaurant
              )
            );
          }
        }
      }
    ]);
  };

  const handleDeleteRestaurant = (id: string) => {
    setRestaurants((prevRestaurants) => prevRestaurants.filter((restaurant) => restaurant.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🍽️ Manage Restaurants</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter restaurant name"
          value={newRestaurant}
          onChangeText={setNewRestaurant}
        />
        <Button title="Add" onPress={handleAddRestaurant} />
      </View>

      <FlatList
        data={restaurants}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.text}>{item.name}</Text>
            <View style={styles.buttons}>
              <TouchableOpacity onPress={() => handleUpdateRestaurant(item.id)}>
                <Text style={styles.edit}>✏️ Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteRestaurant(item.id)}>
                <Text style={styles.delete}>🗑️ Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}
