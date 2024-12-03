import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import ImageViewer from "@/components/ImageViewer";
import Button from '@/components/Button';
import MapView from 'react-native-maps';

const PlaceholderImage = require('@/assets/images/plan.jpg');

export default function MapScreen() {
  return (
    <View style={styles.container}>
    <View style={styles.imageContainer}>
      <ImageViewer imgSource={PlaceholderImage} />
    </View>
    <View style={styles.footerContainer}>
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
    title: { 
        fontSize: 20, 
        fontWeight: 'bold', 
        marginBottom: 10 
    },
    button: {
        fontSize: 20,
        textDecorationLine: 'underline',
        color: '#fff',
    },
    imageContainer: {
        flex: 1,
    },
    image: {
        width: 320,
        height: 440,
        borderRadius: 18,
        resizeMode: 'contain',
    },
    footerContainer: {
        flex: 1 / 3,
        alignItems: 'center',
    },
    map: {
        width: '100%',
        height: '100%',
    },
});
