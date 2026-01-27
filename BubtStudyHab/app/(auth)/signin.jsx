import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Switch,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authService from '../../app/service/authService';

import { useRouter } from 'expo-router';

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

const handleLogin = async () => {
  if (!email || !password) {
    Alert.alert('Error', 'Please enter email and password');
    return;
  }
  setLoading(true);
  try {
    const user = await authService.loginUser(email, password);

    // Save to AsyncStorage if remember me
    if (rememberMe) {
      await AsyncStorage.setItem('userEmail', email);
    } else {
      await AsyncStorage.removeItem('userEmail');
    }

    Alert.alert('Success', `Welcome back, ${user.email}!`);
    router.replace('/home'); // Navigate to home
  } catch (err) {
    console.log(err);
    Alert.alert('Login Failed', err.message);
  }
  setLoading(false);
};

  return (
    <LinearGradient colors={['#0F172A', '#020617']} style={styles.container}>
      <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={styles.innerContainer}>
          {/* Header */}
          <Animated.View entering={FadeInUp.duration(800)} style={styles.headerArea}>
            <View style={styles.iconCircle}>
              <FontAwesome5 name="university" size={30} color="#22C55E" />
            </View>
            <Text style={styles.title}>BUBT CSE Hub</Text>
            <Text style={styles.subtitle}>Welcome back! Access your academic resources with ease  for your acadmic journey.</Text>
          </Animated.View>

          {/* Form */}
          <Animated.View entering={FadeInDown.delay(200).duration(800)} style={styles.formArea}>
            {/* Email Input */}
            <View style={styles.inputWrapper}>
              <Ionicons name="mail-outline" size={20} color="#94A3B8" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Institutional Email"
                placeholderTextColor="#64748B"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
              />
            </View>

            {/* Password Input */}
            <View style={styles.inputWrapper}>
              <Ionicons name="lock-closed-outline" size={20} color="#94A3B8" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#64748B"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={20}
                  color="#94A3B8"
                />
              </TouchableOpacity>
            </View>

            {/* Remember Me */}
            <View style={styles.utilsRow}>
              <View style={styles.rememberMeRow}>
                <Switch
                  value={rememberMe}
                  onValueChange={setRememberMe}
                  trackColor={{ false: '#1E293B', true: '#22C55E50' }}
                  thumbColor={rememberMe ? '#22C55E' : '#94A3B8'}
                />
                <Text style={styles.rememberText}>Remember me</Text>
              </View>
            </View>

            {/* Login Button */}
            <TouchableOpacity activeOpacity={0.8} onPress={handleLogin} disabled={loading}>
              <LinearGradient colors={['#22C55E', '#16A34A']} style={styles.loginButton}>
                <Text style={styles.buttonText}>{loading ? 'Signing In...' : 'Sign In'}</Text>
                <Ionicons name="arrow-forward" size={20} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>

          {/* Footer */}
          <Animated.View entering={FadeInDown.delay(400)} style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/signup')}>
              <Text style={styles.linkText}>Register Now</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  innerContainer: { flex: 1, justifyContent: 'center', paddingHorizontal: 25 },
  headerArea: { alignItems: 'center', marginBottom: 35 },
  iconCircle: { 
    width: 65, height: 65, borderRadius: 22, 
    backgroundColor: '#22C55E15', justifyContent: 'center', 
    alignItems: 'center', marginBottom: 15,
    borderWidth: 1, borderColor: '#22C55E30'
  },
  title: { color: '#fff', fontSize: 26, fontWeight: '900', letterSpacing: 0.5 },
  subtitle: { color: '#94A3B8', fontSize: 13, textAlign: 'center', marginTop: 8, lineHeight: 20, paddingHorizontal: 20 },
  formArea: { width: '100%' },
  inputWrapper: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#1E293B', borderRadius: 16,
    marginBottom: 14, paddingHorizontal: 15,
    borderWidth: 1, borderColor: '#334155'
  },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, color: '#fff', paddingVertical: 14, fontSize: 15 },
  utilsRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 25, marginTop: 5 },
  rememberMeRow: { flexDirection: 'row', alignItems: 'center' },
  rememberText: { color: '#94A3B8', fontSize: 13, marginLeft: 8 },
  loginButton: {
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
    paddingVertical: 16, borderRadius: 16, gap: 10,
    elevation: 8, shadowColor: '#22C55E', shadowOpacity: 0.3, shadowRadius: 10
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 35 },
  footerText: { color: '#94A3B8', fontSize: 14 },
  linkText: { color: '#22C55E', fontSize: 14, fontWeight: 'bold' },
});
