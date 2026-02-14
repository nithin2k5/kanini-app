import { View, Text } from 'react-native';
import { Stack } from 'expo-router';

export default function NativeWindTest() {
    return (
        <>
            <Stack.Screen options={{ title: 'NativeWind Test' }} />
            <View className="flex-1 justify-center items-center bg-blue-500">
                <Text className="text-white text-2xl font-bold">NativeWind is working!</Text>
                <Text className="text-yellow-300 text-lg mt-4">If you see this, configuration is successful.</Text>
            </View>
        </>
    );
}
