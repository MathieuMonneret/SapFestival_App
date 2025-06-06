import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Font from 'expo-font';
import ScreenTitle from '@/components/screenTitle';
import FullScreenImageModal from '@/components/imageModal'; // chemin à adapter si besoin

const menuBouffeImage = require('@/assets/images/menu_bouffe.jpg');
const menuBarImage = require('@/assets/images/boissons.png');

const HomeScreen = () => {
  const [loaded, error] = Font.useFonts({
    'Oliver-Regular': require('../../assets/fonts/Oliver-Regular.otf'),
  });

  const cards = [
    {
      title: 'Menu Bouffe',
      icon: 'pizza-outline',
      image: menuBouffeImage,
    },
    {
      title: 'Menu Bar',
      icon: 'beer-outline',
      image: menuBarImage,
    },
  ];

  return (
    <SafeAreaView style={styles.safeAreaViewContainer}>
      <ScreenTitle>B2B</ScreenTitle>

      <View style={styles.container}>
        {cards.map((card, index) => (
          <View key={index} style={styles.card}>
            <Ionicons name={card.icon} size={48} color="#F2784B" style={{paddingBottom : 10}} />
            <FullScreenImageModal
              buttonText={card.title}
              imageSource={card.image}
            />
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaViewContainer: {
    flex: 1,
    backgroundColor: '#5a9adb',
    marginBottom: 50,
  },
  container: {
    flex: 1,
    backgroundColor: '#5a9adb',
    padding: 20,
    alignItems: 'center',
  },
  card: {
    width: 300,
    height: 200,
    margin: 20,
    borderRadius: 10,
    backgroundColor: '#F9F2EA',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
});

export default HomeScreen;