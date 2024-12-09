
import { Text, View, StyleSheet } from 'react-native';
import Button from '@/components/Button';
import ImageViewer from "@/components/ImageViewer";

const PlaceholderImage = require('@/assets/images/Ecusson + Stickers.png');

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer imgSource={PlaceholderImage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2C9E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
  },
  imageContainer: {
    flex: 1,
  },
});

/*
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/routers';

export default function About() {
  const navigation = useNavigation();

  // Fonction pour ouvrir le Drawer
  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Open Drawer" onPress={openDrawer} />
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20 }}>About Page</Text>
    </View>
  );
}
*/