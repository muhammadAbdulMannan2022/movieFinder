// app/movie/[id].tsx
import { TMDB_API_KEY } from '@env';
import { Feather, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Image,
    ImageBackground,
    Pressable,
    ScrollView,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export default function MovieDetailsPage() {
    const { id } = useLocalSearchParams();
    const movieId = Number(id);
    const [movie, setMovie] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        async function fetchDetails() {
            setLoading(true);
            try {
                const res = await fetch(
                    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}&language=en-US`
                );
                const data = await res.json();
                setMovie(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        if (movieId) fetchDetails();
    }, [movieId]);

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center bg-black">
                <ActivityIndicator size="large" color="#42f56c" />
                <Text className="text-[#42f56c] mt-4 text-lg">Loading...</Text>
            </View>
        );
    }

    if (!movie) {
        return (
            <View className="flex-1 justify-center items-center bg-black px-4">
                <Text className="text-red-500 text-lg">Movie not found.</Text>
            </View>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-black">
            <ScrollView className="flex-1">
                {/* Top section */}

                <ImageBackground
                    source={{ uri: IMAGE_BASE_URL + movie.backdrop_path }}
                    className="w-full h-80 justify-end border-b border-gray-700 relative"
                    resizeMode="cover"
                >
                    {/* BACK BUTTON */}
                    <Pressable
                        onPress={() => navigation.goBack()}
                        className="absolute top-2 left-2 z-10 bg-white/20 p-2 rounded-full"
                    >
                        <Ionicons name="arrow-back" size={22} color="white" />
                    </Pressable>

                    {/* OVERLAY CONTENT */}
                    <View className="bg-black/60 flex-row justify-end p-4 h-full">
                        {/* Left side: Info */}
                        <View className="flex-1 pr-3 justify-end">
                            <Text className="text-white text-2xl font-bold">{movie.title}</Text>

                            {movie.tagline ? (
                                <Text className="text-gray-300 italic mt-1">"{movie.tagline}"</Text>
                            ) : null}

                            <View className="flex-row mt-2 items-center flex-wrap space-x-4">
                                <Text className="text-yellow-400">⭐ {movie.vote_average.toFixed(1)}</Text>
                                <Text className="text-gray-300">{movie.release_date}</Text>
                                {movie.runtime ? (
                                    <Text className="text-gray-300">{movie.runtime} min</Text>
                                ) : null}
                            </View>

                            <View className="flex-row flex-wrap mt-2">
                                {movie.genres.map((g: any) => (
                                    <View
                                        key={g.id}
                                        className="bg-[#42f56c] px-3 py-1 rounded-full mr-2 mb-2"
                                    >
                                        <Text className="text-black text-xs">{g.name}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>

                        {/* Right side: Poster */}
                        {movie.poster_path && (
                            <Image
                                source={{ uri: IMAGE_BASE_URL + movie.poster_path }}
                                style={{ width: 130, height: 190, borderRadius: 8 }}
                                resizeMode="cover"
                                className="self-end"
                            />
                        )}
                    </View>
                </ImageBackground>


                {/* Main content */}
                <View className="px-4 py-6">
                    {/* Overview */}
                    <Text className="text-gray-300 text-base leading-relaxed">
                        {movie.overview}
                    </Text>

                    {/* Budget */}
                    {movie.budget > 0 && (
                        <View className="flex-row items-center mt-4">
                            <FontAwesome5 name="money-bill-wave" size={16} color="#888" />
                            <Text className="text-gray-300 ml-2">Budget: ${movie.budget.toLocaleString()}</Text>
                        </View>
                    )}

                    {/* Revenue */}
                    {movie.revenue > 0 && (
                        <View className="flex-row items-center mt-1">
                            <Feather name="dollar-sign" size={16} color="#888" />
                            <Text className="text-gray-300 ml-2">Revenue: ${movie.revenue.toLocaleString()}</Text>
                        </View>
                    )}

                    {/* Status */}
                    {movie.status && (
                        <View className="flex-row items-center mt-1">
                            <Feather name="info" size={16} color="#888" />
                            <Text className="text-gray-300 ml-2">Status: {movie.status}</Text>
                        </View>
                    )}

                    {/* Languages */}
                    {movie.spoken_languages?.length > 0 && (
                        <View className="flex-row items-center mt-1">
                            <Feather name="globe" size={16} color="#888" />
                            <Text className="text-gray-300 ml-2">
                                Languages: {movie.spoken_languages.map((l: any) => l.english_name).join(', ')}
                            </Text>
                        </View>
                    )}

                    {/* Countries */}
                    {movie.production_countries?.length > 0 && (
                        <View className="flex-row items-center mt-1">
                            <MaterialCommunityIcons name="map-marker-radius-outline" size={16} color="#888" />
                            <Text className="text-gray-300 ml-2">
                                Countries: {movie.production_countries.map((c: any) => c.name).join(', ')}
                            </Text>
                        </View>
                    )}

                    {/* Production Companies */}
                    {movie.production_companies?.length > 0 && (
                        <>
                            <Text className="text-[#42f56c] font-bold text-lg mt-6 mb-2">Production Companies</Text>
                            <View className="flex-row flex-wrap gap-4">
                                {movie.production_companies.map((pc: any) => (
                                    <View key={pc.name} className="items-center w-24">
                                        {pc.logo_path ? (
                                            <Image
                                                source={{ uri: IMAGE_BASE_URL + pc.logo_path }}
                                                className="w-20 h-10 object-contain"
                                                resizeMode="contain"
                                            />
                                        ) : null}
                                        <Text className="text-gray-400 text-xs text-center mt-1">{pc.name}</Text>
                                    </View>
                                ))}
                            </View>
                        </>
                    )}
                </View>
            </ScrollView>
            <StatusBar style="light" />
        </SafeAreaView>
    );
}
