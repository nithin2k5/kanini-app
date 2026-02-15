import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    ImageBackground,
} from 'react-native';
import { useRouter, Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function LoginScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);

    const handleLogin = () => {
        router.replace('/(tabs)');
    };

    return (
        <View className="flex-1 bg-gray-50">
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View className="flex-1 justify-center px-6">

                        {/* Header / Logo Area */}
                        <View className="items-center mb-10">
                            <View className="w-16 h-16 bg-blue-600 rounded-2xl items-center justify-center mb-4 shadow-blue-500/30 shadow-xl">
                                <Text className="text-3xl">🩺</Text>
                            </View>
                            <Text className="text-3xl font-bold text-gray-900">Welcome Back</Text>
                            <Text className="text-gray-500 mt-2">Sign in to your dashboard</Text>
                        </View>

                        {/* Login Card */}
                        <View className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                            <View className="space-y-6">

                                {/* Email Input */}
                                <View>
                                    <Text className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">Work Email</Text>
                                    <View className="flex-row items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 focus:border-blue-500 focus:bg-white transition-all">
                                        <IconSymbol name="paperplane.fill" size={18} color="#9CA3AF" style={{ marginRight: 10 }} />
                                        <TextInput
                                            placeholder="doctor@hospital.com"
                                            placeholderTextColor="#9CA3AF"
                                            className="flex-1 text-gray-800 text-base"
                                            keyboardType="email-address"
                                            autoCapitalize="none"
                                            value={email}
                                            onChangeText={setEmail}
                                        />
                                    </View>
                                </View>

                                {/* Password Input */}
                                <View>
                                    <Text className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">Password</Text>
                                    <View className="flex-row items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 focus:border-blue-500 focus:bg-white transition-all">
                                        <IconSymbol name="chevron.left.forwardslash.chevron.right" size={18} color="#9CA3AF" style={{ marginRight: 10 }} />
                                        <TextInput
                                            placeholder="••••••••"
                                            placeholderTextColor="#9CA3AF"
                                            className="flex-1 text-gray-800 text-base"
                                            secureTextEntry={!passwordVisible}
                                            value={password}
                                            onChangeText={setPassword}
                                        />
                                        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                                            <IconSymbol name={passwordVisible ? "chevron.right" : "chevron.right"} size={20} color="#9CA3AF" />
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity className="self-end mt-2">
                                        <Text className="text-blue-600 text-sm font-medium">Forgot Password?</Text>
                                    </TouchableOpacity>
                                </View>

                                {/* Login Button */}
                                <TouchableOpacity
                                    onPress={handleLogin}
                                    className="bg-blue-600 rounded-xl py-4 items-center shadow-lg shadow-blue-600/30 active:bg-blue-700 active:scale-[0.98] transition-all"
                                >
                                    <Text className="text-white font-bold text-lg">Sign In</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Footer */}
                        <View className="flex-row justify-center mt-10">
                            <Text className="text-gray-500">New to Kairo? </Text>
                            <Link href="/auth/signup" asChild>
                                <TouchableOpacity>
                                    <Text className="text-blue-600 font-bold">Create an account</Text>
                                </TouchableOpacity>
                            </Link>
                        </View>

                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </View>
    );
}
