import { Image, Text, TouchableOpacity } from 'react-native';

type MovieCardProps = {
    id: number;
    title: string;
    posterPath: string | null;
    onPress?: () => void;
};

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export default function MovieCard({ id, title, posterPath, onPress }: MovieCardProps) {
    return (
        <TouchableOpacity
            key={id}
            onPress={onPress}
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
