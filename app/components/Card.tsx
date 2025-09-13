import { View, Image, StyleSheet, ViewStyle, ImageSourcePropType } from "react-native";
import { Text } from 'react-native-paper'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';

import { mainTheme } from "../theme/themes";

interface CardProps {
    fighters: {
        fighter1: {
            name: string
            img: ImageSourcePropType
            role?: 'champion' | "challenger" | ''
        },
        fighter2: {
            name: string
            img: ImageSourcePropType
            role?: 'champion' | 'challenger' | ''
        }
    }
    division: string
    eventDate: string
    location: string
    moreCardStyle?: ViewStyle
}

{/*
This card shows a fighting event with its details:
    1. Who are the opponents
    2. The fight location
    3. The fight Date
*/}

export default function EventCard({ fighters, division, eventDate, location, moreCardStyle }: CardProps) {
    return (
        <View style={[styles.container, moreCardStyle]}>
            {/* Show what is the type of the fight */}
            <Text style={styles.ufcText}>
                UFC {division} {fighters.fighter2.role ? 'Championship' : 'Fight'}
            </Text>

            {/* Fighters Container */}
            <View style={styles.imgContainer}>

                {/* Fighter1 Contianer */}
                <View style={styles.fighterContainer}>
                    {/* If one of the players has a role, show the badge */}
                    {fighters.fighter1.role && (
                        <View style={styles.badge}>
                        <Text style={styles.badgeText}>
                            {fighters.fighter1.role === 'champion' ? 'CHAMPION' : 
                            fighters.fighter1.role === 'challenger' ? 'CHALLENGER' : ''}
                        </Text>
                        </View>
                    )}
                    <Image source={fighters.fighter1.img} style={styles.image} />
                    <Text style={styles.fighterText}>{fighters.fighter1.name}</Text>
                </View>

                <Text style={styles.vsText}>VS</Text>

                {/* Fighter2 Container */}
                <View style={styles.fighterContainer}>
                    {/* If one of the players has a role, show the badge */}
                    {fighters.fighter1.role && (
                        <View style={styles.badge}>
                                <Text style={styles.badgeText}>
                                {fighters.fighter2.role === 'champion' ? 'CHAMPION' : 
                                fighters.fighter2.role === 'challenger' ? 'CHALLENGER' : ''}
                            </Text>
                        </View>
                    )}
                    <Image source={fighters.fighter2.img} style={styles.image} />
                    <Text style={styles.fighterText}>{fighters.fighter2.name}</Text>
                </View>
            </View>

            {/* Date */}
            <View style={styles.eventInfo}>
                <MaterialIcons name="date-range" size={24} color={mainTheme.primary} />
                <Text>{eventDate}</Text>
            </View>

            {/* Location */}
            <View style={styles.eventInfo}>
                <Entypo name="location-pin" size={24} color={mainTheme.primary} />
                <Text>{location}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: mainTheme.background,
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 8,
    },
    imgContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 12,
    },
    image: {
        width: 80,
        height: 80,
        resizeMode: 'cover',
        borderRadius: 40,
        borderWidth: 2,
        borderColor: mainTheme.border,
    },
    fighterContainer: {
        alignItems: 'center',
        position: 'relative',
    },
    badge: {
        position: 'absolute',
        top: -12,
        backgroundColor: mainTheme.secondary,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        zIndex: 1,
    },
    badgeText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    vsText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#666',
    },
    ufcText: {
        backgroundColor: mainTheme.primary,
        borderRadius: 3,
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        paddingHorizontal: 8,
        paddingVertical: 4
    },
    fighterText: {
        color: mainTheme.foreground,
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center',
    },
    eventInfo: {
        flex: 1,
        gap: 2,
        alignItems: 'center',
        alignSelf: "flex-start",
        flexDirection: 'row'
    }
})