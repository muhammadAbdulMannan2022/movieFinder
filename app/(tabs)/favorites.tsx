import MovieCard from '@/components/helpers/movieCard';
import MovieCardSkeleton from '@/components/helpers/movieCardSkeleton';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useCallback, useState } from 'react';
import {
    Alert,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

type Movie = {
    id: number;
    title: string;
    poster_path: string | null;
};

const Favorites = () => {
    const [favorites, setFavorites] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchFavorites = async () => {
        try {
            const token = await SecureStore.getItemAsync('accessToken');
            if (!token) {
                Alert.alert('Unauthorized', 'Please login to view your favorites.');
                return;
            }

            const res = await fetch('http://10.10.13.87:3000/api/favorites', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await res.json();
            if (res.ok) {
                setFavorites(data.favorites);
            } else {
                Alert.alert('Error', 'Failed to fetch favorite movies.');
            }
        } catch (err) {
            Alert.alert('Error', 'Something went wrong.');
        } finally {
            setLoading(false);
        }
    };

    const removeFavorite = async (movieId: number) => {
        try {
            const token = await SecureStore.getItemAsync('accessToken');
            if (!token) {
                Alert.alert('Unauthorized', 'Please login.');
                return;
            }

            const res = await fetch(`http://10.10.13.87:3000/api/favorites/${movieId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.ok) {
                setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
            } else {
                Alert.alert('Error', 'Failed to remove favorite.');
            }
        } catch (error) {
            Alert.alert('Error', 'Something went wrong.');
        }
    };
    useFocusEffect(
        useCallback(() => {
            fetchFavorites()
        }, [])
    )

    return (
        <ScrollView className="flex-1 bg-black px-4 pt-6">
            <Text className="text-[#42f56c] text-2xl font-bold mb-4">My Favorites</Text>

            <View className="flex-row flex-wrap gap-x-3 gap-y-4">
                {loading ? (
                    <View className='flex-row flex-wrap justify-start gap-3'>
                        {
                            [...Array(6)].map((_, i) => <View className='w-[31%] mb-4 gap-1'>
                                <MovieCardSkeleton key={i} />
                            </View>)
                        }
                    </View>
                ) : favorites.length === 0 ? (
                    <Text className="text-gray-400">You have no favorite movies.</Text>
                ) : (
                    <View className="flex-row flex-wrap justify-start gap-3">
                        {
                            favorites.map((movie) => (
                                <View className='w-[31%] mb-4 gap-1'>
                                    <View key={movie.id} className="relative">
                                        <MovieCard
                                            id={movie.id}
                                            title={movie.title}
                                            posterPath={movie.poster_path}
                                        />
                                        <TouchableOpacity
                                            onPress={() => removeFavorite(movie.id)}
                                            className="absolute top-1 right-2 z-10 bg-black/50 border-[0.5px] border-gray-700 rounded-full p-2"
                                        >
                                            <Ionicons name="trash-sharp" size={16} color="red" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))
                        }
                    </View>
                )}
            </View>
        </ScrollView>
    );
};

export default Favorites;
