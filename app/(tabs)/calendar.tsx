import React, { useState } from 'react';
import ScreenTitle from '@/components/screenTitle';
import * as Font from 'expo-font';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Pressable,
  StyleSheet,
  Modal,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const DAYS = ['Vendredi', 'Samedi'];
const SLOT_HEIGHT = 40; // hauteur pour 30 minutes

const eventData = {
  Vendredi: [
  { id: 201, startTime: '17:00', endTime: '19:00', title: 'Mini jeux à l’arrivée', description: 'bang, noeud humain, énigme', bgColor: '#f28d11', category: 'activity' },
  { id: 202, startTime: '19:00', endTime: '22:00', title: 'Tournoi Beer Pong', description: "T'as la descente facile, viens monter le coude au Beer Pong.", bgColor: '#f28d11', category: 'activity' },
  { id: 203, startTime: '21:00', endTime: '21:30', title: 'Élection Hymne', description: 'Et tu tapes tapes tapes, cet hymne que tu préfères. Et tu chantes chantes chantes ce refrain qui te plaît.', bgColor: '#f28d11', category: 'activity' },
  { id: 1, startTime: '21:00', endTime: '22:00', title: 'Happy Guru', description: 'HOUSE / DISCO / FUNK', bgColor: '#053688', category: 'artist' },
  { id: 101, startTime: '19:30', endTime: '22:00', title: 'REPAS', description: 'KEBAB FRITE (voir menu)', bgColor: '#fc87bb', category: 'meal' },
  { id: 2, startTime: '22:00', endTime: '23:00', title: 'Le B', description: 'HOUSE MÉLODIQUE / TRANSE / ITALO DISCO', bgColor: '#053688', category: 'artist' },
  { id: 3, startTime: '23:00', endTime: '00:00', title: 'Pryme', description: 'UK SPEED GARAGE', bgColor: '#053688', category: 'artist' },
  { id: 4, startTime: '00:00', endTime: '01:00', title: 'maffia fora', description: 'HARDHOUSE / BASS MUSIC / RAP / ÉLECTRO HOUSE / GLOBAL DANCEFLOOR', bgColor: '#053688', category: 'artist' },
  { id: 5, startTime: '01:00', endTime: '02:00', title: 'Mino', description: 'MODERN TRANCE / GROOVE / HARDGROOVE', bgColor: '#053688', category: 'artist' },
  { id: 6, startTime: '02:00', endTime: '03:00', title: 'Clemm', description: 'TRANCE 90\'S - 20\'S', bgColor: '#053688', category: 'artist' },
  { id: 7, startTime: '03:00', endTime: '04:00', title: 'Nott', description: 'EURODANCE / TECHNO', bgColor: '#053688', category: 'artist' },
  { id: 8, startTime: '04:00', endTime: '05:00', title: 'LOUL', description: 'TECHNO / TRANCE', bgColor: '#053688', category: 'artist' },
  { id: 9, startTime: '05:00', endTime: '06:00', title: 'Photon', description: 'ACID TECHNO / ACID TRANCE', bgColor: '#053688', category: 'artist' },
],
  Samedi: [
  { id: 10, startTime: '14:00', endTime: '15:00', title: 'JAM Session', description: 'JAM SESSION', bgColor: '#053688', category: 'artist' },
  { id: 11, startTime: '15:00', endTime: '16:00', title: 'NiniDJ', description: '', bgColor: '#053688', category: 'artist' },
  { id: 12, startTime: '16:00', endTime: '17:00', title: 'HCC', description: '', bgColor: '#053688', category: 'artist' },
  { id: 13, startTime: '17:00', endTime: '18:00', title: 'Léo', description: 'D&B WORKOUT', bgColor: '#053688', category: 'artist' },
  { id: 14, startTime: '18:00', endTime: '19:00', title: 'Lemon Kid', description: 'HOUSE', bgColor: '#053688', category: 'artist' },
  { id: 15, startTime: '19:00', endTime: '20:00', title: '', description: 'HOUSE', bgColor: '#053688', category: 'artist' },
  { id: 15, startTime: '20:00', endTime: '21:00', title: '', description: '', bgColor: '#053688', category: 'artist' },
  { id: 16, startTime: '21:00', endTime: '22:00', title: 'Roger Federave', description: 'DISCO HOUSE, DISCO, EURODANCE 90\'S, COMMERCIAL, TECHNO/TRANCE', bgColor: '#053688', category: 'artist' },
  { id: 17, startTime: '22:00', endTime: '23:00', title: 'D R O V E', description: 'RAP', bgColor: '#053688', category: 'artist' },
  { id: 18, startTime: '23:00', endTime: '00:30', title: 'ALINK B2B CD ROM', description: 'HOUSE / TECHNO', bgColor: '#053688', category: 'artist' },
  { id: 19, startTime: '00:30', endTime: '01:30', title: 'Dj Thibald', description: 'HARD HOUSE / 90S TRANCE', bgColor: '#053688', category: 'artist' },
  { id: 20, startTime: '01:30', endTime: '03:00', title: 'Virgin Mobile b2b Forfait Bloqué', description: 'TECHNO', bgColor: '#053688', category: 'artist' },
  { id: 21, startTime: '03:00', endTime: '04:00', title: 'Raymzer', description: 'TECHNO', bgColor: '#053688', category: 'artist' },
  { id: 22, startTime: '04:00', endTime: '05:00', title: 'Rstef', description: 'BOUNCE', bgColor: '#053688', category: 'artist' },
  { id: 23, startTime: '05:00', endTime: '06:00', title: 'JUST KA', description: 'HARD TECHNO / TECHNO GROOVY', bgColor: '#053688', category: 'artist' },
  { id: 28, startTime: '12:00', endTime: '13:00', title: 'Yoga Saucisson', description: "Ramène ton matelas et viens bouger ton corps dans la boue. Si tu tiens la position plus de 30 s, tu repars avec ton morceau de sauciflard.", bgColor: '#f28d11', category: 'activity' },
  { id: 30, startTime: '14:00', endTime: '17:00', title: 'Tournoi Volley', description: '', bgColor: '#f28d11', category: 'activity' },
  { id: 31, startTime: '15:00', endTime: '18:00', title: 'DIY Carte Postale / Lino', description: "Tu veux repartir avec un souvenir ? Viens imprimer une petite gravure sur le médium de ton choix : papier, textile.", bgColor: '#f28d11', category: 'activity' },
  { id: 32, startTime: '16:00', endTime: '19:00', title: 'Atelier Paillettes', description: 'Viens te transformer en fée <3', bgColor: '#f28d11', category: 'activity' },
  { id: 33, startTime: '17:00', endTime: '18:00', title: 'Aérobic sur musique', description: '', bgColor: '#f28d11', category: 'activity' },
  { id: 34, startTime: '18:00', endTime: '19:00', title: 'Géo BLIND', description: "Fan de géographie, backpacker endurci, viens te challenger au GEO Blind. Des départements français au tour du monde, tente ta chance dans le voyage du SAP.", bgColor: '#f28d11', category: 'activity' },
  { id: 35, startTime: '18:00', endTime: '19:00', title: 'Culture G', description: "Tu sais ce qu'on dit : la culture c'est comme la confiture, moins t'en as plus tu l'étales alors viens te tartiner.", bgColor: '#f28d11', category: 'activity' },
  { id: 36, startTime: '18:00', endTime: '20:00', title: 'Cercle de Parole', description: "Tu cherches un espace humain pour avoir des conversations profondes.", bgColor: '#f28d11', category: 'activity' },
  { id: 37, startTime: '21:00', endTime: '21:30', title: 'BINGO', description: "BINGO !!!! Et le vrai cette année :)", bgColor: '#f28d11', category: 'activity' },
  { id: 38, startTime: '12:30', endTime: '15:00', title: 'REPAS', description: "POKE (voir menu)", bgColor: '#fc87bb', category: 'meal' },
  { id: 39, startTime: '19:00', endTime: '23:00', title: 'REPAS', description: "PIZZA (voirmenu)", bgColor: '#fc87bb', category: 'meal' },
],
};

const timeToMinutes = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number);
  if (hours < 7) return (24 + hours) * 60 + minutes;
  return hours * 60 + minutes;
};

const assignColumns = (events: any[]) => {
  const sortedEvents = [...events].sort((a, b) => {
    const timeDiff = timeToMinutes(a.startTime) - timeToMinutes(b.startTime);
    if (timeDiff !== 0) return timeDiff;
    if (a.category === 'artist' && b.category !== 'artist') return -1;
    if (b.category === 'artist' && a.category !== 'artist') return 1;
    return 0;
  });

  const columns: any[][] = [];

  for (const event of sortedEvents) {
    let placed = false;
    for (let i = 0; i < columns.length; i++) {
      if (
        !columns[i].some(
          e =>
            timeToMinutes(e.endTime) > timeToMinutes(event.startTime) &&
            timeToMinutes(e.startTime) < timeToMinutes(event.endTime)
        )
      ) {
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

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const openModal = (event: any) => {
    setSelectedEvent(event);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedEvent(null);
  };
  const [loaded, error] = Font.useFonts({
    'Oliver-Regular': require('../../assets/fonts/Oliver-Regular.otf'),
  });

  const insets = useSafeAreaInsets();
  const [selectedDay, setSelectedDay] = useState('Vendredi');
  const events = eventData[selectedDay];
  const { positionedEvents, columnCount } = assignColumns(events);

  // Étendre horizontalement chaque carte tant que pas de conflit
  const extendedEvents = positionedEvents.map(event => {
    let span = 1;
    for (let i = event.column + 1; i < columnCount; i++) {
      const overlapping = positionedEvents.some(
        e =>
          e.column === i &&
          timeToMinutes(e.startTime) < timeToMinutes(event.endTime) &&
          timeToMinutes(e.endTime) > timeToMinutes(event.startTime)
      );
      if (overlapping) break;
      span++;
    }
    return { ...event, span };
  });

  const minHour = selectedDay === 'Vendredi' ? 17 : 10;
  const maxHour = 30;
  const timeSlots = [];
  for (let hour = minHour; hour < maxHour; hour++) {
    const displayHour = hour % 24;
    timeSlots.push(`${displayHour.toString().padStart(2, '0')}:00`);
    timeSlots.push(`${displayHour.toString().padStart(2, '0')}:30`);
  };
  timeSlots.push(`${(6).toString().padStart(2, '0')}:00`);

  
  return (
    <SafeAreaView style={styles.safeAreaViewContainer}>
      <ScreenTitle>LINE UP</ScreenTitle>
      <View style={{ flex: 1, paddingTop: insets.top }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', padding: 8 }}>
          {DAYS.map(day => (
            <Pressable
              key={day}
              onPress={() => setSelectedDay(day)}
              style={{ marginHorizontal: 8, backgroundColor: '#fff', padding: 5, borderRadius: 8, borderWidth: 5, borderColor: selectedDay === day ? '#0b8c35' : '#5a9adb' }}
            >
              <Text style={{ color: selectedDay === day ? '#0b8c35' : '#6d6161', fontSize: 16, fontFamily: 'Oliver-Regular' }}>{day}</Text>
            </Pressable>
          ))}
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 8 }}>
          <Text style={{ color:'#fff', fontSize: 14, fontFamily: 'Oliver-Regular', marginHorizontal : 10, backgroundColor : '#053688', borderRadius: 5, padding: 5}}>ARTISTS</Text>
          <Text style={{ color:'#fff', fontSize: 14, fontFamily: 'Oliver-Regular',marginHorizontal : 10, backgroundColor : '#f28d11', borderRadius: 5, padding: 5 }}>ACTIVITIES</Text>
          <Text style={{ color:'#fff', fontSize: 14, fontFamily: 'Oliver-Regular', marginHorizontal : 10, backgroundColor : '#fc87bb', borderRadius: 5, padding: 5}}>MEALS</Text>
        </View>
        <ScrollView contentContainerStyle={{ paddingBottom: 50, paddingHorizontal: 10 }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ width: 60 }}>
              {timeSlots.map((time, idx) => (
                <View key={idx} style={{ height: SLOT_HEIGHT, justifyContent: 'center' }}>
                  <Text style={{ fontSize: 12, color : '#fff' }}>{time}</Text>
                </View>
              ))}
            </View>
            <View style={{ flex: 1, position: 'relative' }}>
              {extendedEvents.sort((a, b) => a.column - b.column).map(event => {
                const start = timeToMinutes(event.startTime);
                const end = timeToMinutes(event.endTime);
                const top = (start - minHour * 60) * (SLOT_HEIGHT / 30) + 20;
                const height = (end - start) * (SLOT_HEIGHT / 30);
                const width = `${(100 / columnCount) * event.span}%`;
                const left = `${(100 / columnCount) * event.column}%`;
                return (
                  <Pressable
                    key={event.id}
                    onPress={() => openModal(event)}
                    style={{ position: 'absolute', top, left, width, height, backgroundColor: event.bgColor, padding: 4, borderRadius: 6, borderWidth: 2, borderColor: '#5a9adb', overflow: 'hidden' }}
                  >
                    <Text style={{ fontWeight: 'bold', fontSize: 12, color: '#fff' }} numberOfLines={3} ellipsizeMode="tail">
                      {event.title}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        </ScrollView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              {selectedEvent && (
                <>
                  <Text style={styles.modalTitle}>{selectedEvent.title}</Text>
                  <Text style={styles.modalTime}>{selectedEvent.startTime} - {selectedEvent.endTime}</Text>
                  <Text style={styles.modalDescription}>{selectedEvent.description || "Pas de description."}</Text>
                  <Pressable onPress={closeModal} style={styles.closeButton}>
                    <Text style={{color:'#fff'}}>Fermer</Text>
                  </Pressable>
                </>
              )}
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaViewContainer: {
    flex: 1,
    backgroundColor: '#5a9adb',
    marginBottom : 50
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalTime: {
    fontSize: 14,
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 14,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#0b8c35',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
});

export default ScheduleScreen;
