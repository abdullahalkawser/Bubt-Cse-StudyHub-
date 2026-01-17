import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  StatusBar, Dimensions, Platform
} from 'react-native';
import { MaterialCommunityIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 44 : StatusBar.currentHeight;

const ROUTINE_DATA = {
  Sunday: [
    { id: 1, subject: 'ENG 101', faculty: 'JMSN', roomcode: '2705', intake: '57 - 4', type: 'Theory', color: '#6366F1', building: 'শহীদ সুজন মাহমুদ ভবন', buildingNo: 2, floor: 7, floorBangla: '৭ম তলা', roomNo: 5, roomBangla: 'রুম নং 05', classTime: '01:15 PM – 02:45 PM' },
    { id: 2, subject: 'BHC 101', faculty: 'MARK', roomcode: '2706', intake: '57 - 4', type: 'Theory', color: '#EC4899', building: 'শহীদ সুজন মাহমুদ ভবন', buildingNo: 2, floor: 7, floorBangla: '৭ম তলা', roomNo: 6, roomBangla: 'রুম নং 06', classTime: '02:45 PM – 04:15 PM' },
  ],
  Monday: [
    { id: 3, subject: 'CSE 101', faculty: 'MDSS', roomcode: '2316', intake: '57 - 4', type: 'Theory', color: '#3B82F6', building: 'শহীদ সুজন মাহমুদ ভবন', buildingNo: 2, floor: 3, floorBangla: '৩য় তলা', roomNo: 16, roomBangla: 'রুম নং 16', classTime: '08:15 AM – 09:45 AM' },
    { id: 4, subject: 'MAT 101', faculty: 'MKI', roomcode: '2316', intake: '57 - 4', type: 'Theory', color: '#22C55E', building: 'শহীদ সুজন মাহমুদ ভবন', buildingNo: 2, floor: 3, floorBangla: '৩য় তলা', roomNo: 16, roomBangla: 'রুম নং 16', classTime: '09:45 AM – 11:15 AM' },
  ],
  Tuesday: [
    { id: 5, subject: 'ENG 101', faculty: 'JMSN', roomcode: '2905', intake: '57 - 4', type: 'Theory', color: '#6366F1', building: 'শহীদ সুজন মাহমুদ ভবন', buildingNo: 2, floor: 9, floorBangla: '৯ম তলা', roomNo: 5, roomBangla: 'রুম নং 05', classTime: '08:15 AM – 09:45 AM' },
    { id: 6, subject: 'BHC 101', faculty: 'MARK', roomcode: '2905', intake: '57 - 4', type: 'Theory', color: '#EC4899', building: 'শহীদ সুজন মাহমুদ ভবন', buildingNo: 2, floor: 9, floorBangla: '৯ম তলা', roomNo: 5, roomBangla: 'রুম নং 05', classTime: '09:45 AM – 11:15 AM' },
  ],
  Wednesday: [
    { id: 7, subject: 'CSE 102', faculty: 'MDSS', roomcode: '2517', intake: '57 - 4', type: 'Lab', color: '#0EA5E9', building: 'শহীদ সুজন মাহমুদ ভবন', buildingNo: 2, floor: 5, floorBangla: '৫ম তলা', roomNo: 17, roomBangla: 'রুম নং 17', classTime: '02:45 PM – 04:15 PM' },
    { id: 8, subject: 'CSE 102', faculty: 'MDSS', roomcode: '2517', intake: '57 - 4', type: 'Lab', color: '#0EA5E9', building: 'শহীদ সুজন মাহমুদ ভবন', buildingNo: 2, floor: 5, floorBangla: '৫ম তলা', roomNo: 17, roomBangla: 'রুম নং 17', classTime: '04:15 PM – 05:45 PM' },
  ],
  Thursday: [
    { id: 9, subject: 'CSE 101', faculty: 'MDSS', roomcode: '2706', intake: '57 - 4', type: 'Theory', color: '#3B82F6', building: 'শহীদ সুজন মাহমুদ ভবন', buildingNo: 2, floor: 7, floorBangla: '৭ম তলা', roomNo: 6, roomBangla: 'রুম নং 06', classTime: '02:45 PM – 04:15 PM' },
    { id: 10, subject: 'MAT 101', faculty: 'MKI', roomcode: '2706', intake: '57 - 4', type: 'Theory', color: '#22C55E', building: 'শহীদ সুজন মাহমুদ ভবন', buildingNo: 2, floor: 7, floorBangla: '৭ম তলা', roomNo: 6, roomBangla: 'রুম নং 06', classTime: '04:15 PM – 05:45 PM' },
  ],
  Friday: [],
  Saturday: [],
};

export default function RoutineScreen() {
  const router = useRouter();
  const scrollRef = useRef(null);
  const [selectedDay, setSelectedDay] = useState('');
  const daysList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  useEffect(() => {
    const todayIndex = new Date().getDay();
    setSelectedDay(daysList[todayIndex]);
    setTimeout(() => {
      if (scrollRef.current) scrollRef.current.scrollTo({ x: todayIndex * 75, animated: true });
    }, 500);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      {/* --- CLEAN HEADER --- */}
      <View style={styles.headerContainer}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.headerTitleBox}>
            <Text style={styles.mainTitle}>Class Routine</Text>
            <Text style={styles.subTitle}>Intake 57 | Section 04</Text>
          </View>
          <View style={styles.iconBtn}>
            <MaterialCommunityIcons name="bell-outline" size={24} color="#fff" />
          </View>
        </View>

        {/* --- DAY PICKER --- */}
        <ScrollView 
          ref={scrollRef} horizontal showsHorizontalScrollIndicator={false} 
          style={styles.dayScroll} contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          {daysList.map((day) => {
            const isActive = selectedDay === day;
            return (
              <TouchableOpacity 
                key={day} onPress={() => setSelectedDay(day)}
                style={[styles.dayTab, isActive && styles.dayTabActive]}
              >
                <Text style={[styles.dayTabText, isActive && styles.dayTabTextActive]}>{day}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false}>
        {ROUTINE_DATA[selectedDay]?.length > 0 ? (
          ROUTINE_DATA[selectedDay].map((item) => {
            const [startTime, endTime] = item.classTime.split(' – ');
            return (
              <View key={item.id} style={styles.classWrapper}>
                {/* TIME INDICATOR */}
                <View style={styles.timeSection}>
                  <View style={styles.timeLabelBox}>
                    <Text style={styles.timeMainText}>{startTime.split(' ')[0]}</Text>
                    <Text style={styles.timeAmPm}>{startTime.split(' ')[1]}</Text>
                  </View>
                  <View style={[styles.timeLine, {backgroundColor: item.color}]} />
                  <View style={styles.timeLabelBox}>
                    <Text style={styles.timeMainText}>{endTime.split(' ')[0]}</Text>
                    <Text style={styles.timeAmPm}>{endTime.split(' ')[1]}</Text>
                  </View>
                </View>

                {/* MAIN INFORMATION CARD */}
                <View style={styles.detailCard}>
                  <View style={[styles.cardAccent, {backgroundColor: item.color}]} />
                  
                  <View style={styles.cardMainBody}>
                    <View style={styles.cardHeader}>
                      <Text style={styles.subjectName}>{item.subject}</Text>
                      <View style={[styles.tag, {backgroundColor: item.color + '20'}]}>
                        <Text style={[styles.tagText, {color: item.color}]}>{item.type}</Text>
                      </View>
                    </View>

                    <View style={styles.facultyRow}>
                      <FontAwesome5 name="chalkboard-teacher" size={14} color="#94A3B8" />
                      <Text style={styles.facultyText}>Faculty: <Text style={{color: '#E2E8F0'}}>{item.faculty}</Text></Text>
                    </View>

                    <View style={styles.infoDivider} />

                    <View style={styles.locationGrid}>
                      <View style={styles.buildingInfo}>
                        <Ionicons name="business" size={16} color="#3B82F6" />
                        <Text style={styles.buildingName}>{item.building} (B-{item.buildingNo})</Text>
                      </View>
                      
                      <View style={styles.badgesContainer}>
                        <View style={styles.metaBadge}>
                          <Text style={styles.metaBadgeText}>{item.floorBangla}</Text>
                        </View>
                        <View style={styles.metaBadge}>
                          <Text style={styles.metaBadgeText}>{item.roomBangla}</Text>
                        </View>
                        <View style={[styles.metaBadge, styles.roomCodeBadge]}>
                          <Text style={styles.roomCodeValue}>#{item.roomcode}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            );
          })
        ) : (
          <View style={styles.noClassContainer}>
            <MaterialCommunityIcons name="calendar-remove" size={80} color="#1E293B" />
            <Text style={styles.noClassText}>No classes scheduled for {selectedDay}</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020617' },
  
  // Header
  headerContainer: {
    backgroundColor: '#0F172A',
    paddingTop: STATUSBAR_HEIGHT + 10,
    paddingBottom: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 10,
  },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20 },
  iconBtn: { width: 45, height: 45, borderRadius: 12, backgroundColor: '#1E293B', justifyContent: 'center', alignItems: 'center' },
  headerTitleBox: { alignItems: 'center' },
  mainTitle: { color: '#fff', fontSize: 20, fontWeight: '900' },
  subTitle: { color: '#64748B', fontSize: 12, fontWeight: '600', marginTop: 2 },

  dayScroll: { marginTop: 20 },
  dayTab: { paddingHorizontal: 20, paddingVertical: 10, marginRight: 10, borderRadius: 15 },
  dayTabActive: { backgroundColor: '#3B82F6' },
  dayTabText: { color: '#64748B', fontWeight: 'bold', fontSize: 14 },
  dayTabTextActive: { color: '#fff' },

  // List
  listContent: { padding: 20, paddingBottom: 100 },
  classWrapper: { flexDirection: 'row', marginBottom: 25 },
  
  // Time Column
  timeSection: { width: 65, alignItems: 'center', justifyContent: 'space-between' },
  timeLabelBox: { alignItems: 'center' },
  timeMainText: { color: '#fff', fontSize: 18, fontWeight: '900' },
  timeAmPm: { color: '#475569', fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase' },
  timeLine: { width: 3, flex: 1, marginVertical: 8, borderRadius: 3, opacity: 0.5 },

  // Card
  detailCard: {
    flex: 1,
    backgroundColor: '#0F172A',
    borderRadius: 25,
    flexDirection: 'row',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#1E293B',
    elevation: 4,
  },
  cardAccent: { width: 6 },
  cardMainBody: { flex: 1, padding: 16 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  subjectName: { color: '#fff', fontSize: 24, fontWeight: '900' },
  tag: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  tagText: { fontSize: 10, fontWeight: '900', textTransform: 'uppercase' },
  
  facultyRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  facultyText: { color: '#94A3B8', fontSize: 14, fontWeight: '500' },
  
  infoDivider: { height: 1, backgroundColor: '#1E293B', marginVertical: 15 },
  
  locationGrid: { gap: 10 },
  buildingInfo: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  buildingName: { color: '#CBD5E1', fontSize: 14, fontWeight: '700' },
  
  badgesContainer: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  metaBadge: { backgroundColor: '#1E293B', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 10 },
  metaBadgeText: { color: '#94A3B8', fontSize: 12, fontWeight: 'bold' },
  
  roomCodeBadge: { backgroundColor: 'transparent', borderLeftWidth: 1, borderLeftColor: '#334155', borderRadius: 0, paddingLeft: 12, marginLeft: 5 },
  roomCodeValue: { color: '#3B82F6', fontSize: 16, fontWeight: '900' },

  noClassContainer: { alignItems: 'center', marginTop: 100, opacity: 0.5 },
  noClassText: { color: '#fff', fontSize: 16, marginTop: 15, textAlign: 'center' }
});