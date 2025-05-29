import React, { useState } from 'react';
import { StyleSheet, Text, View,SafeAreaView, TouchableWithoutFeedback, FlatList, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenTitle from '@/components/screenTitle';


export default function ActivityScreen() {
  const data = [
    {
    id: 1,
    name: 'Mini jeux à l’arrivée',
    type: 'Jeu',
    respo: 'JT/Josepha/Leo',
    location: 'À l\'arrivée sur site',
    participation: '',
    icon: 'game-controller-outline',
    duration: 'Vendredi 17h - 19h',
    info: 'Bang, noeud humain, énigme',
    color: '#f28d11',
  },
  {
    id: 2,
    name: 'Tournoi de Beer Pong + Stand animation',
    type: 'Jeu',
    respo: 'JT/Josepha',
    location: 'Tables zone restauration',
    participation: 'inscription (individuel, équipes aléatoires)',
    icon: 'beer-outline',
    duration: 'Vendredi 19h - 22h',
    info: "T'as la descente facile, viens monter le coude au Beer Pong.",
    color: '#f28d11',
  },
  {
    id: 3,
    name: 'Élection Hymne',
    type: 'Jeu',
    respo: 'Joachim',
    location: 'Devant la scène après le discours',
    participation: '',
    icon: 'musical-notes-outline',
    duration: 'Vendredi 21h',
    info: "Et tu tapes tapes tapes, cet hymne que tu préfères. Et tu chantes chantes chantes ce refrain qui te plaît.",
    color: '#f28d11',
  },
  {
    id: 4,
    name: 'Yoga Saucisson',
    type: 'Sport',
    respo: 'Marie',
    location: 'Sous tente berbère ou barnum',
    participation: 'spontanée',
    icon: 'accessibility-outline',
    duration: 'Samedi 12h - 13h',
    info: 'Ramène ton matelas et viens bouger ton corps dans la boue. Si tu tiens plus de 30s, tu repars avec un morceau de sauciflard.',
    siPluie: 'Dans la grande salle à l’intérieur / à l’étage',
    color: '#0b8c35',
  },
  {
    id: 5,
    name: 'Stand animation',
    type: 'STAND ANIMATION',
    respo: 'JT',
    location: 'BAR',
    participation: '',
    icon: 'storefront-outline',
    duration: 'Samedi 12h - 19h',
    info: '',
    siPluie: 'ok',
    color : '#ffffff'
  },
  {
    id: 6,
    name: 'Tournoi Volley',
    type: 'Sport',
    respo: 'JT',
    location: '2 terrains volley (mêmes que l\'an dernier)',
    participation: 'inscription (individuel, équipes aléatoires)',
    icon: 'tennisball-outline',
    duration: 'Samedi 14h - 17h',
    info: '',
    siPluie: 'Décalé sinon annulé',
    color: '#0b8c35',
  },
  {
    id: 7,
    name: 'DIY Carte Postale / Lino',
    type: 'Artistique',
    respo: 'Josepha',
    location: 'Espace restauration, sous barnum',
    participation: 'spontanée',
    icon: 'color-palette-outline',
    duration: 'Samedi 15h - 18h',
    info: 'Tu veux repartir avec un souvenir ? Viens imprimer une petite gravure sur papier, textile, etc.',
    siPluie: 'Salon maison',
    color: '#fc87bb',
  },
  {
    id: 8,
    name: 'Atelier paillettes',
    type: 'Artistique',
    respo: 'Coline et Emilie',
    location: 'Sous tente berbère ou barnum',
    participation: 'spontanée',
    icon: 'sparkles-outline',
    duration: 'Samedi 16h - 19h',
    info: 'Viens te transformer en fée <3',
    siPluie: 'Salon maison',
    color: '#fc87bb',
  },
  {
    id: 9,
    name: 'Aérobic sur musique',
    type: 'Sport',
    respo: 'Valentin pendant le set de Léo',
    location: 'Devant la scène',
    participation: 'spontanée',
    icon: 'fitness-outline',
    duration: 'Samedi 17h - 18h',
    info: '',
    siPluie: 'Sous tente berbère ou remplacé si trop de monde',
    color: '#0b8c35',
  },
  {
    id: 10,
    name: 'Géo BLIND',
    type: 'Jeu',
    respo: 'JT - Léo',
    location: 'Orga bancs',
    participation: 'spontanée (équipes faites au pif)',
    icon: 'map-outline',
    duration: 'Samedi 18h - 19h',
    info: 'Fan de géo ? Viens te challenger ! Des départements au monde entier.',
    siPluie: 'Sous barnum',
    color: '#f28d11',
  },
  {
    id: 11,
    name: 'Culture G',
    type: 'Jeu',
    respo: 'Bernard - Louis',
    location: 'Orga bancs',
    participation: 'spontanée (équipes faites au pif)',
    icon: 'school-outline',
    duration: 'Samedi 18h - 19h',
    info: 'La culture c’est comme la confiture, viens te tartiner !',
    color: '#f28d11',
  },
  {
    id: 12,
    name: 'Cercle de Parole',
    type: 'Artistique',
    respo: 'Podet + Jo',
    location: 'Endroit confortable et isolé',
    participation: 'inscription (au stand animation)',
    icon: 'chatbubble-ellipses-outline',
    duration: 'Samedi 18h - 20h',
    info: 'Tu cherches un espace humain pour des conversations profondes.',
    siPluie: 'Sous tente berbère, séance debout (prévu par Marie)',
    color: '#fc87bb',
  },
  {
    id: 13,
    name: 'BINGO',
    type: 'Jeu',
    respo: 'Louis, Leo, Bern',
    location: 'Tables zone restauration',
    participation: 'spontanée',
    icon: 'grid-outline',
    duration: 'Samedi 21h',
    info: 'BINGO !!!! Et le vrai cette année :)',
    color: '#f28d11',
  }
  ];

  const [options, setOptions] = useState(data);

  return (
    <SafeAreaView style={styles.safeAreaViewContainer}>
      <ScreenTitle>ACTIVITIES</ScreenTitle>
      <View style={styles.container}>
        <FlatList 
          data={options}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            return (
              <TouchableWithoutFeedback onPress={() => Alert.alert(`${item.name} : ${item.info} `)}>
                <View style={styles.card}>
                      {/* <Ionicons name={item.icon} size={48} color="#F2784B" /> */}
                      <View style={styles.cardContent}>
                          <Text style={styles.name}>{item.name}</Text>
                          <Text style={[styles.name, {fontWeight : 700,fontSize : 15, color:item.color}]}>{item.type}</Text>
                      </View>
                      <View style={styles.cardContent}>
                          <Text style={[styles.name, {fontWeight : 700,fontSize : 15, color: '#545454'}]}>📅 {item.duration}</Text>
                          <Text style={[styles.name, {fontWeight : 500,fontSize : 15, color: '#545454'}]}>📍 {item.location}</Text>
                      </View>
                      <View style={styles.cardContent}>
                          <Text style={[styles.name, {fontWeight : 500,fontSize : 15, color: '#545454'}]}>🧙🏻‍♀️🧙‍♂️ {item.respo}</Text>
                          <Text style={[styles.name, {fontWeight : 700,fontSize : 15, color: '#545454'}]}>{item.participation}</Text>
                      </View>
                      <View style={styles.cardContent}>
                          <Text style={[styles.name, {fontWeight : 500,fontSize : 15, color: '#545454'}]}>{item.info}</Text>
                      </View>
                </View>
              </TouchableWithoutFeedback>
            );
          }}
          contentContainerStyle={styles.list}
        />
      </View>
    </SafeAreaView>
  );
}

/*
How it is going to look like, color and shapes 
*/
const styles = StyleSheet.create({
  safeAreaViewContainer: {
    flex : 1,
    backgroundColor: '#5a9adb',
    marginBottom : 50,
    
  },
  container: {
    flex: 1,
    backgroundColor: '#5a9adb',
    // padding: 20,
    // marginBottom : -20
  },
    screenTitle: {
    paddingTop : 26,
    backgroundColor: '#5a9adb',
    fontFamily: 'Oliver-Regular',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 85,
    fontWeight: '500',
    color: '#FFFFFF',
    marginHorizontal: -20,
  },
  list: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'column',
    backgroundColor: '#F9F2EA',
    padding: 15,
    marginBottom: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    alignItems: 'flex-start',
    marginHorizontal : 20

  },
  cardContent: {
    marginLeft: 15,
    paddingVertical : 5,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#25292e',
    paddingHorizontal : 15
  },
});
