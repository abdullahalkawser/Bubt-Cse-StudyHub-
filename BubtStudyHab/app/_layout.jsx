import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="allnote/index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack>

      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

// const sections = [
//     {
//       id: 1,
//       title: 'Data Structures',
//       icon: 'file-tree',
//       color: '#22C55E',
//       notes: [
//         { name: 'Arrays & Strings', progress: 80 },
//         { name: 'Linked Lists', progress: 40 },
//         { name: 'Stack & Queue', progress: 10 },
//         { name: 'Binary Trees', progress: 0 },
//         { name: 'Graph Theory', progress: 0 },
//       ],
//     },
//     {
//       id: 2,
//       title: 'Algorithms',
//       icon: 'xml',
//       color: '#3B82F6',
//       notes: [
//         { name: 'Sorting Algos', progress: 90 },
//         { name: 'Binary Search', progress: 70 },
//         { name: 'Dynamic Prog.', progress: 5 },
//         { name: 'Greedy Algos', progress: 0 },
//         { name: 'Backtracking', progress: 0 },
//       ],
//     },
//     {
//       id: 3,
//       title: 'Database (DBMS)',
//       icon: 'database',
//       color: '#F59E0B',
//       notes: [
//         { name: 'SQL Queries', progress: 100 },
//         { name: 'Normalization', progress: 50 },
//         { name: 'ER Modeling', progress: 20 },
//         { name: 'Indexing', progress: 0 },
//         { name: 'NoSQL Intro', progress: 0 },
//       ],
//     },
//     {
//       id: 4,
//       title: 'Operating Systems',
//       icon: 'memory',
//       color: '#EF4444',
//       notes: [
//         { name: 'Process Mgmt', progress: 60 },
//         { name: 'Deadlocks', progress: 30 },
//         { name: 'Memory Mgmt', progress: 0 },
//         { name: 'File Systems', progress: 0 },
//         { name: 'CPU Scheduling', progress: 0 },
//       ],
//     },
//     {
//       id: 5,
//       title: 'Computer Networks',
//       icon: 'lan',
//       color: '#06B6D4',
//       notes: [
//         { name: 'OSI Model', progress: 85 },
//         { name: 'TCP/IP Protocol', progress: 40 },
//         { name: 'IP Addressing', progress: 20 },
//         { name: 'DNS & HTTP', progress: 0 },
//         { name: 'Network Security', progress: 0 },
//       ],
//     },
//   ];
