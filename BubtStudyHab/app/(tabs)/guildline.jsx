import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Modal, Dimensions, SafeAreaView, FlatList, StatusBar, Platform
} from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 50 : StatusBar.currentHeight + 20;

const CATEGORIES = ['All', 'Tech', 'Dev', 'Data', 'Design', 'Other'];

const CAREER_DATA = [
  { id: '1', title: 'Software Engineer', icon: 'code-braces', color: '#3B82F6', salary: '45k-180k', category: 'Tech', skills: ['DSA', 'OOP', 'Java/Python'], roadmap: 'Fundamentals ➔ DSA ➔ Projects ➔ Internship', desc: 'সফটওয়্যার ডিজাইন ও ডেভেলপমেন্ট করা সিএসই-এর মেইন স্ট্রিম ক্যারিয়ার।' },
  { id: '2', title: 'Web Developer', icon: 'web', color: '#10B981', salary: '35k-150k', category: 'Dev', skills: ['React', 'Node.js', 'JS'], roadmap: 'Frontend ➔ Backend ➔ Deployment', desc: 'আধুনিক ওয়েবসাইট ও ফুল-স্ট্যাক অ্যাপ তৈরি করা।' },
  { id: '3', title: 'AI & ML Expert', icon: 'brain', color: '#F59E0B', salary: '70k-250k', category: 'Data', skills: ['Python', 'Math', 'TensorFlow'], roadmap: 'Math ➔ Python ➔ ML Algorithms', desc: 'মেশিনকে মানুষের মতো বুদ্ধিমান করে গড়ে তোলা।' },
  { id: '4', title: 'Cyber Security', icon: 'shield-lock', color: '#EF4444', salary: '50k-200k', category: 'Tech', skills: ['Linux', 'Networking', 'Hacking'], roadmap: 'Networking ➔ Security ➔ Pentesting', desc: 'ডিজিটাল সিস্টেমকে সাইবার অ্যাটাক থেকে রক্ষা করা।' },
  { id: '5', title: 'Data Scientist', icon: 'database-search', color: '#8B5CF6', salary: '55k-220k', category: 'Data', skills: ['SQL', 'Pandas', 'Stats'], roadmap: 'SQL ➔ Data Analysis ➔ Insights', desc: 'ডেটা ব্যবহার করে ভবিষ্যতের বিজনেস প্রেডিকশন করা।' },
  { id: '6', title: 'DevOps Engineer', icon: 'infinity', color: '#06B6D4', salary: '60k-190k', category: 'Tech', skills: ['Docker', 'AWS', 'Kubernetes'], roadmap: 'Linux ➔ Cloud ➔ Automation', desc: 'ডেভেলপমেন্ট ও অপারেশনের মধ্যে ব্যালেন্স তৈরি করা।' },
  { id: '7', title: 'Mobile App Dev', icon: 'cellphone', color: '#EC4899', salary: '40k-140k', category: 'Dev', skills: ['Flutter', 'Kotlin', 'Swift'], roadmap: 'Dart/Java ➔ UI ➔ Store Release', desc: 'অ্যান্ড্রয়েড ও আইওএস অ্যাপ তৈরি করা।' },
  { id: '8', title: 'Game Developer', icon: 'controller-classic', color: '#F43F5E', salary: '45k-160k', category: 'Dev', skills: ['C#', 'C++', 'Unity'], roadmap: 'C# ➔ Engine Basics ➔ 3D Assets', desc: 'পিসি ও মোবাইল গেম তৈরি ও ডিজাইন করা।' },
  { id: '9', title: 'Cloud Architect', icon: 'cloud-check', color: '#6366F1', salary: '80k-300k', category: 'Tech', skills: ['AWS', 'Azure', 'Networking'], roadmap: 'Virtualization ➔ Cloud Services', desc: 'ক্লাউড ইনফ্রাস্ট্রাকচার ডিজাইন ও ম্যানেজমেন্ট।' },
  { id: '10', title: 'Blockchain Dev', icon: 'link-variant', color: '#14B8A6', salary: '90k-350k', category: 'Tech', skills: ['Solidity', 'Rust', 'Web3.js'], roadmap: 'Crypto ➔ Smart Contracts ➔ DApps', desc: 'ডিসেন্ট্রালাইজড সিস্টেম ও ব্লকচেইন টেকনোলজি।' },
  { id: '11', title: 'UI/UX Designer', icon: 'palette-swatch', color: '#F97316', salary: '30k-120k', category: 'Design', skills: ['Figma', 'Adobe XD', 'UX Research'], roadmap: 'Tools ➔ Case Study ➔ UX Laws', desc: 'অ্যাপ ও ওয়েবসাইটের ইউজার এক্সপেরিয়েন্স ডিজাইন করা।' },
  { id: '12', title: 'QA Engineer', icon: 'bug-check', color: '#A3E635', salary: '35k-110k', category: 'Tech', skills: ['Selenium', 'Unit Testing', 'QA Basics'], roadmap: 'Testing Basics ➔ Automation Tools', desc: 'সফটওয়্যারের কোয়ালিটি নিশ্চিত করা ও বাগ খোঁজা।' },
  { id: '13', title: 'Embedded System', icon: 'chip', color: '#94A3B8', salary: '40k-150k', category: 'Other', skills: ['C', 'Arduino', 'RTOS'], roadmap: 'Electronics ➔ C Programming ➔ Hardware', desc: 'হার্ডওয়্যার ও সফটওয়্যারের সমন্বয়ে স্মার্ট ডিভাইস তৈরি।' },
  { id: '14', title: 'IoT Specialist', icon: 'router-wireless', color: '#2DD4BF', salary: '45k-170k', category: 'Other', skills: ['Sensors', 'MQTT', 'Python'], roadmap: 'Hardware ➔ Protocols ➔ Cloud IoT', desc: 'ইন্টারনেট অফ থিংস নেটওয়ার্ক তৈরি।' },
  { id: '15', title: 'Network Engineer', icon: 'lan', color: '#9333EA', salary: '35k-130k', category: 'Tech', skills: ['Cisco', 'Routing', 'CCNA'], roadmap: 'Network Basics ➔ Troubleshooting', desc: 'বিশাল প্রতিষ্ঠানের নেটওয়ার্ক সিকিউর করা।' },
];

export default function CareerGuideline() {
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredData = activeCategory === 'All' 
    ? CAREER_DATA 
    : CAREER_DATA.filter(item => item.category === activeCategory);

  const openDetails = (career) => {
    setSelectedCareer(career);
    setModalVisible(true);
  };

  const renderCard = ({ item }) => (
    <TouchableOpacity 
      activeOpacity={0.8}
      style={[styles.card, { borderTopColor: item.color }]}
      onPress={() => openDetails(item)}
    >
      <View style={[styles.iconBox, { backgroundColor: item.color + '15' }]}>
        <MaterialCommunityIcons name={item.icon} size={30} color={item.color} />
      </View>
      <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
      <Text style={[styles.salaryText, { color: item.color }]}>{item.salary} BDT</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      {/* --- Fixed Header --- */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Career Paths</Text>
        <Text style={styles.headerSub}>Roadmap for future engineers</Text>

        {/* --- Category Selector --- */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.categoryScroll}
          contentContainerStyle={{ paddingRight: 40 }}
        >
          {CATEGORIES.map(cat => (
            <TouchableOpacity 
              key={cat} 
              onPress={() => setActiveCategory(cat)}
              style={[styles.catBtn, activeCategory === cat && styles.activeCatBtn]}
            >
              <Text style={[styles.catBtnText, activeCategory === cat && styles.activeCatBtnText]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredData}
        renderItem={renderCard}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
      />

      {/* --- Detail Modal --- */}
      <Modal animationType="slide" transparent visible={modalVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedCareer && (
              <>
                <View style={[styles.modalHeader, { backgroundColor: selectedCareer.color }]}>
                  <Text style={styles.modalHeaderTitle}>{selectedCareer.title}</Text>
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Ionicons name="close-circle" size={35} color="#fff" />
                  </TouchableOpacity>
                </View>

                <ScrollView 
                  style={styles.modalBody} 
                  showsVerticalScrollIndicator={false} 
                  contentContainerStyle={{ paddingBottom: 100 }}
                >
                  <Text style={styles.sectionLabel}>Overview</Text>
                  <Text style={styles.descText}>{selectedCareer.desc}</Text>

                  <Text style={styles.sectionLabel}>Skills to Acquire</Text>
                  <View style={styles.skillWrap}>
                    {selectedCareer.skills.map((skill, i) => (
                      <View key={i} style={[styles.skillBadge, { borderColor: selectedCareer.color }]}>
                        <Text style={[styles.skillText, { color: selectedCareer.color }]}>{skill}</Text>
                      </View>
                    ))}
                  </View>

                  <Text style={styles.sectionLabel}>Detailed Roadmap</Text>
                  <View style={styles.roadmapCard}>
                    <Text style={styles.roadmapText}>{selectedCareer.roadmap}</Text>
                  </View>

                  <View style={[styles.salaryBox, { backgroundColor: selectedCareer.color + '10' }]}>
                    <Text style={styles.salaryLabel}>Monthly Salary Range</Text>
                    <Text style={[styles.salaryAmount, { color: selectedCareer.color }]}>{selectedCareer.salary} BDT</Text>
                  </View>
                </ScrollView>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020617' },
  header: { paddingHorizontal: 25, paddingTop: STATUS_BAR_HEIGHT, paddingBottom: 20 },
  headerTitle: { fontSize: 32, fontWeight: 'bold', color: '#fff' },
  headerSub: { fontSize: 14, color: '#64748B', marginTop: 5 },

  // Category Styles
  categoryScroll: { marginTop: 20 },
  catBtn: { paddingHorizontal: 20, paddingVertical: 10, backgroundColor: '#0F172A', borderRadius: 15, marginRight: 10, borderWidth: 1, borderColor: '#1E293B' },
  activeCatBtn: { backgroundColor: '#3B82F6', borderColor: '#3B82F6' },
  catBtnText: { color: '#64748B', fontWeight: 'bold' },
  activeCatBtnText: { color: '#fff' },

  // List & Scroll Fix
  listContainer: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 120 }, // Added huge padding at bottom
  columnWrapper: { justifyContent: 'space-between', marginBottom: 20 },
  
  card: {
    width: (width - 60) / 2,
    backgroundColor: '#0F172A',
    borderRadius: 30,
    padding: 20,
    borderTopWidth: 5,
    elevation: 8,
    shadowColor: '#000', shadowOpacity: 0.2,
  },
  iconBox: { width: 55, height: 55, borderRadius: 18, justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
  cardTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold', height: 40 },
  salaryText: { fontSize: 11, fontWeight: 'bold', marginTop: 10 },

  // Modal Solution
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'flex-end' },
  modalContent: { 
    backgroundColor: '#0F172A', height: height * 0.8, 
    borderTopLeftRadius: 40, borderTopRightRadius: 40, overflow: 'hidden' 
  },
  modalHeader: { padding: 25, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  modalHeaderTitle: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  
  modalBody: { padding: 25 },
  sectionLabel: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginTop: 25, marginBottom: 12 },
  descText: { color: '#94A3B8', fontSize: 15, lineHeight: 24 },
  
  skillWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  skillBadge: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 12, borderWidth: 1 },
  skillText: { fontSize: 13, fontWeight: 'bold' },

  roadmapCard: { backgroundColor: '#1E293B', padding: 20, borderRadius: 20, borderLeftWidth: 5, borderLeftColor: '#3B82F6' },
  roadmapText: { color: '#CBD5E1', lineHeight: 22 },

  salaryBox: { marginTop: 30, padding: 25, borderRadius: 25, alignItems: 'center' },
  salaryLabel: { color: '#94A3B8', fontSize: 14, marginBottom: 5 },
  salaryAmount: { fontSize: 26, fontWeight: 'bold' }
});