import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, 
  TextInput, Dimensions, SafeAreaView, StatusBar 
} from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function LecturesPage() {
  const [search, setSearch] = useState('');

  // আপনার দেওয়া ডাটা ফরম্যাট অনুযায়ী লেকচার ডাটা
  const lectureSections = [
    {
      id: 1,
      title: 'Data Structures Lectures',
      icon: 'play-circle-outline',
      color: '#22C55E',
      lectures: [
        { name: 'Intro to Arrays', duration: '12:40', tutor: 'Dr. Smith' },
        { name: 'Linked List Basics', duration: '15:20', tutor: 'Prof. Jhon' },
        { name: 'Stack Implementation', duration: '10:15', tutor: 'Dr. Smith' },
        { name: 'Binary Tree Logic', duration: '22:00', tutor: 'Sarah Khan' },
      ],
    },
    {
      id: 2,
      title: 'Algorithms Lectures',
      icon: 'xml',
      color: '#3B82F6',
      lectures: [
        { name: 'Merge Sort Deep Dive', duration: '18:30', tutor: 'Alex Root' },
        { name: 'Binary Search Mastery', duration: '08:45', tutor: 'Prof. Jhon' },
        { name: 'Dynamic Programming', duration: '35:10', tutor: 'Dr. Smith' },
      ],
    },
    {
      id: 3,
      title: 'Database (DBMS) Lectures',
      icon: 'database',
      color: '#F59E0B',
      lectures: [
        { name: 'SQL Joins Explained', duration: '14:20', tutor: 'Sarah Khan' },
        { name: 'Database Normalization', duration: '25:00', tutor: 'Alex Root' },
      ],
    },
    {
        id: 4,
        title: 'Operating Systems',
        icon: 'memory',
        color: '#EF4444',
        lectures: [
          { name: 'Process Mgmt', duration: '14:20', tutor: 'Prof. Jhon' },
          { name: 'Deadlock Avoidance', duration: '25:00', tutor: 'Alex Root' },
        ],
      },
  ];

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />
      <SafeAreaView style={styles.safeArea} />
      
      {/* --- Header --- */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>🎓 Video Lectures</Text>
          <Text style={styles.headerSubtitle}>Learn from the experts</Text>
        </View>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="filter" size={22} color="#22C55E" />
        </TouchableOpacity>
      </View>

      {/* --- Search Bar --- */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#64748B" />
        <TextInput
          placeholder="Search for a video..."
          placeholderTextColor="#64748B"
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <ScrollView ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {lectureSections.map((section) => {
          // সার্চ ফিল্টারিং (সেকশন টাইটেল অথবা লেকচার নাম)
          const isSectionMatch = section.title.toLowerCase().includes(search.toLowerCase());
          const matchedLectures = section.lectures.filter(lec => 
            lec.name.toLowerCase().includes(search.toLowerCase())
          );

          const lecturesToShow = isSectionMatch ? section.lectures : matchedLectures;
          if (lecturesToShow.length === 0) return null;

          return (
            <View key={section.id} style={styles.sectionWrapper}>
              {/* Section Header */}
              <View style={styles.sectionHeader}>
                <MaterialCommunityIcons name={section.icon} size={22} color={section.color} />
                <Text style={styles.sectionTitleText}>{section.title}</Text>
              </View>

              {/* Horizontal Lecture Cards */}
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false} 
                contentContainerStyle={styles.horizontalList}
              >
                {lecturesToShow.map((lec, index) => (
                  <TouchableOpacity key={index} style={styles.lectureCard} activeOpacity={0.8}>
                    {/* Video Thumbnail Placeholder */}
                    <View style={[styles.thumbnail, { backgroundColor: section.color + '15' }]}>
                      <MaterialCommunityIcons name="play-circle" size={40} color={section.color} />
                      <View style={styles.durationBadge}>
                        <Text style={styles.durationText}>{lec.duration}</Text>
                      </View>
                    </View>
                    
                    <View style={styles.cardInfo}>
                      <Text style={styles.lecName} numberOfLines={1}>{lec.name}</Text>
                      <Text style={styles.tutorName}>{lec.tutor}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#0F172A' ,paddingTop:40},
  safeArea: { backgroundColor: '#0F172A' },
  header: { paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15, marginBottom: 20 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
  headerSubtitle: { fontSize: 13, color: '#94A3B8' },
  iconButton: { backgroundColor: '#1E293B', padding: 10, borderRadius: 12 },
  
  searchContainer: { 
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#1E293B', 
    marginHorizontal: 20, paddingHorizontal: 15, height: 50, borderRadius: 15, 
    marginBottom: 20, borderWidth: 1, borderColor: '#334155' 
  },
  searchInput: { flex: 1, marginLeft: 10, color: '#fff' },

  sectionWrapper: { marginBottom: 25 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginBottom: 12 },
  sectionTitleText: { fontSize: 17, fontWeight: 'bold', color: '#fff', marginLeft: 8 },
  
  horizontalList: { paddingLeft: 20, paddingRight: 10 },
  lectureCard: { 
    backgroundColor: '#1E293B', width: width * 0.55, borderRadius: 18, 
    marginRight: 15, borderWidth: 1, borderColor: '#334155', overflow: 'hidden' 
  },
  thumbnail: { 
    height: 100, width: '100%', justifyContent: 'center', alignItems: 'center', 
    position: 'relative' 
  },
  durationBadge: { 
    position: 'absolute', bottom: 8, right: 8, backgroundColor: 'rgba(0,0,0,0.7)', 
    paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 
  },
  durationText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  cardInfo: { padding: 12 },
  lecName: { color: '#fff', fontSize: 14, fontWeight: 'bold', marginBottom: 4 },
  tutorName: { color: '#64748B', fontSize: 12 }
});