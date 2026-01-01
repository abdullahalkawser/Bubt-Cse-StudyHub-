import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { Tabs } from 'expo-router';
import { HapticTab } from '@/components/haptic-tab';
import { Ionicons, MaterialIcons, FontAwesome5, Entypo } from '@expo/vector-icons';

export default function TabLayout() {
  const iconSize = 22;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#22C55E', // Active Green Color
        tabBarInactiveTintColor: '#94A3B8', // Inactive Gray Color
        tabBarButton: HapticTab,
        tabBarLabelStyle: styles.label,
        tabBarStyle: styles.footer,
      }}
    >
      {/* Home Tab */}
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Ionicons name="home" size={iconSize} color={color} />,
        }}
      />

      {/* Book Tab */}
      <Tabs.Screen
        name="book"
        options={{
          title: 'Library',
          tabBarIcon: ({ color }) => <FontAwesome5 name="book-open" size={18} color={color} />,
        }}
      />

      {/* Notes Tab */}
      <Tabs.Screen
        name="notes"
        options={{
          title: 'Notes',
          tabBarIcon: ({ color }) => <MaterialIcons name="description" size={iconSize} color={color} />,
        }}
      />

      {/* Lectures Tab */}
      <Tabs.Screen
        name="notice"
        options={{
          title: 'Notice',
          tabBarIcon: ({ color }) => <FontAwesome5 name="video" size={18} color={color} />,
        }}
      />

      {/* Assignments Tab */}
      <Tabs.Screen
        name="assignments"
        options={{
          title: 'Tasks',
          tabBarIcon: ({ color }) => <Entypo name="list" size={iconSize} color={color} />,
        }}
      />

      {/* Profile Tab */}
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <Ionicons name="person" size={iconSize} color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  footer: {
    position: 'absolute', // ট্যাব বারকে ভাসমান করার জন্য
    bottom: 15,
    left: 15,
    right: 15,
    backgroundColor: '#1E293B', // ডার্ক ব্লু ব্যাকগ্রাউন্ড
    borderRadius: 25,
    height: 70,
    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
    paddingTop: 10,
    borderTopWidth: 0, // বর্ডার রিমুভ করা হয়েছে
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 15,
    elevation: 10,
  },
  label: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 2,
  },
});