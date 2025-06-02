import React, { useState } from 'react';
import ScreenTitle from '@/components/screenTitle';
import * as Font from 'expo-font';
import { View, Text, ScrollView, SafeAreaView, Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { format, parse, isAfter, isBefore } from 'date-fns';

const DAYS = ['Vendredi', 'Samedi'];

const eventData = {
  Vendredi: [
    { id: 201, startTime: '17:00', endTime: '19:00', title: "Mini jeux à l’arrivée", description: 'bang, noeud humain, énigme', bgColor: '#f28d11', category: 'activity' },
    { id: 202, startTime: '19:00', endTime: '22:00', title: 'Tournoi de Beer Pong + Stand animation', description: "T'as la descente facile, viens monter le coude au Beer Pong.", bgColor: '#f28d11', category: 'activity' },
    { id: 203, startTime: '21:00', endTime: '21:30', title: 'Élection Hymne', description: 'Et tu tapes tapes tapes, cet hymne que tu préfères. Et tu chantes chantes chantes ce refrain qui te plaît.', bgColor: '#f28d11', category: 'activity' },
    { id: 1, startTime: '21:00', endTime: '22:00', title: 'Happy Guru', description: 'HOUSE / DISCO / FUNK', bgColor: '#053688', category: 'artist' },
    { id: 101, startTime: '21:00', endTime: '23:00', title: 'REPAS', description: 'KEBAB FRITE (voir menu)', bgColor: '#fc87bb', category: 'meal' },
    { id: 2, startTime: '22:00', endTime: '23:00', title: 'Le B', description: 'HOUSE MÉLODIQUE / TRANSE / ITALO DISCO', bgColor: '#053688', category: 'artist' },
    { id: 3, startTime: '23:00', endTime: '00:00', title: 'Pryme', description: 'UK SPEED GARAGE', bgColor: '#053688', category: 'artist' }
  ],
  Samedi: []
};

const timeToMinutes = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number);
  // Si l'heure est entre 0h et 5h, on considère que c'est dans la nuit suivante
  if (hours < 6) return (24 + hours) * 60 + minutes;
  return hours * 60 + minutes;
};

const assignColumns = (events: any[]) => {
  const sortedEvents = [...events].sort((a, b) => {
    const timeDiff = timeToMinutes(a.startTime) - timeToMinutes(b.startTime);
    if (timeDiff !== 0) return timeDiff;
    // Priorité aux artistes pour les mettre à gauche
    if (a.category === 'artist' && b.category !== 'artist') return -1;
    if (b.category === 'artist' && a.category !== 'artist') return 1;
    return 0;
  });

  const columns: any[][] = [];

  for (const event of sortedEvents) {
    let placed = false;
    for (let i = 0; i < columns.length; i++) {
      if (!columns[i].some(e => timeToMinutes(e.endTime) > timeToMinutes(event.startTime) && timeToMinutes(e.startTime) < timeToMinutes(event.endTime))) {
        columns[i].push(event);
        placed = true;
        break;
      }
    }
    if (!placed) {
      columns.push([event]);
    }
  }

  const positionedEvents: any[] = [];
  for (let i = 0; i < columns.length; i++) {
    for (const event of columns[i]) {
      positionedEvents.push({ ...event, column: i });
    }
  }
  return { positionedEvents, columnCount: columns.length };
};

const ScheduleScreen = () => {

    const [loaded, error] = Font.useFonts({
        'Oliver-Regular': require('../../assets/fonts/Oliver-Regular.otf'),
      });
    
  const insets = useSafeAreaInsets();
  const [selectedDay, setSelectedDay] = useState('Vendredi');
  const events = eventData[selectedDay];
  const { positionedEvents, columnCount } = assignColumns(events);

  const minHour = 17;
  const maxHour = 30;
  const timeSlots = [];
  for (let hour = minHour; hour <= maxHour; hour++) {
    timeSlots.push(`${hour.toString().padStart(2, '0')}:00`);
    timeSlots.push(`${hour.toString().padStart(2, '0')}:30`);
  }

  return (
    <SafeAreaView style={styles.safeAreaViewContainer}>
        <ScreenTitle>LINE UP</ScreenTitle>
        <View style={{ flex: 1, paddingTop: insets.top }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', padding: 8 }}>
            {DAYS.map(day => (
            <Pressable key={day} onPress={() => setSelectedDay(day)} style={{ marginHorizontal: 8, backgroundColor : '#fff', padding : 5, borderRadius : 8, borderWidth : 5, borderColor: selectedDay === day ? '#0b8c35' : '#5a9adb'  }}>
                <Text style={{ color : selectedDay === day ? '#0b8c35' : '#6d6161', fontSize: 16, fontFamily: 'Oliver-Regular' }}>{day}</Text>
            </Pressable>
            ))}
        </View>
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
            <View style={{ flexDirection: 'row' }}>
            <View style={{ width: 60 }}>
                {timeSlots.map((time, idx) => (
                <View key={idx} style={{ height: 40, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 12 }}>{time}</Text>
                </View>
                ))}
            </View>
            <View style={{ flex: 1, position: 'relative' }}>
                {positionedEvents.sort((a, b) => a.column - b.column).map(event => {
                const start = timeToMinutes(event.startTime);
                const end = timeToMinutes(event.endTime);
                const top = (start - minHour * 60) * (40 / 30);
                const height = (end - start) * (40 / 30);
                const width = `${100 / columnCount}%`;
                const left = `${(100 / columnCount) * event.column}%`;
                return (
                    <View
                    key={event.id}
                    style={{
                        position: 'absolute',
                        top,
                        left,
                        width,
                        height,
                        backgroundColor: event.bgColor,
                        padding: 4,
                        borderRadius: 6,
                        borderWidth: event.category === 'artist' ? 2 : 0,
                        borderColor: event.category === 'artist' ? 'black' : 'transparent'
                    }}
                    >
                    <Text style={{ fontWeight: 'bold', fontSize: 12, color : '#fff' }}>{event.title}</Text>
                    <Text style={{ fontSize: 10, color : '#fff' }}>{event.description}</Text>
                    </View>
                );
                })}
            </View>
            </View>
        </ScrollView>
        </View>
    </SafeAreaView>
  );
};

export default ScheduleScreen;

const styles = StyleSheet.create({
  safeAreaViewContainer: {
    flex: 1,
    backgroundColor: '#5a9adb',
    marginBottom: 50,
  },
  container: {
    flex: 1,
    backgroundColor: '#5a9adb',
    // paddingTop: 50,
  },
  scrollView: {
    paddingHorizontal: 10,
  },
})