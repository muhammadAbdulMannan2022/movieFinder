import { View } from 'react-native';

export default function MovieCardSkeleton() {
    return (
        <View className="mr-3 animate-pulse">
            <View className="w-[120px] h-[180px] rounded-lg bg-neutral-800" />
            <View className="mt-2 w-[100px] h-[12px] rounded bg-neutral-800" />
        </View>
    );
}
