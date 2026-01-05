import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { useRouter } from 'expo-router'
import LottieView from 'lottie-react-native'

const { width, height } = Dimensions.get('window')

export default function Home() {
  const router = useRouter()
  const animation = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/welcomepage')
    }, 4000) // 2 সেকেন্ড পরে নেক্সট পেজ

    return () => clearTimeout(timer)
  }, [])

  return (
    <View style={styles.container}>
      <LottieView
        ref={animation}
        source={require('../assets/loti.json')} // তোমার লোট্টি JSON path
        autoPlay
        loop
        style={{ width: width * 0.7, height: height * 0.5 }}
      />
      <Text style={styles.title}>BUBT CSE</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Black background
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginTop: 30,
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
})
