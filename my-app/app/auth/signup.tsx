import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    StyleSheet,
    Dimensions,
    Animated
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/ui/icon-symbol';

const { width } = Dimensions.get('window');

// Step Configuration
const STEPS = [
    { id: 1, title: 'Organization' },
    { id: 2, title: 'Address' },
    { id: 3, title: 'Admin Account' },
];

export default function SignupWizard() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        // Step 1
        orgName: '',
        orgType: '',
        phone: '',
        // Step 2
        street: '',
        city: '',
        state: '',
        pincode: '',
        country: '',
        // Step 3
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const updateForm = (key: string, value: string) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const handleNext = () => {
        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
        } else {
            // Final Submit
            router.replace('/(tabs)');
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        } else {
            router.back();
        }
    };

    const renderStepIndicator = () => (
        <View className="mb-8">
            <View className="items-center mb-6">
                <Text className="text-2xl font-bold text-gray-900">Create Account</Text>
                <Text className="text-gray-500 mt-1">Register your organization</Text>
            </View>

            <View className="flex-row justify-between items-center px-4 relative">
                {/* Progress Line Background */}
                <View className="absolute left-4 right-4 h-1 bg-gray-200 top-4 -z-10" />
                {/* Active Progress Line can be animated here if needed */}

                {STEPS.map((step, index) => {
                    const isActive = currentStep >= step.id;
                    const isCurrent = currentStep === step.id;

                    return (
                        <View key={step.id} className="items-center">
                            <View
                                className={`w-8 h-8 rounded-full items-center justify-center border-2 
                   ${isActive ? 'bg-gray-900 border-gray-900' : 'bg-white border-gray-300'}
                 `}
                            >
                                <Text className={`font-bold ${isActive ? 'text-white' : 'text-gray-500'}`}>
                                    {step.id}
                                </Text>
                            </View>
                            <Text
                                className={`text-xs mt-2 font-medium ${isCurrent ? 'text-gray-900' : 'text-gray-400'}`}
                            >
                                {step.title}
                            </Text>
                        </View>
                    );
                })}
            </View>
        </View>
    );

    const renderInput = (label: string, value: string, key: string, placeholder: string, secure = false) => (
        <View className="mb-4">
            <Text className="text-sm font-semibold text-gray-600 mb-1.5">{label}</Text>
            <TextInput
                className="bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-800 text-base focus:border-gray-900 focus:border-2"
                value={value}
                onChangeText={(text) => updateForm(key, text)}
                placeholder={placeholder}
                placeholderTextColor="#9CA3AF"
                secureTextEntry={secure}
            />
        </View>
    );

    const renderStep1 = () => (
        <View>
            {renderInput('Hospital / Organization Name', formData.orgName, 'orgName', 'City General Hospital')}

            {/* Custom Mock Select for Type */}
            <View className="mb-4">
                <Text className="text-sm font-semibold text-gray-600 mb-1.5">Organization Type</Text>
                <TouchableOpacity className="bg-white border border-gray-300 rounded-lg px-4 py-3 flex-row justify-between items-center">
                    <Text className={formData.orgType ? "text-gray-800" : "text-gray-400"}>
                        {formData.orgType || "Select type"}
                    </Text>
                    <IconSymbol name="chevron.right" size={16} color="#9CA3AF" style={{ transform: [{ rotate: '90deg' }] }} />
                </TouchableOpacity>
            </View>

            {renderInput('Phone Number', formData.phone, 'phone', '+91 9876543210')}
        </View>
    );

    const renderStep2 = () => (
        <View>
            {renderInput('Street Address', formData.street, 'street', '123 Medical Avenue')}

            <View className="flex-row space-x-4">
                <View className="flex-1">
                    {renderInput('City', formData.city, 'city', 'Hyderabad')}
                </View>
                <View className="flex-1">
                    {renderInput('State', formData.state, 'state', 'Telangana')}
                </View>
            </View>

            <View className="flex-row space-x-4">
                <View className="flex-1">
                    {renderInput('Pincode', formData.pincode, 'pincode', '500001')}
                </View>
                <View className="flex-1">
                    {renderInput('Country', formData.country, 'country', 'India')}
                </View>
            </View>
        </View>
    );

    const renderStep3 = () => (
        <View>
            {renderInput('Full Name', formData.fullName, 'fullName', 'Dr. John Doe')}
            {renderInput('Email', formData.email, 'email', 'admin@hospital.com')}

            <View className="relative">
                {renderInput('Password', formData.password, 'password', 'Min 8 characters', true)}
                <View className="absolute right-3 top-9">
                    <IconSymbol name="plus" size={20} color="#9CA3AF" /> {/* Placeholder eye icon */}
                </View>
            </View>

            <View className="relative">
                {renderInput('Confirm Password', formData.confirmPassword, 'confirmPassword', 'Re-enter password', true)}
                <View className="absolute right-3 top-9">
                    <IconSymbol name="plus" size={20} color="#9CA3AF" />
                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaView className="flex-1 bg-white">
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View className="flex-1 p-6">

                        {renderStepIndicator()}

                        <ScrollView
                            className="flex-1"
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingBottom: 100 }}
                        >
                            <View className="bg-white rounded-xl">
                                {currentStep === 1 && renderStep1()}
                                {currentStep === 2 && renderStep2()}
                                {currentStep === 3 && renderStep3()}
                            </View>
                        </ScrollView>

                        {/* Footer Buttons */}
                        <View className="flex-row justify-between items-center py-4 border-t border-gray-100 bg-white absolute bottom-0 left-0 right-0 px-6 safe-area-bottom">
                            {currentStep === 1 ? (
                                <TouchableOpacity onPress={handleBack}>
                                    {/* Hidden or Link to Login */}
                                    <Text className="text-gray-900 font-semibold px-4">Back to Login</Text>
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity onPress={handleBack}>
                                    <Text className="text-gray-900 font-bold text-base">Back</Text>
                                </TouchableOpacity>
                            )}

                            <TouchableOpacity
                                onPress={handleNext}
                                className="bg-gray-900 rounded-lg px-8 py-3 shadow-lg active:bg-gray-800"
                            >
                                <Text className="text-white font-bold text-base">
                                    {currentStep === 3 ? 'Create Account' : 'Next'}
                                </Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
