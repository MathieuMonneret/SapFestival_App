import React, { useState, useRef, useEffect } from 'react';
import { Audio } from 'expo-av';
import { Button } from 'react-native';
import * as Font from 'expo-font';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Alert,
  Dimensions,
  Platform,
} from 'react-native';
import ScreenTitle from '@/components/screenTitle';

const { width } = Dimensions.get('window');

export default function ActivityScreen() {
  const [loaded, error] = Font.useFonts({
    'Oliver-Regular': require('../../assets/fonts/Oliver-Regular.otf'),
  });

  const sound1 = require('../../sounds/Le_SAP_dans_l_espace_(reggae_version).mp3');
  const sound2 = require('../../sounds/Le_SAP_dans_l_espace.mp3');
  const sound3 = require('../../sounds/SAP_en_el_espacio.mp3');

  const currentSound = useRef<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSource, setCurrentSource] = useState<number | null>(null); // fichier son en cours

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
    name: 'Tournoi Beer Pong',
    type: 'Jeu',
    respo: 'JT/Josepha',
    location: 'Tables zone restauration',
    participation: 'inscription individuelle (équipes au pif)',
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
    info: `Choisissez l’hymne officiel du festival 2025 : 
Le SAP dans l'espace ! 

👉 Trois morceaux sont en compétition : vous pouvez les écouter dès maintenant pour faire votre choix.
Laissez-vous porter par les rythmes et imaginez celui qui fera vibrer tout le festival !

📅 Le grand vote aura lieu vendredi à 21h, directement sur le site du festival.
Comment voter ? Simplement… à la puissance des applaudissements !
On écoutera ensemble les trois morceaux et celui qui soulèvera le plus d’énergie, de cris et de mains battantes sera sacré Hymne du Festival 2025 !

Alors, ouvrez grand vos oreilles… et préparez vos mains ! 👏🔥`,
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
    id: 6,
    name: 'Tournoi Volley',
    type: 'Sport',
    respo: 'JT',
    location: '2 terrains volley (mêmes que l\'an dernier)',
    participation: 'inscription individuelle (équipes au pif)',
    icon: 'tennisball-outline',
    duration: 'Samedi 14h - 16h30',
    info: '',
    siPluie: 'Décalé sinon annulé',
    color: '#0b8c35',
  },
  {
    id: 11,
    name: 'Culture G',
    type: 'Jeu',
    respo: 'Josepha - Bernard',
    location: 'Orga bancs',
    participation: 'spontanée (équipes au pif)',
    icon: 'school-outline',
    duration: 'Samedi 14h - 15h',
    info: 'La culture c’est comme la confiture, viens te tartiner !',
    color: '#f28d11',
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
    respo: 'Valentin - Léo',
    location: 'Devant la scène',
    participation: 'spontanée',
    icon: 'fitness-outline',
    duration: 'Samedi 16h30 - 17h30',
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
    participation: 'spontanée (équipes au pif)',
    icon: 'map-outline',
    duration: 'Samedi 18h - 19h',
    info: 'Fan de géo ? Viens te challenger ! Des départements au monde entier.',
    siPluie: 'Sous barnum',
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
    duration: 'Samedi 20h',
    info: 'BINGO !!!! Et le vrai cette année :)',
    color: '#f28d11',
  }
];

  const [options, setOptions] = useState(data);

  useEffect(() => {
    // Nettoyage quand le composant se démonte
    return () => {
      if (currentSound.current) {
        currentSound.current.unloadAsync();
      }
    };
  }, []);

  const togglePlayPause = async (source: number) => {
    // Si aucun son chargé, charger et jouer directement
    if (!currentSound.current) {
      const { sound } = await Audio.Sound.createAsync(source);
      currentSound.current = sound;
      setCurrentSource(source);
      await sound.playAsync();
      setIsPlaying(true);
      return;
    }

    // Si on appuie sur le même son que celui en cours
    if (currentSource === source) {
      const status = await currentSound.current.getStatusAsync();

      if (status.isPlaying) {
        await currentSound.current.pauseAsync();
        setIsPlaying(false);
      } else {
        await currentSound.current.playAsync();
        setIsPlaying(true);
      }
    } else {
      // Si on appuie sur un autre son
      await currentSound.current.stopAsync();
      await currentSound.current.unloadAsync();

      const { sound } = await Audio.Sound.createAsync(source);
      currentSound.current = sound;
      setCurrentSource(source);
      await sound.playAsync();
      setIsPlaying(true);
    }
  };


  return (
    <SafeAreaView style={styles.safeAreaViewContainer}>
      <ScreenTitle>ACTIVITIES</ScreenTitle>
      <View style={styles.container}>
        <FlatList
          data={options}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            // <TouchableOpacity
            //   onPress={() => Alert.alert(`${item.name}`, item.info || 'Aucune info supplémentaire')}
            //   activeOpacity={0.8}
            // >
              <View style={styles.card}>
                <View style={[styles.cardContent, {flexWrap : 'nowrap',flexDirection:'row'}]}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={[styles.type, { color: item.color }]}>{item.type.toUpperCase()}</Text>
                </View>
                <View style={styles.cardContent}>
                  <Text style={styles.detail}>📅 {item.duration}</Text>
                  <Text style={styles.detail}>📍 {item.location}</Text>
                </View>
                {item.participation ? (
                  <View style={styles.cardContent}>
                    <Text style={styles.participation}>📝 {item.participation}</Text>
                    <Text style={styles.detail}>🧙🏻‍♀️🧙‍♂️ {item.respo}</Text>
                  </View>
                ) : <View style={styles.cardContent}>
                      <Text style={styles.detail}>🧙🏻‍♀️🧙‍♂️ {item.respo}</Text>
                    </View>}
                {item.info ? (
                  <View style={styles.cardContent}>
                    <Text style={[styles.detail, {fontWeight : 400}]}>{item.info}</Text>
                  </View>
                ) : null}
                 {item.name === 'Élection Hymne' && (
      <View style={[styles.cardContent, { gap: 8, marginTop: 10 }]}>
        <Button
          title="▶️ Écouter Version 1"
          onPress={() => togglePlayPause(sound1)}
        />
        <Button
          title="▶️ Écouter Version 2"
          onPress={() => togglePlayPause(sound2)}
        />
        <Button
          title="▶️ Écouter Version 3"
          onPress={() => togglePlayPause(sound3)}
        />
      </View>
    )}
              </View>
            // </TouchableOpacity>
          )}
          contentContainerStyle={styles.list}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaViewContainer: {
    flex: 1,
    backgroundColor: '#5a9adb',
    marginBottom: 50,
  },
  container: {
    flex: 1,
    backgroundColor: '#5a9adb',
  },
  list: {
    paddingVertical: 20,
    alignItems: 'stretch',
    paddingBottom : 50
  },
  card: {
    backgroundColor: '#F9F2EA',
    paddingHorizontal: width * 0.04,
    paddingVertical: width * 0.02,
    marginBottom: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: Platform.OS === 'ios' ? 0.1 : 0,
    shadowRadius: 8,
    elevation: Platform.OS === 'android' ? 5 : 0,
    width: '90%',          // 👈 largeur fixe en % pour tout l'écran
    maxWidth: 500,         // 👈 pour éviter les débordements sur grands écrans
    alignSelf: 'center',   // 👈 centre chaque carte individuellement
  },
  cardContent: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems : 'baseline',
    gap: 4,
    marginVertical: 4,
  },
  name: {
    fontSize: width < 350 ? 14 : 18,
    fontWeight: '700',
    color: '#25292e',
    flexShrink: 1,
    paddingRight: 10,
  },
  type: {
    fontSize: width < 350 ? 13 : 15,
    fontWeight: '700',
  },
  detail: {
    fontSize: width < 350 ? 12 : 15,
    fontWeight: '500',
    color: '#545454',
    flexShrink: 1,
    textAlign :'justify'
  },
  participation: {
    fontSize: width < 350 ? 12 : 15,
    fontWeight: '500',
    color: '#545454',
    flexShrink: 1,
    textAlign :'left'
    
  },
});
