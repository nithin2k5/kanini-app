import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoadingScreen() {
    const router = useRouter();

    useEffect(() => {
        // Simulate loading resources or checking auth state
        const timer = setTimeout(() => {
            router.replace('/auth/login');
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <SafeAreaView className="flex-1 bg-blue-600 items-center justify-center">
            <View className="items-center">
                {/* Logo/Icon Placeholder - Replace with actual Image if available */}
                <View className="w-24 h-24 bg-white rounded-3xl items-center justify-center mb-6 shadow-lg">
                    <Text className="text-4xl">🩺</Text>
                </View>

                <Text className="text-4xl font-bold text-white mb-2 tracking-wider">Kairo</Text>
                <Text className="text-blue-100 text-lg font-medium tracking-widest uppercase text-xs mb-12">
                    Intelligent Triage
                </Text>

                <ActivityIndicator size="large" color="#FFFFFF" />
            </View>

            <View className="absolute bottom-10">
                <Text className="text-blue-200 text-xs text-center">
                    Powered by Deep Learning
                </Text>
            </View>
        </SafeAreaView>
    );
}
