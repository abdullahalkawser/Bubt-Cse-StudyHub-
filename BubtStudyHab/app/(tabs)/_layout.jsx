import React from 'react';
import { StyleSheet, Platform, View } from 'react-native';
import { Tabs } from 'expo-router';
import { HapticTab } from '@/components/haptic-tab';
import { Ionicons, FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur'; // যদি এক্সপো ব্লার ইউজ করতে চান

export default function TabLayout() {
  const iconSize = 22;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#fff', // সিলেক্ট করলে আইকন সাদা হবে
        tabBarInactiveTintColor: '#64748B', 
        tabBarButton: HapticTab,
        tabBarLabelStyle: styles.label,
        tabBarStyle: styles.footer,
        tabBarHideOnKeyboard: true,
        // Active Tab Indicator Background
        tabBarItemStyle: styles.tabItem,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIconBg]}>
              <Ionicons name={focused ? "home" : "home-outline"} size={iconSize} color={color} />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="book"
        options={{
          title: 'Library',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIconBg]}>
              <MaterialCommunityIcons name={focused ? "book-open-variant" : "book-open-outline"} size={iconSize} color={color} />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="notice"
        options={{
          title: 'Notice',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIconBg]}>
              <Ionicons name={focused ? "notifications" : "notifications-outline"} size={iconSize} color={color} />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="guildline"
        options={{
          title: 'Guide',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIconBg]}>
              <FontAwesome6 name="compass" size={20} color={color} />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="routine"
        options={{
          title: 'Routine',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIconBg]}>
              <Ionicons name={focused ? "calendar" : "calendar-outline"} size={iconSize} color={color} />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIconBg]}>
              <Ionicons name={focused ? "person" : "person-outline"} size={iconSize} color={color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 30 : 20,
    left: 20,
    right: 20,
    backgroundColor: '#111827', // Pitch Black/Dark Blue
    borderRadius: 35,
    height: 75,
    borderTopWidth: 0,
    paddingTop: 0,
    
    // Shadow & Elevation
    shadowColor: '#22C55E', // হালকা সবুজ গ্লো (Glow effect)
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    elevation: 20,
    
    // মডার্ন বর্ডার
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  tabItem: {
    paddingVertical: 10,
  },
  iconContainer: {
    width: 45,
    height: 45,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    transition: '0.3s',
  },
  activeIconBg: {
    backgroundColor: '#22C55E', // আইকন সিলেক্ট করলে এই কালার এর গোল ব্যাকগ্রাউন্ড হবে
    marginTop: -20, // আইকন একটু উপরে উঠে আসবে (Pop effect)
    borderWidth: 4,
    borderColor: '#111827',
  },
  label: {
    fontSize: 10,
    fontWeight: '800',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});