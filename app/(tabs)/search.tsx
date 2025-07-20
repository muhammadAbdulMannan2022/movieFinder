import MovieCard from '@/components/helpers/movieCard'
import MovieCardSkeleton from '@/components/helpers/movieCardSkeleton'
import { TMDB_API_KEY } from '@env'
import { MaterialIcons } from '@expo/vector-icons'
import debounce from 'lodash.debounce'
import { useCallback, useEffect, useState } from 'react'
import {
    ScrollView,
    Text,
    TextInput,
    View
} from 'react-native'

const API_KEY = TMDB_API_KEY

type Movie = {
    id: number
    title: string
    poster_path: string | null
}

export default function SearchScreen() {
    const [query, setQuery] = useState('')
    const [movies, setMovies] = useState<Movie[]>([])
    const [loading, setLoading] = useState(false)
    const [initial, setInitial] = useState(true)

    const searchMovies = async (text: string) => {
        if (!text) return

        setLoading(true)
        try {
            const res = await fetch(
                `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${text}`
            )
            const json = await res.json()
            setMovies(json.results || [])
        } catch (error) {
            console.error('Search error:', error)
        } finally {
            setLoading(false)
        }
    }

    // Debounced function
    const debouncedSearch = useCallback(debounce(searchMovies, 500), [])

    const fetchInitialMovies = async () => {
        setLoading(true)
        try {
            const res = await fetch(
                `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
            )
            const json = await res.json()
            setMovies(json.results || [])
            setInitial(true)
        } catch (error) {
            console.error('Initial fetch error:', error)
        } finally {
            setLoading(false)
        }
    }

    // Handle text input changes
    const handleChange = (text: string) => {
        setQuery(text)
        if (text.trim() === '') {
            // If empty, show initial popular movies again
            fetchInitialMovies()
            setInitial(true)
        } else {
            setInitial(false)
            debouncedSearch(text)
        }
    }

    useEffect(() => {
        fetchInitialMovies()
    }, [])

    return (
        <View className="flex-1 bg-black px-4 py-6">
            {/* Search Input with Icon and Shadow */}
            <View className="flex-row items-center bg-black rounded-xl px-4 py-2 mb-8 shadow-md shadow-gray-600 border border-gray-500">
                <MaterialIcons name="search" size={20} color="#42f56c" />
                <TextInput
                    className="flex-1 ml-3 text-black text-base"
                    placeholder="Search for movies..."
                    placeholderTextColor="#555"
                    onChangeText={handleChange}
                    value={query}
                    autoCorrect={false}
                    autoCapitalize="none"
                    returnKeyType="search"
                    clearButtonMode="while-editing"
                />
            </View>

            {loading ? (
                <View className="flex-row flex-wrap justify-between">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <View key={i} className="w-[32%] mb-4">
                            <MovieCardSkeleton key={i} />
                        </View>
                    ))}
                </View>
            ) : movies.length === 0 && !initial ? (
                <View className="flex-1 justify-center items-center mt-20">
                    <Text className="text-[#42f56c] text-lg">No results found</Text>
                </View>
            ) : (
                <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
                    <View className="flex-row flex-wrap justify-start">
                        {movies.map((movie) => (
                            <View key={movie.id} className="w-[32%] mb-4">
                                {/* 32% width to fit 3 items with a tiny margin */}
                                <MovieCard
                                    id={movie.id}
                                    title={movie.title}
                                    posterPath={movie.poster_path}
                                />
                            </View>
                        ))}
                    </View>
                </ScrollView>
            )}
        </View>
    )
}
