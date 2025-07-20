import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    Image,
    Pressable,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useAuth } from "../context/AuthContext";

export default function Login() {
    const { login } = useAuth();
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async () => {
        try {
            const res = await fetch("http://10.10.13.87:3000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok && data.accessToken) {
                await login(data.accessToken, data.refreshToken);
                router.replace("/(tabs)");
            } else {
                Alert.alert("Login Failed", data.message || "Unknown error");
            }
        } catch (err) {
            console.log(err);
            Alert.alert("Error", "Something went wrong");
        }
    };

    return (
        <View className="flex-1 bg-black justify-center px-6">
            {/* Image Header */}
            <View className="items-center h-[30%] mb-8 justify-center">
                <Image
                    source={require("@/assets/icon.png")}
                    className="w-60 h-32 rounded-full"
                    resizeMode="cover"
                />
            </View>

            <View className="h-[60%]">
                {/* Email Input */}
                <TextInput
                    placeholder="Email"
                    placeholderTextColor="#aaa"
                    value={email}
                    onChangeText={setEmail}
                    className="bg-gray-800 text-white px-4 py-3 rounded-xl mb-4"
                    autoCapitalize="none"
                    keyboardType="email-address"
                />

                {/* Password Input with Toggle */}
                <View className="relative mb-6">
                    <TextInput
                        placeholder="Password"
                        placeholderTextColor="#aaa"
                        secureTextEntry={!showPassword}
                        value={password}
                        onChangeText={setPassword}
                        className="bg-gray-800 text-white px-4 py-3 rounded-xl pr-10"
                    />
                    <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-3"
                    >
                        <Ionicons
                            name={showPassword ? "eye-off" : "eye"}
                            size={22}
                            color="#aaa"
                        />
                    </TouchableOpacity>
                </View>

                {/* Login Button */}
                <Pressable
                    onPress={handleLogin}
                    className="bg-[#42f56c] py-3 rounded-xl mb-4"
                >
                    <Text className="text-black text-center text-base font-semibold">
                        Login
                    </Text>
                </Pressable>

                {/* Sign Up Redirect */}
                <TouchableOpacity onPress={() => router.push("/signup")}>
                    <Text className="text-center text-gray-300">
                        Don’t have an account?{" "}
                        <Text className="text-[#42f56c] font-semibold">
                            Sign Up
                        </Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
