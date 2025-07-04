import React from 'react';
import * as Font from 'expo-font';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import FullScreenImageModal from '@/components/imageModal';
import ScreenTitle from '@/components/screenTitle';


const AboutScreen = () => {
  const [loaded, error] = Font.useFonts({
    'Oliver-Regular': require('../../assets/fonts/Oliver-Regular.otf'),
  });

  const handleMenuPress = () => {
    alert('Menu détaillé bientôt disponible!');
  };

  return (
    <SafeAreaView style={styles.safeAreaViewContainer}>
      <ScreenTitle>INFOS</ScreenTitle>
      <ScrollView style={styles.container}>

        <View style={[styles.section,{ }]}>
          <Text style={[styles.cardTitle, {fontWeight: 800, color : '#ff0f0f',textAlign : 'center' }]}>
            🚨 EN CAS D'URGENCE 🚨{"\n"}
            Protéger Alerter Secourir (PAS)
          </Text>
          <Text style={[styles.rulesText,{fontWeight: 500}]}>
            Numéros d'urgence : {"\n"}
            {"\t"} 🚑 15 - SAMU {"\n"}
            {"\t"} 🚓 17 - POLICE SECOURS {"\n"}
            {"\t"} 🚒 18 - POMPIERS {"\n"}
            {"\t"} 💬 114 - Par SMS pour personnes malentendantes {"\n"}
            {"\t"} 👨‍🚒 +33666859998 - Pierre MOUSSA
            
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.cardTitle}>Plan d'accès</Text>
          <Image
            source={require('@/assets/images/plan.jpg')} 
            style={styles.mapImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.cardTitle}>Règles à respecter</Text>
          <Text style={styles.rulesText}>
            - Ramassez vos déchets {"\n"}
            - Respectez le silence sur le camping {"\n"}
            - Respectez les personnes et leurs consentement {"\n"}
            - Toute sortie est définitive.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.cardTitle}>Horraires douches</Text>
          <Text style={styles.rulesText}>
            🚿 Samedi 10h - 20h {"\n"}
            🚿 Dimanche 10h - 14h {"\n"}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.cardTitle}>Que mettre dans mon sac</Text>
          <Text style={styles.rulesText}>
            o Ton matériel de camping{"\n"}
            o Ton plus beau sourire{"\n"}
            o Ta gourde{"\n"}
            o Des vêtements qui ne craignent rien{"\n"}
            o Une tente de compétition{"\n"}
            o Une lampe torche{"\n"}
            o Une serviette{"\n"}
            o Une trousse d’hygiène{"\n"}
            o De l'antimoustique{"\n"}
            o Crème solaire{"\n"}
            o Un k-way{"\n"}
            o Un pull, une polaire, des grosses chaussettes{"\n"}
            o Un maillot de bain{"\n"}
            o Ton chargeur{"\n"}
            o Une casquette{"\n"}
            o Des bouchons d’oreilles/casque anti bruit, masque, maximise ton confort pour la nuit{"\n"}
            o Un tapis de yoga pour ne pas rater la meilleure activité du samedi{"\n"}
          </Text>
        </View>

        {/* <View style={styles.card}>
          <Ionicons name="fast-food-outline" size={48} color="#5a9adb" style={styles.cardIcon} />
          <Text style={styles.cardTitle}>Menu & Boissons</Text>
          <Text style={styles.cardText}>
            🌭 Pad Thai {"\n"}
            🍔 Burgers végé {"\n"}
            🍟 Frites {"\n"}
            🍺 Bières Blondes {"\n"}
            🍹 Cocktails signature{"\n"}
            🥤 Sodas et jus frais
          </Text>
          <FullScreenImageModal  // call the component imageModal that enable to display a button and onPress a full screen image 
            buttonText="Voir le menu complet"
            imageSource={require('@/assets/images/menu-food.png')}
          />
        </View> */}
        <View style={{ height: 50 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  safeAreaViewContainer: {
    flex: 1,
    backgroundColor: '#5a9adb',
    marginBottom : 50,
  },
  container: {
    padding:24,
  },
  section: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#F9F2EA',
    borderRadius: 10,
    marginHorizontal: 10,
    elevation: 5,
    paddingBottom: 20,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F2784B',
    marginBottom: 10,
  },
  mapImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  rulesText: {
    fontSize: 16,
    color: '#25292e',
    lineHeight: 24,
  },
  card: {
    marginHorizontal: 10,
    padding: 20,
    backgroundColor: '#FFF5E4',
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  cardIcon: {
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1d1d1d',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    color: '#25292e',
    lineHeight: 24,
    textAlign: 'center',
    paddingBottom:10,
  },
  cardButton: {
    marginTop: 20,
    backgroundColor: '#F2784B',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  cardButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
