import React, { useState, useEffect } from "react";
import { 
    View, 
    Text, 
    TextInput, 
    FlatList, 
    ActivityIndicator, 
    StyleSheet, 
    TouchableOpacity, 
    Image, 
    Linking 
} from "react-native";
import axios from "axios";

// Import local images
import restaurant1 from "../assets/restaurant1.jpg";
import restaurant2 from "../assets/restaurant2.jpg";
import restaurant3 from "../assets/restaurant3.jpg";
import restaurant4 from "../assets/restaurant4.jpg";

const MOCK_API_URL = "https://mocki.io/v1/42798f09-233f-492e-94cc-26fa7f3a762b";

const localImages = [restaurant1, restaurant2, restaurant3, restaurant4];

const RestaurantList = () => {
    const [query, setQuery] = useState("");
    const [restaurants, setRestaurants] = useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await axios.get(MOCK_API_URL);
                if (response.data && response.data.restaurants) {
                    const nearestRestaurants = response.data.restaurants.slice(0, 4).map((restaurant, index) => ({
                        ...restaurant,
                        image_url: localImages[index] || restaurant.image_url,
                    }));
                    setRestaurants(nearestRestaurants);
                    setFilteredRestaurants(nearestRestaurants);
                }
            } catch (error) {
                console.error("API Fetch Error:", error.message);
                setError("Failed to fetch restaurants.");
            } finally {
                setLoading(false);
            }
        };
        fetchRestaurants();
    }, []);

    useEffect(() => {
        if (query.length < 3) {
            setFilteredRestaurants(restaurants);
        } else {
            const filtered = restaurants.filter(restaurant =>
                restaurant.name.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredRestaurants(filtered);
        }
    }, [query, restaurants]);

    const openGoogleMaps = (latitude, longitude) => {
        const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
        Linking.openURL(url);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Nearby Restaurants</Text>

            {/* Search Bar with Enhanced UI */}
            <TextInput
                style={styles.input}
                placeholder="Search for a restaurant..."
                placeholderTextColor="#888"
                value={query}
                onChangeText={setQuery}
            />

            {loading && <ActivityIndicator size="large" color="blue" />}
            {error && <Text style={styles.error}>{error}</Text>}

            {filteredRestaurants.length === 0 && !loading && query.length > 2 && (
                <Text style={styles.noResults}>No restaurants found</Text>
            )}

            <FlatList
                data={filteredRestaurants}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Image source={item.image_url} style={styles.image} />
                        <View style={styles.textContainer}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.details}>{item.city}</Text>
                            {/* Get Directions Button with Enhanced UI */}
                            <TouchableOpacity 
                                style={styles.directionButton} 
                                onPress={() => openGoogleMaps(item.latitude, item.longitude)}
                            >
                                <Text style={styles.buttonText}>Get Directions</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

export default RestaurantList;

// **Enhanced Styles for Better UI**
const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        padding: 20, 
        backgroundColor: "#fff" 
    },
    heading: { 
        fontSize: 22, 
        fontWeight: "bold", 
        marginBottom: 15, 
        textAlign: "center" 
    },
    // Improved Search Bar Style
    input: { 
        borderWidth: 1, 
        borderColor: "#ddd", 
        backgroundColor: "#f7f7f7",
        padding: 12, 
        borderRadius: 25, // Rounded edges
        marginBottom: 10,
        fontSize: 16,
        paddingHorizontal: 15, 
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2, // Android shadow effect
    },
    buttonText: { 
        color: "white", 
        fontSize: 16, 
        fontWeight: "bold" 
    },
    item: { 
        flexDirection: "row", 
        padding: 12, 
        borderBottomWidth: 1, 
        borderColor: "#ddd", 
        backgroundColor: "#f9f9f9", 
        alignItems: "center", 
        borderRadius: 10, 
        marginBottom: 10, 
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2, // For Android
    },
    image: { 
        width: 80, 
        height: 80, 
        borderRadius: 10, 
        marginRight: 10 
    },
    textContainer: { 
        flex: 1 
    },
    name: { 
        fontSize: 16, 
        fontWeight: "bold", 
        color: "#333" 
    },
    details: { 
        fontSize: 14, 
        color: "#777", 
        marginBottom: 5 
    },
    // Improved "Get Directions" Button
    directionButton: { 
        backgroundColor: "#28a745", 
        paddingVertical: 10, 
        borderRadius: 20, 
        alignItems: "center", 
        marginTop: 5, 
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3,
        elevation: 3, // Android shadow
        width: "80%", // Consistent button width
        alignSelf: "center",
    },
    error: { 
        color: "red", 
        textAlign: "center", 
        marginTop: 10 
    },
    noResults: { 
        textAlign: "center", 
        color: "#777", 
        marginTop: 10 
    },
});
