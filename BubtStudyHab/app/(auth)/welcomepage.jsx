import React, { useState, useRef } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  SafeAreaView, 
  Dimensions,
  StatusBar,
  Platform
} from 'react-native';
import PagerView from 'react-native-pager-view';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
import { useRouter } from 'expo-router'

const DATA = [
  {
    title: "BUBT CSE\nStudy Hub 📚",
    desc: "Everything a BUBTian needs. Notes, Lectures, and Assignments in one place.",
    imageUrl: require('../../assets/images/1.png'), 
    color: '#00C853'
  },
  {
    title: "Never Miss\na Task ⏰",
    desc: "Stay organized and keep track of your daily academic schedule and deadlines.",
    imageUrl: require('../../assets/images/3.png'), 
    color: '#2196F3'
  },
  {
    title: "Ready to\nLead? 🚀",
    desc: "Unlock your potential and lead the way in your engineering journey at BUBT.",
    imageUrl: require('../../assets/images/2.png'), 
    color: '#6200EE'
  }
];

export default function OnboardingScreen() {
  const [currentPage, setCurrentPage] = useState(0);
  const pagerRef = useRef(null);
  const navigation = useNavigation();
  
  const isLastPage = currentPage === DATA.length - 1;

    const router = useRouter()
  // Navigate to Sign In Page
  const handleFinished = () => {
    // Replace 'SignIn' with the actual name of your login screen in your Stack Navigator
router.push('/home')
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      {/* Header Section */}
      <SafeAreaView style={styles.header}>
        <View style={styles.logoContainer}>
          <Image 
            source={{ uri: 'https://www.bubt.edu.bd/assets/frontend/images/logo.png' }} 
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.headerTitle}>BUBT CSE Hub</Text>
        </View>
        
        {!isLastPage && (
          <TouchableOpacity onPress={handleFinished}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        )}
      </SafeAreaView>

      {/* Slider Section */}
      <PagerView 
        style={styles.pagerView} 
        initialPage={0}
        onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}
        ref={pagerRef}
      >
        {DATA.map((item, index) => (
          <View key={index} style={styles.page}>
            {/* Image Section with Glow */}
            <View style={styles.imageWrapper}>
                <View style={[styles.glowEffect, { backgroundColor: item.color, shadowColor: item.color }]} />
                <Image 
                  source={item.imageUrl} 
                  style={styles.mainImage} 
                  resizeMode="contain" 
                />
            </View>
            
            {/* Text Content */}
            <View style={styles.textSection}>
              <Text style={[styles.title, { color: item.color }]}>{item.title}</Text>
              <Text style={styles.description}>{item.desc}</Text>
            </View>
          </View>
        ))}
      </PagerView>

      {/* Footer Section */}
      <View style={styles.footer}>
        {/* Indicators */}
        <View style={styles.indicatorContainer}>
          {DATA.map((_, i) => (
            <View 
              key={i} 
              style={[
                styles.dot, 
                currentPage === i 
                  ? { backgroundColor: DATA[i].color, width: 28, opacity: 1 } 
                  : { backgroundColor: '#334155', opacity: 0.5 }
              ]} 
            />
          ))}
        </View>

        {/* Action Button */}
        <TouchableOpacity 
          activeOpacity={0.8}
          style={[styles.nextButton, { backgroundColor: DATA[currentPage].color, shadowColor: DATA[currentPage].color }]}
          onPress={() => {
            if (isLastPage) {
              handleFinished();
            } else {
              pagerRef.current?.setPage(currentPage + 1);
            }
          }}
        >
          <Text style={styles.nextText}>
            {isLastPage ? "Get Started" : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#05080D',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    marginTop: Platform.OS === 'android' ? 45 : 10,
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
  },
  logo: {
    width: 26,
    height: 26,
    marginRight: 10,
  },
  headerTitle: {
    color: '#f7faff',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  skipText: {
    color: '#fcfeff',
    fontSize: 15,
    fontWeight: '600',
    opacity: 0.7,
  },
  pagerView: {
    flex: 1,
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  imageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.35,
    position: 'relative',
  },
  mainImage: {
    width: width * 0.85,
    height: width * 0.85,
    zIndex: 2,
  },
  glowEffect: {
    position: 'absolute',
    width: width * 0.5,
    height: width * 0.5,
    borderRadius: width,
    opacity: 0.2,
    // Shadows for pop-out effect
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 50,
    elevation: 20,
  },
  textSection: {
    marginTop: 50,
  },
  title: {
    fontSize: 38,
    fontWeight: '900',
    lineHeight: 46,
    marginBottom: 15,
    letterSpacing: -0.5,
  },
  description: {
    color: '#fcfeff',
    fontSize: 17,
    lineHeight: 26,
    opacity: 0.8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingBottom: 50,
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    height: 6,
    borderRadius: 10,
    marginHorizontal: 3,
  },
  nextButton: {
    paddingVertical: 16,
    paddingHorizontal: 35,
    borderRadius: 20,
    // Button Glow
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 10,
    minWidth: 140,
    alignItems: 'center',
  },
  nextText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
});