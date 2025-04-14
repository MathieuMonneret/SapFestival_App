// components/ScreenTitle.tsx
import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

interface ScreenTitleProps {
  children: string;
}

export default function ScreenTitle({ children }: ScreenTitleProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#5a9adb',
    paddingTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 80,
    color: '#fff',
    fontWeight: '500',
    fontFamily: 'Oliver-Regular', // si tu l’as chargé via expo-font
  },
});