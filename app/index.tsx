import React, { useState } from "react";
import { 
  View, Text, FlatList, ImageBackground, TouchableOpacity, TextInput, Image 
} from "react-native";
import styles from "../components/styles/IndexStyle"; // Importing styles

// Import images from assets
import logo from "../assets/logo.png";
import continentalImage from "../assets/continental.jpg";
import asianImage from "../assets/asian.jpg";
import bbqImage from "../assets/bbq.jpg";
import seafoodImage from "../assets/seafood.jpg";
import dessertImage from "../assets/dessert.jpg";

// Dummy Buffet Data
const allBuffets = [
  { name: "Continental Buffet", category: "Continental", price: 1500, location: "Lahore", image: continentalImage, restaurants: ["Restaurant A", "Restaurant B"] },
  { name: "Asian Buffet", category: "Asian", price: 2000, location: "Karachi", image: asianImage, restaurants: ["Restaurant C", "Restaurant D"] },
  { name: "BBQ Buffet", category: "BBQ", price: 1800, location: "Islamabad", image: bbqImage, restaurants: ["Restaurant E", "Restaurant F"] },
  { name: "Seafood Buffet", category: "Seafood", price: 2500, location: "Lahore", image: seafoodImage, restaurants: ["Restaurant G", "Restaurant H"] },
  { name: "Dessert Buffet", category: "Dessert", price: 1200, location: "Karachi", image: dessertImage, restaurants: ["Restaurant I", "Restaurant J"] },
];

const categories = ["All", "BBQ", "Seafood", "Asian", "Continental", "Dessert"];

export default function BuffetMenu() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBuffet, setSelectedBuffet] = useState<null | typeof allBuffets[0]>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState("");

  let filteredBuffets = allBuffets.filter((buffet) =>
    selectedCategory === "All" || buffet.category === selectedCategory
  );

  if (searchQuery) {
    filteredBuffets = filteredBuffets.filter((buffet) =>
      buffet.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (priceFilter) {
    filteredBuffets = filteredBuffets.filter((buffet) => buffet.price <= parseInt(priceFilter));
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={logo} style={styles.logo} />
      </View>

      {/* Search and Price Filter */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search by location"
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

      {/* Categories */}
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

      {/* Buffet List */}
      <FlatList
        data={filteredBuffets}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSelectedBuffet(item)}>
            <View style={styles.card}>
              <ImageBackground source={item.image} style={styles.image} imageStyle={{ borderRadius: 10 }}>
                <View style={styles.overlay}>
                  <Text style={styles.buffetName}>{item.name}</Text>
                  <Text style={styles.buffetDetails}>Price: {item.price} PKR</Text>
                  <Text style={styles.buffetDetails}>Location: {item.location}</Text>
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.buffetList}
      />

      {/* Restaurant List */}
      {selectedBuffet && (
        <View style={styles.restaurantList}>
          <Text style={styles.title}>Restaurants Offering {selectedBuffet.name}</Text>
          {selectedBuffet.restaurants.map((restaurant, index) => (
            <Text key={index} style={styles.restaurantText}>{restaurant}</Text>
          ))}
          <TouchableOpacity onPress={() => setSelectedBuffet(null)}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
