import React from 'react';
// import Splash from '../screens/Auth/Splash';
import Splash from '../screen/Auth/Splash';
import Login from '../screen/Auth/Login';
import Register from '../screen/Auth/Register';
import ForgotPassword from '../screen/Auth/ForgotPassword';
// import ProfileScreen from '../screen/Profile/ProfileScreen';
import AllBooking from '../screen/Booking/AllBooking';
import DetailBooking from '../screen/Booking/DetailBooking';
import CabBooking from '../screen/Home/CabBooking';
import Driver from '../screen/Home/Driver';
import Temporary from '../screen/Home/Temporary';
import BottomTab from './bottomNavigation';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
const StackNavigtaion = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
       <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
       <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AllBooking"
        component={AllBooking}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DetailBooking"
        component={DetailBooking}
        options={{title:'Booking Detail'}}
      />
       <Stack.Screen
        name="CabBooking"
        component={CabBooking}
        options={{title:'Cab Booking'}}
      />
       <Stack.Screen
        name="Driver"
        component={Driver}
        options={{title:'Contractual Booking'}}
      />
       <Stack.Screen
        name="Temporary"
        component={Temporary}
        options={{title:'On Call Booking'}}
      />
       <Stack.Screen
        name="BottomTab"
        component={BottomTab}
        options={{headerShown:false}}
      />
    </Stack.Navigator>
  );
};
export default StackNavigtaion;