import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { mainTheme } from "../theme/themes";
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

interface MovieProps {
    title: string
    releaseYear: string
    index: number
}

export default function MovieCard ({ title, releaseYear, index }: MovieProps) {

    const moviesQuality = [
        <MaterialIcons key={0} name="hd" size={24} color="black" />,
        <MaterialIcons key={1} name="4k-plus" size={24} color="black" />,
        <MaterialIcons key={2} name="hd" size={24} color="black" />,
        <MaterialIcons  key={3} name="2k" size={24} color="black" />,
        <MaterialIcons key={1} name="4k-plus" size={24} color="black" />,
    ];

    const [fav, setFav] = useState(false)
    return (
        <View style={styles.card}>
            <View>
                <View style={{flexDirection: 'row', alignItems: 'center', gap: 4}}>
                    <Text style={styles.title}>{title}</Text>
                    {moviesQuality[index % moviesQuality.length]}
                </View>
                <Text style={styles.subtitle}>Released: {releaseYear}</Text>
            </View>
            <View>
                <TouchableOpacity onPress={() => setFav(prev => !prev)}>
                    {fav ? (<Entypo name="heart-outlined" size={24} color="black" />):
                        (<Entypo name="heart" size={24} color={mainTheme.primary} />)
                    }
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: mainTheme.card,
        padding: 15,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 8,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 2 },
    },
    title: {
        fontSize: 22,
        color: mainTheme.primary,
        fontWeight: 'bold',
    },
    subtitle: {
        marginTop: 5,
        color: '#555',
    },
});