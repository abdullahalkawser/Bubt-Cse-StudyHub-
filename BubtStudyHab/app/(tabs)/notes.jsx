import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, 
  TextInput, Dimensions, Modal, SafeAreaView 
} from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function CSENotesApp() {
  const [search, setSearch] = useState('');
  const [selectedNote, setSelectedNote] = useState(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);

const sections = [
    {
      id: 1,
      title: 'Data Structures',
      icon: 'file-tree',
      color: '#22C55E',
      notes: [
        { name: 'Arrays & Strings', progress: 80 },
        { name: 'Linked Lists', progress: 40 },
        { name: 'Stack & Queue', progress: 10 },
        { name: 'Binary Trees', progress: 0 },
        { name: 'Graph Theory', progress: 0 },
      ],
    },
    {
      id: 2,
      title: 'Algorithms',
      icon: 'xml',
      color: '#3B82F6',
      notes: [
        { name: 'Sorting Algos', progress: 90 },
        { name: 'Binary Search', progress: 70 },
        { name: 'Dynamic Prog.', progress: 5 },
        { name: 'Greedy Algos', progress: 0 },
        { name: 'Backtracking', progress: 0 },
      ],
    },
    {
      id: 3,
      title: 'Database (DBMS)',
      icon: 'database',
      color: '#F59E0B',
      notes: [
        { name: 'SQL Queries', progress: 100 },
        { name: 'Normalization', progress: 50 },
        { name: 'ER Modeling', progress: 20 },
        { name: 'Indexing', progress: 0 },
        { name: 'NoSQL Intro', progress: 0 },
      ],
    },
    {
      id: 4,
      title: 'Operating Systems',
      icon: 'memory',
      color: '#EF4444',
      notes: [
        { name: 'Process Mgmt', progress: 60 },
        { name: 'Deadlocks', progress: 30 },
        { name: 'Memory Mgmt', progress: 0 },
        { name: 'File Systems', progress: 0 },
        { name: 'CPU Scheduling', progress: 0 },
      ],
    },
    {
      id: 5,
      title: 'Computer Networks',
      icon: 'lan',
      color: '#06B6D4',
      notes: [
        { name: 'OSI Model', progress: 85 },
        { name: 'TCP/IP Protocol', progress: 40 },
        { name: 'IP Addressing', progress: 20 },
        { name: 'DNS & HTTP', progress: 0 },
        { name: 'Network Security', progress: 0 },
      ],
    },
     {
      id: 6,
      title: 'Computer Networks',
      icon: 'lan',
      color: '#06B6D4',
      notes: [
        { name: 'OSI Model', progress: 85 },
        { name: 'TCP/IP Protocol', progress: 40 },
        { name: 'IP Addressing', progress: 20 },
        { name: 'DNS & HTTP', progress: 0 },
        { name: 'Network Security', progress: 0 },
      ],
    },
  ];

  const openNote = (note, sectionColor) => {
    setSelectedNote({ ...note, color: sectionColor });
    setDetailModalVisible(true);
  };

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView style={{ flex: 0, backgroundColor: '#1E293B' }} />
      
      {/* --- Header --- */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Study Library</Text>
          <Text style={styles.headerSubtitle}>Master your CSE subjects</Text>
        </View>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="bookmark" size={22} color="#22C55E" />
        </TouchableOpacity>
      </View>

      {/* --- Search Bar --- */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#64748B" />
        <TextInput
          placeholder="Search subject or note title..."
          placeholderTextColor="#64748B"
          style={styles.searchInput}
          value={search}
          onChangeText={(text) => setSearch(text)}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Ionicons name="close-circle" size={18} color="#64748B" />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {sections.map((section) => {
          // ১. চেক করা হচ্ছে সাবজেক্ট টাইটেল সার্চের সাথে মিলে কি না
          const isSectionMatch = section.title.toLowerCase().includes(search.toLowerCase());
          
          // ২. চেক করা হচ্ছে নোটের নাম সার্চের সাথে মিলে কি না
          const matchedNotes = section.notes.filter(note => 
            note.name.toLowerCase().includes(search.toLowerCase())
          );

          // লজিক: যদি সাবজেক্টের নাম মিলে যায়, তবে ওই সেকশনের সব নোট দেখাবে। 
          // আর যদি সাবজেক্টের নাম না মিলে, তবে শুধু মিলে যাওয়া নোটগুলো দেখাবে।
          const notesToShow = isSectionMatch ? section.notes : matchedNotes;

          // যদি কোনো কিছুই না মিলে, তবে এই সেকশন দেখাবে না
          if (notesToShow.length === 0) return null;

          return (
            <View key={section.id} style={styles.sectionContainer}>
              <View style={styles.sectionHeader}>
                <View style={styles.titleRow}>
                   <MaterialCommunityIcons name={section.icon} size={22} color={section.color} />
                   <Text style={styles.sectionTitleText}>{section.title}</Text>
                </View>
              </View>

              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false} 
                contentContainerStyle={styles.horizontalList}
              >
                {notesToShow.map((note, index) => (
                  <TouchableOpacity 
                    key={index} 
                    style={styles.noteCard}
                    onPress={() => openNote(note, section.color)}
                  >
                    <MaterialCommunityIcons name="file-code-outline" size={28} color={section.color} />
                    <Text style={styles.noteName} numberOfLines={2}>{note.name}</Text>
                    <View style={styles.progressSection}>
                      <View style={styles.progressBarBg}>
                        <View style={[styles.progressBarFill, { width: `${note.progress}%`, backgroundColor: section.color }]} />
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          );
        })}
      </ScrollView>

      {/* --- Detail Modal --- */}
      <Modal animationType="slide" transparent={true} visible={detailModalVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setDetailModalVisible(false)}><Ionicons name="close" size={28} color="#fff" /></TouchableOpacity>
              <Text style={styles.modalTitle}>Note Details</Text>
              <View style={{width: 28}} />
            </View>
            {selectedNote && (
              <ScrollView contentContainerStyle={{ padding: 20 }}>
                <Text style={[styles.detailName, {color: selectedNote.color}]}>{selectedNote.name}</Text>
                <Text style={styles.detailText}>{selectedNote.content}</Text>
                <TouchableOpacity style={[styles.actionBtn, { backgroundColor: selectedNote.color }]}><Text style={styles.actionBtnText}>Start Learning</Text></TouchableOpacity>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#0F172A' ,paddingTop:40},
  header: { paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 20 },
  headerTitle: { fontSize: 26, fontWeight: 'bold', color: '#fff' },
  headerSubtitle: { fontSize: 14, color: '#94A3B8' },
  iconButton: { backgroundColor: '#1E293B', padding: 10, borderRadius: 12 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1E293B', marginHorizontal: 20, padding: 12, borderRadius: 15, marginBottom: 20, borderWidth: 1, borderColor: '#334155' },
  searchInput: { flex: 1, marginLeft: 10, color: '#fff' },
  sectionContainer: { marginBottom: 25 },
  sectionHeader: { flexDirection: 'row', paddingHorizontal: 20, marginBottom: 15, alignItems: 'center' },
  titleRow: { flexDirection: 'row', alignItems: 'center' },
  sectionTitleText: { fontSize: 18, fontWeight: 'bold', color: '#fff', marginLeft: 10 },
  horizontalList: { paddingLeft: 20 },
  noteCard: { backgroundColor: '#1E293B', width: width * 0.42, padding: 15, borderRadius: 20, marginRight: 15, borderWidth: 1, borderColor: '#334155' },
  noteName: { color: '#fff', fontSize: 15, fontWeight: 'bold', marginTop: 10, height: 40 },
  progressSection: { marginTop: 12 },
  progressBarBg: { height: 4, backgroundColor: '#334155', borderRadius: 2 },
  progressBarFill: { height: '100%', borderRadius: 2 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#1E293B', height: height * 0.8, borderTopLeftRadius: 30, borderTopRightRadius: 30 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, borderBottomWidth: 1, borderBottomColor: '#334155' },
  modalTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  detailName: { fontSize: 24, fontWeight: 'bold', marginBottom: 15 },
  detailText: { fontSize: 16, color: '#94A3B8', lineHeight: 24, marginBottom: 30 },
  actionBtn: { padding: 16, borderRadius: 15, alignItems: 'center' },
  actionBtnText: { color: '#fff', fontWeight: 'bold' }
});