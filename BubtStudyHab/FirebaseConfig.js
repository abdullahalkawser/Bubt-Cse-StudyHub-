// FirebaseConfig.js
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgAkqxd07NiNoBQftllS0S8wW_09RGnkM",
  authDomain: "bubtcsehub.firebaseapp.com",
  projectId: "bubtcsehub",
  storageBucket: "bubtcsehub.appspot.com", // Correct format
  messagingSenderId: "811459734674",
  appId: "1:811459734674:web:15195a0f5a43629ab38a4b"
};

// Initialize Firebase app
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with React Native persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Firestore instance
export const db = getFirestore(app);

// Storage instance
export const storage = getStorage(app);
