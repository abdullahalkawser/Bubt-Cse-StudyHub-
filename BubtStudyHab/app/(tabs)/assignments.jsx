import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, 
  TextInput, Dimensions, SafeAreaView, StatusBar 
} from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function AssignmentsPage() {
  const [search, setSearch] = useState('');

  // ১০টি প্রফেশনাল সেকশন ও ডাটা
  const assignmentSections = [
    { id: 1, title: 'Data Structures', icon: 'file-tree', color: '#22C55E', tasks: [
      { name: 'Red-Black Tree', deadline: '2 Days left', priority: 'High', status: 'Pending' },
      { name: 'Graph Traversal', deadline: '5 Days left', priority: 'Medium', status: 'In Progress' },
      { name: 'Heap Sort Lab', deadline: 'Tomorrow', priority: 'Urgent', status: 'Pending' },
      { name: 'Hashing Table', deadline: '8 Days left', priority: 'Low', status: 'Completed' },
      { name: 'B-Tree Analysis', deadline: '10 Days left', priority: 'Medium', status: 'Pending' },
    ]},
    { id: 2, title: 'Algorithms', icon: 'xml', color: '#3B82F6', tasks: [
      { name: 'Dynamic Prog.', deadline: '3 Days left', priority: 'High', status: 'Pending' },
      { name: 'Knapsack Prob.', deadline: '4 Days left', priority: 'Medium', status: 'In Progress' },
      { name: 'Floyd Warshall', deadline: '12 Days left', priority: 'Low', status: 'Pending' },
    ]},
    { id: 3, title: 'Database (DBMS)', icon: 'database', color: '#F59E0B', tasks: [
      { name: 'Query Optimization', deadline: 'Tomorrow', priority: 'Urgent', status: 'Pending' },
      { name: 'BCNF Exercise', deadline: '6 Days left', priority: 'High', status: 'Completed' },
      { name: 'NoSQL Design', deadline: '15 Days left', priority: 'Low', status: 'Pending' },
    ]},
    { id: 4, title: 'Operating Systems', icon: 'memory', color: '#EF4444', tasks: [
      { name: 'Semaphore Code', deadline: '2 Days left', priority: 'High', status: 'In Progress' },
      { name: 'Page Replacement', deadline: '9 Days left', priority: 'Medium', status: 'Pending' },
    ]},
    { id: 5, title: 'Computer Networks', icon: 'lan', color: '#06B6D4', tasks: [
      { name: 'Subnetting Quiz', deadline: '4 Days left', priority: 'High', status: 'Pending' },
      { name: 'TCP Handshake', deadline: '7 Days left', priority: 'Medium', status: 'Completed' },
    ]},
    { id: 6, title: 'Software Eng.', icon: 'cog-outline', color: '#8B5CF6', tasks: [
      { name: 'Agile Workflow', deadline: '1 Day left', priority: 'Urgent', status: 'Pending' },
      { name: 'UML Diagrams', deadline: '11 Days left', priority: 'Low', status: 'In Progress' },
    ]},
    { id: 7, title: 'Artificial Intelligence', icon: 'robot', color: '#EC4899', tasks: [
      { name: 'NLP Model Prep', deadline: '5 Days left', priority: 'High', status: 'Pending' },
      { name: 'BFS vs DFS AI', deadline: '14 Days left', priority: 'Medium', status: 'Pending' },
    ]},
    { id: 8, title: 'Cyber Security', icon: 'shield-lock', color: '#10B981', tasks: [
      { name: 'RSA Encryption', deadline: 'Today', priority: 'Urgent', status: 'In Progress' },
      { name: 'SQL Injection Lab', deadline: '3 Days left', priority: 'High', status: 'Pending' },
    ]},
    { id: 9, title: 'Compiler Design', icon: 'application-export', color: '#F43F5E', tasks: [
      { name: 'Parser Table', deadline: '8 Days left', priority: 'Medium', status: 'Pending' },
      { name: 'Intermediate Code', deadline: '20 Days left', priority: 'Low', status: 'Pending' },
    ]},
    { id: 10, title: 'Cloud Computing', icon: 'cloud-outline', color: '#6366F1', tasks: [
      { name: 'AWS Lambda Task', deadline: '4 Days left', priority: 'High', status: 'Completed' },
      { name: 'Docker Compose', deadline: '10 Days left', priority: 'Medium', status: 'Pending' },
    ]},
  ];

  const getPriorityColor = (p) => {
    if(p === 'Urgent') return '#EF4444';
    if(p === 'High') return '#F59E0B';
    return '#64748B';
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />
      <SafeAreaView style={styles.safeArea} />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>📋 Task Board</Text>
          <Text style={styles.headerSubtitle}>10 Subjects • Manage Deadlines</Text>
        </View>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="filter" size={22} color="#22C55E" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#64748B" />
        <TextInput
          placeholder="Search assignments..."
          placeholderTextColor="#64748B"
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <ScrollView ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {assignmentSections.map((section) => {
          const isSectionMatch = section.title.toLowerCase().includes(search.toLowerCase());
          const matchedTasks = section.tasks.filter(task => task.name.toLowerCase().includes(search.toLowerCase()));
          const tasksToShow = isSectionMatch ? section.tasks : matchedTasks;

          if (tasksToShow.length === 0) return null;

          return (
            <View key={section.id} style={styles.sectionWrapper}>
              <View style={styles.sectionHeader}>
                <MaterialCommunityIcons name={section.icon} size={20} color={section.color} />
                <Text style={styles.sectionTitleText}>{section.title}</Text>
              </View>

              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
                {tasksToShow.map((task, index) => (
                  <View key={index} style={styles.taskCard}>
                    <View style={styles.cardTop}>
                      <View style={[styles.priorityBadge, { borderColor: getPriorityColor(task.priority) }]}>
                        <Text style={[styles.priorityText, { color: getPriorityColor(task.priority) }]}>{task.priority}</Text>
                      </View>
                      <MaterialCommunityIcons 
                        name={task.status === 'Completed' ? "check-circle" : "clock-outline"} 
                        size={18} 
                        color={task.status === 'Completed' ? "#22C55E" : "#64748B"} 
                      />
                    </View>

                    <Text style={styles.taskName} numberOfLines={2}>{task.name}</Text>
                    
                    <View style={styles.divider} />

                    <View style={styles.footer}>
                      <View>
                        <Text style={styles.label}>DEADLINE</Text>
                        <Text style={[styles.deadlineText, { color: task.deadline.includes('Tomorrow') || task.deadline.includes('Today') ? '#EF4444' : '#fff' }]}>
                          {task.deadline}
                        </Text>
                      </View>
                      <TouchableOpacity>
                        <Ionicons name="chevron-forward-circle" size={28} color={section.color} />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </ScrollView>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#0F172A',paddingTop:40 },
  safeArea: { backgroundColor: '#0F172A' },
  header: { paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15, marginBottom: 20 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
  headerSubtitle: { fontSize: 13, color: '#94A3B8' },
  iconButton: { backgroundColor: '#1E293B', padding: 10, borderRadius: 12 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1E293B', marginHorizontal: 20, paddingHorizontal: 15, height: 50, borderRadius: 15, marginBottom: 20, borderWidth: 1, borderColor: '#334155' },
  searchInput: { flex: 1, marginLeft: 10, color: '#fff' },
  sectionWrapper: { marginBottom: 30 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginBottom: 12 },
  sectionTitleText: { fontSize: 17, fontWeight: 'bold', color: '#fff', marginLeft: 8 },
  horizontalList: { paddingLeft: 20, paddingRight: 10 },
  taskCard: { 
    backgroundColor: '#1E293B', width: width * 0.48, padding: 16, borderRadius: 24, 
    marginRight: 15, borderWidth: 1, borderColor: '#334155', height: 160,
    justifyContent: 'space-between'
  },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  priorityBadge: { borderWidth: 1, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
  priorityText: { fontSize: 9, fontWeight: 'bold', textTransform: 'uppercase' },
  taskName: { color: '#fff', fontSize: 15, fontWeight: 'bold', marginTop: 12 },
  divider: { height: 1, backgroundColor: '#334155', marginVertical: 10 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  label: { color: '#64748B', fontSize: 9, fontWeight: 'bold', marginBottom: 2 },
  deadlineText: { fontSize: 12, fontWeight: 'bold' }
});