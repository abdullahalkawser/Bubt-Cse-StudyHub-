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

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Recent';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.contentWrapper}>
        <Text style={styles.headerText}>Notifications</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#22C55E" style={{ marginTop: 50 }} />
        ) : (
          <FlatList
            data={notices}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 40 }}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No notifications found.</Text>
            }
            renderItem={({ item }) => {
              const isRead = item.read === true;
              return (
                <TouchableOpacity 
                  style={[styles.card, !isRead && styles.unreadCardBorder]} 
                  onPress={() => handleOpenNotice(item)}
                >
                  {/* Status Tag */}
                  <View style={[styles.statusTag, { backgroundColor: isRead ? '#334155' : '#22C55E' }]}>
                    <Text style={styles.statusTagText}>{isRead ? "READ" : "UNREAD"}</Text>
                  </View>

                  <View style={styles.cardMain}>
                    <View style={[styles.iconBox, { backgroundColor: isRead ? '#1E293B' : '#22C55E20' }]}>
                       <MaterialCommunityIcons 
                         name={isRead ? "email-open-outline" : "bell-badge-outline"} 
                         size={22} 
                         color={isRead ? "#64748B" : "#22C55E"} 
                       />
                    </View>
                    
                    <View style={styles.cardContent}>
                      <View style={styles.cardHeader}>
                        <Text style={[styles.cardTitle, isRead && {color: '#94A3B8'}]} numberOfLines={1}>{item.title}</Text>
                        <Text style={styles.cardDate}>{formatDate(item.createdAt)}</Text>
                      </View>
                      <Text style={[styles.cardMessage, isRead && {color: '#64748B'}]} numberOfLines={2}>{item.desc}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        )}
      </View>

      {/* Full Notice Modal */}
      <Modal visible={!!selectedNotice} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.modalHeaderRow}>
                 <View style={styles.modalInfoBar}>
                    <MaterialCommunityIcons name="calendar-clock" size={18} color="#22C55E" />
                    <Text style={styles.modalDateText}>{formatDate(selectedNotice?.createdAt)}</Text>
                 </View>
                 {selectedNotice?.read !== true && (
                   <View style={styles.newBadge}><Text style={styles.newBadgeText}>NEW</Text></View>
                 )}
              </View>

              <Text style={styles.modalTitle}>{selectedNotice?.title}</Text>
              <View style={styles.divider} />
              <Text style={styles.modalBodyText}>{selectedNotice?.desc}</Text>
            </ScrollView>

            <TouchableOpacity style={styles.closeBtn} onPress={handleCloseNotice}>
              <Text style={styles.closeBtnText}>Close & Mark as Read</Text>
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
  headerText: { color: '#fff', fontSize: 28, fontWeight: 'bold', marginBottom: 25 },
  
  card: { 
    backgroundColor: '#1E293B', 
    borderRadius: 20, 
    marginBottom: 15, 
    borderWidth: 1, 
    borderColor: '#334155',
    overflow: 'hidden'
  },
  unreadCardBorder: { borderColor: '#22C55E60' },
  cardMain: { flexDirection: 'row', padding: 16, alignItems: 'center' },
  statusTag: { 
    alignSelf: 'flex-start', 
    paddingHorizontal: 10, 
    paddingVertical: 4, 
    borderBottomRightRadius: 12,
  },
  statusTagText: { color: '#fff', fontSize: 10, fontWeight: 'bold', letterSpacing: 0.5 },
  iconBox: { width: 45, height: 45, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  cardContent: { flex: 1, marginLeft: 15 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold', flex: 1 },
  cardDate: { color: '#64748B', fontSize: 11, marginLeft: 10 },
  cardMessage: { color: '#94A3B8', fontSize: 13, marginTop: 4, lineHeight: 18 },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(2, 6, 23, 0.95)', justifyContent: 'flex-end' },
  modalContent: { 
    backgroundColor: '#1E293B', 
    borderTopLeftRadius: 30, 
    borderTopRightRadius: 30, 
    padding: 25, 
    maxHeight: SCREEN_HEIGHT * 0.85, 
    borderWidth: 1, 
    borderColor: '#334155' 
  },
  modalHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  modalInfoBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#0F172A', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  modalDateText: { color: '#22C55E', fontSize: 12, marginLeft: 6, fontWeight: '600' },
  newBadge: { backgroundColor: '#22C55E', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  newBadgeText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  modalTitle: { color: '#fff', fontSize: 22, fontWeight: 'bold', lineHeight: 28 },
  divider: { height: 1, backgroundColor: '#334155', marginVertical: 15 },
  modalBodyText: { color: '#CBD5E1', fontSize: 16, lineHeight: 26, paddingBottom: 30 },
  
  closeBtn: { backgroundColor: '#22C55E', padding: 18, borderRadius: 15, marginBottom: 10, alignItems: 'center' },
  closeBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  emptyText: { color: '#64748B', textAlign: 'center', marginTop: 50, fontSize: 16 }
});