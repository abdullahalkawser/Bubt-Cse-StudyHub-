import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, 
  TextInput, SafeAreaView, StatusBar, Dimensions, Platform
} from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

// স্ট্যাটাস বারের হাইট ক্যালকুলেট করা (Android এর জন্য বিশেষ করে)
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 40 : StatusBar.currentHeight;

export default function LibraryScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  const libraryData = [
    { id: '1', subject: 'Data Structures', icon: 'file-tree', color: '#22C55E', files: [{ id: '1a', title: 'Array & Linked List', size: '2.4 MB' }, { id: '1b', title: 'Tree & Graph', size: '3.1 MB' }, { id: '1c', title: 'DP Guide', size: '1.8 MB' }] },
    { id: '2', subject: 'Operating Systems', icon: 'memory', color: '#3B82F6', files: [{ id: '2a', title: 'Process Mgmt', size: '1.5 MB' }, { id: '2b', title: 'Memory Mgmt', size: '2.2 MB' }, { id: '2c', title: 'Deadlocks', size: '1.2 MB' }] },
    { id: '3', subject: 'DBMS', icon: 'database', color: '#F59E0B', files: [{ id: '3a', title: 'SQL Mastery', size: '4.1 MB' }, { id: '3b', title: 'Normalization', size: '1.4 MB' }, { id: '3c', title: 'ER Modeling', size: '2.0 MB' }] },
    { id: '4', subject: 'Networking', icon: 'lan', color: '#06B6D4', files: [{ id: '4a', title: 'OSI Model', size: '2.8 MB' }, { id: '4b', title: 'TCP/IP Suite', size: '3.5 MB' }] },
  ];

  const filteredData = libraryData.filter(section => 
    (activeTab === 'All' || section.subject === activeTab) &&
    (section.subject.toLowerCase().includes(search.toLowerCase()) || 
     section.files.some(f => f.title.toLowerCase().includes(search.toLowerCase())))
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      {/* --- Modern Fixed Header --- */}
      <View style={styles.headerWrapper}>
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => router.back()} 
            style={styles.backButton}
            activeOpacity={0.7}
          >
            <Ionicons name="chevron-back" size={24} color="#fff" />
          </TouchableOpacity>
          
          <View style={styles.titleContainer}>
             <Text style={styles.headerTitle}>PDF Library</Text>
             <View style={styles.onlineBadge}>
                <View style={styles.onlineDot} />
                <Text style={styles.headerSub}>CSE Resources</Text>
             </View>
          </View>

          <TouchableOpacity style={styles.notificationBtn}>
            <MaterialCommunityIcons name="bell-badge-outline" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingTop: 20, paddingBottom: 100 }}>
        
        {/* --- Search & Filters --- */}
        <View style={styles.topSection}>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#94A3B8" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search subjects or PDF..."
              placeholderTextColor="#64748B"
              value={search}
              onChangeText={setSearch}
            />
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabScroll}>
            {['All', ...libraryData.map(d => d.subject)].map((tab) => (
              <TouchableOpacity 
                key={tab} 
                onPress={() => setActiveTab(tab)}
                style={[styles.tabItem, activeTab === tab && styles.activeTabItem]}
              >
                <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* --- Content Sections --- */}
        {filteredData.map((section) => (
          <View key={section.id} style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <View style={styles.titleGroup}>
                <MaterialCommunityIcons name={section.icon} size={22} color={section.color} />
                <Text style={styles.sectionText}>{section.subject}</Text>
              </View>
              <TouchableOpacity>
                <Text style={[styles.seeMore, { color: section.color }]}>View All</Text>
              </TouchableOpacity>
            </View>
            
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false} 
              contentContainerStyle={styles.horizontalScroll}
              snapToAlignment="start"
              decelerationRate="fast"
            >
              {section.files.map(file => (
                <TouchableOpacity 
                  style={[styles.fileCard, { borderColor: section.color + '30' }]} 
                  key={file.id}
                >
                  <View style={[styles.iconBox, { backgroundColor: section.color + '15' }]}>
                    <MaterialCommunityIcons name="file-pdf-box" size={30} color={section.color} />
                  </View>
                  <View style={styles.fileDetails}>
                    <Text style={styles.fileTitle} numberOfLines={2}>{file.title}</Text>
                    <View style={styles.fileFooter}>
                      <Text style={styles.fileSize}>{file.size}</Text>
                      <Ionicons name="arrow-down-circle" size={18} color={section.color} />
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020617' },
  
  // Header Fixes
  headerWrapper: {
    backgroundColor: '#0F172A',
    paddingTop: STATUSBAR_HEIGHT + 10,
    paddingBottom: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    backgroundColor: '#1E293B',
    padding: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#334155',
  },
  titleContainer: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 0.5,
  },
  onlineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  onlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#22C55E',
    marginRight: 6,
  },
  headerSub: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '500',
  },
  notificationBtn: {
    padding: 5,
  },

  // Search & Filter styles
  topSection: { marginTop: 10, marginBottom: 20 },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F172A',
    marginHorizontal: 20,
    paddingHorizontal: 15,
    paddingVertical: 14,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#1E293B',
    marginBottom: 15,
  },
  searchInput: { flex: 1, marginLeft: 10, color: '#fff', fontSize: 16 },
  tabScroll: { paddingLeft: 20 },
  tabItem: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 12,
    marginRight: 10,
    backgroundColor: '#1E293B',
  },
  activeTabItem: { backgroundColor: '#3B82F6' },
  tabText: { color: '#94A3B8', fontWeight: '600' },
  activeTabText: { color: '#fff' },

  // List & Cards
  sectionContainer: { marginBottom: 30 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 22,
    marginBottom: 15,
  },
  titleGroup: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  sectionText: { color: '#F1F5F9', fontSize: 18, fontWeight: '700' },
  seeMore: { fontSize: 13, fontWeight: '600' },
  horizontalScroll: { paddingLeft: 20, paddingRight: 10 },
  fileCard: {
    backgroundColor: '#0F172A',
    width: width * 0.46,
    height: 180,
    borderRadius: 26,
    padding: 16,
    marginRight: 15,
    borderWidth: 1,
    justifyContent: 'space-between',
  },
  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fileDetails: { flex: 1, justifyContent: 'flex-end', marginTop: 10 },
  fileTitle: { color: '#F8FAFC', fontSize: 15, fontWeight: '700', lineHeight: 20 },
  fileFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  fileSize: { color: '#64748B', fontSize: 12, fontWeight: '500' },
});