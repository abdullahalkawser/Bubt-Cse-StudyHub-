import React, { useState, useEffect } from 'react';
import { 
  View, Text, FlatList, StyleSheet, TouchableOpacity, 
  Modal, ScrollView, Dimensions, ActivityIndicator,
  SafeAreaView, Platform, StatusBar
} from 'react-native';
import { db } from '../../FirebaseConfig'; 
import { collection, doc, updateDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function NotificationScreen() {
  const [notices, setNotices] = useState([]);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [tab, setTab] = useState('new');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'notices'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const noticeData = snapshot.docs.map(d => ({ 
        id: d.id, 
        ...d.data() 
      }));
      setNotices(noticeData);
      setLoading(false);
    }, (error) => {
      console.error("Firestore Error:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleOpenNotice = (item) => {
    setSelectedNotice(item);
  };

  const handleCloseNotice = async () => {
    if (selectedNotice && (selectedNotice.read === false || selectedNotice.read === undefined)) {
      try {
        const noticeRef = doc(db, 'notices', selectedNotice.id);
        await updateDoc(noticeRef, { read: true });
      } catch (error) {
        console.error("Update Error:", error);
      }
    }
    setSelectedNotice(null);
  };

  const filteredNotices = notices.filter(n => 
    tab === 'new' 
      ? (n.read === false || n.read === undefined) 
      : n.read === true
  );

  const unreadCount = notices.filter(n => n.read === false || n.read === undefined).length;

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Recent';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.contentWrapper}>
        <Text style={styles.headerText}>Notification Center</Text>
        
        {/* Tab Switcher - Fixed from <div> to <View> */}
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            onPress={() => setTab('new')} 
            style={[styles.tab, tab === 'new' && styles.activeTab]}
          >
            <Text style={[styles.tabText, tab === 'new' && { color: '#fff' }]}>
              New ({unreadCount})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setTab('history')} 
            style={[styles.tab, tab === 'history' && styles.activeTab]}
          >
            <Text style={[styles.tabText, tab === 'history' && { color: '#fff' }]}>History</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#22C55E" style={{ marginTop: 50 }} />
        ) : (
          <FlatList
            data={filteredNotices}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 40 }}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No {tab === 'new' ? 'unread' : 'past'} notifications found.</Text>
            }
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={[styles.card, (item.read === false || item.read === undefined) && styles.unreadCardBorder]} 
                onPress={() => handleOpenNotice(item)}
              >
                <View style={[styles.iconBox, { backgroundColor: item.read ? '#334155' : '#22C55E20' }]}>
                   <MaterialCommunityIcons 
                     name={item.read ? "email-open-outline" : "bell-badge-outline"} 
                     size={24} 
                     color={item.read ? "#94A3B8" : "#22C55E"} 
                   />
                </View>
                
                <View style={styles.cardContent}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
                    <Text style={styles.cardDate}>{formatDate(item.createdAt)}</Text>
                  </View>
                  <Text style={styles.cardMessage} numberOfLines={2}>{item.desc}</Text>
                </View>
                {(item.read === false || item.read === undefined) && <View style={styles.unreadDot} />}
              </TouchableOpacity>
            )}
          />
        )}
      </View>

      {/* Modal remains the same but ensure no <div> inside */}
      <Modal visible={!!selectedNotice} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.modalHeaderRow}>
                 <View style={styles.modalInfoBar}>
                    <MaterialCommunityIcons name="calendar-clock" size={18} color="#22C55E" />
                    <Text style={styles.modalDateText}>{formatDate(selectedNotice?.createdAt)}</Text>
                 </View>
                 {(selectedNotice?.read === false || selectedNotice?.read === undefined) && (
                   <View style={styles.newBadge}><Text style={styles.newBadgeText}>NEW</Text></View>
                 )}
              </View>

              <Text style={styles.modalTitle}>{selectedNotice?.title}</Text>
              <View style={styles.divider} />
              <Text style={styles.modalBodyText}>{selectedNotice?.desc}</Text>
            </ScrollView>

            <TouchableOpacity style={styles.closeBtn} onPress={handleCloseNotice}>
              <Text style={styles.closeBtnText}>
                {(selectedNotice?.read === false || selectedNotice?.read === undefined) ? "Mark as Read" : "Dismiss"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A' },
  contentWrapper: { flex: 1, paddingHorizontal: 20, paddingTop: Platform.OS === 'android' ? 40 : 10 },
  headerText: { color: '#fff', fontSize: 26, fontWeight: 'bold', marginBottom: 20 },
  
  tabContainer: { flexDirection: 'row', backgroundColor: '#1E293B', borderRadius: 15, padding: 5, marginBottom: 20 },
  tab: { flex: 1, padding: 12, alignItems: 'center', borderRadius: 12 },
  activeTab: { backgroundColor: '#22C55E' },
  tabText: { color: '#94A3B8', fontWeight: 'bold' },

  card: { 
    flexDirection: 'row', backgroundColor: '#1E293B', padding: 16, borderRadius: 22, 
    marginBottom: 12, alignItems: 'center', borderWidth: 1, borderColor: '#334155' 
  },
  unreadCardBorder: { borderColor: '#22C55E40' },
  unreadDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#22C55E', marginLeft: 10 },
  iconBox: { width: 50, height: 50, borderRadius: 15, justifyContent: 'center', alignItems: 'center' },
  cardContent: { flex: 1, marginLeft: 15 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold', flex: 1 },
  cardDate: { color: '#64748B', fontSize: 11, marginLeft: 10 },
  cardMessage: { color: '#94A3B8', fontSize: 13, marginTop: 4, lineHeight: 18 },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(2, 6, 23, 0.9)', justifyContent: 'center', padding: 20 },
  modalContent: { 
    backgroundColor: '#1E293B', borderRadius: 30, padding: 25, 
    maxHeight: SCREEN_HEIGHT * 0.75, borderWidth: 1, borderColor: '#334155' 
  },
  modalHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  modalInfoBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#0F172A', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  modalDateText: { color: '#22C55E', fontSize: 12, marginLeft: 6, fontWeight: '600' },
  newBadge: { backgroundColor: '#22C55E', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  newBadgeText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  modalTitle: { color: '#fff', fontSize: 22, fontWeight: 'bold', lineHeight: 28 },
  divider: { height: 1, backgroundColor: '#334155', marginVertical: 15 },
  modalBodyText: { color: '#CBD5E1', fontSize: 16, lineHeight: 26, paddingBottom: 20 },
  
  closeBtn: { backgroundColor: '#22C55E', padding: 16, borderRadius: 20, marginTop: 10, alignItems: 'center' },
  closeBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  emptyText: { color: '#64748B', textAlign: 'center', marginTop: 50, fontSize: 16 }
});