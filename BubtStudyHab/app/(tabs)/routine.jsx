import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  StatusBar, Dimensions, Platform
} from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 44 : StatusBar.currentHeight;

// ৫ দিনের পরিপূর্ণ রুটিন ডাটা
const ROUTINE_DATA = {
  'Sunday': [
    { id: 1, time: '08:00 AM', subject: 'Data Structures', teacher: 'Dr. Abu Sayed', room: 'R-302', type: 'Theory', color: '#3B82F6' },
    { id: 2, time: '09:30 AM', subject: 'Operating Systems', teacher: 'Prof. M. Karim', room: 'R-405', type: 'Theory', color: '#22C55E' },
    { id: 3, time: '11:00 AM', subject: 'Discrete Math', teacher: 'Dr. Nasir Uddin', room: 'R-201', type: 'Theory', color: '#A855F7' },
    { id: 4, time: '12:00 PM', subject: 'Database Lab', teacher: 'Engr. J. Smith', room: 'Lab-02', type: 'Lab', color: '#F59E0B' },
  ],
  'Monday': [
    { id: 5, time: '09:00 AM', subject: 'Computer Networks', teacher: 'Ms. Alice P.', room: 'R-201', type: 'Theory', color: '#06B6D4' },
    { id: 6, time: '10:30 AM', subject: 'Algorithm Lab', teacher: 'Dr. Alan Turing', room: 'Lab-01', type: 'Lab', color: '#EF4444' },
    { id: 7, time: '01:30 PM', subject: 'Software Eng.', teacher: 'Prof. Zaman', room: 'R-303', type: 'Theory', color: '#EC4899' },
    { id: 8, time: '03:00 PM', subject: 'Technical Writing', teacher: 'Ms. Sarah', room: 'R-105', type: 'Theory', color: '#14B8A6' },
  ],
  'Tuesday': [
    { id: 9, time: '08:00 AM', subject: 'Microprocessor', teacher: 'Engr. Rakib', room: 'Lab-03', type: 'Lab', color: '#F43F5E' },
    { id: 10, time: '11:00 AM', subject: 'Digital Logic', teacher: 'Dr. Hasan', room: 'R-402', type: 'Theory', color: '#8B5CF6' },
    { id: 11, time: '12:30 PM', subject: 'Economics', teacher: 'Prof. Selina', room: 'R-101', type: 'Theory', color: '#10B981' },
    { id: 12, time: '02:00 PM', subject: 'Compiler Design', teacher: 'Dr. Arif', room: 'R-501', type: 'Theory', color: '#6366F1' },
  ],
  'Wednesday': [
    { id: 13, time: '09:00 AM', subject: 'AI & Robotics', teacher: 'Dr. Karishma', room: 'Lab-04', type: 'Lab', color: '#F59E0B' },
    { id: 14, time: '12:00 PM', subject: 'Math IV', teacher: 'Prof. Jabbar', room: 'R-205', type: 'Theory', color: '#3B82F6' },
    { id: 15, time: '01:30 PM', subject: 'Cyber Security', teacher: 'Engr. Fahim', room: 'R-302', type: 'Theory', color: '#EF4444' },
    { id: 16, time: '03:00 PM', subject: 'Ethics in IT', teacher: 'Dr. Muna', room: 'R-102', type: 'Theory', color: '#22C55E' },
  ],
  'Thursday': [
    { id: 17, time: '08:00 AM', subject: 'Graphics Design', teacher: 'Mr. Niloy', room: 'Lab-05', type: 'Lab', color: '#EC4899' },
    { id: 18, time: '11:00 AM', subject: 'Machine Learning', teacher: 'Dr. Shuvo', room: 'R-405', type: 'Theory', color: '#06B6D4' },
    { id: 19, time: '12:30 PM', subject: 'Web Dev Lab', teacher: 'Engr. Tanvir', room: 'Lab-02', type: 'Lab', color: '#F43F5E' },
    { id: 20, time: '03:30 PM', subject: 'Seminar', teacher: 'Dept. Head', room: 'Auditorium', type: 'Theory', color: '#8B5CF6' },
  ],
};

export default function RoutineScreen() {
  const router = useRouter();
  const scrollRef = useRef(null);
  const [selectedDay, setSelectedDay] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  const daysList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    
    // আজকের দিন সেট করা
    const todayIndex = new Date().getDay();
    const todayName = daysList[todayIndex];
    setSelectedDay(todayName);

    // অটো স্ক্রল লজিক
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({
          x: todayIndex * 78, 
          animated: true,
        });
      }
    }, 600);

    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      {/* --- Smart Header --- */}
      <View style={styles.headerWrapper}>
        <View style={styles.topHeader}>
          <TouchableOpacity onPress={() => router.back()} style={styles.navBtn}>
            <Ionicons name="chevron-back" size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.centerHeader}>
            <Text style={styles.liveClock}>{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
            <Text style={styles.liveDate}>{currentTime.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'short' })}</Text>
          </View>
          <TouchableOpacity style={styles.navBtn}>
            <Ionicons name="options" size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* --- Day Selector (Horizontally Centered Today) --- */}
        <ScrollView 
          ref={scrollRef}
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.daySelector}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          {daysList.map((day) => {
            const isToday = day === daysList[new Date().getDay()];
            return (
              <TouchableOpacity 
                key={day} 
                onPress={() => setSelectedDay(day)}
                style={[
                    styles.dayChip, 
                    selectedDay === day && styles.activeDayChip,
                    isToday && { borderColor: '#3B82F6', borderWidth: 2 }
                ]}
              >
                <Text style={[styles.dayName, selectedDay === day && styles.activeDayText]}>{day.substring(0, 3)}</Text>
                {isToday && <Text style={styles.todayLabel}>Today</Text>}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={styles.mainContent} showsVerticalScrollIndicator={false}>
        {ROUTINE_DATA[selectedDay] ? (
          ROUTINE_DATA[selectedDay].map((item, index) => (
            <View key={item.id} style={styles.classRow}>
              <View style={styles.timeColumn}>
                <Text style={styles.timeText}>{item.time.split(' ')[0]}</Text>
                <Text style={styles.periodText}>{item.time.split(' ')[1]}</Text>
                <View style={[styles.lineMarker, { backgroundColor: item.color }]} />
              </View>

              <TouchableOpacity activeOpacity={0.9} style={styles.subjectCard}>
                <View style={styles.cardHeader}>
                  <Text style={styles.subjectTitle}>{item.subject}</Text>
                  <View style={[styles.typeBadge, { backgroundColor: item.color + '20' }]}>
                    <Text style={[styles.typeText, { color: item.color }]}>{item.type}</Text>
                  </View>
                </View>
                
                <View style={styles.infoRow}>
                  <MaterialCommunityIcons name="account-tie" size={16} color="#94A3B8" />
                  <Text style={styles.infoText}>{item.teacher}</Text>
                </View>

                <View style={styles.cardFooter}>
                  <View style={styles.footerItem}>
                    <Ionicons name="location" size={14} color="#64748B" />
                    <Text style={styles.footerText}>{item.room}</Text>
                  </View>
                  <View style={styles.footerItem}>
                    <Ionicons name="time" size={14} color="#64748B" />
                    <Text style={styles.footerText}>1.5h</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          /* --- No Class (Friday/Saturday) --- */
          <View style={styles.noClassWrapper}>
            <View style={styles.moonGlow}>
              <MaterialCommunityIcons name="moon-waning-crescent" size={100} color="#FACC15" />
              <Ionicons name="sparkles" size={24} color="#fff" style={styles.star1} />
            </View>
            <Text style={styles.noClassTitle}>Happy Weekend!</Text>
            <Text style={styles.noClassPara}>
              No classes today. Take this time to relax and refresh for the upcoming week.
            </Text>
            <TouchableOpacity style={styles.notesBtn} onPress={() => router.push('/allnote')}>
               <Text style={styles.notesBtnText}>Review Study Notes</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020617' },
  headerWrapper: {
    backgroundColor: '#0F172A',
    paddingTop: STATUSBAR_HEIGHT + 5,
    paddingBottom: 25,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    elevation: 20, shadowColor: '#3B82F6', shadowOpacity: 0.2,
  },
  topHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20 },
  navBtn: { padding: 12, backgroundColor: '#1E293B', borderRadius: 18 },
  centerHeader: { alignItems: 'center' },
  liveClock: { color: '#fff', fontSize: 26, fontWeight: '900' },
  liveDate: { color: '#94A3B8', fontSize: 13, marginTop: 4 },

  daySelector: { marginTop: 25 },
  dayChip: { width: 70, height: 90, backgroundColor: '#1E293B', borderRadius: 24, marginRight: 12, justifyContent: 'center', alignItems: 'center' },
  activeDayChip: { backgroundColor: '#3B82F6' },
  dayName: { color: '#64748B', fontWeight: 'bold', fontSize: 15 },
  activeDayText: { color: '#fff' },
  todayLabel: { color: '#3B82F6', fontSize: 10, fontWeight: '900', marginTop: 4, textTransform: 'uppercase' },

  mainContent: { padding: 22, paddingTop: 30, paddingBottom: 100 },
  classRow: { flexDirection: 'row', marginBottom: 25 },
  timeColumn: { width: 65, alignItems: 'center', marginRight: 12 },
  timeText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  periodText: { color: '#64748B', fontSize: 12 },
  lineMarker: { width: 4, height: 40, borderRadius: 2, marginTop: 10 },

  subjectCard: {
    flex: 1, backgroundColor: '#0F172A', borderRadius: 30, padding: 20,
    borderWidth: 1, borderColor: '#1E293B', elevation: 10, shadowColor: '#000', shadowOpacity: 0.4,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  subjectTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', flex: 1 },
  typeBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  typeText: { fontSize: 10, fontWeight: 'bold' },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 15 },
  infoText: { color: '#CBD5E1', fontSize: 14 },
  cardFooter: { flexDirection: 'row', gap: 15, borderTopWidth: 1, borderTopColor: '#1E293B', paddingTop: 15 },
  footerItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  footerText: { color: '#64748B', fontSize: 12 },

  noClassWrapper: { alignItems: 'center', marginTop: 50, paddingHorizontal: 30 },
  moonGlow: { width: 160, height: 160, borderRadius: 80, backgroundColor: '#1E293B', justifyContent: 'center', alignItems: 'center', marginBottom: 30 },
  star1: { position: 'absolute', top: 30, right: 30 },
  noClassTitle: { color: '#fff', fontSize: 26, fontWeight: 'bold' },
  noClassPara: { color: '#94A3B8', textAlign: 'center', fontSize: 15, marginTop: 15, lineHeight: 24 },
  notesBtn: { marginTop: 40, backgroundColor: '#3B82F6', paddingHorizontal: 30, paddingVertical: 18, borderRadius: 20 },
  notesBtnText: { color: '#fff', fontWeight: 'bold' }
});