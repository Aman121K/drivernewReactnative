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
import OnCallDropDate from '../screen/Home/Temporary/OnCallHomeScreen/OnCallDropDate';
import OnCallDropLocality from '../screen/Home/Temporary/OnCallHomeScreen/OnCallDropLocality';
import OnCallLocalDat from '../screen/Home/Temporary/OnCallHomeScreen/OnCallLocalDat';
import OnCallOutStationDate from '../screen/Home/Temporary/OnCallHomeScreen/OnCallOutStationDate';
import OnCallPickUpAddress from '../screen/Home/Temporary/OnCallHomeScreen/OnCallPickUpAddress';
import OnCallFinalStage from '../screen/Home/Temporary/OnCallHomeScreen/OnCallFinalStage';
import OnCallHomeScreen from '../screen/Home/Temporary/OnCallHomeScreen';
import AdditionalInformation from '../screen/Home/Driver/AdditionInformation';
import JobDetails from '../screen/Home/Driver/JobDetails';
import JobInterViewDetails from '../screen/Home/Driver/InterViewDetials';
import Address from '../screen/Home/Driver/Address';
import InterViewDetails from '../screen/Home/Driver/InterViewDetials';
import OtpScreen from '../screen/Auth/OtpScreen';
import ChangePassword from '../screen/Auth/ChangePassword';
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
      <Stack.Screen
      name='OnCallHomeScreen'
      component={OnCallHomeScreen}
      options={{title:'Temporary Booking'}}/>
      <Stack.Screen
      name='OnCallDropDate'
      component={OnCallDropDate}
      options={{title:'Drop Booking'}}/>
      <Stack.Screen
      name='OnCallDropLocality'
      component={OnCallDropLocality}
      options={{title:'Drop Locality'}}/>

      <Stack.Screen
      name='OnCallFinalStage'
      component={OnCallFinalStage}
      options={{title:'Driver & Remark'}}/>

      <Stack.Screen
      name='OnCallLocalDat'
      component={OnCallLocalDat}
      options={{title:'Local Booking'}}/>
      <Stack.Screen
      name='OnCallOutStationDate'
      component={OnCallOutStationDate}
      options={{title:'Outstation Booking'}}/>
      <Stack.Screen
      name='OnCallPickUpAddress'
      component={OnCallPickUpAddress}
      options={{title:'Pickup Address'}}/>
      <Stack.Screen
      name='JobDetails'
      component={JobDetails}
      options={{title:'Job Details'}}/>
      <Stack.Screen
      name='Address'
      component={Address}
      options={{title:'Address'}}/>
      <Stack.Screen name='AdditionalInformation'
      component={AdditionalInformation} options={{title:'Additional Information'}}/>
      <Stack.Screen name='InterviewDetails' component={InterViewDetails}
      options={{title:'Interview Details'}}/>
       <Stack.Screen name='OtpScreen' component={OtpScreen}
      options={{title:'OTP Verification'}}/>
       <Stack.Screen name='changePassword' component={ChangePassword}
      options={{title:'Enter New Password'}}/>
    </Stack.Navigator>
  );
};
export default StackNavigtaion;