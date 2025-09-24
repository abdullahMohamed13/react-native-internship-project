import { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator, FlatList, Text, TouchableOpacity } from 'react-native'
import ScreenTitle from '../components/ScreenTitle';
import MovieCard from '../components/MovieCard';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { mainTheme } from '../theme/themes';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';

type Movie = {
  id: string;
  title: string;
  releaseYear: string;
};

export default function Index() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://reactnative.dev/movies.json')
      .then((response) => response.json())
      .then((json) => {
        setMovies(json.movies);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
      <View style={styles.container}>
        <View style={{flexDirection: 'row', marginBottom: 10, alignItems: 'center', gap: 2,}}>
          <ScreenTitle text='Cinema'/>
          <MaterialCommunityIcons key={0} name="popcorn" size={24} color={mainTheme.accent} />
        </View>
        <Stack.Screen options={{ headerShown: false }} />

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
            data={movies}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <MovieCard title={item.title} releaseYear={item.releaseYear} index={index}/>
            )}
          />
        )}
        <View style={styles.buttonsSection}>
          <TouchableOpacity style={styles.button}>
            <View style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Download</Text>
              <Feather name="download" size={24} color="white" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <View style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Watch</Text>
              <MaterialIcons name="live-tv" size={24} color="white" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  buttonsSection: {
    marginTop: -40,
    flex: 1,
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  button: {
    color: 'white',
    borderRadius: 4,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: mainTheme.primary,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  }
})

{/*This is the old events home page JSX*/}
//#region 
  // This "edges" property fills the screen and disable extra padding
// <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
  //     <Stack.Screen options={{ headerShown: false }} />

  //     <ScreenTitle text='Hot Events' />
      
  //     {/* <ul style={{marginBottom: '20px', height: '600px'}}> */}

  //     {/* </ul> */}
  //     {/* {
  //       list.map(() => {
  //         return <>
  //           <EventCard />
  //         </>
  //       })

  //     } */}

  //     <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
  //       <EventCard
  //         division="Walter weight"
  //         location="Madison Square Garden - US"
  //         eventDate="6 Nov - 19:00"
  //         fighters={{
  //           fighter1:{
  //             name: 'Islam',
  //             img: require('../../assets/images/fighters/islam.png'),
  //             role: 'challenger'
  //           },
  //           fighter2: {
  //             name: 'JDM',
  //             img: require('../../assets/images/fighters/jdm.png'),
  //             role: 'champion'
  //           }
  //         }}
  //       />
  //       <EventCard
  //         division="Lightheavy weight"
  //         location="Las Vegas - US"
  //         eventDate="4 Oct - 21:00"
  //         fighters={{
  //           fighter1:{
  //             name: 'Ankalaev',
  //             img: require('../../assets/images/fighters/magamedov.png'),
  //             role: 'champion'
  //           },
  //           fighter2: {
  //             name: 'Alex',
  //             img: require('../../assets/images/fighters/alex-p.png'),
  //             role: 'challenger'
  //           }
  //         }}
  //       />
  //       <EventCard
  //         division="Lightweight"
  //         location="12 Oct - 02:00"
  //         eventDate="Still unknown"
  //         fighters={{
  //           fighter1:{
  //             name: 'Charles',
  //             img: require('../../assets/images/fighters/charles.png'),
  //           },
  //           fighter2: {
  //             name: 'Fiziv',
  //             img: require('../../assets/images/fighters/fiziv.png')
  //           }
  //         }}
  //       />
  //     </ScrollView>
  // </SafeAreaView>
//#endregion