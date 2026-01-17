import React, { useEffect, useRef, useState } from 'react';
import { 
  View, Text, ScrollView, StyleSheet, Animated, 
  TouchableWithoutFeedback, SafeAreaView, StatusBar, Dimensions, Image
} from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { db } from '../../FirebaseConfig'; // path check করো
import { collection, getDocs,query, orderBy, limit, where } from 'firebase/firestore';
const { width } = Dimensions.get('window');
import { useRouter } from 'expo-router'



const data = {
  Sunday: [
    {
      id: 1,
      time: '01:15 PM',
      subject: 'ENG 101',
      teacher: 'JMSN',
      room: '2705',
      type: 'Theory',
      color: '#6366F1',
    },
    {
      id: 2,
      time: '02:45 PM',
      subject: 'BHC 101',
      teacher: 'MARK',
      room: '2706',
      type: 'Theory',
      color: '#EC4899',
    },
  ],

  Monday: [
    {
      id: 3,
      time: '08:15 AM',
      subject: 'CSE 101',
      teacher: 'MDSS',
      room: '2316',
      type: 'Theory',
      color: '#3B82F6',
    },
    {
      id: 4,
      time: '09:45 AM',
      subject: 'MAT 101',
      teacher: 'MKI',
      room: '2316',
      type: 'Theory',
      color: '#22C55E',
    },
  ],

  Tuesday: [
    {
      id: 5,
      time: '08:15 AM',
      subject: 'ENG 101',
      teacher: 'JMSN',
      room: '2905',
      type: 'Theory',
      color: '#6366F1',
    },
    {
      id: 6,
      time: '09:45 AM',
      subject: 'BHC 101',
      teacher: 'MARK',
      room: '2905',
      type: 'Theory',
      color: '#EC4899',
    },
  ],

  Wednesday: [
    {
      id: 7,
      time: '02:45 PM',
      subject: 'CSE 102',
      teacher: 'MDSS',
      room: '2517',
      type: 'Lab',
      color: '#0EA5E9',
    },
    {
      id: 8,
      time: '04:15 PM',
      subject: 'CSE 102',
      teacher: 'MDSS',
      room: '2517',
      type: 'Lab',
      color: '#0EA5E9',
    },
  ],

  Thursday: [
    {
      id: 9,
      time: '02:45 PM',
      subject: 'CSE 101',
      teacher: 'MDSS',
      room: '2706',
      type: 'Theory',
      color: '#3B82F6',
    },
    {
      id: 10,
      time: '04:15 PM',
      subject: 'MAT 101',
      teacher: 'MKI',
      room: '2706',
      type: 'Theory',
      color: '#22C55E',
    },
  ],
};






const studyMaterials = [
  { id: 1, title: 'Data Structures', icon: 'file-tree', color: '#22C55E' },
  { id: 2, title: 'Algorithm PDF', icon: 'xml', color: '#3B82F6' },
  { id: 3, title: 'DBMS Notes', icon: 'database', color: '#F59E0B' },
];

export default function HomeScreen({navigation}) {
  const [stats, setStats] = useState({
    books: 0,
    notes: 0,
    assignments: 0,
    notices: 0,
  });
  const router = useRouter()
const [latestNotice, setLatestNotice] = useState(null);
// // ১. আজকের বারের নাম বের করা (যেমন: "Monday")
//   const todayName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date());

//   // ২. আপনার ডাটা থেকে আজকের লিস্টটি নেওয়া (যদি না থাকে তবে খালি অ্যারে [])
//   const todaysClasses = data[todayName] || [];

// অটোমেটিক আজকের দিনের বদলে ম্যানুয়ালি চেক করার জন্য:
const todayName = 'Sunday'; 

// অথবা সরাসরি ডাটা কল করার সময়:
const todaysClasses = data['Sunday'] || [];

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // ২. ফায়ারবেস থেকে ডাটা ফেচ করা
const fetchDashboardData = async () => {
  try {

    const booksSnap = await getDocs(collection(db, 'books'));
    const assignmentsSnap = await getDocs(collection(db, 'assignments'));
    
    // শুধু আনরিড (Unread) নোটিশ কুয়েরি করা ভালো, তবে সহজ করার জন্য সব এনে ফিল্টার করছি
    const noticesSnap = await getDocs(collection(db, 'notices'));
    const unreadNotices = noticesSnap.docs.filter(doc => doc.data().read === false).length;
// ২. শুধুমাত্র লেটেস্ট নোটিশটি আনা (OrderBy createdAt Descending and Limit 1)
      const noticeQuery = query(
        collection(db, 'notices'), 
        orderBy('createdAt', 'desc'), 
        limit(1)
      );
      const noticeSnap = await getDocs(noticeQuery);
      
      if (!noticeSnap.empty) {
        setLatestNotice({ id: noticeSnap.docs[0].id, ...noticeSnap.docs[0].data() });
      }


    setStats({
      books: booksSnap.size,
      assignments: assignmentsSnap.size,
      notices: unreadNotices, // এখানে শুধু আনরিড সংখ্যা দেখাবে
    });
  } catch (error) {
    console.log("Error: ", error);
  } finally {
 
  }
};

// আইকনে ক্লিক করলে নোটিফিকেশন পেজে যাওয়ার জন্য:
<TouchableOpacity 
  style={styles.settingsBtn} 
 
>

  <Ionicons name="notifications-outline" size={24} color="#fff" />
  {stats.notices > 0 && (
    <View style={styles.notiBadge}>
      <Text style={styles.notiBadgeText}>{stats.notices}</Text>
    </View>
  )}
</TouchableOpacity>
  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 200 }}>
        
        {/* 🔥 Header Section (Search & Noti Removed) */}
        <View style={styles.headerGradient}>
          <View style={styles.headerPadding} /> 
          <View style={styles.headerTopRow}>
            <View style={styles.userInfo}>
              <Image 
                source={{ uri: 'https://img.freepik.com/free-vector/smiling-young-man-hoodie_1308-176157.jpg?semt=ais_hybrid&w=740&q=80' }} 
                style={styles.avatar} 
              />
              <View style={{ marginLeft: 12 }}>
                <Text style={styles.welcomeText}>Hi, Abdullah Al Kawser</Text>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>Semester 1 • CSE</Text>
                </View>
              </View>
            </View>
      {/* নোটিফিকেশন আইকন উইথ ব্যাজ */}
 <TouchableOpacity 
      style={styles.settingsBtn} 
      onPress={() => router.push('/notice')} // এখানে আপনার ফাইলের পাথ দিন
    >
      <Ionicons name="notifications-outline" size={24} color="#fff" />
      {stats.notices > 0 && (
        <View style={styles.notiBadge}>
          <Text style={styles.notiBadgeText}>{stats.notices}</Text>
        </View>
      )}
    </TouchableOpacity>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <MaterialCommunityIcons name="book-open-variant" size={20} color="#22C55E" />
            <Text style={styles.statNum}>6</Text>
            <Text style={styles.statSub}>Courses</Text>
          </View>
          <View style={styles.statCard}>
            <MaterialCommunityIcons name="clock-alert-outline" size={20} color="#EF4444" />
            <Text style={styles.statNum}>05</Text>
            <Text style={styles.statSub}>Due</Text>
          </View>
          <View style={styles.statCard}>
            <MaterialCommunityIcons name="trophy-outline" size={20} color="#F59E0B" />
            <Text style={styles.statNum}>A+</Text>
            <Text style={styles.statSub}>Grade</Text>
          </View>
        </View>

        {/* 📅 Today's Routine (Horizontal) */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Today's({todayName}) Routine</Text>
         <TouchableOpacity onPress={() => router.push('/routine')}>
    <Text style={styles.seeAll}>View Routine</Text>
  </TouchableOpacity>
        </View>
  
      {todaysClasses.length > 0 ? (
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={{ paddingLeft: 20, paddingBottom: 10 }}
        >
          {todaysClasses.map((item) => (
            <View key={item.id} style={styles.routineCard}>
              {/* আইকন বক্স: কালার অনুযায়ী হালকা ব্যাকগ্রাউন্ড */}
              <View style={[styles.routineIconBox, { backgroundColor: item.color + '20' }]}>
                <MaterialCommunityIcons 
                  name={item.type === 'Lab' ? 'flask' : 'book-open-variant'} 
                  size={24} 
                  color={item.color} 
                />
              </View>

              <Text style={styles.routineTime}>{item.time}</Text>
              <Text style={styles.routineSubject} numberOfLines={1}>{item.subject}</Text>
              
              {/* টিচার এর নাম (আপনার ডাটা অনুযায়ী) */}
              <Text style={styles.teacherText}>{item.teacher}</Text>

              <View style={styles.roomBadge}>
                <Ionicons name="location-sharp" size={10} color="#94A3B8" />
                <Text style={styles.roomText}>Room: {item.room}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      ) : (
        <View style={styles.noClassBox}>
          <Text style={styles.noClassText}>No classes scheduled for today!</Text>
        </View>
      )}
          {/* ৩. Notice Board (Quick View) */}
        {/* <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Notices</Text>
        </View> */}
        {/* <View style={styles.noticeCard}>
            <View style={styles.noticeIcon}>
               <Ionicons name="megaphone-outline" size={22} color="#F59E0B" />
            </View>
            <View style={{flex: 1, marginLeft: 15}}>
               <Text style={styles.noticeText}>Semester Break from Dec 25th.</Text>
               <Text style={styles.noticeTime}>Posted 2 hours ago</Text>
            </View>
        </View> */}
{/* 📢 Recent Notice Board */}
<View style={styles.sectionHeader}>
  <Text style={styles.sectionTitle}>Latest Notice</Text>
  <TouchableOpacity onPress={() => router.push('notice')}>
   
  </TouchableOpacity>
</View>

{latestNotice ? (
  <View style={[styles.fullNoticeCard, !latestNotice.read && styles.unreadGlow]}>
    
    {/* কার্ডের উপরের অংশ: আইকন এবং স্ট্যাটাস */}
    <View style={styles.cardHeader}>
      <View style={[styles.iconCircle, { backgroundColor: latestNotice.read ? '#334155' : '#22C55E20' }]}>
        <MaterialCommunityIcons 
          name={latestNotice.read ? "bell-check-outline" : "bell-ring-outline"} 
          size={22} 
          color={latestNotice.read ? "#94A3B8" : "#22C55E"} 
        />
      </View>
      
      {!latestNotice.read ? (
        <View style={styles.unreadTag}>
          <View style={styles.dot} />
          <Text style={styles.unreadTagText}>UNREAD NOTICE</Text>
        </View>
      ) : (
        <Text style={styles.readTime}>{latestNotice.createdAt ? "Recent Update" : ""}</Text>
      )}
    </View>

    {/* নোটিশ কন্টেন্ট সেকশন */}
    <View style={styles.contentBody}>
      <Text style={styles.fullTitle}>{latestNotice.title}</Text>
      
      {/* একটি সূক্ষ্ম ডিভাইডার লাইন */}
      <View style={styles.miniDivider} />
      
      <Text style={styles.fullDesc}>
        {latestNotice.desc}
      </Text>
    </View>

    {/* কার্ডের নিচের অংশ: তারিখ বা সময় */}
    <View style={styles.cardFooter}>
      <MaterialCommunityIcons name="clock-outline" size={14} color="#64748B" />
      <Text style={styles.footerDate}>
        Posted on: {latestNotice.createdAt?.toDate 
          ? latestNotice.createdAt.toDate().toLocaleDateString('en-GB') 
          : 'Recent'}
      </Text>
    </View>

  </View>
) : (
  <View style={styles.emptyNotice}>
    <Text style={styles.emptyText}>No Active Notices</Text>
  </View>
)}

       <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Upcoming Exams</Text>
        </View>
        <View style={styles.examCard}>
           <View style={styles.examInfo}>
              <Text style={styles.examSubject}>Database Mid-Term</Text>
              <Text style={styles.examDate}>Jan 15, 2026 • 10:30 AM</Text>
           </View>
           <View style={styles.daysBadge}>
              <Text style={styles.daysText}>18</Text>
              <Text style={styles.daysLabel}>Days</Text>
           </View>
        </View>
 

        {/* 📚 Library Highlights */}
     <View style={styles.sectionHeader}>
  <Text style={styles.sectionTitle}>Library Highlights</Text>
  <TouchableOpacity onPress={() => router.push('/book')}>
    <Text style={styles.seeAll}>View All</Text>
  </TouchableOpacity>
</View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingLeft: 20 }}>
          {studyMaterials.map((item) => (
            <View key={item.id} style={styles.itemCard}>
              <View style={[styles.itemIcon, { backgroundColor: item.color + '15' }]}>
                <MaterialCommunityIcons name={item.icon} size={30} color={item.color} />
              </View>
              <Text style={styles.itemTitle}>{item.title}</Text>
            </View>
          ))}
        </ScrollView>
               {/* 🚀 Progress Card */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Continue Learning</Text>
        </View>
        <View style={styles.progressCard}>
            <View style={styles.progressTop}>
                <MaterialCommunityIcons name="play-circle" size={40} color="#22C55E" />
                <View style={{marginLeft: 15, flex: 1}}>
                    <Text style={styles.progressTitle}>Algorithms: Chapter 5</Text>
                    <Text style={styles.progressSub}>Dynamic Programming</Text>
                </View>
            </View>
            <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, {width: '65%'}]} />
            </View>
        </View>

        {/* ✨ ৩টি নতুন ফিচার যা আপনি চেয়েছিলেন ✨ */}

        {/* ১. Upcoming Exams (Countdown Style) */}
 

        {/* ২. Attendance Tracker (Bar Style) */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Attendance Overview</Text>
        </View>
        <View style={styles.attendanceBox}>
            <View style={styles.attHeader}>
               <Text style={styles.attPercent}>88%</Text>
               <Text style={styles.attStatus}>Good Standing</Text>
            </View>
            <View style={styles.attBarBg}>
               <View style={[styles.attBarFill, {width: '88%'}]} />
            </View>
        </View>

        {/* ৩. Notice Board (Quick View) */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Notices</Text>
        </View>
        <View style={styles.noticeCard}>
            <View style={styles.noticeIcon}>
               <Ionicons name="megaphone-outline" size={22} color="#F59E0B" />
            </View>
            <View style={{flex: 1, marginLeft: 15}}>
               <Text style={styles.noticeText}>Semester Break from Dec 25th.</Text>
               <Text style={styles.noticeTime}>Posted 2 hours ago</Text>
            </View>
        </View>

      </ScrollView>
    </View>
  );
}

const TouchableOpacity = ({ children, style, onPress }) => (
  <TouchableWithoutFeedback onPress={onPress}><View style={style}>{children}</View></TouchableWithoutFeedback>
);

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#0F172A' },
  headerGradient: {
    backgroundColor: '#0e9e2dff',
    paddingBottom: 40,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },
  headerPadding: { height: 55 },
  headerTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  userInfo: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 55, height: 55, borderRadius: 18, borderWidth: 2, borderColor: '#22C55E' },
  welcomeText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  badge: { backgroundColor: '#22C55E20', alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6, marginTop: 4 },
  badgeText: { color: '#22C55E', fontSize: 11, fontWeight: 'bold' },
  settingsBtn: { backgroundColor: 'rgba(255,255,255,0.05)', padding: 10, borderRadius: 15 },
  
  statsRow: { flexDirection: 'row', justifyContent: 'space-around', marginTop: -30, paddingHorizontal: 10 },
  statCard: { 
    backgroundColor: '#1E293B', width: width * 0.28, padding: 15, 
    borderRadius: 20, alignItems: 'center', elevation: 8, borderWidth: 1, borderColor: '#334155' 
  },
  statNum: { fontSize: 18, fontWeight: 'bold', color: '#fff', marginTop: 5 },
  statSub: { fontSize: 10, color: '#94A3B8', textTransform: 'uppercase' },

  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, marginTop: 10, alignItems: 'center' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  seeAll: { color: '#22C55E', fontSize: 13, fontWeight: '600' },

  routineCard: { backgroundColor: '#1E293B', width: 140, padding: 15, borderRadius: 22, marginRight: 15, borderWidth: 1, borderColor: '#334155' },
  routineIconBox: { width: 45, height: 45, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  routineTime: { color: '#22C55E', fontSize: 12, fontWeight: 'bold' },
 
  roomBadge: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  roomText: { color: '#94A3B8', fontSize: 10, marginLeft: 4 },

  progressCard: { backgroundColor: '#1E293B', marginHorizontal: 20, padding: 20, borderRadius: 25, borderWidth: 1, borderColor: '#334155' },
  progressTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  progressTitle: { color: '#fff', fontSize: 15, fontWeight: 'bold' },
  progressSub: { color: '#94A3B8', fontSize: 12, marginTop: 2 },
  progressBarBg: { height: 6, backgroundColor: '#0F172A', borderRadius: 3, overflow: 'hidden' },
  progressBarFill: { height: '100%', backgroundColor: '#22C55E' },

  itemCard: { backgroundColor: '#1E293B', padding: 20, borderRadius: 25, marginRight: 15, width: 140, alignItems: 'center', borderWidth: 1, borderColor: '#334155' },
  itemIcon: { width: 60, height: 60, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  itemTitle: { color: '#fff', fontWeight: '600', fontSize: 13, textAlign: 'center' },

  // New Features Styles
  examCard: { backgroundColor: '#1E293B', marginHorizontal: 20, padding: 18, borderRadius: 25, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#EF444450' },
  examInfo: { flex: 1 },
  examSubject: { color: '#fff', fontSize: 15, fontWeight: 'bold' },
  examDate: { color: '#94A3B8', fontSize: 12, marginTop: 4 },
  daysBadge: { backgroundColor: '#EF444420', padding: 10, borderRadius: 15, alignItems: 'center' },
  daysText: { color: '#EF4444', fontSize: 18, fontWeight: 'bold' },
  daysLabel: { color: '#EF4444', fontSize: 9, fontWeight: 'bold' },

  attendanceBox: { backgroundColor: '#1E293B', marginHorizontal: 20, padding: 20, borderRadius: 25, borderWidth: 1, borderColor: '#334155' },
  attHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 12 },
  attPercent: { color: '#3B82F6', fontSize: 24, fontWeight: 'bold' },
  attStatus: { color: '#22C55E', fontSize: 12, fontWeight: 'bold' },
  attBarBg: { height: 8, backgroundColor: '#0F172A', borderRadius: 4, overflow: 'hidden' },
  attBarFill: { height: '100%', backgroundColor: '#3B82F6' },

  noticeCard: { backgroundColor: '#1E293B', marginHorizontal: 20, padding: 15, borderRadius: 20, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#334155' },
  noticeIcon: { backgroundColor: '#F59E0B20', padding: 12, borderRadius: 15 },
  noticeText: { color: '#CBD5E1', fontSize: 14, fontWeight: '500' },
  noticeTime: { color: '#64748B', fontSize: 11, marginTop: 4 },
notiBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#EF4444',
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#1E293B'
  },
  notiBadgeText: { color: '#fff', fontSize: 9, fontWeight: 'bold' },
  newDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#22C55E',
    marginLeft: 10
  },
fullNoticeCard: {
    backgroundColor: '#1E293B',
    borderRadius: 24,
    padding: 20,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: '#334155',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
  },
  unreadGlow: {
    borderColor: '#22C55E50',
    backgroundColor: '#1E293B', 
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#22C55E15',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  unreadTagText: {
    color: '#22C55E',
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#22C55E',
  },
  readTime: {
    color: '#64748B',
    fontSize: 12,
  },
  contentBody: {
    marginBottom: 15,
  },
  fullTitle: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '800',
    lineHeight: 24,
    marginBottom: 8,
  },
  miniDivider: {
    height: 2,
    width: 30,
    backgroundColor: '#22C55E',
    borderRadius: 5,
    marginBottom: 12,
  },
  fullDesc: {
    color: '#CBD5E1',
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '400',
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#334155',
    paddingTop: 12,
    marginTop: 5,
  },
  footerDate: {
    color: '#64748B',
    fontSize: 12,
    marginLeft: 6,
  },
  emptyNotice: {
    padding: 30,
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 20,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#334155',
  },
  emptyText: {
    color: '#64748B',
    fontSize: 14,
  },
  unreadCardShadow: {
    borderColor: '#22C55E40',
    shadowColor: "#22C55E",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  unreadIndicator: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: '#22C55E',
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  newBadge: {
    backgroundColor: '#22C55E',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginRight: 8,
  },
  newBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  timeAgo: {
    color: '#64748B',
    fontSize: 11,
  },
  textContainer: {
    marginBottom: 12,
  },
  noticeTitle: {
    color: '#CBD5E1',
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  noticeDescription: {
    color: '#94A3B8',
    fontSize: 13,
    lineHeight: 18,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#334155',
    paddingTop: 10,
    marginTop: 5,
  },
  clickPrompt: {
    color: '#64748B',
    fontSize: 11,
    fontStyle: 'italic',
  },
  emptyCard: {
    backgroundColor: '#1E293B',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#334155',
  },
  emptyText: {
    color: '#64748B',
    marginTop: 10,
    fontSize: 14,
  },
  routineIconBox: { width: 45, height: 45, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  routineTime: { fontSize: 12, color: '#64748B', fontWeight: '600' },
  routineSubject: { fontSize: 16, fontWeight: 'bold', color: '#f5f9ffff', marginVertical: 4 },
  teacherText: { fontSize: 11, color: '#94A3B8', marginBottom: 8 },
  roomBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F1F5F9', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 5, alignSelf: 'flex-start' },
  roomText: { fontSize: 10, color: '#64748B', marginLeft: 3 },
  noClassBox: { marginLeft: 20, padding: 20, backgroundColor: '#F8FAFC', borderRadius: 10, marginRight: 20 },
  noClassText: { color: '#94A3B8', fontStyle: 'italic' }
});