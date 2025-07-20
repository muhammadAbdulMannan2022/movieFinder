// app/context/AuthContext.tsx
import * as SecureStore from "expo-secure-store";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [authToken, setAuthToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        SecureStore.getItemAsync("accessToken").then((token) => {
            setAuthToken(token);
            setLoading(false);
        });
    }, []);

    const login = async (token: string) => {
        await SecureStore.setItemAsync("accessToken", token);
        setAuthToken(token);
    };

    const logout = async () => {
        await SecureStore.deleteItemAsync("accessToken");
        setAuthToken(null);
    };

    return (
        <AuthContext.Provider value={{ authToken, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
