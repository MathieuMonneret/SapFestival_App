import React, { useState,useEffect  } from 'react';
import { View, Text, Image, StyleSheet,SafeAreaView, FlatList, TouchableWithoutFeedback } from 'react-native';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "@/types";
import * as Font from 'expo-font';
import ScreenTitle from '@/components/screenTitle';

type NavigationProps = NativeStackNavigationProp<RootStackParamList, "(tabs)/artists">;// this is require to navigate to the screen "/(tabs)/artist" when cliking on a "Touchable", 

// define type of data for Event object
type Event = {
  id: number
  startTime: string;
  endTime: string;
  artistName: string;
  musicStyle: string;
  bgColor: string,
};

//Events is an array of "Event" with date as Key
type Events = {
  [date: string]: Event[];
};

//create an array of the days for the TopBar Header
const days = [
  // { id: '2025-07-04', weekday: 'Vendredi - Night' },
  // { id: '2025-07-05', weekday: 'Samedi - Day' },
  // { id: '2024-07-05', weekday: 'Samedi - Night' }, //2024 in order to avoid duplicate with same day in 2025
  { id: '2025-07-04', weekday: 'N1' },
  { id: '2025-07-05', weekday: 'D2' },
  { id: '2024-07-05', weekday: 'N2' }, //2024 in order to avoid duplicate with same day in 2025
];

const ScheduleScreen = () => {

  const [loaded, error] = Font.useFonts({
    'Oliver-Regular': require('../../assets/fonts/Oliver-Regular.otf'),
  });

  const [selectedDayId, setSelectedDayId] = useState<string>('2025-07-04'); // default day selected
  const navigation = useNavigation<NavigationProps>(); // used to navigate to other screen when clicking on touchable


  /**
   * define the "Events" array with the same date as in "days" as key, and "Event" as value
   */
  const events: Events = {
    '2025-07-04': [
      { id: 1, startTime: '21:00', endTime:'22:00', artistName: 'Happy Guru', musicStyle: 'Tech-House', bgColor:'#053688'},
      { id: 2, startTime: '22:00', endTime:'23:00', artistName: 'HCC x Guizly', musicStyle: 'Dub Acoustique', bgColor:'#f28d11'},
      { id: 3, startTime: '23:00', endTime:'00:00', artistName: 'Pryme', musicStyle: 'Tech-House', bgColor:'#fc87bb'},
      { id: 4, startTime: '00:00', endTime:'01:30', artistName: 'Ring 41', musicStyle: 'Tech-House', bgColor:'#053688'},
      { id: 5, startTime: '01:30', endTime:'03:00', artistName: 'Maffia Dora x DJ 1000', musicStyle: 'Tech-House', bgColor:'#f28d11'},
      { id: 6, startTime: '03:00', endTime:'04:30', artistName: 'Obekix', musicStyle: 'Tech-House', bgColor:'#fc87bb'},
      { id: 7, startTime: '04:30', endTime:'06:00', artistName: 'Loul', musicStyle: 'Tech-House', bgColor:'#053688'},
    ],
    '2025-07-05': [
      { id: 8, startTime: '14:00', endTime:'15:00', artistName: 'Lemon Kid', musicStyle: 'Tech-House', bgColor:'#f28d11'},
      { id: 9, startTime: '15:00', endTime:'16:00', artistName: 'Falafel', musicStyle: 'Tech-House', bgColor:'#fc87bb'},
      { id: 10, startTime: '16:00', endTime:'17:00', artistName: 'HCC', musicStyle: 'Tech-House', bgColor:'#053688'},
      { id: 11, startTime: '17:00', endTime:'18:30', artistName: 'A-Link x Bob Rose', musicStyle: 'Tech-House', bgColor:'#f28d11'},
      { id: 12, startTime: '18:30', endTime:'20:00', artistName: 'Gasplatine', musicStyle: 'Tech-House', bgColor:'#fc87bb'},
    ],
    '2024-07-05': [ //2024 in order to avoid duplicate with same day in 2025
      { id: 13, startTime: '21:00', endTime:'22:00', artistName: 'R1', musicStyle: 'Tech-House', bgColor:'#053688'},
      { id: 14, startTime: '22:00', endTime:'23:00', artistName: 'Drove', musicStyle: 'Rap', bgColor:'#f28d11'},
      { id: 15, startTime: '23:00', endTime:'00:30', artistName: 'Cd-Rom x yAs (Label Affaire)', musicStyle: 'Tech-House', bgColor:'#fc87bb'},
      { id: 16, startTime: '00:30', endTime:'01:30', artistName: 'Clover x Paradis Fiscal', musicStyle: 'Tech-House', bgColor:'#053688'},
      { id: 17, startTime: '01:30', endTime:'02:30', artistName: 'LX 42', musicStyle: 'Tech-House', bgColor:'#f28d11'},
      { id: 18, startTime: '02:30', endTime:'03:30', artistName: 'Rawza', musicStyle: 'Tech-House', bgColor:'#fc87bb'},
      { id: 19, startTime: '03:30', endTime:'04:30', artistName: 'Raymzer', musicStyle: 'Tech-House', bgColor:'#053688'},
      { id: 20, startTime: '04:30', endTime:'06:00', artistName: 'Soapmalin', musicStyle: 'Tech-House', bgColor:'#f28d11'},
    ],
  };
  
  /**
  * We select only on of the date of the days array and display the according value of the Events array 
  */
  const selectedEvents: Event[] = events[selectedDayId] || [];


  // define the Header function
  //// The touchable on press enable to modify the selectedDayId and so key and value of "Events" 
  const renderDayHeader = () => (
    <View style={styles.cardHeader}>
      <View style={styles.daysContainer}>
        {days.map((day, index) => {
          const isActive =
          selectedDayId === day.id;
          return (
            <TouchableWithoutFeedback key={index} onPress={() => setSelectedDayId(day.id)}>
              <View style={[styles.dayItem, isActive && { backgroundColor: '#ffffff', borderColor: '#0b8c35', borderWidth: 5,},]}>
                <Text style={[styles.dayWeekday, isActive && { color: '#0b8c35' },]}>
                  {day.weekday}
                </Text>
                {/* <Text style={[styles.dayDate, isActive && { color: '#F2AA52' },]}>
                  {moment(day.id).format('DD MMM')}
                </Text> */}
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </View>
   </View>
  )
  
  // define the calendar function
  /// The touchable on press enable to navigate to the artist selected with a param "id of artist"
  const renderCalendarItem = ({ item }:{item: typeof Event}) => (
    <TouchableWithoutFeedback onPress={() => navigation.navigate("artists", { focusArtist: item.id })}>

      <View style={styles.eventItem}>
        {/* <View style={styles.timelineContainer}> */}
          {/* <View style={styles.timelineDot} /> */}
          {/* <View style={styles.timelineLine} /> */}
        {/* </View> */}

        <View style={styles.eventContent}>
          <View style={styles.eventHours}>
            <Text style={styles.startTime}>{item.startTime}</Text>
            <Text style={styles.endTime}>{item.endTime}</Text>
          </View>

          <View style={[styles.card,{backgroundColor:item.bgColor}]}>
            <Text style={styles.cardTitle}>{item.artistName}</Text>
            <Text style={styles.cardSubTitle}>{item.musicStyle}</Text>
          </View>
          <View style={[styles.card,{backgroundColor:item.bgColor}]}>
            <Text style={styles.cardTitle}>{item.artistName}</Text>
            <Text style={styles.cardSubTitle}>{item.musicStyle}</Text>
          </View>
          <View style={[styles.card,{backgroundColor:item.bgColor}]}>
            <Text style={styles.cardTitle}>{item.artistName}</Text>
            <Text style={styles.cardSubTitle}>{item.musicStyle}</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );

  return (
    <SafeAreaView style={styles.safeAreaViewContainer}>
      <ScreenTitle>LINE UP</ScreenTitle>
      <View style={styles.container}>
        {renderDayHeader()}
        <FlatList
          contentContainerStyle={{ paddingHorizontal: 8, paddingTop: 10 }}
          data={selectedEvents}
          // ListHeaderComponent={renderDayHeader}
          // stickyHeaderIndices={[0]}
          renderItem={renderCalendarItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      </SafeAreaView>
    
  );
  
};

/*
How it is going to look like, color and shapes 
*/
const styles = StyleSheet.create({
  safeAreaViewContainer: {
    flex : 1,
    backgroundColor: '#5a9adb',
  },
  container: {
    flex:1,
    // paddingTop: 16,
    backgroundColor: '#5a9adb'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    marginLeft:16
  },
  cardHeader: {
    // flex:1,
    // position: 'fixed',
    backgroundColor: '#5a9adb',
    marginHorizontal: -5,
    // borderRadius: 18,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.2,
    // shadowRadius: 4,
    elevation: 6,
    marginTop: 0,
    // marginBottom: 5,
    // padding: 18,
    // paddingHorizontal: 8,
    paddingVertical: 12,
  },
  card: {
    flex:1,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    marginBottom: 5,
    marginHorizontal: 5,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    marginBottom: 5,
  },
  dayItem: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 0,
    // borderColor: '#F2784B',
    // padding: 10,
    backgroundColor: '#F9F2EA',
  },
  screenTitle: {
    fontFamily: 'Oliver-Regular',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 100,
    fontWeight: '500',
    color: '#FFFFFF',
    marginTop: 20,
  },
  dayWeekday: {
    fontFamily: 'Oliver-Regular',
    fontSize: 50,
    fontWeight: '500',
    color: '#6d6161',
  },
  dayDate: {
    fontSize: 15,
    fontWeight: '600',
    color: '#F2784B',
  },
  eventItem: {
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  timelineContainer: {
    width: 30,
    alignItems: 'center',
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#ff7f50',
    marginBottom: 8,
  },
  timelineLine: {
    flex: 1,
    width: 2,
    backgroundColor: '#ff7f50',
  },
  eventContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    // marginLeft: 8,
  },
  eventHours: {
    marginRight: 8,
    alignItems: 'flex-end',
  },
  startTime: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  endTime: {
    fontSize: 16,
  },
  cardTitle: {
    fontSize: 18,
    color: '#ffffff',
    marginBottom: 4,
  },
  cardSubTitle: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 8,
  },
});

export default ScheduleScreen;
