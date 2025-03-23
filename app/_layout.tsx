<<<<<<< HEAD
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
=======
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
          tabBarActiveTintColor: 'white', // Active text/icon color
          tabBarInactiveTintColor: 'gray', // Inactive text/icon color
          tabBarStyle: Platform.select({
            ios: {
              position: 'absolute',
              bottom: 0,
              height: 60,
              backgroundColor: 'black', // Set default background color for the tab bar
            },
            android: {
              height: 60,
              backgroundColor: 'black', // Set default background color for Android
            },
            default: {
              height: 60,
              backgroundColor: 'black', // Set default background color for all platforms
            },
          }),
          tabBarItemStyle: {
            height: 60, // Ensure each tab item is of consistent height
          },
          tabBarIconStyle: {
            marginTop: 5, // Adjust spacing of icons to avoid overlap with text
          },
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
        {/* Nearby Buffet Tab with Proper Icon */}
        <Tabs.Screen
          name="NearbyBuffets"
          options={{
            title: 'Nearby Buffet',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="map-marker-radius" size={size} color={color} />
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
    justifyContent: 'flex-end', // Ensure content does not overlap the tab bar
  },
});
>>>>>>> f383127 (Initial commit)
