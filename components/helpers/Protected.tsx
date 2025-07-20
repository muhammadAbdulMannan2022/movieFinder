import { router, usePathname } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { ReactNode, useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

type Props = { children: ReactNode };

export default function Protected({ children }: Props) {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        async function checkAuth() {
            const accessToken = await SecureStore.getItemAsync("accessToken");
            if (accessToken) {
                setAuthenticated(true);
            } else {
                setAuthenticated(false);
                router.replace("/(auth)/login");
            }
            setLoading(false);
        }

        checkAuth();
    }, [pathname]);

    if (loading) {
        return (
            <View className="flex-1 items-center justify-center bg-black">
                <ActivityIndicator size="large" color="#42f56c" />
            </View>
        );
    }

    if (!authenticated) return null;

    return <>{children}</>;
}
