import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, Text, TouchableOpacity, View, Image, Dimensions } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import * as Font from 'expo-font';
import Ionicons from '@expo/vector-icons/Ionicons';
import imageMapper from '@/components/imageMapper';
import ScreenTitle from '@/components/screenTitle';

const { width } = Dimensions.get('window');

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
    { id: 4, name: 'maffia fora', bio: "Stimulée par l’émulation des milieux undergrounds lyonnais et parisiens, maffia fora propose des sets denses et puissants. Le credo est assumé : rap, électro, militantisme, et de préférence les 3 à la fois.", image: 'MAFFIA_FORA.jpg', duration: 'Vendredi 00h - 1h', style: 'HARDHOUSE / BASS MUSIC / RAP / ÉLECTRO HOUSE / GLOBAL DANCEFLOOR' },
    { id: 5, name: 'Mino', bio: "DJ passionnée basée à Barcelone et inspirée par les scènes underground en Europe et outre-Atlantique, Mino propose des sets éclectiques mêlant techno, trance, dance et breaks, pour offrir des ambiances captivantes et énergiques.", image: 'MINO.jpg', duration: 'Vendredi 1h - 2h', style: 'MODERN TRANCE / GROOVE / HARDGROOVE' },
    { id: 6, name: 'Clemm', bio: "Née derrière les platines à Dakar, Clemm aime faire monter les bpm sans transition et trace sa route entre trance mélodique et kicks bien secs. Préparez-vous à transpirer.", image: 'CLEMM.jpg', duration: 'Vendredi 2h - 3h', style: 'TRANCE 90\'S - 20\'S' },
    { id: 7, name: 'Nøtt', bio: "Avis aux personnes souhaitant hurler leur plus beau refrain sans décoller l'oreille du caisson, Nøtt pour vous servir. Ici ça mix et surtout ça remix.", image: 'NOTT.jpg', duration: 'Vendredi 3h - 4h', style: 'EURODANCE / TECHNO' },
    { id: 8, name: 'LOUL', bio: "Derrière son air angélique : des basses qui cognent et une techno sans compromis. Née en afterparty dublinoise en 2022, LOUL vous prépare un set intense et enjoué, qui risque de vous faire grimacer ... de plaisir.", image: 'LOUL.jpg', duration: 'Vendredi 4h - 5h', style: 'TECHNO / TRANCE' },
    { id: 9, name: 'Photon', bio: "Acid, basses et mélodies : trois mots qui définissent l’univers de Photon. Il délivre des sets percutants et sans concession alliant Acid Techno et Acid Trance, où l’énergie ne faiblit jamais. Ses performances sont des voyages sonores intenses, où les BPM s’accélèrent, les corps vibrent, et la musique fonce droit devant, lancée à pleine vitesse, prête à frôler celle de la lumière.", image: 'PHOTON.jpg', duration: 'Vendredi 5h - 6h', style: 'ACID TECHNO / ACID TRANCE' },
    { id: 10, name: 'Suze Tonic Groovin Club', bio: "D’abord réunis par l’amour de la gentiane et des rythmes dansants, le Suze Tonic Groovin Club propose sans prétentions des sets à la frontière entre la hard house, techno groovy et hard groove. Laissez-vous emporter dans une parenthèse florale, pétillante et entraînante sans prise de tête.", image: 'STGC.jpg', duration: 'Samedi 14h - 15h30', style: 'HARD HOUSE, TECHNO GROOVY ET HARD GROOVE' },
    // { id: 11, name: 'NiniDJ', bio: "", image: 'NINIDJ.jpg', duration: 'Samedi 15h - 16h', style: '' },
    { id: 12, name: 'High Cannabis Cookies', bio: "High Cannabis Cookies est un DJ éclectique, explorant tous les styles musicaux avec passion. Pour son prochain set Fuego y Flow, on vous invite à un voyage mêlant des rythmes latinos, du merengue au reggaeton en passant par la salsa piquante. Avec HCC aux platines, préparez-vous à vous trémousser pieds nus dans l'herbe fraîche sur des mélodies endiablées.", image: 'HCC.jpg', duration: 'Samedi 15h30 - 16h30', style: 'LATINO, SALSA, MERENGUE' },
    { id: 13, name: 'Flack McQueen', bio: "Prépare tes chevilles, Flack McQueen débarque !", image: 'FLACK_MCQUEEN.jpg', duration: 'Samedi 16h30 - 17h30', style: 'D&B WORKOUT' },
    { id: 14, name: 'Lemon Kid', bio: "Dans l'univers envoûtant de Lemon Kid, l'auditeur flâne et déambule à travers des paysages sonores en mouvement. Une transe rythmée mais douce, électro groovy et mélodies synthétiques.", image: 'LEMON_KID.jpg', duration: 'Samedi 17h30 - 18h30', style: 'ELECTRO GROOVY' },
    { id: 15, name: 'Broger b2b Bob Rose', bio: 'Deux énergies, une même pulsation : Broger, cofondateur de Label Affaire Records, partagera les platines avec la toute fraîche recrue du crew, Bob Rose, pour un B2B gonflé à bloc. Entre House qui galope et sunset (on croise les doigts), tout devrait être réuni pour ce qui compte le plus à leurs yeux : vous faire sourire. Bref : moins de bla-bla, plus de boum-boum', image: 'BROGER_B2B_BOB_ROSE.jpg', duration: 'Samedi 18h30 - 20h', style: 'HOUSE' },
    { id: 16, name: 'Roger Federave', bio: "Encore jet lag de son retour de la crèche, Roger Federave viens (en) remettre une couche samedi à 21h pour vous passer la pomade avec une comptine de disco. Attention biberons obligatoire sur la piste !", image: 'ROGER_FEDERAVE.jpg', duration: 'Samedi 21h - 22h', style: 'VARIÉTÉ FR X RAP FR' },
    { id: 17, name: 'D R O V E', bio: "Une heure de rap, c'est pas assez pour certains, trop pour d'autres. C'est que du rap, rien que du rap, et accessoirement le meilleur set du SAP.", image: 'DROVE.jpg', duration: 'Samedi 22h - 23h', style: 'RAP' },
    { id: 18, name: 'A-Link b2b CD Rom', bio: "Habitués du SAP depuis les débuts, A-Link et CD Rom, producteurs et DJs au sein du label lyonnais Label Affaire, proposent une large selecta autour de la house et une technique affutée par l’expérience.", image: 'ALINK_B2B_CD_ROM.jpg', duration: 'Samedi 23h - 00h30', style: 'HOUSE / TECHNO' },
    { id: 19, name: 'Dj Thibald', bio: "Préparez-vous à voyager à la frontière des genres avec DJ Thibald. Naviguant entre hardhouse, hardgroove, acid et trance des années 90, il vous fera voguer entre mélodie et décibels.", image: 'DJ_THIBALD.jpg', duration: 'Samedi 00h30 - 1h30', style: 'HARD HOUSE / 90S TRANCE' },
    { id: 20, name: 'Virgin Mobile b2b Forfait Bloqué', bio: "Après des années de silence radio, le duo Virgin Mobile et Forfait Bloqué fait son grand retour ! Préparez-vous à un set unique, chargé d’émotions. Connexion rétablie, énergie illimitée !", image: 'VIRGIN_MOBILE_B2B_FORFAIT_BLOQUE.jpg', duration: 'Samedi 1h30 - 3h', style: 'TECHNO' },
    { id: 21, name: 'Raymzer', bio: "Après une première performance marquée par une pluie diluvienne sur les platines, Raymzer revient pour faire rebouger vos petits culs sur des sons trance et hardgroove finement diggés.", image: 'RAYMZER.jpg', duration: 'Samedi 3h - 4h', style: 'TECHNO' },
    { id: 22, name: 'Rstef', bio: "Depuis 5 ans derrière les platines, Rstef fait vibrer la scène lyonnaise avec des sets aussi puissants qu’euphoriques. Inspiré par FC Kabagar, Pawlowski ou Somewhen, il mêle énergie brute et euphorie collective.", image: 'RSTEF.jpg', duration: 'Samedi 4h - 5h', style: 'BOUNCE' },
    { id: 23, name: 'JUST KA', bio: "Bercé par la scène techno lyonnaise, JUST KA est le parfait mélange entre techno sautillante et hard techno sombre. Il prône avant tout le fun avec des morceaux déjantés qui font taper du pied.", image: 'JUST_KA.jpg', duration: 'Samedi 5h - 6h', style: 'HARD TECHNO/ TECHNO GROOVY' }
  ];

export default function ArtistsScreen() {

  const [loaded, error] = Font.useFonts({
    'Oliver-Regular': require('../../assets/fonts/Oliver-Regular.otf'),
  });

  const { focusArtist } = useLocalSearchParams();
  const scrollViewRef = useRef<ScrollView>(null);
  const [offsets, setOffsets] = useState<{ [key: number]: number }>({});

  const handleLayout = (id: number, event: any) => {
    const offsetY = event.nativeEvent.layout.y;
    setOffsets((prev) => ({ ...prev, [id]: offsetY }));
  };

  const handleScrollToTop = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  };

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
      <ScrollView ref={scrollViewRef} style={styles.container} contentContainerStyle={styles.scrollContent}>
        {artists.map(({ id, image, name, bio, duration, style }, index) => (
          <View key={`artist-${index}`} style={styles.card} onLayout={(event) => handleLayout(id, event)}>
            <View style={styles.cardTop}>
              <Image
                alt=""
                resizeMode="cover"
                source={imageMapper[image]}
                style={styles.cardImg}
              />
              <View style={styles.cardTopPills}>
                <View style={[styles.cardTopPill, { paddingLeft: 6 }]}>
                  <Text style={styles.cardTopPillText}>{style}</Text>
                </View>
              </View>
            </View>
            <View style={styles.cardBody}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{name}</Text>
                <Text style={[styles.cardDescription, { textAlign: 'right' }]}>{duration}</Text>
              </View>
              <Text style={styles.cardDescription}>{bio}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.scrollToTopButton} onPress={handleScrollToTop}>
        <Ionicons name="arrow-up" size={24} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaViewContainer: {
    flex: 1,
    backgroundColor: '#5a9adb',
    marginBottom: 50,
  },
  scrollContent: {
    paddingBottom: 50,
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
    elevation: 5,
  },
  container: {
    paddingHorizontal: 16,
  },
  card: {
    padding: 12,
    borderRadius: 24,
    marginBottom: 24,
    backgroundColor: '#F9F2EA',
    width: '90%',
    maxWidth : 500,
    alignSelf: 'center'
  },
  cardTop: {
    borderRadius: 24,
    overflow: 'hidden',
  },
  cardImg: {
    width: '100%',
    height: width * 0.65, // responsive height
    borderRadius: 24,
  },
  cardTopPills: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  cardTopPill: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTopPillText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  cardBody: {
    marginTop: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1d1d1d',
  },
  cardDescription: {
    fontSize: 14,
    color: '#3c3c3c',
    textAlign : 'justify'
  },
});
