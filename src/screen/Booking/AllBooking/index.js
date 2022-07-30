
import React, { useState, createRef, useEffect } from 'react';
import Loader from '../../../component/Loader';
import {
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Dimensions,
  Alert,
  RefreshControl,
  ActivityIndicator
} from 'react-native';
import moment from 'moment';
import { TextInput } from 'react-native-paper';
import { useIsFocused } from "@react-navigation/native";
import { black } from 'react-native-paper/lib/typescript/styles/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DataTable } from 'react-native-paper';
import { Col, Row, Grid } from 'react-native-easy-grid';

// import Loader from './Components/Loader';
const BookingHistoryScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const { width, height } = Dimensions.get("screen")
  const passwordInputRef = createRef();
  const [isLocal, setIsLocal] = useState('local');
  const [refresh, setRefresh] = useState(false);
  const [loginuserData, setUserData] = useState(66366);
  const [onCall1, setOnCall] = useState([]);
  const [permanent, setPermanent] = useState([]);
  const [outStation, setOutStation] = useState([]);
  useEffect(() => {
    getToken()
  }, [isFocused])
  const getToken = async () => {
    try {
      setLoading(true)
      let userData = await AsyncStorage.getItem("userData");
      console.log("!!!!! ----- User data  :-", userData);
      const data = JSON.parse(userData)
      console.log("!!!!! ----- User Obj: ", data.name, data.user_id);
      setUserData(data.user_id)

      getUserDetails()

    } catch (error) {
      console.log("!!!!! ----- Something went wrong, while getting user token", error);
    }
  }

  const handleRefresh = () => {
    // setRefresh(true);
    setTimeout(() => {
      getUserDetails();
    }, 1000);
  };

  const getUserDetails = async () => {
    console.log("vikass");
    setLoading(true)
    let response = await axios.post(
      'http://driversuvidha.xyz/CRM/api/Booking/myBookingHistory',
      {
        "customerid": loginuserData
      },
    );
    console.log('data', response.data);
    if (response.data.all_cabbooking.length > 0) {
      setOutStation(response.data.all_cabbooking)
    }
    if (response.data.all_oncallbooking.length > 0) {
      setOnCall(response.data.all_oncallbooking);
    }
    if (response.data.all_contractualbooking.length > 0) {
      setPermanent(response.data.all_contractualbooking)
    }
    setLoading(false);
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#eff3f4' }}>


      <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5, backgroundColor: 'white' }}>
        <View>
          <Text style={{ fontSize: 20, marginLeft: 10, fontWeight: '700' ,color:'black'}}>My Booking</Text>
        </View>
        <View>

        </View>
      </View>

      <Loader loading={loading} />
      <View style={[styles.TopContent]}>
        {/* Out Station / One Way */}
        <TouchableOpacity
          onPress={() => setIsLocal('local')}
          style={[styles.TopButton, { backgroundColor: isLocal == 'local' ? 'red' : 'black' }]}>
          <Text style={{ color: '#FFFFFF', fontWeight: 'bold', }}>  OnCall</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsLocal('permanent')}
          style={[styles.TopButton, { backgroundColor: isLocal == 'permanent' ? 'red' : 'black' }]}>
          <Text style={{ color: '#FFFFFF', fontWeight: 'bold', }}> Contractual</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsLocal('outstation')}
          style={[styles.TopButton, { backgroundColor: isLocal == 'outstation' ? 'red' : 'black' }]}>
          <Text style={{ color: '#FFFFFF', fontWeight: 'bold', }}>Cab </Text>
        </TouchableOpacity>
      </View>
      {isLocal == 'local' ?
        <View>
          <View style={{ alignItems: 'center' }}>
            {/* <Text style={{fontSize:20,fontWeight:'700'}}>Local Booking List </Text> */}
          </View>
          <ScrollView
            //  refreshControl={
            //   <RefreshControl refreshing={refresh} onRefresh={handleRefresh} />
            // }
            style={{ marginBottom: '20%' }}>
            {onCall1.map((item, index) => (
              <TouchableOpacity key={index} onPress={() => navigation.navigate('DetailBooking', {
                paramKey: item,
              })}>
                <Grid style={{ width: '90%', marginTop: '5%', alignSelf: 'center' }}>
                  <Col size={50}>
                    <Row style={styles.cell}>
                      <Text Text style={styles.textCell}>Booing ID</Text>
                    </Row>
                    <Row style={styles.cell}>
                      <Text Text style={styles.textCell}>Date</Text>
                    </Row>
                    <Row style={styles.cell}>
                      <Text Text style={styles.textCell}>Booking Type</Text>
                    </Row>
                    <Row style={styles.cell}>
                      <Text Text style={styles.textCell}>Status</Text>
                    </Row>
                  </Col>
                  <Col size={55}>
                    <Row style={styles.cell}>
                      <Text Text style={styles.textCell}>{item.id}</Text>
                    </Row>
                    <Row style={styles.cell}>
                      {/* moment(returndate).format('DD-MM-YYYY') */}
                      <Text Text style={styles.textCell}>{moment(item.created_at).format('DD-MM-YYYY')}</Text>
                    </Row>
                    <Row style={styles.cell}>
                      <Text Text style={styles.textCell}>{item.duty_type}</Text>
                    </Row>
                    <Row style={styles.cell}>
                      <Text Text style={styles.textCell}>{item.status}</Text>
                    </Row>
                  </Col>

                </Grid>
                {/* <View style={{borderRadius:10,borderWidth:1,padding:20,width:'90%',margin:'2%',marginLeft:'2%'}}>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <Text>Car details :- {item.car_detail}</Text>
            <Text style={{alignSelf:'flex-end'}}>shift :- {item.shift}</Text>
            </View>
            <Text>Remarks:- {item.remark}</Text>
            <Text>Date:- {item.form_date}</Text>
          </View> */}

              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        : null}


      {isLocal == 'permanent' ?
        <View>
          <ScrollView
            //   refreshControl={
            //   <RefreshControl refreshing={refresh} onRefresh={handleRefresh} />
            // }
            style={{ marginBottom: '20%' }}>
            {/* <Text style={{fontSize:20,fontWeight:'900'}}>Permanent Booking</Text> */}
            {permanent.map((item,index) => (
              <TouchableOpacity key={index} onPress={() => navigation.navigate('DetailBooking', {
                paramKey: item,
              })}>
                <Grid style={{ width: '90%', marginTop: '5%', alignSelf: 'center' }}>
                  <Col size={40}>
                    <Row style={styles.cell}>
                      <Text Text style={styles.textCell}>Booing ID</Text>
                    </Row>
                    <Row style={styles.cell}>
                      <Text Text style={styles.textCell}>Date</Text>
                    </Row>
                    <Row style={styles.cell}>
                      <Text Text style={styles.textCell}>Car</Text>
                    </Row>
                    <Row style={styles.cell}>
                      <Text Text style={styles.textCell}>Driver Type</Text>
                    </Row>
                    <Row style={styles.cell}>
                      <Text Text style={styles.textCell}>Location</Text>
                    </Row>
                  </Col>
                  <Col size={65}>
                    <Row style={styles.cell}>
                      <Text Text style={styles.textCell}>{item.id}</Text>
                    </Row>
                    <Row style={styles.cell}>
                      <Text Text style={styles.textCell}>{item.interview_date}</Text>
                    </Row>
                    <Row style={styles.cell}>
                      <Text Text style={styles.textCell}>{item.car_detail}</Text>
                    </Row>
                    <Row style={styles.cell}>
                      <Text Text style={styles.textCell}>{item.driver_type}</Text>
                    </Row>
                    <Row style={styles.cell}>
                      <Text style={{ fontSize: 13, marginLeft: '5%' }}>{item.address_details.locality},{item.address_details.city}</Text>
                    </Row>
                  </Col>

                </Grid>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        : null}

      {isLocal == 'outstation' ?
        <View >
          {/* <Text style={{fontSize:20,fontWeight:'900',alignSelf:'center'}}>Cab Booking</Text> */}
          <ScrollView
            //  refreshControl={
            //   <RefreshControl refreshing={refresh} onRefresh={handleRefresh} />
            // }
            style={{ marginBottom: '20%' }}>
            {outStation.map((item,index) => (
              <TouchableOpacity key={index} onPress={() => navigation.navigate('DetailBooking', {
                paramKey: item,
              })}>

                {/* <View style={{borderRadius:10,borderWidth:1,padding:10,width:'90%',margin:'2%'}}>
           <View>
              <Text>Booking Type:- {item.booking_type}</Text>
              <Text>Car Type:- {item.car_type}</Text>
              <Text>Time & Distance:- {item.for_hour}</Text>
              <Text>Booking Date:- {item.created_at}</Text>
           </View>
         </View> */}

                <Grid style={{ width: '90%', marginTop: '5%', alignSelf: 'center' }}>
                  <Col size={50}>
                    <Row style={styles.cell}>
                      <Text Text style={styles.textCell}>Booing ID</Text>
                    </Row>
                    <Row style={styles.cell}>
                      <Text Text style={styles.textCell}>Date</Text>
                    </Row>
                    <Row style={styles.cell}>
                      <Text Text style={styles.textCell}>Booking Type</Text>
                    </Row>
                    <Row style={styles.cell}>
                      <Text Text style={styles.textCell}>Status</Text>
                    </Row>
                  </Col>
                  <Col size={55}>
                    <Row style={styles.cell}>
                      <Text Text style={styles.textCell}>{item.id}</Text>
                    </Row>
                    <Row style={styles.cell}>
                      <Text Text style={styles.textCell}>{item.pickup_date}</Text>
                    </Row>
                    <Row style={styles.cell}>
                      <Text Text style={styles.textCell}>{item.booking_type}</Text>
                    </Row>
                    <Row style={styles.cell}>
                      <Text style={styles.textCell}>{item.status}</Text>
                    </Row>
                  </Col>

                </Grid>

              </TouchableOpacity>
            ))}
          </ScrollView>

        </View>
        : null}

    </SafeAreaView>
  );
};

export default BookingHistoryScreen;
const styles = StyleSheet.create({

  mainBody: {
    // justifyContent: 'center', //Centered horizontally
    alignItems: 'center', //Centered vertically
    flex: 2,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignContent: 'space-between',
  },


  SectionStyle: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20
  },
  DateTimeContent: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    //backgroundColor:'red',
    marginTop: 20,
    // marginLeft:20,
    // marginRight:20
  },
  SectionStyleBottom: {
    width: '47%',
  },
  bottomContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'rgba(219, 35, 36, 1.0)',
    marginTop: 20,
    alignItems: 'center',
  },

  TopContent: {
    // padding:10,
    flexDirection: 'row',
    // justifyContent: 'space-between',
  },

  TopButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: '33%'
  },
  TopSegmentView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'red',
  },
  iconTop: {
    width: 50,
    height: 50
  },
  TripSegment: {
    flexDirection: 'row',
    justifyContent: 'center',
    // backgroundColor: 'white',
    margin: 20,
    //borderRadius: 30,
    borderColor: 'gray',
    borderWidth: 2
  },
  OneWayStyle: {
    width: '50%',
    color: 'black',
    padding: 10,
    alignItems: 'center',
  },
  cell: {
    borderWidth: 1,
    borderColor: '#ddd',
    // flex: 1, 
    // justifyContent: 'center',
    // marginLeft:'5',
    alignItems: 'center'
  },
  textCell: {
    marginLeft: '5%',
    color:'black'
  },

  buttonTextStyle: {
    color: 'white',
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
  registerTextStyle: {
    color: '#000',
    textAlign: 'center',
    fontWeight: 'normal',
    fontSize: 12,
    alignSelf: 'center',
  },
  radioButton: {
    flexDirection: 'row', margin: 10, justifyContent: 'space-between', alignContent: 'center'
  },

});