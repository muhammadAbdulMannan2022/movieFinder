// app/signup.tsx
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Button, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Signup() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSignup = async () => {
        if (password !== confirmPassword) {
            Alert.alert("Error", "Passwords do not match");
            return;
        }

        try {
            const res = await fetch("http://10.10.13.87:3000/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
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
            <TextInput
                placeholder="Confirm Password"
                placeholderTextColor="#999"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                className="bg-gray-800 text-white px-4 py-2 rounded mb-4"
            />
            <Button title="Sign Up" onPress={handleSignup} />

            {/* Login Link */}
            <TouchableOpacity
                onPress={() => router.push("/login")}
                className="mt-6"
            >
                <Text className="text-center text-[#42f56c]">
                    Already have an account? Login
                </Text>
            </TouchableOpacity>
        </View>
    );
}
