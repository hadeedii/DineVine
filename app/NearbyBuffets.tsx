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
    Linking, 
    Modal, 
    RefreshControl 
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
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [refreshing, setRefreshing] = useState(false); // New state for refreshing

    // Fetch Restaurants Function
    const fetchRestaurants = async () => {
        try {
            setLoading(true);
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
            setRefreshing(false); // Stop refreshing after API call
        }
    };

    useEffect(() => {
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

    // Function to handle pull-to-refresh
    const handleRefresh = () => {
        setRefreshing(true);
        fetchRestaurants(); // Re-fetch restaurant data
    };

    const openGoogleMaps = (latitude, longitude) => {
        const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
        Linking.openURL(url);
    };

    const showInfo = (latitude, longitude) => {
        setSelectedLocation({ latitude, longitude });
        setModalVisible(true);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Nearby Restaurants</Text>

            {/* Search Bar */}
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
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
                }
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Image source={item.image_url} style={styles.image} />
                        <View style={styles.textContainer}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.details}>{item.city}</Text>

                            {/* Buttons for Info & Get Directions */}
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity 
                                    style={styles.infoButton} 
                                    onPress={() => showInfo(item.latitude, item.longitude)}
                                >
                                    <Text style={styles.infoButtonText}>Info</Text>
                                </TouchableOpacity>

                                <TouchableOpacity 
                                    style={styles.directionButton} 
                                    onPress={() => openGoogleMaps(item.latitude, item.longitude)}
                                >
                                    <Text style={styles.buttonText}>Get Directions</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}
            />

            {/* MODAL FOR INFO SCREEN */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>Location Info</Text>
                        {selectedLocation && (
                            <>
                                <Text style={styles.modalText}>📍 Latitude: {selectedLocation.latitude}</Text>
                                <Text style={styles.modalText}>📍 Longitude: {selectedLocation.longitude}</Text>
                            </>
                        )}
                        <TouchableOpacity 
                            style={styles.closeButton} 
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default RestaurantList;

// **Updated Styles**
const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#fff" },
    heading: { fontSize: 22, fontWeight: "bold", marginBottom: 15, textAlign: "center" },
    input: { 
        borderWidth: 1, borderColor: "#ddd", backgroundColor: "#f7f7f7",
        padding: 12, borderRadius: 25, marginBottom: 10, fontSize: 16, paddingHorizontal: 15 
    },
    buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
    infoButtonText: { color: "#000", fontSize: 16, fontWeight: "bold" },
    item: { flexDirection: "row", padding: 12, borderBottomWidth: 1, borderColor: "#ddd", backgroundColor: "#f9f9f9", alignItems: "center", borderRadius: 10, marginBottom: 10 },
    image: { width: 80, height: 80, borderRadius: 10, marginRight: 10 },
    textContainer: { flex: 1 },
    name: { fontSize: 16, fontWeight: "bold", color: "#333" },
    details: { fontSize: 14, color: "#777", marginBottom: 5 },
    buttonContainer: { flexDirection: "row", justifyContent: "space-between", marginTop: 8 },
    infoButton: { backgroundColor: "#fff", borderWidth: 1, borderColor: "#000", paddingVertical: 8, paddingHorizontal: 15, borderRadius: 20, alignItems: "center" },
    directionButton: { backgroundColor: "#000", paddingVertical: 8, paddingHorizontal: 15, borderRadius: 20, alignItems: "center", marginLeft: 10 },
    error: { color: "red", textAlign: "center", marginTop: 10 },
    noResults: { textAlign: "center", color: "#777", marginTop: 10 },

    // Modal Styles
    modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
    modalView: { width: 300, backgroundColor: "white", borderRadius: 15, padding: 20, alignItems: "center" },
    modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
    modalText: { fontSize: 16, marginBottom: 5 },
    closeButton: { marginTop: 15, backgroundColor: "#000", paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20 },
    closeButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
