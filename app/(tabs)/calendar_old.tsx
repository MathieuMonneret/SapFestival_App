import ScreenTitle from '@/components/screenTitle';
import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import * as Font from 'expo-font';


type EventCategory = 'artist' | 'meal' | 'activity';

type TimetableEvent = {
  id: number;
  startTime: string;
  endTime: string;
  title: string;
  description?: string;
  category: EventCategory;
  bgColor: string;
};

type Timetable = {
  [date: string]: TimetableEvent[];
};

const timetable: Timetable = {
  '2025-07-04': [
  { id: 201, startTime: '17:00', endTime: '19:00', title: 'Mini jeux à l’arrivée', description: 'bang, noeud humain, énigme', bgColor: '#f28d11', category: 'activity' },
  { id: 202, startTime: '19:00', endTime: '22:00', title: 'Tournoi de Beer Pong + Stand animation', description: "T'as la descente facile, viens monter le coude au Beer Pong.", bgColor: '#f28d11', category: 'activity' },
  { id: 203, startTime: '21:00', endTime: '21:30', title: 'Élection Hymne', description: 'Et tu tapes tapes tapes, cet hymne que tu préfères. Et tu chantes chantes chantes ce refrain qui te plaît.', bgColor: '#f28d11', category: 'activity' },
  { id: 1, startTime: '21:00', endTime: '22:00', title: 'Happy Guru', description: 'HOUSE / DISCO / FUNK', bgColor: '#053688', category: 'artist' },
  { id: 101, startTime: '21:00', endTime: '23:00', title: 'REPAS', description: 'KEBAB FRITE (voir menu)', bgColor: '#fc87bb', category: 'meal' },
  { id: 2, startTime: '22:00', endTime: '23:00', title: 'Le B', description: 'HOUSE MÉLODIQUE / TRANSE / ITALO DISCO', bgColor: '#053688', category: 'artist' },
  { id: 3, startTime: '23:00', endTime: '00:00', title: 'Pryme', description: 'UK SPEED GARAGE', bgColor: '#053688', category: 'artist' },
  { id: 4, startTime: '00:00', endTime: '01:00', title: 'maffia fora', description: 'HARDHOUSE / BASS MUSIC / RAP / ÉLECTRO HOUSE / GLOBAL DANCEFLOOR', bgColor: '#053688', category: 'artist' },
  { id: 5, startTime: '01:00', endTime: '02:00', title: 'Mino', description: 'MODERN TRANCE / GROOVE / HARDGROOVE', bgColor: '#053688', category: 'artist' },
  { id: 6, startTime: '02:00', endTime: '03:00', title: 'Clemm', description: 'TRANCE 90\'S - 20\'S', bgColor: '#053688', category: 'artist' },
  { id: 7, startTime: '03:00', endTime: '04:00', title: 'Nott', description: 'EURODANCE / TECHNO', bgColor: '#053688', category: 'artist' },
  { id: 8, startTime: '04:00', endTime: '05:00', title: 'LOUL', description: 'TECHNO / TRANCE', bgColor: '#053688', category: 'artist' },
  { id: 9, startTime: '05:00', endTime: '06:00', title: 'Photon', description: 'ACID TECHNO / ACID TRANCE', bgColor: '#053688', category: 'artist' },
],
'2025-07-05': [
  { id: 10, startTime: '14:00', endTime: '15:00', title: 'JAM Session', description: 'JAM SESSION', bgColor: '#053688', category: 'artist' },
  { id: 11, startTime: '15:00', endTime: '16:00', title: 'NiniDJ', description: '', bgColor: '#053688', category: 'artist' },
  { id: 12, startTime: '16:00', endTime: '17:00', title: 'HCC', description: '', bgColor: '#053688', category: 'artist' },
  { id: 13, startTime: '17:00', endTime: '18:00', title: 'Léo', description: 'D&B WORKOUT', bgColor: '#053688', category: 'artist' },
  { id: 14, startTime: '18:00', endTime: '19:00', title: 'Lemon Kid', description: 'HOUSE', bgColor: '#053688', category: 'artist' },
  { id: 15, startTime: '19:00', endTime: '20:00', title: '', description: 'HOUSE', bgColor: '#053688', category: 'artist' },
  { id: 16, startTime: '21:00', endTime: '22:00', title: 'Roger Federave', description: 'DISCO HOUSE, DISCO, EURODANCE 90\'S, COMMERCIAL, TECHNO/TRANCE', bgColor: '#053688', category: 'artist' },
  { id: 17, startTime: '22:00', endTime: '23:00', title: 'D R O V E', description: 'RAP', bgColor: '#053688', category: 'artist' },
  { id: 18, startTime: '23:00', endTime: '00:30', title: 'ALINK B2B CD ROM', description: 'HOUSE / TECHNO', bgColor: '#053688', category: 'artist' },
  { id: 19, startTime: '00:30', endTime: '01:30', title: 'Dj Thibald', description: 'HARD HOUSE / 90S TRANCE', bgColor: '#053688', category: 'artist' },
  { id: 20, startTime: '01:30', endTime: '03:00', title: 'Virgin Mobile b2b Forfait Bloqué', description: 'TECHNO', bgColor: '#053688', category: 'artist' },
  { id: 21, startTime: '03:00', endTime: '04:00', title: 'Raymzer', description: 'TECHNO', bgColor: '#053688', category: 'artist' },
  { id: 22, startTime: '04:00', endTime: '05:00', title: 'Rstef', description: 'BOUNCE', bgColor: '#053688', category: 'artist' },
  { id: 23, startTime: '05:00', endTime: '06:00', title: 'JUST KA', description: 'HARD TECHNO / TECHNO GROOVY', bgColor: '#053688', category: 'artist' }
],
};

const days = [
  { id: '2025-07-04', label: 'Vendredi' },
  { id: '2025-07-05', label: 'Samedi' },
];

const ScheduleScreen = () => {

  const [loaded, error] = Font.useFonts({
    'Oliver-Regular': require('../../assets/fonts/Oliver-Regular.otf'),
  });

  const [selectedDayId, setSelectedDayId] = useState('2025-07-04');

  const renderTabs = () => (
    <View style={styles.tabsContainer}>
      {days.map((day) => (
        <TouchableOpacity
          key={day.id}
          onPress={() => setSelectedDayId(day.id)}
          style={[styles.tab, selectedDayId === day.id && styles.activeTab]}
        >
          <Text style={[styles.tabText, selectedDayId === day.id && styles.activeTabText]}>
            {day.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderTimetable = () => {
    const eventsForDay = timetable[selectedDayId] || [];

    const getTimeInMinutes = (time: string): number => {
      const [hours, minutes] = time.split(':').map(Number);
      // Si l'heure est après minuit mais avant 6h, on la met comme "jour +1"
      return (hours < 6 ? hours + 24 : hours) * 60 + minutes;
    };

    const sortedEvents = [...eventsForDay].sort(
      (a, b) => getTimeInMinutes(a.startTime) - getTimeInMinutes(b.startTime)
    );

const uniqueStartTimes = Array.from(new Set(sortedEvents.map(e => e.startTime)));


    return uniqueStartTimes.map((startTime, index) => {
  const eventsAtThisTime = eventsForDay.filter(e => e.startTime === startTime);

    return (
      <View key={index} style={styles.timetableRow}>
        <Text style={styles.timeLabel}>
          {startTime}
        </Text>

        {['artist', 'meal', 'activity'].map((cat) => {
          const eventsForCat = eventsAtThisTime.filter(e => e.category === cat);

          return (
            <View key={cat} style={styles.timetableCell}>
              {eventsForCat.map((event) => (
                <View key={event.id} style={[styles.card, { backgroundColor: event.bgColor, marginBottom: 5 }]}>
                  <Text style={styles.cardTitle}>{event.title}</Text>
                  {event.description && (
                    <Text style={styles.cardSubTitle}>{event.description}</Text>
                  )}
                  <Text style={styles.cardSubTitle}>
                    {event.startTime} – {event.endTime}
                  </Text>
                </View>
              ))}
            </View>
          );
        })}
      </View>
    );
  });
  };

  return (
  <SafeAreaView style={styles.safeAreaViewContainer}>
      <ScreenTitle>LINE UP</ScreenTitle>
      <View style={styles.container}>
        {renderTabs()}
        <ScrollView style={styles.scrollView}>
          {/* <View style={styles.columnHeaders}>
            <Text style={styles.columnHeader}>Heure</Text>
            <Text style={styles.columnHeader}>Artistes</Text>
            <Text style={styles.columnHeader}>Repas</Text>
            <Text style={styles.columnHeader}>Activités</Text>
          </View> */}
          {renderTimetable()}
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
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    // alignContent : 'space-evenly',
    marginBottom: 20,
  },
  tab: {
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
    borderColor: '#5a9adb',  
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 5,
    marginHorizontal : 10
    // borderBottomColor: 'transparent',
  },
  activeTab: {
    backgroundColor: '#ffffff', 
    borderColor: '#0b8c35', 
    borderRadius: 8,
  },
  tabText: {
    fontSize: 14,
    color: '#6d6161',
    fontFamily: 'Oliver-Regular',
  },
  activeTabText: {
    color: '#0b8c35',
    fontWeight: 'bold',
    fontFamily: 'Oliver-Regular',
  },
  columnHeaders: {
    flexDirection: 'row',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
  },
  columnHeader: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
  },
  timetableRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  timeLabel: {
    width: 60,
    fontWeight: 'bold',
    fontSize: 12,
    marginRight: 5,
  },
  timetableCell: {
    flex: 1,
    paddingHorizontal: 4,
  },
  card: {
    padding: 6,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#fff',
  },
  cardSubTitle: {
    fontSize: 11,
    color: '#fff',
  },
});