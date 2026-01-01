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
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <LinearGradient colors={['#0F172A', '#020617']} style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={{ flex: 1 }}
      >
        <View style={styles.innerContainer}>
          
          {/* Top Section */}
          <Animated.View entering={FadeInUp.duration(800)} style={styles.headerArea}>
            <View style={styles.iconCircle}>
              <FontAwesome5 name="university" size={30} color="#22C55E" />
            </View>
            <Text style={styles.title}>BUBT CSE Hub</Text>
            <Text style={styles.subtitle}>Welcome back! Access your academic resources with ease.</Text>
          </Animated.View>

          {/* Form Section */}
          <Animated.View entering={FadeInDown.delay(200).duration(800)} style={styles.formArea}>
            
            {/* Name Input (New) */}
            <View style={styles.inputWrapper}>
              <Ionicons name="person-outline" size={20} color="#94A3B8" style={styles.inputIcon} />
              <TextInput 
                style={styles.input} 
                placeholder="Full Name" 
                placeholderTextColor="#64748B" 
              />
            </View>

            {/* Email Input */}
            <View style={styles.inputWrapper}>
              <Ionicons name="mail-outline" size={20} color="#94A3B8" style={styles.inputIcon} />
              <TextInput 
                style={styles.input} 
                placeholder="Institutional Email" 
                placeholderTextColor="#64748B" 
                keyboardType="email-address"
              />
            </View>

            {/* Password Input with Visibility Toggle */}
            <View style={styles.inputWrapper}>
              <Ionicons name="lock-closed-outline" size={20} color="#94A3B8" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#64748B"
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons 
                  name={showPassword ? "eye-outline" : "eye-off-outline"} 
                  size={20} 
                  color="#94A3B8" 
                />
              </TouchableOpacity>
            </View>

            {/* Remember Me & Forgot Password */}
            <View style={styles.utilsRow}>
              <View style={styles.rememberMeRow}>
                <Switch
                  value={rememberMe}
                  onValueChange={setRememberMe}
                  trackColor={{ false: "#1E293B", true: "#22C55E50" }}
                  thumbColor={rememberMe ? "#22C55E" : "#94A3B8"}
                />
                <Text style={styles.rememberText}>Remember me</Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            {/* Login Button */}
         <Link href="/home" asChild>
  <TouchableOpacity activeOpacity={0.8}>
    <LinearGradient colors={['#22C55E', '#16A34A']} style={styles.loginButton}>
      <Text style={styles.buttonText}>Sign In</Text>
      <Ionicons name="arrow-forward" size={20} color="#fff" />
    </LinearGradient>
  </TouchableOpacity>
</Link>


          </Animated.View>

          {/* Divider */}
          <View style={styles.dividerArea}>
            <View style={styles.line} />
            <Text style={styles.dividerText}>OR LOGIN WITH</Text>
            <View style={styles.line} />
          </View>

          {/* Social Logins */}
          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.socialBtn}>
              <Ionicons name="logo-google" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialBtn}>
              <Ionicons name="logo-github" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <Animated.View entering={FadeInDown.delay(400)} style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <Link href="/signup" asChild>
              <TouchableOpacity>
                <Text style={styles.linkText}>Register Now</Text>
              </TouchableOpacity>
            </Link>
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
  
  utilsRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 25,
    marginTop: 5 
  },
  rememberMeRow: { flexDirection: 'row', alignItems: 'center' },
  rememberText: { color: '#94A3B8', fontSize: 13, marginLeft: 8 },
  forgotText: { color: '#22C55E', fontSize: 13, fontWeight: '600' },
  
  loginButton: {
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
    paddingVertical: 16, borderRadius: 16, gap: 10,
    elevation: 8, shadowColor: '#22C55E', shadowOpacity: 0.3, shadowRadius: 10
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },

  dividerArea: { flexDirection: 'row', alignItems: 'center', marginVertical: 25 },
  line: { flex: 1, height: 1, backgroundColor: '#334155' },
  dividerText: { color: '#475569', marginHorizontal: 15, fontSize: 10, fontWeight: 'bold' },

  socialRow: { flexDirection: 'row', justifyContent: 'center', gap: 15 },
  socialBtn: { 
    width: 55, height: 55, borderRadius: 18, 
    backgroundColor: '#1E293B', justifyContent: 'center', 
    alignItems: 'center', borderWidth: 1, borderColor: '#334155' 
  },

  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 35 },
  footerText: { color: '#94A3B8', fontSize: 14 },
  linkText: { color: '#22C55E', fontSize: 14, fontWeight: 'bold' },
});