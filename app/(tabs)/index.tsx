import MovieCard from '@/components/helpers/movieCard';
import MovieCardSkeleton from '@/components/helpers/movieCardSkeleton';
import { TMDB_API_KEY } from '@env';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

const API_KEY = TMDB_API_KEY;

type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
};

export default function HomeScreen() {
  const [trending, setTrending] = useState<Movie[]>([]);
  const [popular, setPopular] = useState<Movie[]>([]);
  const [topRated, setTopRated] = useState<Movie[]>([]);
  const [upcoming, setUpcoming] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAll() {
      await Promise.all([
        fetchCategory('trending/movie/week', setTrending),
        fetchCategory('movie/popular', setPopular),
        fetchCategory('movie/top_rated', setTopRated),
        fetchCategory('movie/upcoming', setUpcoming),
      ]);
      setLoading(false);
    }
    fetchAll();
  }, []);

  async function fetchCategory(
    endpoint: string,
    setter: React.Dispatch<React.SetStateAction<Movie[]>>
  ) {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/${endpoint}?api_key=${API_KEY}`
      );
      const json = await res.json();
      setter(json.results);
    } catch (error) {
      console.error('Error fetching', endpoint, error);
    }
  }

  function renderSection(title: string, movies: Movie[]) {
    return (
      <View className="mb-8">
        <Text className="text-[#42f56c] text-xl font-bold mb-3">
          {title}
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              posterPath={movie.poster_path}
            />
          ))}
        </ScrollView>
      </View>
    );
  }

  function renderSkeletonSection(title: string) {
    return (
      <View className="mb-8">
        <Text className="text-[#42f56c] text-xl font-bold mb-3">
          {title}
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {Array.from({ length: 6 }).map((_, index) => (
            <MovieCardSkeleton key={index} />
          ))}
        </ScrollView>
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-black px-4 py-6"
      contentContainerStyle={{ paddingBottom: 24 }}
    >
      {loading
        ? <>
          {renderSkeletonSection('Trending')}
          {renderSkeletonSection('Popular')}
          {renderSkeletonSection('Top Rated')}
          {renderSkeletonSection('Upcoming')}
        </>
        : <>
          {renderSection('Trending', trending)}
          {renderSection('Popular', popular)}
          {renderSection('Top Rated', topRated)}
          {renderSection('Upcoming', upcoming)}
        </>
      }
    </ScrollView>
  );
}
