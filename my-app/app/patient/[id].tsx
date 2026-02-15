import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/ui/icon-symbol';

// Mock Detail Data (In a real app, fetch this by ID)
const MOCK_DETAILS = {
    vitals: {
        bp: '120/80',
        hr: '85 bpm',
        temp: '98.6°F',
        spo2: '98%',
    },
    assessment: 'AI reports 85% probability of Acute Coronary Syndrome based on symptom clusters.',
    history: [
        'Hypertension (diagnosed 2020)',
        'Type 2 Diabetes (controlled)',
        'Previous Myocardial Infarction (2018)',
    ],
    medications: ['Lisinopril 10mg', 'Metformin 500mg', 'Aspirin 81mg'],
};

export default function PatientDetailScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'overview' | 'history'>('overview');

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F9FAFB' }} edges={['bottom']}>
            <Stack.Screen
                options={{
                    headerTitle: `Patient #${id}`,
                    headerBackTitle: 'Queue',
                    headerTintColor: '#2563EB',
                }}
            />

            {/* Tabs Header */}
            <View className="flex-row border-b border-gray-200 bg-white">
                <TouchableOpacity
                    onPress={() => setActiveTab('overview')}
                    className={`flex-1 py-4 items-center border-b-2 ${activeTab === 'overview' ? 'border-blue-600' : 'border-transparent'
                        }`}
                >
                    <Text
                        className={`font-semibold ${activeTab === 'overview' ? 'text-blue-600' : 'text-gray-500'
                            }`}
                    >
                        Overview
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setActiveTab('history')}
                    className={`flex-1 py-4 items-center border-b-2 ${activeTab === 'history' ? 'border-blue-600' : 'border-transparent'
                        }`}
                >
                    <Text
                        className={`font-semibold ${activeTab === 'history' ? 'text-blue-600' : 'text-gray-500'
                            }`}
                    >
                        History
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Content */}
            <ScrollView className="flex-1 p-4" contentContainerStyle={{ paddingBottom: 100 }}>
                {activeTab === 'overview' ? (
                    <View className="space-y-4">
                        {/* Vitals Grid */}
                        <View className="flex-row flex-wrap justify-between">
                            {Object.entries(MOCK_DETAILS.vitals).map(([key, value]) => (
                                <View key={key} className="bg-white p-4 rounded-xl w-[48%] mb-4 shadow-sm">
                                    <Text className="text-gray-400 uppercase text-xs font-bold mb-1">{key}</Text>
                                    <Text className="text-xl font-bold text-gray-800">{value}</Text>
                                </View>
                            ))}
                        </View>

                        {/* AI Assessment */}
                        <View className="bg-blue-50 p-5 rounded-xl border border-blue-100">
                            <View className="flex-row items-center mb-2">
                                <IconSymbol name="star.fill" size={18} color="#2563EB" />
                                <Text className="text-blue-800 font-bold ml-2">AI Assessment</Text>
                            </View>
                            <Text className="text-blue-900 leading-6">{MOCK_DETAILS.assessment}</Text>
                        </View>
                    </View>
                ) : (
                    <View className="space-y-6">
                        <View className="bg-white p-5 rounded-xl shadow-sm">
                            <Text className="text-lg font-bold text-gray-800 mb-3">Medical History</Text>
                            {MOCK_DETAILS.history.map((item, index) => (
                                <View key={index} className="flex-row items-center mb-2">
                                    <View className="w-2 h-2 bg-gray-400 rounded-full mr-3" />
                                    <Text className="text-gray-600 text-base">{item}</Text>
                                </View>
                            ))}
                        </View>

                        <View className="bg-white p-5 rounded-xl shadow-sm">
                            <Text className="text-lg font-bold text-gray-800 mb-3">Medications</Text>
                            {MOCK_DETAILS.medications.map((item, index) => (
                                <View key={index} className="flex-row items-center mb-2">
                                    <View className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                                    <Text className="text-gray-600 text-base">{item}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                )}
            </ScrollView>

            {/* Floating Action Button */}
            <View className="absolute bottom-8 right-6">
                <TouchableOpacity
                    className="bg-blue-600 w-14 h-14 rounded-full items-center justify-center shadow-lg active:bg-blue-700"
                    onPress={() => {/* Action Sheet or Modal */ }}
                >
                    <IconSymbol name="plus" size={28} color="white" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
