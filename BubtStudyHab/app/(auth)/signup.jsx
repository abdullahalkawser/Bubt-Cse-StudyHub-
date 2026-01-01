import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  StatusBar, 
  KeyboardAvoidingView, 
  Platform,
  Switch
} from 'react-native';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';

export default function SignUp() {
  // Form State
  const [formData, setFormData] = useState({
    fullName: '', 
    email: '', 
    username: '', 
    department: 'CSE', 
    semester: '', 
    password: ''
  });

  // UI State
  const [showPass, setShowPass] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);

  const handleSignUp = () => {
    if(!isAgreed) {
        alert("Please agree to the Terms of Service");
        return;
    }
    console.log("Registering User:", formData);
  };

  // Custom Input Component for clean code
  const InputField = ({ icon, placeholder, value, onChangeText, secureTextEntry, keyboardType, isPassword, lib = "Ionicons" }) => (
    <View style={styles.inputWrapper}>
      {lib === "Ionicons" ? (
        <Ionicons name={icon} size={20} color="#94A3B8" style={styles.inputIcon} />
      ) : (
        <MaterialCommunityIcons name={icon} size={20} color="#94A3B8" style={styles.inputIcon} />
      )}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#64748B"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry && !showPass}
        keyboardType={keyboardType}
      />
      {isPassword && (
        <TouchableOpacity onPress={() => setShowPass(!showPass)}>
          <Ionicons 
            name={showPass ? "eye-outline" : "eye-off-outline"} 
            size={20} 
            color="#64748B" 
          />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <LinearGradient colors={['#0F172A', '#020617']} style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={{ flex: 1 }}
      >
        <ScrollView 
          showsVerticalScrollIndicator={false} 
          contentContainerStyle={styles.scrollContent}
        >
          
          {/* Header Section */}
          <Animated.View entering={FadeInUp.duration(800)} style={styles.headerArea}>
            <View style={styles.logoCircle}>
              <FontAwesome5 name="user-plus" size={24} color="#22C55E" />
            </View>
            <Text style={styles.title}>Join the Hub</Text>
            <Text style={styles.subtitle}>Create an account to access BUBT CSE resources and stay organized.</Text>
          </Animated.View>

          {/* Registration Form Area */}
          <Animated.View entering={FadeInDown.delay(200).duration(800)} style={styles.formArea}>
            
            <InputField 
              icon="person-outline" 
              placeholder="Full Name" 
              value={formData.fullName} 
              onChangeText={(t) => setFormData({...formData, fullName: t})} 
            />

            <InputField 
              icon="mail-outline" 
              placeholder="Institutional Email" 
              keyboardType="email-address"
              value={formData.email} 
              onChangeText={(t) => setFormData({...formData, email: t})} 
            />

            <InputField 
              icon="at-circle-outline" 
              placeholder="Username" 
              value={formData.username} 
              onChangeText={(t) => setFormData({...formData, username: t})} 
            />

            <View style={styles.rowInputs}>
               <View style={{flex: 1.4, marginRight: 10}}>
                  <InputField 
                    icon="office-building-outline" 
                    lib="MaterialCommunityIcons"
                    placeholder="Dept (CSE)" 
                    value={formData.department} 
                    onChangeText={(t) => setFormData({...formData, department: t})} 
                  />
               </View>
               <View style={{flex: 1}}>
                  <InputField 
                    icon="school-outline" 
                    placeholder="Semester" 
                    keyboardType="numeric"
                    value={formData.semester} 
                    onChangeText={(t) => setFormData({...formData, semester: t})} 
                  />
               </View>
            </View>

            <InputField 
              icon="lock-closed-outline" 
              placeholder="Create Password" 
              isPassword={true}
              secureTextEntry={true} 
              value={formData.password} 
              onChangeText={(t) => setFormData({...formData, password: t})} 
            />

            {/* Terms & Conditions Switch */}
            <View style={styles.termsContainer}>
              <Switch
                value={isAgreed}
                onValueChange={setIsAgreed}
                trackColor={{ false: "#1E293B", true: "#22C55E50" }}
                thumbColor={isAgreed ? "#22C55E" : "#64748B"}
              />
              <Text style={styles.termsText}>
                I agree to the <Text style={styles.linkText}>Terms & Conditions</Text>
              </Text>
            </View>

            {/* Submit Button */}
            <TouchableOpacity 
              activeOpacity={0.8} 
              onPress={handleSignUp}
              disabled={!isAgreed}
            >
              <LinearGradient 
                colors={isAgreed ? ['#22C55E', '#16A34A'] : ['#334155', '#1E293B']} 
                style={styles.signUpButton}
              >
                <Text style={styles.buttonText}>Create Account</Text>
                <Ionicons name="rocket-outline" size={20} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>

          </Animated.View>

          {/* Social Divider (Optional) */}
          <View style={styles.dividerArea}>
            <View style={styles.line} />
            <Text style={styles.dividerText}>ALREADY A MEMBER?</Text>
            <View style={styles.line} />
          </View>

          {/* Footer Navigation */}
          <Animated.View entering={FadeInDown.delay(400)} style={styles.footer}>
            <Link href="/signin" asChild>
              <TouchableOpacity style={styles.loginBtn}>
                <Text style={styles.footerText}>Back to <Text style={styles.linkText}>Login</Text></Text>
              </TouchableOpacity>
            </Link>
          </Animated.View>

        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingHorizontal: 25, paddingTop: 60, paddingBottom: 60 },
  
  headerArea: { alignItems: 'center', marginBottom: 35 },
  logoCircle: { 
    width: 65, height: 65, borderRadius: 22, 
    backgroundColor: '#22C55E15', justifyContent: 'center', 
    alignItems: 'center', marginBottom: 15,
    borderWidth: 1, borderColor: '#22C55E30'
  },
  title: { color: '#fff', fontSize: 28, fontWeight: '900', letterSpacing: 0.5 },
  subtitle: { color: '#94A3B8', fontSize: 14, textAlign: 'center', marginTop: 10, lineHeight: 22, paddingHorizontal: 15 },
  
  formArea: { width: '100%' },
  inputWrapper: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#1E293B', borderRadius: 16,
    marginBottom: 16, paddingHorizontal: 15,
    borderWidth: 1, borderColor: '#334155'
  },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, color: '#fff', paddingVertical: 15, fontSize: 15 },
  
  rowInputs: { flexDirection: 'row', justifyContent: 'space-between' },

  termsContainer: { 
    flexDirection: 'row', alignItems: 'center', 
    marginVertical: 10, marginBottom: 25, paddingLeft: 5 
  },
  termsText: { color: '#94A3B8', fontSize: 13, marginLeft: 10 },

  signUpButton: {
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
    paddingVertical: 18, borderRadius: 18, gap: 10,
    elevation: 8, shadowColor: '#22C55E', shadowOpacity: 0.3, shadowRadius: 10
  },
  buttonText: { color: '#fff', fontSize: 17, fontWeight: 'bold' },

  dividerArea: { flexDirection: 'row', alignItems: 'center', marginVertical: 35 },
  line: { flex: 1, height: 1, backgroundColor: '#1E293B' },
  dividerText: { color: '#475569', marginHorizontal: 15, fontSize: 10, fontWeight: 'bold' },

  footer: { alignItems: 'center' },
  footerText: { color: '#94A3B8', fontSize: 15 },
  linkText: { color: '#22C55E', fontWeight: 'bold' },
});