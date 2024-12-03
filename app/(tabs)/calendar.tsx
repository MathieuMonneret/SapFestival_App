import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableWithoutFeedback,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import type { RootStackParamList } from "@/types";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

type NavigationProps = NativeStackNavigationProp<RootStackParamList, "(tabs)/artists">;

type Event = {
  time: string;
  info: string;
};

type Events = {
  [date: string]: Event[];
};

export default function CalendarScreen() {
    const [selectedDayId, setSelectedDayId] = useState<string>('2025-07-04');
    const navigation = useNavigation<NavigationProps>();

  // Liste des jours
  const days = [
    { id: '2025-07-04', weekday: 'Vendredi - Night' },
    { id: '2025-07-05', weekday: 'Samedi - Day' },
    { id: '2024-07-05', weekday: 'Samedi - Night' },
  ];
  

  // Liste des événements
  const events: Events = {
    '2025-07-04': [
      { time: '21h - 22h', info: 'Happy Guru' },
      { time: '22h - 23h', info: 'HCC x Guizly' },
      { time: '23h - 00h', info: 'Pryme' },
      { time: '00h - 01h30', info: 'Ring 41' },
      { time: '1h30 - 03h', info: 'Maffia Dora x DJ 1000' },
      { time: '03h - 4h30', info: 'Obekix' },
      { time: '04h30 - 06h', info: 'Loul' },
    ],
    '2025-07-05': [
      { time: '14h - 15h', info: 'Lemon Kid' },
      { time: '15h - 16h', info: 'Falafel' },
      { time: '16h - 17h', info: 'HCC' },
      { time: '17h - 18h30', info: 'A-Link x Bob Rose' },
      { time: '18h30 - 20h', info: 'Gasplatine' },
    ],
    '2024-07-05': [
        { time: '21h - 22h', info: 'R1' },
        { time: '22h - 23h', info: 'Drove' },
        { time: '23h - 00h30', info: 'Cd-Rom x yAs (Label Affaire)' },
        { time: '00h30 - 01h30', info: 'Clover x Paradis Fiscal' },
        { time: '01h30 - 02h30', info: 'LX 42' },
        { time: '02h30 - 03h30', info: 'Rawza' },
        { time: '03h30 - 04h30', info: 'Raymzer' },
        { time: '04h30 - 06h', info: 'Soapmalin' },
    ],
  };

  // Sélectionner les événements du jour
  const selectedEvents: Event[] = events[selectedDayId] || [];


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
            {/* Liste des jours */}
        <View style={styles.daysContainer}>
          {days.map((day, index) => {
            const isActive =
            selectedDayId === day.id;
            return (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => setSelectedDayId(day.id)}>
                <View
                  style={[
                    styles.dayItem,
                    isActive && { backgroundColor: '#25292e', borderColor: '#25292e' },
                  ]}>
                  <Text
                    style={[
                      styles.dayWeekday,
                      isActive && { color: '#F2AA52' },
                    ]}>
                    {day.weekday}
                  </Text>
                  <Text
                    style={[
                      styles.dayDate,
                      isActive && { color: '#F2AA52' },
                    ]}>
                    {moment(day.id).format('DD MMM')}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            );
          })}
        </View>

        
        <View style={styles.eventsContainer}>
            <FlatList
            data={selectedEvents} 
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
                return (
                    <TouchableWithoutFeedback
                    onPress={() => navigation.navigate("artists", { focusArtist: item.info })}>
                        <View style={styles.eventItem}>
                            <Text style={styles.eventTime}>{item.time}</Text>
                            <Text style={styles.eventInfo}>{item.info}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                );
            }}
            ListEmptyComponent={ <Text style={styles.noEvents}>No events for this day.</Text> }
            />
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2C9E0',
    paddingVertical: 24,
  },
  header: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1d1d1d',
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  dayItem: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F2784B',
    padding: 10,
    backgroundColor: '#F9F2EA',
  },
  dayWeekday: {
    fontSize: 14,
    fontWeight: '500',
    color: '#F2784B',
  },
  dayDate: {
    fontSize: 15,
    fontWeight: '600',
    color: '#F2784B',
  },
  eventsContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  subtitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#999999',
    marginBottom: 12,
  },
  eventItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#F9F2EA',
    backgroundColor: '#F9F2EA',
  },
  eventTime: {
    fontSize: 16,
    fontWeight: '500',
    color: '#D9D273',
  },
  eventInfo: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F2AA52',
  },
  noEvents: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '400',
    color: '#999',
    marginTop: 20,
  },
});
