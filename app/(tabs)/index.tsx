import { SafeAreaView } from 'react-native-safe-area-context';
import EventCard from "../components/Card";
import { Stack } from "expo-router";
import {Text, StyleSheet, ScrollView } from 'react-native'
import ScreenTitle from '../components/ScreenTitle';

export default function Index() {
  return (
    // This "edges" property fills the screen and disable extra padding
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <Stack.Screen options={{ headerShown: false }} />

        <ScreenTitle text='Hot Events' />
        
        <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
          <EventCard
            division="Walter weight"
            location="Madison Square Garden - US"
            eventDate="6 Nov - 19:00"
            fighters={{
              fighter1:{
                name: 'Islam',
                img: require('../../assets/images/fighters/islam.png'),
                role: 'challenger'
              },
              fighter2: {
                name: 'JDM',
                img: require('../../assets/images/fighters/jdm.png'),
                role: 'champion'
              }
            }}
          />
          <EventCard
            division="Lightheavy weight"
            location="Las Vegas - US"
            eventDate="4 Oct - 21:00"
            fighters={{
              fighter1:{
                name: 'Ankalaev',
                img: require('../../assets/images/fighters/magamedov.png'),
                role: 'champion'
              },
              fighter2: {
                name: 'Alex',
                img: require('../../assets/images/fighters/alex-p.png'),
                role: 'challenger'
              }
            }}
          />
          <EventCard
            division="Lightweight"
            location="12 Oct - 02:00"
            eventDate="Still unknown"
            fighters={{
              fighter1:{
                name: 'Charles',
                img: require('../../assets/images/fighters/charles.png'),
              },
              fighter2: {
                name: 'Fiziv',
                img: require('../../assets/images/fighters/fiziv.png')
              }
            }}
          />
        </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: "#fff",
      marginTop: 15
    },
})