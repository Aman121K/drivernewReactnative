
// Import React and Component
import React, { useState, createRef } from 'react';
import { StyleSheet, View, TouchableOpacity, SafeAreaView, Image, Text, ScrollView } from 'react-native';
import { Dimensions } from 'react-native';

const OnCallHomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView >

        <TouchableOpacity style={styles.CardView}
          onPress={() => navigation.navigate("OnCallLocalDat")}

        >
          <Image
            source={require('../../../../../Image/local.jpg')}
            style={styles.Logo}
          />

        </TouchableOpacity>
        <TouchableOpacity style={styles.CardView}
          onPress={() => navigation.navigate("OnCallOutStationDate")}

        >
          <Image
            source={require('../../../../../Image/out-station.jpg')}
            style={styles.Logo}
          />

        </TouchableOpacity>
        <TouchableOpacity style={styles.CardView}
          onPress={() => navigation.navigate("OnCallDropDate")}

        >
          <Image

            source={require('../../../../../Image/drop.jpg')}
            style={styles.Logo}
          />

        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};


export default OnCallHomeScreen;
const styles = StyleSheet.create({
  CardView: {
    width: '90%',
    alignSelf: 'center',
    height: Dimensions.get('window').width / 2,
    backgroundColor: 'transparent',
    marginTop: 10,
    borderRadius: 20,

  },
  Logo: {
    alignSelf:'center',
    width: '95%',
    height: '95%',//Dimensions.get('window').width / 4,
    resizeMode: 'contain',
    borderRadius:10,
    //   borderRadius:10,
    //position: 'absolute',
    //top: 20,
    //backgroundColor: '#FFFFFF'           
  },
  TextStyle: {
    color: '#000',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
    alignSelf: 'center',
    marginBottom: 20
  },
});