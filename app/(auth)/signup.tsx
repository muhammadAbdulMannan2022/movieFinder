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

export default function Signup() {
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSignup = async () => {
        if (password !== confirmPassword) {
            Alert.alert("Error", "Passwords do not match");
            return;
        }

        try {
            const res = await fetch("http://10.10.13.87:3000/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                Alert.alert("Success", "Account created successfully!", [
                    {
                        text: "OK",
                        onPress: () => router.push("/login"),
                    },
                ]);
            } else {
                Alert.alert("Signup Failed", data.message || "Unknown error");
            }
        } catch (err) {
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
                {/* Name Input */}
                <TextInput
                    placeholder="Name"
                    placeholderTextColor="#aaa"
                    value={username}
                    onChangeText={setUsername}
                    className="bg-gray-800 text-white px-4 py-3 rounded-xl mb-4"
                />

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

                {/* Password Input with Eye Icon */}
                <View className="relative mb-4">
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

                {/* Confirm Password Input with Eye Icon */}
                <View className="relative mb-6">
                    <TextInput
                        placeholder="Confirm Password"
                        placeholderTextColor="#aaa"
                        secureTextEntry={!showConfirmPassword}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        className="bg-gray-800 text-white px-4 py-3 rounded-xl pr-10"
                    />
                    <TouchableOpacity
                        onPress={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-4 top-3"
                    >
                        <Ionicons
                            name={showConfirmPassword ? "eye-off" : "eye"}
                            size={22}
                            color="#aaa"
                        />
                    </TouchableOpacity>
                </View>

                {/* Submit Button */}
                <Pressable
                    onPress={handleSignup}
                    className="bg-[#42f56c] py-3 rounded-xl mb-4"
                >
                    <Text className="text-black text-center text-base font-semibold">
                        Sign Up
                    </Text>
                </Pressable>

                {/* Login Redirect */}
                <TouchableOpacity onPress={() => router.push("/login")}>
                    <Text className="text-center text-gray-300">
                        Already have an account?{" "}
                        <Text className="text-[#42f56c] font-semibold">
                            Login
                        </Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
