import React from 'react';
import {StyleSheet, TouchableOpacity, View, Image, Text} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeStack from '../screen/Home/HomeScreen';
import BookingHistoryScreen from '../screen/Booking/AllBooking';
import ProfileScreen from '../screen/Profile/ProfileDetails';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Price from '../screen/Price';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../utility';
const Tab = createBottomTabNavigator();
const BottomTabNavigator = ({navigation}) => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home';
          } else if (route.name === 'My Bookings') {
            iconName = focused ? 'ios-list' : 'ios-list';
          } else if (route.name === 'Price') {
            iconName = focused ? 'list' : 'list';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
        tabBarActiveBackgroundColor: 'red',
        tabBarInactiveBackgroundColor: 'white',
      })}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="My Bookings"
        component={BookingHistoryScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Price" component={Price} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
const styles = StyleSheet.create({
  // tabImg: {
  //   width: 30,
  //   height: 30,
  //   alignSelf: 'center',
  //   tintColor: 'grey',
  // },
  // selectedTabImg: {
  //   width: 30,
  //   height: 30,
  //   alignSelf: 'center',
  //   tintColor: 'skyblue',
  // },
});
