import { useState, useCallback } from 'react';
import { View, FlatList, RefreshControl, Text, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PatientCard, Patient } from '@/components/PatientCard';
import { Stack } from 'expo-router';

// Mock Data
const INITIAL_PATIENTS: Patient[] = [
  {
    id: '10234',
    name: 'Sarah Connor',
    age: 42,
    gender: 'F',
    chiefComplaint: 'Severe chest pain radiating to the left arm, sweating, and shortness of breath.',
    waitTime: '15m',
    riskLevel: 'High',
  },
  {
    id: '10235',
    name: 'James Bond',
    age: 38,
    gender: 'M',
    chiefComplaint: 'Laceration on right forearm, bleeding controlled. History of previous injury.',
    waitTime: '45m',
    riskLevel: 'Medium',
  },
  {
    id: '10236',
    name: 'Peter Parker',
    age: 21,
    gender: 'M',
    chiefComplaint: 'Mild fever and sore throat for 2 days. No difficulty breathing.',
    waitTime: '10m',
    riskLevel: 'Low',
  },
  {
    id: '10237',
    name: 'Wanda Maximoff',
    age: 29,
    gender: 'F',
    chiefComplaint: 'Migraine headache with visual aura and nausea. Sensitivity to light.',
    waitTime: '1h 20m',
    riskLevel: 'Medium',
  },
  {
    id: '10238',
    name: 'Bruce Banner',
    age: 45,
    gender: 'M',
    chiefComplaint: 'Elevated heart rate and feeling of anxiety. No chest pain.',
    waitTime: '5m',
    riskLevel: 'High',
  },
  {
    id: '10239',
    name: 'Natasha Romanoff',
    age: 34,
    gender: 'F',
    chiefComplaint: 'Sprained left ankle during exercise. Swelling and bruising present.',
    waitTime: '30m',
    riskLevel: 'Low',
  },
];

export default function HomeScreen() {
  const [patients, setPatients] = useState<Patient[]>(INITIAL_PATIENTS);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate network request
    setTimeout(() => {
      // Shuffle list to simulate update
      setPatients([...patients].sort(() => Math.random() - 0.5));
      setRefreshing(false);
    }, 1500);
  }, [patients]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FAFAFA' }} edges={['top']}>
      <Stack.Screen options={{ headerShown: false }} />
      <View className="px-5 py-6 flex-1">
        {/* Modern Header */}
        <View className="mb-6 flex-row justify-between items-center">
          <View>
            <Text className="text-3xl font-extrabold text-gray-900 tracking-tight">Kairo</Text>
            <View className="flex-row items-center mt-1">
              <View className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse" />
              <Text className="text-gray-500 font-medium text-sm">Live Triage • {patients.length} Waiting</Text>
            </View>
          </View>
          <View className="bg-white p-2 rounded-full shadow-sm border border-gray-100">
            {/* Profile Icon Placeholder */}
            <View className="w-8 h-8 rounded-full bg-blue-100 items-center justify-center">
              <Text className="text-blue-700 font-bold text-xs">JD</Text>
            </View>
          </View>
        </View>

        {/* Filter/Tabs Placeholder (Optional Polish) */}
        <View className="flex-row mb-6 space-x-3">
          <View className="bg-gray-900 px-4 py-2 rounded-full">
            <Text className="text-white font-semibold text-xs">All Patients</Text>
          </View>
          <View className="bg-white border border-gray-200 px-4 py-2 rounded-full">
            <Text className="text-gray-600 font-semibold text-xs">High Risk</Text>
          </View>
        </View>

        <FlatList
          data={patients}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <PatientCard patient={item} />}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#111827" />
          }
          ListEmptyComponent={
            <View className="items-center justify-center py-20">
              <Text className="text-gray-400">No patients in queue</Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}
