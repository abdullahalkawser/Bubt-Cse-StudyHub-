import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

export const COLORS = {
  background: "#0F172A",
  card: "#1E293B",
  border: "#334155",

  primary: "#6366F1",
  primaryHover: "#4F46E5",
  secondary: "#10B981",
  highlight: "#F59E0B",

  textPrimary: "#F8FAFC",
  textSecondary: "#CBD5E1",
  textMuted: "#94A3B8",
  error: "#EF4444",
};

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace("Login");
    }, 4000);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>StudyHub</Text>
      <Text style={styles.tagline}>Learn • Organize • Grow</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    fontSize: 36,
    color: COLORS.primary,
    fontWeight: "bold",
  },
  tagline: {
    marginTop: 10,
    color: COLORS.textMuted,
  },
});
