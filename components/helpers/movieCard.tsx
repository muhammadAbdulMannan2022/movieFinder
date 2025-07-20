import { useRouter } from 'expo-router';
import { Image, Text, TouchableOpacity } from 'react-native';

type MovieCardProps = {
    id: number;
    title: string;
    posterPath: string | null;
};

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export default function MovieCard({ id, title, posterPath }: MovieCardProps) {
    const router = useRouter();

    const handlePress = () => {
        // Navigate to movie details page and pass id as param
        router.push(`/movie/${id}`);
        // Assuming you have a [id].tsx route under /app/movie/
    };

    return (
        <TouchableOpacity
            key={id}
            onPress={handlePress}
            activeOpacity={0.7}
            className="mr-3"
        >
            <Image
                source={{
                    uri: posterPath ? IMAGE_BASE_URL + posterPath : undefined,
                }}
                style={{
                    width: 120,
                    height: 180,
                    borderRadius: 8,
                    backgroundColor: '#222',
                }}
                resizeMode="cover"
            />
            <Text
                className="text-white mt-1 text-xs w-28"
                numberOfLines={1}
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
}
