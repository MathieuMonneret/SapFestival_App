import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet,SafeAreaView,ScrollView, Text, TouchableOpacity, View,Image,} from 'react-native';
import { useRoute } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocalSearchParams } from 'expo-router'; // used to search in the page, the param
import imageMapper from '@/components/imageMapper'; //  image mapper reference all pictures without having to enter the complete path
import ScreenTitle from '@/components/screenTitle';


//define the data artist 
type Artist = {
    id: number;
    name: string;
    bio: string;
    image: string;
    duration: string;
    style: string;
  };


// define the array of artists
const artists: Artist[] = [
    { id: 1, name: 'Happy Guru', bio: 'Une fois de plus en terres promises, le duo iconique du SAP Festival, Happy Guru, se présentera pour fêter ensemble l’ouverture du SAP 4.0. Sur des aires groovys, préparez-vous à un set funky annonçant une soirée intense et exceptionnelle', image:'HAPPY_GURU.png', duration: 'Vendredi 21h-22h', style:'Tech-House' },
    { id: 2, name: 'HCC x Guizly', bio: 'Guizly, résident permanent des montagnes grenobloises, s’associe avec High Cannabis Cookies pour une performance live reggae dub conçu spécialement pour le SAP festival. Inspiré par la musique africaine et la culture reggae, HCC vous fera vibrer avec ses pads et djembés, créant un groove profond et enivrant. Ensemble, ils vous invitent à danser pieds nus sur des rythmes envoûtants et des gros synthés, promettant une rencontre inoubliable avec Jah au cœur des Alpes.', image:'HCC GUIZLY.png', duration: 'Vendredi 22h-23h', style:'Dub' },
    { id: 3, name: 'Pryme', bio: 'Son énergique, basses groovy et sueurs de good vibes : voilà ce qui caractérise les sets de PRYME. Lyonnais dans l’âme, pour lui, tout part d’une bonne track House. Mais un bon set, c’est un set dynamique, enrichi de sons Rap, de DnB et d’Eurodance. Formé aux platines avec le collectif Mix’it, il a pratiqué les clubs de Rouen (Spot, Bifrost) avant de se tourner vers Paris en 2023, enchaînant les dates avec @diffusion_restr1nte. Après un tour du monde d’un an, @nylo_pryme fait son retour sur scène spécialement pour le SAP avec la ferme intention de réjouir les foules !', image:'PRYME.png', duration: 'Vendredi 23h-00h', style:'Techno' },
    { id: 4, name: 'Ring 41', bio: 'Ayant grandi dans une famille de musiciens, c’est par la batterie que Ring41 entre pleinement dans le monde de la musique. Lorsque la passion pour le genre électronique s’est développée, il ne restait alors plus qu’un pas jusqu’au DJing. Constamment à la recherche de nouvelles tracks et sonorités, il propose des sets diversifiés pleins de classiques, dans lesquels vous découvrirez toujours des nouvelles pépites. Ne se laissant pas limiter par les genres, Ring41 peut vous faire voyager de la Disco à la Trance, en passant par la House, le Breakbeat, la UK Garage et la Jungle. Assurez-vous d’avoir un billet validé avant de monter à bord.', image:'RING 41.png', duration: 'Vendredi 00h-01h30', style:'Techno' },
    { id: 5, name: 'Maffia Dora x DJ 1000', bio: 'Derrière les platines, Maffia Fora s’amuse avec tous les styles et distille une énergie autant survoltée qu’envoûtante. Viscéraux et entraînants, ses sets passent de l’ombre à la lumière, ne laissant pas d’autre choix que de danser. Échauffez votre cardio car DJ1000 va faire monter bpm et température, à coups de bangers dans vos oreilles. Ce b2b d’exception vous fera naviguer entre hard & fast house, trance, et autres genres surprenants.', image:'DJ 1000.png', duration: 'Vendredi 1h30-03h', style:'Techno' },
    { id: 6, name: 'Obekix', bio: 'Obékix est le cousin germain d’Obélix. Tombé dans la techno-marmite tout petit, il a troqué le sanglier pour les platines et les menhirs pour les murs de son. Installé à Berlinix, la capitale Groove de l’Empire romain, Obékix est une figure incontournable (dû à sa large carrure).', image:'OBEKIX.png', duration: 'Vendredi 03h-4h30', style:'Techno' },
    { id: 7, name: 'Loul', bio: 'Originaire de Bretagne, cette DJ globe-trotteuse a attrapé le virus de la techno en Irlande, où elle a habité pendant 2 ans. LOUL a commencé à mixer en after, puis en rave party. Depuis, la musique fait partie de son quotidien, toujours à la recherche de tracks qui la font vibrer. Installée à Bali depuis fin 2023, elle a développé une sélection de musique plus mélodique, mais ce qu’elle préfère par-dessus tout, c’est jouer de la techno sombre et captivante. LOUL a d’ailleurs pour objectif de développer la scène techno sur l’île des Dieux, ce qui l’a amenée à créer Silver Soul. Impatiente de retrouver la scène Underground pendant son séjour en Europe cet été, attendez-vous à vous envoler ', image:'HAPPY_GURU.png', duration: 'Vendredi 04h30-06h', style:'Techno' },
    { id: 8, name: 'Lemon Kid', bio: 'DJ et producteur basé à Paris...', image:'HAPPY_GURU.png', duration: 'Samedi 14h-15h', style:'Techno' },
    { id: 9, name: 'Falafel', bio: 'DJ et producteur basé à Paris...', image:'HAPPY_GURU.png', duration: 'Samedi 15h-16h', style:'Techno' },
    { id: 10, name: 'HCC', bio: 'DJ et producteur basé à Paris...', image:'HAPPY_GURU.png', duration: 'Samedi 16h-17h', style:'Techno' },
    { id: 11, name: 'A-Link x Bob Rose', bio: 'DJ et producteur basé à Paris...', image:'HAPPY_GURU.png', duration: 'Samedi 17h-18h30', style:'Techno' },
    { id: 12, name: 'Gasplatine', bio: 'DJ et producteur basé à Paris...', image:'HAPPY_GURU.png', duration: 'Samedi 18h30-20h', style:'Techno' },
    { id: 13, name: 'R1', bio: 'DJ et producteur basé à Paris...', image:'HAPPY_GURU.png', duration: 'Samedi 21h-22h', style:'Techno' },
    { id: 14, name: 'Drove', bio: 'DJ et producteur basé à Paris...', image:'HAPPY_GURU.png', duration: 'Samedi 22h-23h', style:'Rap' },
    { id: 15, name: 'Cd-Rom x yAs (Label Affaire)', bio: 'DJ et producteur basé à Paris...', image:'HAPPY_GURU.png', duration: 'Samedi 23h-00h30', style:'Techno' },
    { id: 16, name: 'Clover x Paradis Fiscal', bio: 'DJ et producteur basé à Paris...', image:'HAPPY_GURU.png', duration: 'Samedi 00h30-1h30', style:'Techno' },
    { id: 17, name: 'LX 42', bio: 'DJ et producteur basé à Paris...', image:'HAPPY_GURU.png', duration: 'Samedi 01h30-2h30', style:'Techno' },
    { id: 18, name: 'Rawza', bio: 'DJ et producteur basé à Paris...', image:'HAPPY_GURU.png', duration: 'Samedi 2h30-3h30', style:'Techno' },
    { id: 19, name: 'Raymzer', bio: 'DJ et producteur basé à Paris...', image:'HAPPY_GURU.png', duration: 'Samedi 3h30-4h30', style:'Techno' },
    { id: 20, name: 'Soapmalin', bio: 'DJ et producteur basé à Paris...', image:'HAPPY_GURU.png', duration: 'Samedi 4h30-6h', style:'Techno' },

  ];


  // the function of the artist screen
 export default function ArtistsScreen() {

    const { focusArtist } = useLocalSearchParams(); // if we arrive on this screen after the touchable on press from the calender we have a param "focusArtist"
    const scrollViewRef = useRef<ScrollView>(null); // enable scrolling
    const [offsets, setOffsets] = useState<{ [key: number]: number }>({}); // tool used to auto scroll to the artist in the param 
    
    // calculate the exact position of every artist container in the layout compare to the previous artist thanks to their ids. 
    // in order to help with the auto scrolling 
    const handleLayout = (id: number, event: any) => {
      const offsetY = event.nativeEvent.layout.y;
      setOffsets((prev) => ({ ...prev, [id]: offsetY }));
    };

    const handleScrollToTop = () => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ y: 0, animated: true });
      }
    };

    // compute the auto scrolling with the param we get from the navigation
    useEffect(() => {
        if (focusArtist) {
          const id = parseInt(focusArtist as string, 10);
          const targetOffset = offsets[id];
      if (targetOffset !== undefined && scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ y: targetOffset, animated: true });
      }
    }
  }, [focusArtist, offsets]);

  return (
    <SafeAreaView style={styles.safeAreaViewContainer}>
      <ScreenTitle>ARTISTS</ScreenTitle>
      <ScrollView ref={scrollViewRef} style={styles.container}>
        {artists.map(({ id, image, name, bio, duration, style }, index) => {
            return (
                <View key={`artist-${index}`} style={styles.card} onLayout={(event) => handleLayout(id, event)}>
                  <View style={styles.cardTop}>
                    <Image alt=""
                      resizeMode="cover"
                      source={imageMapper[image]}
                      style={styles.cardImg} />
                    <View style={styles.cardTopPills}>
                      <View style={[styles.cardTopPill, { paddingLeft: 6 }]}>
                        <Text style={styles.cardTopPillText}>
                          {style}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.cardBody}>
                    <View style={styles.cardHeader}>
                      <Text style={styles.cardTitle}>{name}</Text>
                    </View>
                    <Text style={styles.cardDescription}>{bio}</Text>
                  </View>
                </View>
            );
          },
        )}
      </ScrollView>
      <TouchableOpacity style={styles.scrollToTopButton} onPress={handleScrollToTop}>
        <Ionicons name="arrow-up" size={24} color="white" />
      </TouchableOpacity>
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
  },
  screenTitle: {
    paddingTop : 11,
    backgroundColor: '#5a9adb',
    fontFamily: 'Oliver-Regular',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 85,
    fontWeight: '500',
    color: '#FFFFFF',
    // marginTop: 20,
  },
  scrollToTopButton: {
    position: 'absolute',
    bottom: 70,
    right: 20,
    backgroundColor: '#25292e',
    padding: 12,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5, // Ombre
  },
  container: {
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1d1d1d',
    marginBottom: 12,
  },
  card: {
    padding: 12,
    borderRadius: 24,
    marginBottom: 24,
    backgroundColor: '#F9F2EA',
  },
  cardTop: {
    position: 'relative',
    borderRadius: 24,
  },
  cardImg: {
    width: '100%',
    height: 180,
    borderRadius: 24,
  },
  cardTopPills: {
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
  },
  cardTopPill: {
    height: 36,
    paddingHorizontal: 14,
    backgroundColor: '#fff',
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTopPillImg: {
    width: 24,
    height: 24,
    borderRadius: 9999,
    marginRight: 8,
  },
  cardTopPillText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  cardBody: {
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: '#222',
  },
  cardDuration: {
    fontSize: 16,
    fontWeight: '700',
    color: '#6a6bff',
  },
  cardDescription: {
    fontSize: 15,
    letterSpacing: 0.25,
    lineHeight: 22,
    fontWeight: '500',
    color: '#545454',
  },
});