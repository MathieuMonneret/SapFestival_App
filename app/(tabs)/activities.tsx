import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, FlatList, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ActivityScreen() {
  const data = [
    {
      id: 1,
      name: 'Coursiglisse',
      icon: 'walk-outline', 
      info: 'Samedi après-midi course sur une bache mouillée',
    },
    {
      id: 2,
      name: 'Bingo Champetre',
      icon: 'gift-outline',
      info: '',
    },
    {
      id: 3,
      name: 'Question pour un champignon',
      icon: 'book-outline',
      info: '',
    },
    {
      id: 4,
      name: 'Volley au vert',
      icon: 'tennisball-outline',
      info: '',
    },
    {
      id: 5,
      name: 'Yoga doux',
      icon: 'fitness-outline',  
      info: '',
    },
    {
      id: 6,
      name: 'Beer Pong',
      icon: 'beer-outline',
      info: '',
    },
    {
      id: 7,
      name: 'Maquillage',
      icon: 'color-palette-outline',
      info: '',
    },
  ];

  const [options, setOptions] = useState(data);

  return (
    <View style={styles.container}>

      <FlatList 
        data={options}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <TouchableWithoutFeedback onPress={() => Alert.alert(`${item.name} : ${item.info} `)}>
               <View style={styles.card}>
                    <Ionicons name={item.icon} size={48} color="#F2784B" />
                    <View style={styles.cardContent}>
                        <Text style={styles.name}>{item.name}</Text>
                    </View>
              </View>
            </TouchableWithoutFeedback>
          );
        }}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

/*
How it is going to look like, color and shapes 
*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2C9E0',
    padding: 20,
  },
  list: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#F9F2EA',
    padding: 15,
    marginBottom: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    alignItems: 'center',
  },
  cardContent: {
    marginLeft: 15,
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#25292e',
  },
});
