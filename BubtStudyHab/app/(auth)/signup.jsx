import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import authService from '../../app/service/authService';
import { useRouter } from 'expo-router';

export default function SignUp() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    department: 'CSE',
    semester: '',
    password: '',
  });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    const { fullName, email, department, semester, password } = formData;

    if (!fullName || !email || !department || !semester || !password) {
      return Alert.alert('Error', 'Please fill all fields');
    }

    setLoading(true);
    try {
      const user = await authService.registerUser(formData);

      Alert.alert(
        'Account Created!',
        `Welcome, ${user.email}!`,
        [
          { text: 'Login', onPress: () => router.replace('/signin') },
        ],
        { cancelable: false }
      );
    } catch (err) {
      let message = '';
      if (err.code === 'auth/email-already-in-use') message = 'This email is already registered.';
      else if (err.code === 'auth/invalid-email') message = 'Please enter a valid email.';
      else if (err.code === 'auth/weak-password') message = 'Password should be at least 6 characters.';
      else message = err.message;

      Alert.alert('Sign Up Failed', message);
    }
    setLoading(false);
  };

  const InputField = ({ icon, placeholder, value, onChangeText, secureTextEntry, keyboardType, isPassword, lib="Ionicons" }) => (
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
          <Ionicons name={showPass ? "eye-outline" : "eye-off-outline"} size={20} color="#64748B" />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <LinearGradient colors={['#0F172A', '#020617']} style={styles.container}>
      <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView behavior={Platform.OS==='ios'?'padding':'height'} style={{flex:1}}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

          {/* Header */}
          <Animated.View entering={FadeInUp.duration(800)} style={styles.headerArea}>
            <View style={styles.logoCircle}>
              <FontAwesome5 name="user-plus" size={24} color="#22C55E" />
            </View>
            <Text style={styles.title}>Join the Hub</Text>
            <Text style={styles.subtitle}>Create an account to access BUBT CSE resources.</Text>
          </Animated.View>

          {/* Form */}
          <Animated.View entering={FadeInDown.delay(200).duration(800)} style={styles.formArea}>
            <InputField icon="person-outline" placeholder="Full Name" value={formData.fullName} onChangeText={(t)=>setFormData({...formData, fullName:t})}/>
            <InputField icon="mail-outline" placeholder="Email" keyboardType="email-address" value={formData.email} onChangeText={(t)=>setFormData({...formData, email:t})}/>
            <InputField lib="MaterialCommunityIcons" icon="office-building-outline" placeholder="Department" value={formData.department} onChangeText={(t)=>setFormData({...formData, department:t})}/>
            <InputField icon="school-outline" placeholder="Semester" keyboardType="numeric" value={formData.semester} onChangeText={(t)=>setFormData({...formData, semester:t})}/>
            <InputField icon="lock-closed-outline" placeholder="Password" isPassword={true} secureTextEntry={true} value={formData.password} onChangeText={(t)=>setFormData({...formData, password:t})}/>

            {/* Signup Button */}
            <TouchableOpacity onPress={handleSignUp} disabled={loading}>
              <LinearGradient colors={['#22C55E','#16A34A']} style={styles.signUpButton}>
                <Text style={styles.buttonText}>{loading ? 'Creating Account...' : 'Create Account'}</Text>
                <Ionicons name="rocket-outline" size={20} color="#fff"/>
              </LinearGradient>
            </TouchableOpacity>

            {/* Already have account */}
            <View style={{flexDirection:'row', justifyContent:'center', marginTop:20}}>
              <Text style={{color:'#94A3B8'}}>Already have an account? </Text>
              <TouchableOpacity onPress={() => router.replace('/signin')}>
                <Text style={{color:'#22C55E', fontWeight:'bold'}}>Login</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>

        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container:{flex:1}, 
  scrollContent:{paddingHorizontal:25, paddingTop:60, paddingBottom:60},
  headerArea:{alignItems:'center', marginBottom:35},
  logoCircle:{width:65,height:65,borderRadius:22,backgroundColor:'#22C55E15',justifyContent:'center',alignItems:'center',marginBottom:15,borderWidth:1,borderColor:'#22C55E30'},
  title:{color:'#fff', fontSize:28, fontWeight:'900', letterSpacing:0.5},
  subtitle:{color:'#94A3B8', fontSize:14,textAlign:'center',marginTop:10,lineHeight:22,paddingHorizontal:15},
  formArea:{width:'100%'},
  inputWrapper:{flexDirection:'row',alignItems:'center',backgroundColor:'#1E293B',borderRadius:16,marginBottom:16,paddingHorizontal:15,borderWidth:1,borderColor:'#334155'},
  inputIcon:{marginRight:10}, 
  input:{flex:1,color:'#fff',paddingVertical:15,fontSize:15},
  signUpButton:{flexDirection:'row',justifyContent:'center',alignItems:'center',paddingVertical:18,borderRadius:18,gap:10,elevation:8,shadowColor:'#22C55E',shadowOpacity:0.3,shadowRadius:10},
  buttonText:{color:'#fff',fontSize:17,fontWeight:'bold'},
});
