import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function StudyProfile() {
  // মেনু আইটেম কম্পোনেন্ট
  const MenuLink = ({ icon, title, subtitle, color = "#22C55E" }) => (
    <TouchableOpacity style={styles.menuItem}>
      <View style={styles.menuLeft}>
        <View style={[styles.iconBg, { backgroundColor: color + '20' }]}>
          <Ionicons name={icon} size={22} color={color} />
        </View>
        <View style={{ marginLeft: 15 }}>
          <Text style={styles.menuText}>{title}</Text>
          {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#64748B" />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 200 }}>
      {/* প্রোফাইল হেডার */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Image 
            source={{ uri: 'https://img.freepik.com/free-vector/smiling-young-man-hoodie_1308-176157.jpg?semt=ais_hybrid&w=740&q=80' }} 
            style={styles.profileImg} 
          />
          <View style={styles.badgeIcon}>
            <Ionicons name="ribbon" size={20} color="#FFD700" />
          </View>
        </View>
        <Text style={styles.name}>Abdullah Al Kawser</Text>
        <Text style={styles.studentId}>CSE | Roll: 0574648646</Text>
        <Text style={styles.schoolName}>Bangladesh University of Business and Technology</Text>
      </View>

      {/* স্টাডি স্ট্যাটস (পড়াশোনার অগ্রগতি) */}
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Ionicons name="time-outline" size={20} color="#22C55E" />
          <Text style={styles.statNumber}>45h</Text>
          <Text style={styles.statLabel}>Study Time</Text>
        </View>
        <View style={styles.statBox}>
          <Ionicons name="checkmark-circle-outline" size={20} color="#3B82F6" />
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Quizzes</Text>
        </View>
        <View style={styles.statBox}>
          <Ionicons name="flame-outline" size={20} color="#EF4444" />
          <Text style={styles.statNumber}>07</Text>
          <Text style={styles.statLabel}>Day Streak</Text>
        </View>
      </View>

      {/* একাডেমিক সেকশন */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My Learning</Text>
        <MenuLink icon="book-outline" title="My Courses" subtitle="4 active courses" color="#3B82F6" />
        <MenuLink icon="trophy-outline" title="Achievements" subtitle="8 Badges earned" color="#F59E0B" />
        <MenuLink icon="document-text-outline" title="Test Reports" subtitle="View your performance" color="#8B5CF6" />
      </View>

      {/* সেটিংস ও সাপোর্ট */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <MenuLink icon="notifications-outline" title="Class Reminders" color="#22C55E" />
        <MenuLink icon="download-outline" title="Downloads" subtitle="Offline materials" color="#64748B" />
        <TouchableOpacity style={styles.logoutBtn}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A',paddingTop:30 },
  header: { alignItems: 'center', marginTop: 40, marginBottom: 20 },
  avatarContainer: { position: 'relative' },
  profileImg: { width: 100, height: 100, borderRadius: 50, borderWidth: 3, borderColor: '#22C55E' },
  badgeIcon: { position: 'absolute', bottom: 0, right: 0, backgroundColor: '#1E293B', padding: 5, borderRadius: 15 },
  name: { fontSize: 22, fontWeight: 'bold', color: '#fff', marginTop: 10 },
  studentId: { fontSize: 14, color: '#d9e0eaff', marginTop: 2 },
  schoolName: { fontSize: 14, color: '#eff4fcff', fontStyle: 'italic' },

  statsRow: { 
    flexDirection: 'row', justifyContent: 'space-around', 
    backgroundColor: '#1E293B', marginHorizontal: 20, 
    borderRadius: 20, padding: 15, marginBottom: 25 
  },
  statBox: { alignItems: 'center' },
  statNumber: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginVertical: 4 },
  statLabel: { color: '#94A3B8', fontSize: 11 },

  section: { paddingHorizontal: 20, marginBottom: 20 },
  sectionTitle: { color: '#94A3B8', fontSize: 13, fontWeight: 'bold', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 },
  menuItem: { 
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: '#1E293B', padding: 12, borderRadius: 15, marginBottom: 10
  },
  menuLeft: { flexDirection: 'row', alignItems: 'center' },
  iconBg: { padding: 8, borderRadius: 10 },
  menuText: { fontSize: 16, color: '#fff', fontWeight: '500' },
  menuSubtitle: { fontSize: 12, color: '#64748B' },

  logoutBtn: { marginTop: 10, padding: 15, alignItems: 'center', borderRadius: 15, borderWidth: 1, borderColor: '#90f7c9ff' },
  logoutText: { color: '#EF4444', fontWeight: 'bold' }
});