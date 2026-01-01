import React, { useState, useEffect } from 'react';
import { 
  View, Text, FlatList, StyleSheet, TouchableOpacity, 
  Modal, ScrollView, Dimensions 
} from 'react-native';
import { db } from '../../FirebaseConfig';
import { collection, getDocs, updateDoc, doc, query, orderBy } from 'firebase/firestore';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function NotificationScreen() {
  const [notices, setNotices] = useState([]);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [tab, setTab] = useState('new');

  useEffect(() => { fetchNotices(); }, []);

  const fetchNotices = async () => {
    try {
      const q = query(collection(db, 'notices'), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      setNotices(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  const handleOpenNotice = (item) => {
    setSelectedNotice(item);
  };

  const handleCloseNotice = async () => {
    if (selectedNotice && !selectedNotice.read) {
      const noticeRef = doc(db, 'notices', selectedNotice.id);
      await updateDoc(noticeRef, { read: true });
      fetchNotices(); 
    }
    setSelectedNotice(null);
  };

  const filteredNotices = notices.filter(n => tab === 'new' ? !n.read : n.read);

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Recent';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Notification Center</Text>
      
      {/* Tab Switcher */}
      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => setTab('new')} style={[styles.tab, tab === 'new' && styles.activeTab]}>
          <Text style={[styles.tabText, tab === 'new' && { color: '#fff' }]}>New</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTab('history')} style={[styles.tab, tab === 'history' && styles.activeTab]}>
          <Text style={[styles.tabText, tab === 'history' && { color: '#fff' }]}>History</Text>
        </TouchableOpacity>
      </View>

      {/* Scrollable List */}
      <FlatList
        data={filteredNotices}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={[styles.card, !item.read && styles.unreadCardBorder]} 
            onPress={() => handleOpenNotice(item)}
          >
            <View style={[styles.iconBox, { backgroundColor: item.read ? '#334155' : '#22C55E20' }]}>
               <MaterialCommunityIcons 
                 name={item.read ? "email-open" : "bell-ring"} 
                 size={24} 
                 color={item.read ? "#94A3B8" : "#22C55E"} 
               />
            </View>
            
            <View style={styles.cardContent}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDate}>{formatDate(item.createdAt)}</Text>
              </View>
              {/* মেসেজটি এখানেও কিছুটা দেখা যাবে */}
              <Text style={styles.cardMessage} numberOfLines={2}>
                {item.desc}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Full Content Modal */}
      <Modal visible={!!selectedNotice} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* ScrollView নিশ্চিত করে যে বড় মেসেজ স্ক্রল করা যাবে */}
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.modalInfoBar}>
                <MaterialCommunityIcons name="calendar-clock" size={20} color="#22C55E" />
                <Text style={styles.modalDateText}>Posted on: {formatDate(selectedNotice?.createdAt)}</Text>
              </View>

              <Text style={styles.modalTitle}>{selectedNotice?.title}</Text>
              <View style={styles.divider} />
              
              <Text style={styles.modalBodyText}>{selectedNotice?.desc}</Text>
            </ScrollView>

            <TouchableOpacity style={styles.closeBtn} onPress={handleCloseNotice}>
              <Text style={styles.closeBtnText}>
                {selectedNotice?.read ? "Close History" : "Mark as Read & Close"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A', paddingHorizontal: 20, paddingTop: 60 },
  headerText: { color: '#fff', fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  
  tabContainer: { flexDirection: 'row', backgroundColor: '#1E293B', borderRadius: 15, padding: 5, marginBottom: 20 },
  tab: { flex: 1, padding: 12, alignItems: 'center', borderRadius: 12 },
  activeTab: { backgroundColor: '#22C55E' },
  tabText: { color: '#94A3B8', fontWeight: 'bold' },

  card: { 
    flexDirection: 'row', 
    backgroundColor: '#1E293B', 
    padding: 15, 
    borderRadius: 20, 
    marginBottom: 12, 
    alignItems: 'flex-start', // যাতে বড় মেসেজ থাকলেও আইকন উপরে থাকে
    borderWidth: 1, 
    borderColor: '#334155' 
  },
  unreadCardBorder: { borderColor: '#22C55E40' },
  iconBox: { width: 45, height: 45, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  cardContent: { flex: 1, marginLeft: 15 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold', flex: 1 },
  cardDate: { color: '#64748B', fontSize: 11, marginLeft: 10 },
  cardMessage: { color: '#94A3B8', fontSize: 13, marginTop: 5, lineHeight: 18 },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.9)', justifyContent: 'center', padding: 20 },
  modalContent: { 
    backgroundColor: '#1E293B', 
    borderRadius: 30, 
    padding: 25, 
    maxHeight: SCREEN_HEIGHT * 0.7, // স্ক্রিনের ৭০% পর্যন্ত বড় হবে
    borderWidth: 1, 
    borderColor: '#334155' 
  },
  modalInfoBar: { flexDirection: 'row', alignItems: 'center', marginBottom: 15, backgroundColor: '#0F172A', padding: 10, borderRadius: 10, alignSelf: 'flex-start' },
  modalDateText: { color: '#22C55E', fontSize: 12, marginLeft: 8, fontWeight: '600' },
  modalTitle: { color: '#fff', fontSize: 22, fontWeight: 'bold', lineHeight: 28 },
  divider: { height: 1, backgroundColor: '#334155', marginVertical: 15 },
  modalBodyText: { color: '#CBD5E1', fontSize: 16, lineHeight: 26, paddingBottom: 20 },
  
  closeBtn: { backgroundColor: '#22C55E', padding: 16, borderRadius: 18, marginTop: 10, alignItems: 'center' },
  closeBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});