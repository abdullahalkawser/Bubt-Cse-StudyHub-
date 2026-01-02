import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  TextInput, Dimensions, Modal, SafeAreaView, StatusBar, Platform
} from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

// Status Bar এর হাইট ক্যালকুলেশন
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 44 : StatusBar.currentHeight;

export const APP_DATA = [
  {
    id: 'notes',
    title: 'Study Notes',
    icon: 'book-open-variant',
    color: '#22C55E',
    items: [
      { name: 'Data Structures', detail: 'Arrays, Linked List...', type: 'Note' },
      { name: 'Algorithms', detail: 'Sorting, Searching...', type: 'Note' },
    ],
  },
  {
    id: 'books',
    title: 'PDF Library',
    icon: 'file-pdf-box',
    color: '#3B82F6',
    items: [
      { name: 'Operating Systems', detail: 'Silberschatz Book', type: 'PDF' },
      { name: 'DBMS Manual', detail: 'Korth Database Concepts', type: 'PDF' },
    ],
  },
  {
    id: 'assignments',
    title: 'Assignments',
    icon: 'clipboard-text-outline',
    color: '#F59E0B',
    items: [
      { name: 'Networking Lab', detail: 'Due: 25th Oct', type: 'Task' },
      { name: 'Compiler Design', detail: 'Pending Submission', type: 'Task' },
    ],
  },
  {
    id: 'projects',
    title: 'Projects',
    icon: 'code-braces',
    color: '#EF4444',
    items: [
      { name: 'E-commerce App', detail: 'React Native & Firebase', type: 'Code' },
      { name: 'AI Chatbot', detail: 'Python & NLP', type: 'Code' },
    ],
  },
];

export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  const filteredData = APP_DATA.map(section => ({
    ...section,
    items: section.items.filter(item => 
      item.name.toLowerCase().includes(search.toLowerCase())
    )
  })).filter(section => section.items.length > 0);

  const openDetail = (item, color) => {
    setSelectedItem({ ...item, color });
    setModalVisible(true);
  };

  return (
    <View style={styles.mainContainer}>
      {/* StatusBar কে Translucent করে দেওয়া হলো */}
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      {/* Header Wrapper: এটি হেডারকে উপরে উঠতে দিবে না */}
      <View style={styles.headerSafeWrapper}>
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>CSE Portal</Text>
            <Text style={styles.headerSubtitle}>Everything you need in one place</Text>
          </View>
          <TouchableOpacity style={styles.profileBtn}>
            <Ionicons name="person" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Search Input */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#64748B" />
          <TextInput
            placeholder="Search items..."
            placeholderTextColor="#64748B"
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Ionicons name="close-circle" size={20} color="#64748B" />
            </TouchableOpacity>
          )}
        </View>

        {filteredData.length > 0 ? (
          filteredData.map((section) => (
            <View key={section.id} style={styles.sectionWrapper}>
              <View style={styles.sectionHeader}>
                <View style={styles.titleRow}>
                  <MaterialCommunityIcons name={section.icon} size={24} color={section.color} />
                  <Text style={styles.sectionTitleText}>{section.title}</Text>
                </View>
                <TouchableOpacity 
                  onPress={() => router.push('/allnote')}
                  style={styles.seeAllBtn}
                >
                  <Text style={[styles.seeAllText, { color: section.color }]}>See All</Text>
                  <Ionicons name="chevron-forward" size={16} color={section.color} />
                </TouchableOpacity>
              </View>

              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
                {section.items.map((item, index) => (
                  <TouchableOpacity 
                    key={index} 
                    style={styles.card}
                    onPress={() => openDetail(item, section.color)}
                  >
                    <View style={[styles.typeBadge, { backgroundColor: section.color + '20' }]}>
                      <Text style={[styles.typeText, { color: section.color }]}>{item.type}</Text>
                    </View>
                    <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
                    <Text style={styles.itemDetail} numberOfLines={2}>{item.detail}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          ))
        ) : (
          <Text style={styles.noResultText}>No items found</Text>
        )}
      </ScrollView>

      {/* Detail Modal */}
      <Modal animationType="slide" transparent visible={modalVisible}>
        <View style={styles.modalOverlay}>
          <TouchableOpacity style={{flex:1}} onPress={()=>setModalVisible(false)} />
          <View style={styles.modalContent}>
              <View style={styles.modalBar} />
              {selectedItem && (
                <View style={{ padding: 25 }}>
                  <Text style={[styles.modalTag, { color: selectedItem.color }]}>{selectedItem.type}</Text>
                  <Text style={styles.modalTitle}>{selectedItem.name}</Text>
                  <Text style={styles.modalDesc}>{selectedItem.detail}</Text>
                  <TouchableOpacity style={[styles.mainActionBtn, { backgroundColor: selectedItem.color }]}>
                    <Text style={styles.actionBtnText}>Open Document</Text>
                  </TouchableOpacity>
                </View>
              )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#0F172A' },
  
  // Header সমাধান
  headerSafeWrapper: {
    paddingTop: STATUSBAR_HEIGHT + 10, // এটি নচ এর নিচ থেকে শুরু হবে
    backgroundColor: '#0F172A',
    paddingBottom: 10,
  },
  header: { 
    paddingHorizontal: 20, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#fff' },
  headerSubtitle: { fontSize: 14, color: '#94A3B8' },
  profileBtn: { backgroundColor: '#334155', padding: 10, borderRadius: 50 },
  
  searchContainer: { 
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#1E293B', 
    marginHorizontal: 20, padding: 12, borderRadius: 15, marginBottom: 25,
    borderWidth: 1, borderColor: '#334155',
    marginTop: 10 // সার্চের উপরে কিছুটা গ্যাপ
  },
  
  searchInput: { flex: 1, marginLeft: 10, color: '#fff' },
  sectionWrapper: { marginBottom: 30 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 15 },
  titleRow: { flexDirection: 'row', alignItems: 'center' },
  sectionTitleText: { fontSize: 20, fontWeight: 'bold', color: '#fff', marginLeft: 10 },
  seeAllBtn: { flexDirection: 'row', alignItems: 'center' },
  seeAllText: { fontSize: 14, fontWeight: '600', marginRight: 4 },
  horizontalList: { paddingLeft: 20 },
  card: { backgroundColor: '#1E293B', width: width * 0.45, padding: 18, borderRadius: 24, marginRight: 15, borderWidth: 1, borderColor: '#334155' },
  typeBadge: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, marginBottom: 10 },
  typeText: { fontSize: 10, fontWeight: 'bold' },
  itemName: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  itemDetail: { color: '#94A3B8', fontSize: 12, lineHeight: 18 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#1E293B', borderTopLeftRadius: 35, borderTopRightRadius: 35, paddingBottom: 40 },
  modalBar: { width: 40, height: 5, backgroundColor: '#334155', borderRadius: 10, alignSelf: 'center', marginTop: 15 },
  modalTag: { fontSize: 12, fontWeight: 'bold', marginBottom: 10 },
  modalTitle: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 10 },
  modalDesc: { fontSize: 16, color: '#94A3B8', marginBottom: 30 },
  mainActionBtn: { padding: 18, borderRadius: 20, alignItems: 'center' },
  actionBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  noResultText: { color: '#94A3B8', textAlign: 'center', marginTop: 20 }
});