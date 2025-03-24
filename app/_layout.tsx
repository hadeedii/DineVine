import { Tabs } from 'expo-router';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { Platform, StyleSheet, View } from 'react-native';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <View style={styles.container}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: Platform.select({
            ios: { position: 'absolute', bottom: 0, height: 60, backgroundColor: 'black' },
            android: { height: 60, backgroundColor: 'black' },
            default: { height: 60, backgroundColor: 'black' },
          }),
          tabBarItemStyle: { height: 60 },
          tabBarIconStyle: { marginTop: 5 },
        }}
      >
        {/* Home Tab */}
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />
        
        {/* Restaurants Tab */}
        <Tabs.Screen
          name="restaurantList"
          options={{
            title: 'Restaurants',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="silverware-fork-knife" size={size} color={color} />
            ),
          }}
        />
        
        {/* Buffet Tab */}
        <Tabs.Screen
          name="buffetMenu"
          options={{
            title: 'Buffet',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="food" size={size} color={color} />
            ),
          }}
        />

        {/* Explore Tab */}
        <Tabs.Screen
          name="explore"
          options={{
            title: 'Explore',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="compass-outline" size={size} color={color} />
            ),
          }}
        />

        {/* Nearby Buffet Tab (Fixed) */}
        <Tabs.Screen
          name="NearbyBuffets"
          options={{
            title: 'Nearby Buffet',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="map-marker-radius" size={size} color={color} />
            ),
          }}
        />

        {/* Profile Tab */}
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="user" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end', // Prevents overlap with tab bar
  },
});
