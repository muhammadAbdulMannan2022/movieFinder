import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Alert, Image, Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://i.pravatar.cc/150?img=12',
};

const SettingsScreen = () => {
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const insets = useSafeAreaInsets();

    const handleLogout = () => {
        Alert.alert("Logout", "Are you sure you want to logout?", [
            { text: "Cancel", style: "cancel" },
            { text: "Logout", onPress: () => console.log("Logged out") }
        ]);
    };

    const handleEditProfile = () => {
        Alert.alert("Edit Profile", "Profile editing not implemented yet.");
    };

    return (
        <SafeAreaView className="flex-1 bg-black" edges={['top', 'bottom']}>
            <View className="flex-1 px-4 py-6 justify-between">
                {/* Main Content */}
                <View>
                    {/* Profile Section */}
                    <View className="flex-row items-center mb-8">
                        <Image
                            source={{ uri: user.avatar }}
                            className="w-20 h-20 rounded-full border-2 border-green-500"
                        />
                        <View className="flex-1 ml-4">
                            <Text className="text-white text-xl font-bold">{user.name}</Text>
                            <Text className="text-gray-400 text-sm">{user.email}</Text>
                        </View>

                        <TouchableOpacity onPress={handleEditProfile} className="mr-4 p-2">
                            <Feather name="edit-3" size={24} color="#42f56c" />
                        </TouchableOpacity>
                    </View>

                    {/* Settings Title */}
                    <Text className="text-white text-2xl font-bold mb-6">Settings</Text>

                    {/* Notifications */}
                    <View className="flex-row justify-between items-center py-3 border-b border-gray-700">
                        <View className="flex-row items-center gap-3">
                            <Ionicons name="notifications" size={22} color="gray" />
                            <Text className="text-gray-200 text-base">Notifications</Text>
                        </View>
                        <Switch
                            value={notificationsEnabled}
                            onValueChange={setNotificationsEnabled}
                            trackColor={{ false: "#555", true: "#42f56c" }}
                            thumbColor={notificationsEnabled ? "#1a1a1a" : "#eee"}
                        />
                    </View>

                    {/* About */}
                    <TouchableOpacity
                        className="flex-row items-center gap-3 py-4 border-b border-gray-700"
                        onPress={() => Alert.alert("About", "Movie App v1.0")}
                    >
                        <Feather name="info" size={22} color="gray" />
                        <Text className="text-gray-200 text-base">About</Text>
                    </TouchableOpacity>

                    {/* Privacy Policy */}
                    <TouchableOpacity
                        className="flex-row items-center py-4 border-b border-gray-700"
                        onPress={() => Alert.alert("Privacy Policy", "No data is collected.")}
                    >
                        <MaterialIcons name="privacy-tip" size={22} color="gray" />
                        <Text className="text-gray-200 text-base ml-3">Privacy Policy</Text>
                    </TouchableOpacity>
                </View>

                {/* Logout Button with bottom padding for safe area + tab bar */}
                <View style={{ paddingBottom: insets.bottom + 20 /* add extra space if needed */ }}>
                    <TouchableOpacity
                        onPress={handleLogout}
                        activeOpacity={60}
                        className="p-3 flex-row items-center justify-center border border-red-600 rounded-md"
                    >
                        <Text className="text-red-600 text-lg font-bold mr-2">Log Out</Text>
                        <MaterialIcons name="logout" size={24} color="#dc2626" />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default SettingsScreen;
