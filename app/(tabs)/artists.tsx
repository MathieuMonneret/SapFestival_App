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
    { id: 1, name: 'Happy Guru', bio: "Une fois de plus, le duo iconique du SAP Festival, Happy Guru, se présentera devant vous pour fêter ensemble l’ouverture du SAP 5.0. Avec un set disco house, préparez votre plus beau sourire et votre meilleur déhanché pour profiter de ce moment exceptionnel annonçant une soirée d’euphorie !", image: 'HAPPY_GURU.jpg', duration: 'Vendredi 21h - 22h', style: 'HOUSE / DISCO / FUNK' },
    { id: 2, name: 'Le B', bio: "Originaire de Paris, Basile, aka « le B », propose des DJ sets aux sonorités variées. Il navigue entre house mélodique, trance et italo disco, le tout agrémenté de ses influences rap. Adepte des petites scènes parisiennes, il saura introduire comme il se doit cette cinquième édition du SAP.", image: 'LE_B.jpg', duration: 'Vendredi 22h - 23h', style: 'HOUSE MÉLODIQUE / TRANSE / ITALO DISCO' },
    { id: 3, name: 'Pryme', bio: "Son énergique, basses groovy et sueurs de good vibes : voilà ce qui caractérise les sets de PRYME. Lyonnais dans l’âme, pour lui, tout part d’une bonne track House. Mais un bon set, c’est un set dynamique, enrichi de sons Rap, de DnB et d’Eurodance.", image: 'PRYME.jpg', duration: 'Vendredi 23h - 00h', style: 'UK SPEED GARAGE' },
    { id: 4, name: 'maffia fora', bio: "Stimulée par l’émulation des milieux undergrounds lyonnais et parisiens, maffia fora propose des sets denses et puissants. Le credo est assumé : rap, électro, militantisme, et de préférence les 3 à la fois.", image: 'MAFFIA_FORA.jpg', duration: 'Vendredi 00h - 01h', style: 'HARDHOUSE / BASS MUSIC / RAP / ÉLECTRO HOUSE / GLOBAL DANCEFLOOR' },
    { id: 5, name: 'Mino', bio: "DJ passionnée basée à Barcelone et inspirée par les scènes underground en Europe et outre-Atlantique, Mino propose des sets éclectiques mêlant techno, trance, dance et breaks, pour offrir des ambiances captivantes et énergiques.", image: 'MINO.jpg', duration: 'Vendredi 1h - 2h', style: 'MODERN TRANCE / GROOVE / HARDGROOVE' },
    { id: 6, name: 'Clemm', bio: "Née derrière les platines à Dakar, Clemm aime faire monter les bpm sans transition et trace sa route entre trance mélodique et kicks bien secs. Préparez-vous à transpirer.", image: 'CLEMM.jpg', duration: 'Vendredi 2h - 3h', style: 'TRANCE 90\'S - 20\'S' },
    { id: 7, name: 'Nott', bio: "Avis aux personnes souhaitant hurler leur plus beau refrain sans décoller l'oreille du caisson, Nøtt pour vous servir. Ici ça mix et surtout ça remix.", image: 'NOTT.jpg', duration: 'Vendredi 3h - 4h', style: 'EURODANCE / TECHNO' },
    { id: 8, name: 'LOUL', bio: "Derrière son air angélique : des basses qui cognent et une techno sans compromis. Née en afterparty dublinoise en 2022, LOUL vous prépare un set intense et enjoué, qui risque de vous faire grimacer ... de plaisir.", image: 'LOUL.jpg', duration: 'Vendredi 4h - 5h', style: 'TECHNO / TRANCE' },
    { id: 9, name: 'Photon', bio: "Acid, basses et mélodies : trois mots qui définissent l’univers de Photon. Il délivre des sets percutants et sans concession alliant Acid Techno et Acid Trance, où l’énergie ne faiblit jamais.", image: 'PHOTON.jpg', duration: 'Vendredi 5h - 6h', style: 'ACID TECHNO / ACID TRANCE' },
    // { id: 10, name: 'JAM Session', bio: "", image: 'JAM_SESSION.jpg', duration: 'Samedi 14h - 15h', style: 'JAM SESSION' },
    // { id: 11, name: 'NiniDJ', bio: "", image: 'NINIDJ.jpg', duration: 'Samedi 15h - 16h', style: '' },
    // { id: 12, name: 'HCC', bio: "", image: 'HCC.jpg', duration: 'Samedi 16h - 17h', style: '' },
    // { id: 13, name: 'Léo', bio: "", image: 'LÉO.jpg', duration: 'Samedi 17h - 18h', style: 'D&B WORKOUT' },
    { id: 14, name: 'Lemon Kid', bio: "Dans l'univers envoûtant de Lemon Kid, l'auditeur flâne et déambule à travers des paysages sonores en mouvement. Une transe rythmée mais douce, électro groovy et mélodies synthétiques.", image: 'LEMON_KID.jpg', duration: 'Samedi 18h - 19h', style: 'HOUSE' },
    // { id: 15, name: '', bio: '', image: '', duration: 'Samedi 19h - 20h', style: 'HOUSE' },
    { id: 16, name: 'Roger Federave', bio: "Encore jet lag de son retour de la crèche, Roger Federave viens (en) remettre une couche samedi à 21h pour vous passer la pomade avec une comptine de disco. Attention biberons obligatoire sur la piste !", image: 'ROGER_FEDERAVE.jpg', duration: 'Samedi 21h-22h', style: 'DISCO HOUSE, DISCO, EURODANCE 90\'S, COMMERCIAL, TECHNO/TRANCE' },
    { id: 17, name: 'D R O V E', bio: "Une heure de rap, c'est pas assez pour certains, trop pour d'autres. C'est que du rap, rien que du rap, et accessoirement le meilleur set du SAP.", image: 'DROVE.jpg', duration: 'Samedi 22h - 23h', style: 'RAP' },
    { id: 18, name: 'ALINK B2B CD ROM', bio: "Habitués du SAP depuis les débuts, A-Link et CD Rom, producteurs et DJs au sein du label lyonnais Label Affaire, proposent une large selecta autour de la house et une technique affutée par l’expérience.", image: 'ALINK_B2B_CD_ROM.jpg', duration: 'Samedi 23h - 0h30', style: 'HOUSE / TECHNO' },
    { id: 19, name: 'Dj Thibald', bio: "Préparez-vous à voyager à la frontière des genres avec DJ Thibald. Naviguant entre hardhouse, hardgroove, acid et trance des années 90, il vous fera voguer entre mélodie et décibels.", image: 'DJ_THIBALD.jpg', duration: 'Samedi 0h30 - 1h30', style: 'HARD HOUSE / 90S TRANCE' },
    { id: 20, name: 'Virgin Mobile b2b Forfait Bloqué', bio: "Après des années de silence radio, le duo Virgin Mobile et Forfait Bloqué fait son grand retour ! Préparez-vous à un set unique, chargé d’émotions. Connexion rétablie, énergie illimitée !", image: 'VIRGIN_MOBILE_B2B_FORFAIT_BLOQUÉ.jpg', duration: 'Samedi 1h30 - 3h00', style: 'TECHNO' },
    { id: 21, name: 'Raymzer', bio: "Après une première performance marquée par une pluie diluvienne sur les platines, Raymzer revient pour faire rebouger vos petits culs sur des sons trance et hardgroove finement diggés.", image: 'RAYMZER.jpg', duration: 'Samedi 3h00 - 4h00', style: 'TECHNO' },
    { id: 22, name: 'Rstef', bio: "Depuis 5 ans derrière les platines, Rstef fait vibrer la scène lyonnaise avec des sets aussi puissants qu’euphoriques. Inspiré par FC Kabagar, Pawlowski ou Somewhen, il mêle énergie brute et euphorie collective.", image: 'RSTEF.jpg', duration: 'Samedi 4h00 - 5h00', style: 'BOUNCE' },
    { id: 23, name: 'JUST KA', bio: "Bercé par la scène techno lyonnaise, JUST KA est le parfait mélange entre techno sautillante et hard techno sombre. Il prône avant tout le fun avec des morceaux déjantés qui font taper du pied.", image: 'JUST_KA.jpg', duration: 'Samedi 5h00 - 6h', style: 'HARD TECHNO/ TECHNO GROOVY' }
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
                      <Text style={styles.cardDescription}>{duration}</Text>
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
    marginBottom : 50,
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