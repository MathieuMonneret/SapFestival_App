import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Alert } from 'react-native'

export default function FoodScreen() {
  
    const data = [
    {
      id: 1,
      name: 'Comunity',
      image: 'https://img.icons8.com/clouds/100/000000/groups.png',
    },
    {
      id: 2,
      name: 'Housing',
      image: 'https://img.icons8.com/color/100/000000/real-estate.png',
    },
    {
      id: 3,
      name: 'Jobs',
      image: 'https://img.icons8.com/color/100/000000/find-matching-job.png',
    },
    {
      id: 4,
      name: 'Personal',
      image: 'https://img.icons8.com/clouds/100/000000/employee-card.png',
    },
    {
      id: 5,
      name: 'For sale',
      image: 'https://img.icons8.com/color/100/000000/land-sales.png',
    },
  ]

  const [options, setOptions] = useState(data)

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.contentList}
        data={options}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity style={styles.card} >
              <Image style={styles.image} />
              <View style={styles.cardContent}>
                <Text style={styles.name}>{}</Text>
              </View>
            </TouchableOpacity>
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2C9E0',
  },
  contentList: {
    flex: 1,
  },
  cardContent: {
    marginLeft: 20,
    marginTop: 10,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: '#ebf0f7',
  },

  card: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    backgroundColor: '#F9F2EA',
    padding: 10,
    flexDirection: 'row',
    borderRadius: 30,
  },

  name: {
    fontSize: 18,
    flex: 1,
    alignSelf: 'center',
    color: '#3399ff',
    fontWeight: 'bold',
  },
})