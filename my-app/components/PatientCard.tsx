import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { IconSymbol } from '@/components/ui/icon-symbol';

export type Patient = {
    id: string;
    name: string;
    age: number;
    gender: string;
    chiefComplaint: string;
    waitTime: string;
    riskLevel: 'High' | 'Medium' | 'Low';
};

interface PatientCardProps {
    patient: Patient;
}

const getRiskColor = (level: string) => {
    switch (level) {
        case 'High':
            return 'bg-red-100 text-red-700 border-red-200';
        case 'Medium':
            return 'bg-yellow-100 text-yellow-700 border-yellow-200';
        case 'Low':
            return 'bg-green-100 text-green-700 border-green-200';
        default:
            return 'bg-gray-100 text-gray-700 border-gray-200';
    }
};

export function PatientCard({ patient }: PatientCardProps) {
    return (
        <Link href={`/patient/${patient.id}`} asChild>
            <TouchableOpacity className="bg-white p-4 rounded-xl shadow-sm mb-3 border border-gray-100 active:bg-gray-50">
                {/* Header */}
                <View className="flex-row justify-between items-start mb-2">
                    <View>
                        <Text className="text-lg font-bold text-gray-900">
                            {patient.name} <Text className="text-gray-500 text-base font-normal">({patient.age} / {patient.gender})</Text>
                        </Text>
                        <Text className="text-xs text-gray-400 mt-0.5">ID: #{patient.id}</Text>
                    </View>
                    <View className={`px-2 py-1 rounded-full border ${getRiskColor(patient.riskLevel).split(' ')[0]} ${getRiskColor(patient.riskLevel).split(' ')[2]}`}>
                        <Text className={`text-xs font-semibold ${getRiskColor(patient.riskLevel).split(' ')[1]}`}>
                            {patient.riskLevel} Risk
                        </Text>
                    </View>
                </View>

                {/* Body */}
                <Text className="text-gray-600 mb-3 leading-5" numberOfLines={2}>
                    {patient.chiefComplaint}
                </Text>

                {/* Footer */}
                <View className="flex-row justify-between items-center pt-3 border-t border-gray-100">
                    <View className="flex-row items-center">
                        <IconSymbol name="clock.fill" size={14} color="#6B7280" />
                        <Text className="text-gray-500 text-xs ml-1.5">Wait Time: {patient.waitTime}</Text>
                    </View>
                    <IconSymbol name="chevron.right" size={16} color="#D1D5DB" />
                </View>
            </TouchableOpacity>
        </Link>
    );
}
