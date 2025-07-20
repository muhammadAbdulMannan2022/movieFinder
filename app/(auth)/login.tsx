import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Button, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useAuth } from "../context/AuthContext";

export default function Login() {
    const { login } = useAuth();
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        console.log(email, password);
        try {
            const res = await fetch("http://10.10.13.87:3000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();
            // console.log(data);
            if (res.ok && data.accessToken) {
                await login(data.accessToken, data.refreshToken);
                // Navigate after login
                router.replace("/(tabs)");  // replace to prevent back navigation
            } else {
                Alert.alert("Login Failed", data.message || "Unknown error");
            }
        } catch (err) {
            console.log(err);
            Alert.alert("Error", "Something went wrong");
        }
    };


    return (
        <View className="p-6 flex-1 justify-center bg-black">
            <TextInput
                placeholder="Email"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                className="bg-gray-800 text-white px-4 py-2 rounded mb-4"
                autoCapitalize="none"
                keyboardType="email-address"
            />
            <TextInput
                placeholder="Password"
                placeholderTextColor="#999"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                className="bg-gray-800 text-white px-4 py-2 rounded mb-4"
            />
            <Button title="Login" onPress={handleLogin} />

            {/* Sign Up Link */}
            <TouchableOpacity
                onPress={() => router.push("/signup")}
                className="mt-6"
            >
                <Text className="text-center text-[#42f56c]">
                    Don't have an account? Sign Up
                </Text>
            </TouchableOpacity>
        </View>
    );
}
