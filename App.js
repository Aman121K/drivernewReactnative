import React from 'react';
import {View, Text} from 'react-native';
import MainStack from './src/navigation/stackNaigation';
import {NavigationContainer} from '@react-navigation/native';
const App = () => {
  return (
    <NavigationContainer>
      {/* <NativeBaseProvider> */}
      <MainStack></MainStack>
      {/* <Toast /> */}
      {/* </NativeBaseProvider> */}
    </NavigationContainer>
  );
};
export default App;
