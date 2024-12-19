
import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback,Image } from 'react-native';
import ImageViewer from "@/components/ImageViewer";
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "@/types"; 
import Ionicons from '@expo/vector-icons/Ionicons';
type NavigationProps = NativeStackNavigationProp<RootStackParamList, "(tabs)">;  // this is require to navigate to the folder "/(tabs)" and then any linked screen when cliking on a "Touchable", 

const PlaceholderImage = require('@/assets/images/icon.png'); //path of the image to display


/*** 
 * Definition of the Home screen display
 * 
 * ***/
const HomeScreen = () => {

  const navigation = useNavigation<NavigationProps>(); // enable navigation


  // define data used in the "touchable", 
  //       -> "route" is the name of the screen we should navigate to 
  const cards = [
    {
      title: "Timetable",
      icon: "calendar-outline",
      route: "calendar",
    },
    {
      title: "Artistes",
      icon: "mic",
      route: "artists",
    },
    {
      title: "Activités",
      icon: "trophy-outline",
      route: "activities",
    },
    {
      title: "Info",
      icon: "information-circle-outline",
      route: "about",
    },
  ];

  // define how all class and container will work together in the screen
  //// on press the touchable activate the navigation 
  
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={PlaceholderImage} style={styles.image} />
      </View>
       {cards.map((card, index) => (
          <TouchableWithoutFeedback key={index} onPress={() => navigation.navigate(card.route as keyof RootStackParamList)} > 
            <View style={styles.card}>
              <Ionicons name={card.icon} size={48} color="#F2784B" />
              <Text style={styles.cardText}>{card.title}</Text>
            </View>
          </TouchableWithoutFeedback>
    ))}
    </View>
  );
};


/*
How it is going to look like, color and shapes 
*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2C9E0',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  imageContainer: {
    alignItems: 'center', 
    marginBottom: 24, 
    marginTop: 24
  },
  image: {
    width: 200, 
    height: 200, 
    resizeMode: 'contain', 
  },
  card: {
    width: 150,
    height: 150,
    margin: 12,
    borderRadius: 16,
    backgroundColor: '#F9F2EA',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  cardText: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#25292e',
    textAlign: 'center',
  },
});

export default HomeScreen;
