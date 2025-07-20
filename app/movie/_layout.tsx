// app/movie/_layout.tsx
import { Stack } from 'expo-router';

export default function MovieLayout() {
    return <Stack screenOptions={{ headerShown: false, presentation: "card" }} />;
}