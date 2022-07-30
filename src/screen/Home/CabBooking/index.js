

// // Import React and Component
// import React, {useState, createRef} from 'react';
// import {
//   ImageBackground,
//   StyleSheet,
//   SafeAreaView,
//   View,
//   Text,
//   ScrollView,
//   Image,
//   Keyboard,
//   TouchableOpacity,
//   KeyboardAvoidingView,
//   Dimensions,
// } from 'react-native';
// import { TextInput } from 'react-native-paper';
// import { black } from 'react-native-paper/lib/typescript/styles/colors';
// import Ionicons from 'react-native-vector-icons/Ionicons';


// import Loader from './Components/Loader';
// const CabScreen =  ({navigation}) => {
//   const [userEmail, setUserEmail] = useState('');
//   const [userPassword, setUserPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [errortext, setErrortext] = useState('');
//   const {width, height} = Dimensions.get("screen")
//   const passwordInputRef = createRef();


//   const [isLocal, setIsLocal] = useState(false);
//   const [isOneWay, setIsOneWay] = useState(true);


//   const [dutyHour, setDutyHour] = useState ('');

//   const handleSubmitPress = () => {
//     setErrortext('');
//     if (!userEmail) {
//       alert('Please fill Email');
//       return;
//     }
//     if (!userPassword) {
//       alert('Please fill Password');
//       return;
//     }
//     setLoading(true);
//     let dataToSend = {email: userEmail, password: userPassword};
//     let formBody = [];
//     for (let key in dataToSend) {
//       let encodedKey = encodeURIComponent(key);
//       let encodedValue = encodeURIComponent(dataToSend[key]);
//       formBody.push(encodedKey + '=' + encodedValue);
//     }
//     formBody = formBody.join('&');

//     fetch('http://localhost:3000/api/user/login', {
//       method: 'POST',
//       body: formBody,
//       headers: {
//         //Header Defination
//         'Content-Type':
//         'application/x-www-form-urlencoded;charset=UTF-8',
//       },
//     })
//       .then((response) => response.json())
//       .then((responseJson) => {
//         //Hide Loader
//         setLoading(false);
//         console.log(responseJson);
//         // If server response message same as Data Matched
//         if (responseJson.status === 'success') {
//           AsyncStorage.setItem('user_id', responseJson.data.email);
//           console.log(responseJson.data.email);
//           navigation.replace('DrawerNavigationRoutes');
//         } else {
//           setErrortext(responseJson.msg);
//           console.log('Please check your email id or password');
//         }
//       })
//       .catch((error) => {
//         //Hide Loader
//         setLoading(false);
//         console.error(error);
//       });
//   };
//   return (
//     <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>

//           <View style={[styles.TopContent]}>
//             {/* Out Station / One Way */}
//                <TouchableOpacity 
//                 onPress={() => setIsLocal(false)}
//                 style={[styles.TopButton,{backgroundColor: isLocal ? 'black' : 'red', width:'50%'}]}>
//                   <Image
//                         source={require('../../Image/out-staion.png')}
//                         resizeMode='contain'
//                         style={styles.iconTop}
//                     />
//                     <Text style={{color: '#FFFFFF', fontWeight: 'bold',}}>Out Station</Text>
//                 </TouchableOpacity>
//               <TouchableOpacity 
//                 onPress={() => setIsLocal(true)}
//                 style={[styles.TopButton,{backgroundColor: isLocal ? 'red' : 'black', width:'50%'}]}>
//                   <Image
//                         source={require('../../Image/local.png')}
//                         resizeMode='contain'
//                         style={styles.iconTop}
//                     />                
//                     <Text style={{color: '#FFFFFF', fontWeight: 'bold',}}>  Local</Text>
//               </TouchableOpacity>

//           </View>
//             { !isLocal ?
//              <View style={styles.TripSegment}>
//               <TouchableOpacity
//                   style={[styles.OneWayStyle,{backgroundColor: isOneWay ? 'yellow': 'white'}]}
//                   activeOpacity={0.5}
//                   onPress={() => setIsOneWay(true)}>
//                   <Text style={[{color: isOneWay ? 'red' : 'black', width:'50%'}]}>One Way</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={[styles.OneWayStyle,{backgroundColor: isOneWay ? 'white' : 'yellow'}]}
//                   activeOpacity={0.5}
//                   onPress={() => setIsOneWay(false)}>
//                   <Text style={[{color: isOneWay ? 'black' : 'red', width:'50%'}]}>Round Trip</Text>
//                 </TouchableOpacity>
//              </View>
//             :
//             null  
//           }

//       <ScrollView
//             keyboardShouldPersistTaps="handled"
//             contentContainerStyle={{
//               //flex: 1,

//             }}>
//               {
//                 isLocal ?


//                     <View style={{flexDirection: 'column'}}>
//                            <View style={styles.SectionStyle}>
//                                 <TextInput
//                                   mode="outlined"
//                                   label="City"
//                                   //value='Ranjan'
//                                   placeholder="Select City"
//                                   theme={{ colors: { primary: 'red',underlineColor:'yellow', accent:'red'}}}
//                                   maxLength={10}
//                                   keyboardType = 'default'
//                                   />
//                             </View>
//                             <View style={styles.SectionStyle}>

//                          <Text style={{marginLeft:10, marginBottom:10,   fontWeight: 'bold'}}>Duty Hours</Text>

//                          <View style={{flexDirection: 'row'}}>
//                            <TouchableOpacity style={styles.radioButton} onPress={() => setDutyHour('2')}>
//                                <Ionicons name={dutyHour === '2' ? 'radio-button-on': 'radio-button-off-sharp'} size={20} color={'red'} />
//                                <Text style={{marginLeft:10}}>2 Hrs</Text>
//                             </TouchableOpacity>
//                             <TouchableOpacity style={styles.radioButton} onPress={() => setDutyHour('4')}>
//                                <Ionicons name={dutyHour === '4' ? 'radio-button-on': 'radio-button-off-sharp'} size={20} color={'red'} />
//                                <Text style={{marginLeft:10}}>4 Hrs</Text>
//                             </TouchableOpacity>
//                             <TouchableOpacity  style={styles.radioButton} onPress={() => setDutyHour('6')} >
//                                 <Ionicons name={dutyHour === '6' ? 'radio-button-on': 'radio-button-off-sharp'} size={20} color={'red'} />
//                                 <Text style={{marginLeft:10}}>6 Hrs</Text>
//                             </TouchableOpacity>
//                             <TouchableOpacity style={styles.radioButton} onPress={() => setDutyHour('8')} >
//                                 <Ionicons name={dutyHour === '8' ? 'radio-button-on': 'radio-button-off-sharp'} size={20} color={'red'} />
//                                 <Text style={{marginLeft:10}}>8 Hrs</Text>
//                             </TouchableOpacity>
//                      </View>
//                      </View>
//                 </View>
//                 :
//                 <View >
//                 <KeyboardAvoidingView enabled>
//                   <View style={styles.SectionStyle}>
//                       <TextInput
//                         mode="outlined"
//                         label="From Location"
//                         //value='Ranjan'
//                         placeholder="Select Pick Up"
//                         theme={{ colors: { primary: 'red',underlineColor:'yellow', accent:'red'}}}
//                         maxLength={10}
//                         keyboardType = 'default'

//                         //right={<TextInput.Icon name="chevron-down" />}                   
//                          />
//                   </View>
//                     <View style={styles.SectionStyle}>
//                         <TextInput
//                           mode="outlined"
//                           label="To Location"
//                           placeholder="Select Drop"
//                           theme={{ colors: { primary: 'red',underlineColor:'transparent'}}}
//                           maxLength={10}
//                           keyboardType = 'default'
//                           //right={<TextInput.Icon name="chevron-down" />}                   

//                         />
//                     </View>



//                   <View style={styles.DateTimeContent}>
//                     <View style={styles.SectionStyleBottom}>
//                         <TextInput
//                           mode="outlined"
//                           label="Pick up  Date"
//                           placeholder="Pick up Date"
//                           theme={{ colors: { primary: 'red',underlineColor:'transparent'}}}
//                           maxLength={10}
//                           keyboardType = 'default'

//                           right={<TextInput.Icon name="calendar" />}                   
//                         />
//                     </View>
//                     {
//                     isOneWay ?

//                        <View style={styles.SectionStyleBottom}>
//                         <TextInput
//                           mode="outlined"
//                           label="Pick up  time"
//                           placeholder="Pick up time"
//                           theme={{ colors: { primary: 'red',underlineColor:'transparent'}}}
//                           maxLength={10}
//                           keyboardType = 'default'

//                           right={<TextInput.Icon name="clock" />}                   
//                         />
//                        </View>

//                      :
//                       <View style={styles.SectionStyleBottom}>
//                         <TextInput
//                           mode="outlined"
//                           label="Return Date"
//                           placeholder="Return Date"
//                           theme={{ colors: { primary: 'red',underlineColor:'transparent'}}}
//                           maxLength={10}
//                           keyboardType = 'default'

//                           right={<TextInput.Icon name="calendar" />}                   
//                         />
//                       </View>
//                      }

//                   </View>
//                   {!isOneWay ? 
//                     <View style={styles.DateTimeContent}>
//                           <View style={styles.SectionStyleBottom}>
//                           <TextInput
//                             mode="outlined"
//                             label="Pick up  time"
//                             placeholder="Pick up time"
//                             theme={{ colors: { primary: 'red',underlineColor:'transparent'}}}
//                             maxLength={10}
//                             keyboardType = 'default'

//                             right={<TextInput.Icon name="clock" />}                   
//                           />
//                         </View>
//                         <View>

//                         </View>
//                     </View>
//                    :
//                    null
//                   }

//                 </KeyboardAvoidingView>
//                 </View>

//               }

//           </ScrollView>
//           <View>

//           <TouchableOpacity style={styles.bottomContent}
//            onPress={() => navigation.navigate('CarScreen')}
//           >
//                  <Image
//                             source={require('../../Image/car.png')}
//                             resizeMode='contain'

//                           style={styles.iconTop}
//                         />
//                    <Text style={styles.buttonTextStyle}>  Select Car</Text>

//                </TouchableOpacity>

//           </View>

//     </SafeAreaView>
//   );
// };

// export default CabScreen;
// const styles = StyleSheet.create({

//   mainBody: {
//    // justifyContent: 'center', //Centered horizontally
//     alignItems: 'center', //Centered vertically
//     flex:2,
//     flexDirection: 'column',
//     backgroundColor: '#fff',
//     alignContent: 'space-between',
//   },


//   SectionStyle: {
//     marginTop: 20,
//     marginLeft:20,
//     marginRight:20
//   },
//   DateTimeContent:{
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     //backgroundColor:'red',
//     marginTop:20,
//     marginLeft:20,
//     marginRight:20
//   },
//   SectionStyleBottom: {
//     width: '47%', 
//   },
//   bottomContent:{
//     flexDirection: 'row',
//     justifyContent: 'center',
//     backgroundColor: 'rgba(219, 35, 36, 1.0)',
//     marginTop:20,
//     alignItems:'center',
//   },

//   TopContent:{
//    // padding:10,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },

//   TopButton:{
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems:'center',
//     padding:10
//   },
//  TopSegmentView:{
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems:'center',
//    // backgroundColor:'red',
//   },
//   iconTop:{
//     width: 50,
//     height: 50
//   },
//   TripSegment:{
//     flexDirection: 'row',
//     justifyContent: 'center',
//    // backgroundColor: 'white',
//     margin:20,
//     //borderRadius: 30,
//     borderColor:'gray',
//     borderWidth:2
//   },
//   OneWayStyle: {
//     width:'50%',
//     color: 'black',
//     padding:10,
//     alignItems:'center',
//   },

//   buttonTextStyle: {
//     color: 'white',
//     fontSize: 16,
//   },
//   inputStyle: {
//     flex: 1,
//     color: 'white',
//     paddingLeft: 15,
//     paddingRight: 15,
//     borderWidth: 1,
//     borderRadius: 30,
//     borderColor: '#dadae8',
//   },
//   registerTextStyle: {
//     color: '#000',
//     textAlign: 'center',
//     fontWeight: 'normal',
//     fontSize: 12,
//     alignSelf: 'center',
//   },
//   radioButton:{
//     flexDirection:'row',margin:10,  justifyContent: 'space-between',alignContent: 'center'
//   },

// });




import React, { useState, createRef, useEffect } from 'react';
import { SafeAreaView, Alert, Image, StyleSheet, View, ScrollView, Button, TouchableOpacity, KeyboardAvoidingView, Dimensions } from 'react-native';
import {
  TextInput,
  DarkTheme,
  DefaultTheme,
  Provider,
  Text
} from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import APIKit, { setClientToken } from '../../../shared/APIKit';
import { Dropdown } from 'react-native-element-dropdown';
import DatePicker from 'react-native-date-picker'
import moment from 'moment';
import Modal from "react-native-modal";
import axios from 'axios';
const CabScreen = ({ navigation }) => {
  const [carArrayafterBooking, setCarArrayafterBooking] = useState([])
  const [isModalVisible, setModalVisible] = useState(false);
  const [nightMode, setNightmode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');

  const [logedInUserData, setUserData] = useState({});

  const [reportingdate, setReportingdate] = useState(new Date())
  const [isReportingdate, setIsReportingdate] = useState(false)
  const [cabbookingId, setCabBookingId] = useState('');

  const [returndate, setReturndate] = useState(new Date())
  const [isreturndate, setIsReturndate] = useState(false)
  const [saveAddressValue, setsaveAddressValue] = useState('0')

  const [open, setDateOpen] = useState(false)
  const openLocalDatePkr = () => {
    setIsReportingdate(true)
    setIsReturndate(false)
    setDateOpen(true)
  };
  const openRtnDatePkr = () => {
    setIsReportingdate(false)
    setIsReturndate(true)
    ////Open Picker
    setDateOpen(true)
  };
  const setDate = (date) => {

    if (isReportingdate) {
      setReportingdate(date)
    } else if (isreturndate) {
      setReturndate(date)
    }
  }
  const [showReportingDropDown, setshowReportingDropDown] = useState(false);
  const [reportingAddress, setReportingAddress] = useState('');
  const [reportingAdrList, setReportingAdrList] = useState([]);
  const handleReportingAddressChange = (item) => {
    console.log("vikas", item);
    console.log('! Aman Reporting address :-', reportingAddress)
    console.log("All address by aman..", allAdress1);
    if (reportingAddress) {
      setCity(allAdress1[0].city);
      setAddress(allAdress1[0].address);
      setLandmark(allAdress1[0].landmark);
      setLocality(allAdress1[0].locality);
      setPincode(allAdress1[0].zip);
      console.log("Matched...")
    }
    setshowReportingDropDown(false);
  };

  const [address, setAddress] = useState('');
  const handleAddressChange = adr => {
    setAddress(adr);
  };
  const [allCityList, setallCityList] = useState([]);

  const [showCityDropDown, setshowCityDropDown] = useState(false);
  const [city, setCity] = useState('');
  const [cityList, setCityList] = useState([]);

  const [showlocalityDropDown, setshowlocalityDropDown] = useState(false);
  const [locality, setLocality] = useState('');
  const [localityList, setLocalityList] = useState([]);
  const makelocalityArray = () => {
    setshowlocalityDropDown(true)
    console.log('City id', city)
    let arrFilterCt = allCityList.filter(obj => {
      return obj.city_id === city
    })
    if (arrFilterCt.length > 0) {
      let selectedCity = arrFilterCt[0]
      console.log('City', selectedCity)
      var localList = selectedCity.all_locality.map(local => ({ value: local.locality_id, label: local.locality_name }));
      console.log('localList', localList)
      setLocalityList(localList)
      setshowlocalityDropDown(true)
    }

  }
  const [pincode, setPincode] = useState('');
  const handlePincodeChange = pin => {
    setPincode(pin);
  };
  const [landmark, setLandmark] = useState('');
  const handleLandmarkChange = lnd => {
    setLandmark(lnd);
  };

  //TIME
  const [showTimeDropDown, setshowTimeDropDown] = useState(false);
  const [reportingTime, setreportingTime] = useState('');
  const [reportingTimeList, setreportingTimeList] = useState([]);
  const [previousCarList, setpreviousCarList] = useState([]);
  const [isShowCarList, setisShowCarList] = useState(false);
  const [showCarDropDown, setshowCarDropDown] = useState(false);
  const [cardetails, setCar] = useState('');
  const [carList, setCarList] = useState([]);
  const [isSaveAddress, setisSaveAddress] = useState(false);
  const [drivertype, setDriverTypeChecked] = useState('1');
  const [showDutyTypeDropDown, setshowDutyTypeDropDown] = useState(false);
  const [dutytype, setdutyType] = useState('');
  const [dutyhour, setDutyHour] = useState('');
  const dutyTypeList = [
    {
      label: "Local",
      value: "Local",
    },
    {
      label: "Out Station",
      value: "Out Station",
    },
    {
      label: "Round trip",
      value: "Round trip",
    },
  ];
  const [dutyhoursList, setDutyhoursList] = useState([]);
  const [showFromCityDropDown, setshowFromCityDropDown] = useState(false);
  const [showToCityDropDown, setshowToCityDropDown] = useState(false);
  const [toCity, setToCity] = useState('');
  const [remarks, setremarks] = useState('');
  const [allAdress1, setAlladress1] = useState([])
  const [customerendering, setcustomerendering] = useState(false);
  const [selectedCar, setSelectedCar] = useState();
  const handleRemarks = rmk => {
    setremarks(rmk);
  };

  const getToken = async () => {
    try {
      let userData = await AsyncStorage.getItem("userData");
      console.log("!!!!! ----- User data  :-", userData);
      const data = JSON.parse(userData)
      // console.log("!!!!! ----- User Obj: ", data.name, data.user_id);
      setUserData(data)
      console.log("!!!!! ----- User ID: ", logedInUserData.user_id);

      //2 For Assigned Task
      getAllData(data.user_id)


    } catch (error) {
      console.log("!!!!! ----- Something went wrong, while getting user token", error);
    }
  }

  const getAllData = (userid) => {
    setErrortext('');
    setLoading(true)
    console.log("!!!!! ----- User Aman ID: ", userid);

    const payload = { customerid: userid }
    console.log('All DATA req', payload);

    const onSuccess = ({ data }) => {
      // Set JSON Web Token on success
      setLoading(false);
      console.log('All DATA', data);

      var allTm = data.all_timeslot.map(tml => ({ value: tml, label: tml }));
      // console.log('Time list',allTm);

      setreportingTimeList(allTm)

      setAlladress1(data.all_address);
      var customhours = data.duty_hour.map(hr => ({ name: hr.hours, id: hr.id, status: 'false' }))
      setDutyhoursList(customhours)

      var prevAdrList = data.all_address.map(adrs => ({ value: adrs.id, label: adrs.previous_address, address: adrs.address, city: adrs.city, landmark: adrs.landmark, locality: adrs.locality, zip: adrs.zip }));
      setReportingAdrList(prevAdrList)
      var prevCarList = data.all_car.map(prvCar => ({ value: prvCar.id, label: prvCar.previous_address, }))

      setallCityList(data.city_list)
      var cityList = data.city_list.map(city => ({ value: city.city_id, label: city.city_name }));
      console.log('City list', cityList);
      setCityList(cityList)

      var cityList1 = data.locality_list.map(city => ({ value: city.locality_id, label: city.locality_name }));
      console.log('City or locality both...', cityList1);
      setLocalityList(cityList1)



      var prevCarList = data.all_car.map(car => ({ value: car.car_id, label: car.car_name }));
      //  if (prevCarList.length > 0) { 
      prevCarList.push({ value: 0, label: 'select New Car' });
      setpreviousCarList(prevCarList)
      // setIsShowPreviousCarList(false)
      // }

      console.log('Previous Car List', prevCarList);


      var carList = data.car_master.map(car => ({ value: car.id, label: car.car_name }));
      console.log('Car List', carList);
      setCarList(carList)
    };

    const onFailure = error => {
      //console.log("!!!!----message",error.data.message);
      setLoading(false);
      console.log("!!!!----Error", error);
      console.log("!!!!----Error Response", error.response);
      console.log("!!!!----error.response.data", error.response.data);
      console.log("!!!!----error.response.status", error.response.status);
      console.log("!!!!----headers", error.response.headers);
      setTimeout(() => {
        // Alert.alert('Oops!', error.message);
        Alert.alert('Oops!', 'User id or password incorrect');
      }, 100);
    };

    // Show spinner when call is made
    //this.setState({isLoading: true});

    APIKit.post('/Booking/previousRecord', payload)
      .then(onSuccess)
      .catch(onFailure);
  };

  const handleSubmitPress = () => {
    setErrortext('');
    if (!address) {
      alert('Please fill address');
      return;
    }
    if (!city) {
      alert('Please select City');
      return;
    }
    if (!locality) {
      alert('Please select Locality');
      return;
    }
    if (!pincode) {
      alert('Please fill Pincode');
      return;
    }
    if (!landmark) {
      alert('Please fill Landmark');
      return;
    }
    if (!dutytype) {
      alert('Please fill duty type');
      return;
    }
    if (dutytype === 'Local') {
      if (!dutyhour) {
        alert('Please select duty hour');
        return;
      }

    }

    setLoading(true)

    console.log("user id,,,", logedInUserData.user_id)
    var dutytypeNew = 1;
    if (dutytype == 'Local') {
      dutytypeNew = 1
    } else if (dutytype == 'Out Station') {
      dutytypeNew = 2
    } else if (dutytype == 'Drop') {
      dutytypeNew = 3
    }
    const payload = {
      reporting_address: reportingAddress,
      address: address,
      city: city,
      locality: locality,
      pincode: pincode,
      landmark: landmark,
      customer_id: logedInUserData.user_id,
      status: "",
      cab_booking_type: JSON.stringify(dutytypeNew),
      fromcity: "",
      pickupdate: moment(reportingdate).format('YYYY-MM-DD'),
      pickup_time: reportingTime,
      tocity: toCity,
      for_hour: dutyhour,
      return_date: moment(returndate).format('YYYY-MM-DD'),
      remark: remarks
      // customer_id : logedInUserData.user_id, 
      // reporting_address:reportingAddress,
      // address, 
      // city, 
      // locality, 
      // pincode,
      // landmark, 
      // cardetails:cardetails.value,
      // drivertype, 
      // dutytype:dutytypeNew,
      // dutyhour, 
      // remark: remarks,
      // reportingdate:moment(reportingdate).format('YYYY-MM-DD'), 
      // reportingtime:reportingTime, 
      // returndate:dutytype === 'Local' ? "" : moment(returndate).format('YYYY-MM-DD'), 
      // driverpreference:"",
      // tocity:toCity,
      // status:saveAddressValue
    };

    console.log("Test....", payload);
    const onSuccess = ({ data }) => {
      // Set JSON Web Token on success
      setLoading(false);
      console.log(data);
      if (data.status == true) {
        setModalVisible(!isModalVisible)
        setCabBookingId(data.cab_booking_id)
        setCarArrayafterBooking(data.choose_car)
        // navigation.navigate('HomeScreen')
      } else {

      }

    };
    const onFailure = error => {
      setLoading(false);
      //console.log("!!!!----message",error.data.message);
      setTimeout(() => {
        // Alert.alert('Oops!', error.message);
        Alert.alert('Success!');
      }, 100);
      navigation.navigate('HomeScreen')
      console.log("!!!!----Error", error);

    };

    // Show spinner when call is made
    //this.setState({isLoading: true});

    APIKit.post('/Booking/cab_book', payload)
      .then(onSuccess)
      .catch(onFailure);

  };
  useEffect(() => {
    console.log('TempDriverScreen loaded')
    getToken()
  }, [])
  const setCustomHours = (item) => {
    console.log("All data", item);
    if (item.id == 1) {
      dutyhoursList[1]['status'] = false
      dutyhoursList[2]['status'] = false
    }
    if (item.id = 2) {
      dutyhoursList[0]['status'] = false
      dutyhoursList[2]['status'] = false
    }
    if (item.id == 3) {
      dutyhoursList[0]['status'] = false
      dutyhoursList[1]['status'] = false
    }

    // setcustomerendering(!customerendering);
    // console.log("hours data is...",item)
    setDutyHour(item.name)
    item.status = true;
    // console.log(dutyhoursList);
  }
  const saveAddressData = () => {
    setisSaveAddress(!isSaveAddress)
    setsaveAddressValue('1');
  }
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const carSelected = (index) => {
    setSelectedCar(index)
    // Alert.alert("you choose car")
  }
  const FinalCabBooking = async () => {
    let response = await axios.post(
      'http://driversuvidha.xyz/CRM/api/Booking/complete_cab_booking',
      {
        "cab_booking_id": cabbookingId, "car_id": selectedCar
      },
      {
        headers: {
          //Header Defination
          'Content-Type':
            'application/x-www-form-urlencoded;charset=UTF-8',
        },
      }
    );
    console.log("res...vikas", response.data);
    if (response.data.status == true) {
      setModalVisible(!isModalVisible);
      navigation.navigate('HomeScreen')
      Alert.alert("Booking Successfully");
    } else {
      setModalVisible(!isModalVisible);
      Alert.alert("Something wrong from backend");
    }
  }
  return (
    <Provider theme={nightMode ? DarkTheme : DefaultTheme}>
      <SafeAreaView style={styles.safeContainerStyle}>
        <ScrollView showsVerticalScrollIndicator={false}
        >
          <View >
            <KeyboardAvoidingView enabled>

              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={reportingAdrList}
                maxHeight={150}
                labelField="label"
                valueField="value"
                placeholder="Reporting Address*"
                searchPlaceholder="Search..."
                value={reportingAddress}
                onChange={item => {
                  setReportingAddress(item.value)
                  console.log("vikkkk", item);
                  setCity(item.city)
                  setisSaveAddress(true)
                  setAddress(item.address);
                  setPincode(item.zip);
                  setLocality(item.locality);
                  setLandmark(item.landmark);
                }}
              />
              <View style={styles.spacerStyle} />

              <TextInput
                mode="outlined"
                label={"Address"}
                value={address}
                placeholder="Enter Address"
                theme={{ colors: { primary: '#99e8e4', underlineColor: 'yellow', accent: '#99e8e4' } }}
                maxLength={50}
                keyboardType='default'
                onChangeText={handleAddressChange}
              />
              <View style={styles.spacerStyle} />

              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={cityList}
                search
                maxHeight={150}
                labelField="label"
                valueField="value"
                placeholder="City*"
                searchPlaceholder="Search..."
                value={city}
                onChange={item => {
                  // setGender(item.value);
                  // setReportingAddress(item.value)
                  console.log("vikkkk", item);
                  setCity(item.value)
                  // setisSaveAddress(true)
                  // setAddress(item.address);
                  // setPincode(item.zip);
                  // setLocality(item.locality);
                  // setLandmark(item.landmark);
                }}
              />
              <View style={styles.spacerStyle} />

              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={localityList}
                search
                maxHeight={150}
                labelField="label"
                valueField="value"
                placeholder="Locality*"
                searchPlaceholder="Search..."
                value={locality}
                onChange={item => {
                  // setGender(item.value);
                  // setReportingAddress(item.value)
                  console.log("vikkkk", item);
                  setLocality(item.value);
                  // setisSaveAddress(true)
                  // setAddress(item.address);
                  // setPincode(item.zip);
                  // setLocality(item.locality);
                  // setLandmark(item.landmark);
                }}
              />
              <View style={styles.spacerStyle} />

              <TextInput
                mode="outlined"
                label="Pin Code"
                value={pincode}
                placeholder="Enter Pincode"
                theme={{ colors: { primary: '#99e8e4', underlineColor: 'yellow', accent: '#99e8e4' } }}
                maxLength={10}
                keyboardType='numeric'
                onChangeText={handlePincodeChange}
              />
              <View style={styles.spacerStyle} />
              <TextInput
                mode="outlined"
                label="Landmark"

                value={landmark}
                placeholder="Enter Landmark"
                theme={{ colors: { primary: '#99e8e4', underlineColor: 'yellow', accent: '#99e8e4' } }}
                maxLength={50}
                keyboardType='default'
                onChangeText={handleLandmarkChange}

              />
              <View style={styles.spacerStyle} />
              <TouchableOpacity style={{ flexDirection: 'row', margin: 10, justifyContent: 'flex-start', alignContent: 'center', }}
                onPress={() => saveAddressData()}
              >
                <Ionicons name={isSaveAddress ? 'checkbox' : 'square-outline'} size={20} color={'red'} />
                <Text style={{ marginLeft: 10, color: 'black' }}>Save Address</Text>
              </TouchableOpacity>
              <View style={styles.spacerStyle} />
              <View style={styles.spacerStyle} />
              <DropDown
                label={"Cab Type"}
                mode={"outlined"}
                visible={showDutyTypeDropDown}
                showDropDown={() => setshowDutyTypeDropDown(true)}
                onDismiss={() => setshowDutyTypeDropDown(false)}
                dropDownItemTextStyle={{ color: 'black' }}
                value={dutytype}
                setValue={setdutyType}
                list={dutyTypeList}
                dropDownStyle={{ marginTop: 0.1 }}
                activeColor={'green'}
                theme={{ colors: { primary: '#99e8e4', underlineColor: 'yellow', accent: '#99e8e4' } }}
              />
              <View style={styles.spacerStyle} />
              {
                dutytype === 'Local' ?
                  <View style={{ flexDirection: 'column' }}>
                    <Text style={{ marginLeft: 10, marginBottom: 10, fontWeight: 'bold' }}>Duty Hours</Text>
                    <View style={{ flexDirection: 'row' }}>
                      {dutyhoursList.length > 0 && dutyhoursList.map((item, index) => {
                        return (
                          <TouchableOpacity style={styles.radioButton} onPress={() => setCustomHours(item)} key={index}>
                            <Ionicons name={item.status == true ? 'radio-button-on' : 'radio-button-off-sharp'} size={20} color={'red'} />
                            <Text style={{ marginLeft: 10, color: 'black' }}>{item.name} Hrs</Text>
                          </TouchableOpacity>)
                      })}
                    </View>


                    <View style={styles.spacerStyle} />
                    <View style={styles.DateTimeContent}>

                      <TextInput
                        pointerEvents="none"
                        mode="outlined"
                        // style={{height:47}}
                        label="Reporting Date"
                        value={moment(reportingdate).format('DD-MM-YYYY')}
                        placeholder="Reporting Date"
                        theme={{ colors: { primary: '#99e8e4', underlineColor: 'yellow', accent: '#99e8e4' } }}
                        maxLength={10}
                        keyboardType='default'
                        onTouchStart={() => openLocalDatePkr()}
                        right={<TextInput.Icon name="calendar" />}
                      />
                      <View style={styles.SectionStyleBottom}>
                        <DropDown
                          label={"Select Time"}
                          mode={"outlined"}
                          visible={showTimeDropDown}
                          showDropDown={() => setshowTimeDropDown(true)}
                          onDismiss={() => setshowTimeDropDown(false)}
                          value={reportingTime}
                          setValue={setreportingTime}
                          list={reportingTimeList}
                          dropDownStyle={{ marginTop: 0.1 }}
                          dropDownItemTextStyle={{ color: 'black' }}
                          activeColor={'green'}
                          theme={{ colors: { primary: '#99e8e4', underlineColor: 'yellow', accent: '#99e8e4' } }}

                        />
                      </View>
                    </View>
                  </View>
                  :
                  dutytype === 'Out Station' ?
                    <View style={{ flexDirection: 'column' }}>
                      <View style={styles.SectionStyle}>
                        <DropDown
                          label={"To City"}
                          mode={"outlined"}
                          visible={showToCityDropDown}
                          showDropDown={() => setshowToCityDropDown(true)}
                          onDismiss={() => setshowToCityDropDown(false)}
                          value={toCity}
                          setValue={setToCity}
                          list={cityList}
                          dropDownStyle={{ marginTop: 0.1 }}
                          dropDownItemTextStyle={{ color: 'black' }}
                          activeColor={'green'}
                          theme={{ colors: { primary: '#99e8e4', underlineColor: 'yellow', accent: '#99e8e4' } }}

                        />
                      </View>
                      <View style={styles.spacerStyle} />

                      <View style={styles.DateTimeContent}>
                        <View style={styles.SectionStyleBottom}>
                          <TextInput
                            pointerEvents="none"
                            mode="outlined"
                            label="Reporting Date"
                            // style={{height:47}}
                            value={moment(reportingdate).format('DD-MM-YYYY')}
                            placeholder="Reporting Date"
                            theme={{ colors: { primary: '#99e8e4', underlineColor: 'yellow', accent: '#99e8e4' } }}
                            maxLength={10}
                            keyboardType='default'
                            onTouchStart={() => openLocalDatePkr()}
                            right={<TextInput.Icon name="calendar" />}
                          />
                        </View>
                        <View style={styles.SectionStyleBottom}>
                          <DropDown
                            label={"Select Time"}
                            mode={"outlined"}
                            visible={showTimeDropDown}
                            showDropDown={() => setshowTimeDropDown(true)}
                            onDismiss={() => setshowTimeDropDown(false)}
                            value={reportingTime}
                            setValue={setreportingTime}
                            list={reportingTimeList}
                            dropDownItemTextStyle={{ color: 'black' }}
                            dropDownStyle={{ marginTop: 0.1 }}
                            activeColor={'green'}
                            theme={{ colors: { primary: '#99e8e4', underlineColor: 'yellow', accent: '#99e8e4' } }}
                          />
                        </View>

                      </View>
                      <View style={styles.spacerStyle} />

                      <View style={styles.DateTimeContent}>

                        <View style={styles.SectionStyleBottom}>

                        </View>
                      </View>
                    </View>
                    :
                    dutytype === 'Round trip' ?
                      <View style={{ flexDirection: 'column' }}>

                        <View style={styles.SectionStyle}>
                          <DropDown
                            label={"To City"}
                            mode={"outlined"}
                            visible={showToCityDropDown}
                            showDropDown={() => setshowToCityDropDown(true)}
                            onDismiss={() => setshowToCityDropDown(false)}
                            dropDownItemTextStyle={{ color: 'black' }}
                            value={toCity}
                            setValue={setToCity}
                            list={cityList}
                            dropDownStyle={{ marginTop: 0.1, height: 47 }}
                            activeColor={'green'}
                            theme={{ colors: { primary: '#99e8e4', underlineColor: 'yellow', accent: '#99e8e4' } }}
                          />
                        </View>
                        <View style={styles.spacerStyle} />

                        <View style={styles.DateTimeContent}>
                          <View style={styles.SectionStyleBottom}>
                            <TextInput
                              pointerEvents="none"
                              //  style={{height:47}}
                              mode="outlined"
                              label="Reporting Date"
                              value={moment(reportingdate).format('DD-MM-YYYY')}
                              placeholder="Reporting Date"
                              theme={{ colors: { primary: '#99e8e4', underlineColor: 'yellow', accent: '#99e8e4' } }}
                              maxLength={10}
                              keyboardType='default'
                              onTouchStart={() => openLocalDatePkr()}
                              right={<TextInput.Icon name="calendar" />}
                            />
                          </View>
                          <View style={styles.SectionStyleBottom}>
                            <TextInput
                              pointerEvents="none"
                              //  style={{height:47}}
                              mode="outlined"
                              label="Return Reporting Date"
                              value={moment(reportingdate).format('DD-MM-YYYY')}
                              placeholder="Reporting Date"
                              theme={{ colors: { primary: '#99e8e4', underlineColor: 'yellow', accent: '#99e8e4' } }}
                              maxLength={10}
                              keyboardType='default'
                              onTouchStart={() => openLocalDatePkr()}
                              right={<TextInput.Icon name="calendar" />}
                            />
                          </View>
                        </View>
                        <View style={styles.spacerStyle} />


                      </View>
                      :
                      null
              }
              <View style={styles.spacerStyle} />
              <TextInput
                mode="outlined"
                label={"Remarks"}
                // style={{height:47}}
                value={remarks}
                placeholder="Enter Address"
                theme={{ colors: { primary: '#99e8e4', underlineColor: 'yellow', accent: '#99e8e4' } }}
                maxLength={50}
                keyboardType='default'
                onChangeText={handleRemarks}
              />
              <View style={styles.spacerStyle} />
              <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={handleSubmitPress}
              //onPress={() => navigation.navigate('HomeScreen')}
              >
                <Text style={styles.buttonTextStyle}>Select Car</Text>
              </TouchableOpacity>
              {/* <TouchableOpacity onPress={()=>toggleModal()}>
                  <View>
                    <Text>Vikas</Text>
                  </View>
                </TouchableOpacity> */}
              <DatePicker
                modal
                minimumDate={new Date(new Date().getTime() + 24 * 60 * 60 * 1000)}
                mode={isReportingdate || isreturndate ? "date" : "time"}
                open={open}
                date={reportingdate}
                onConfirm={(date) => {
                  setDateOpen(false)
                  setDate(date)
                }}
                onCancel={() => {
                  setDateOpen(false)
                }}
              />
              <View style={styles.spacerStyle} />
            </KeyboardAvoidingView>
            <Modal isVisible={isModalVisible}>

              <View style={{ height: '100%', width: '100%', borderRadius: 20, backgroundColor: 'white' }}>
                <View style={{ alignSelf: 'center', marginTop: '5%' }}>
                  <Text style={{ fontSize: 20, fontWeight: '800' }}>Choose Car</Text>
                </View>
                {/* <View style={{flexDirection:'row'}}>
                    <View>
                      <Text>Car Name</Text>
                    </View>
                    <View>
                    <Text>Car Name</Text>
                      </View>
                      <View>
                      <Text>Car Name</Text>
                      </View>
                      <View>
                      <Text>Car Name</Text>
                      </View>
                  </View> */}
                {carArrayafterBooking.length > 0 && carArrayafterBooking.map((item, index) => (
                  item.car_id > 0 ?
                    <View key={index}>
                      <View style={{ width: '90%', margin: 10, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                        <View>
                          {index == 0 ?
                            <Image source={require('../../../../Image/mini.png')} style={{ height: 100, width: 100 }} resizeMode="center"></Image> : null}
                          {index == 1 ?
                            <Image source={require('../../../../Image/sedan.png')} style={{ height: 100, width: 100 }} resizeMode="center"></Image> : null}
                          {index == 2 ?
                            <Image source={require('../../../../Image/premium.png')} style={{ height: 100, width: 100 }} resizeMode="center"></Image> : null}

                        </View>
                        <TouchableOpacity onPress={() => carSelected(item.car_id)}>
                          <View style={selectedCar == item.car_id ? { backgroundColor: 'red', borderWidth: 1, padding: 10, borderRadius: 10, alignItems: 'center' } : { borderColor: 'red', borderWidth: 1, padding: 10, borderRadius: 10, alignItems: 'center' }}>
                            <Text style={selectedCar == item.car_id ? { fontSize: 10, color: 'white' } : { fontSize: 10 }}>SELECT</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                      <View style={{ marginLeft: '10%' }}>
                        <Text>Car Type: {item.car_type}</Text>
                        <Text>Duration: {item.for_hour} for {item.travel_distance}Km.</Text>
                      </View>
                      <View style={{ marginLeft: '10%' }}>
                        {/* <Text>{item.gst_price}</Text> */}
                        <Text>Price: Rs.{item.regular_price}  (Rs.{item.gst_price} including GST)</Text>

                      </View>


                    </View> :
                    <View>
                      <Text>Our Service is not available for this location</Text>
                    </View>
                ))}
                <TouchableOpacity style={{ backgroundColor: 'red', padding: 5, borderRadius: 10, alignItems: 'center', padding: 10, width: '85%', alignSelf: 'center', top: '5%' }} onPress={() => FinalCabBooking()}>
                  <View >
                    <Text style={{ color: 'white' }}>Save Booking</Text>
                  </View>
                </TouchableOpacity>


              </View>
            </Modal>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Provider>
  );
};

export default CabScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202a3d',
  },
  containerStyle: {
    flex: 1,
  },
  spacerStyle: {
    marginBottom: 15,
  },
  safeContainerStyle: {
    flex: 1,
    margin: 20,
    // justifyContent: "center",
  },
  radioButton: {
    flexDirection: 'row', margin: 10, justifyContent: 'space-between', alignContent: 'center'
  },
  DateTimeContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    //backgroundColor:'red',

  },
  SectionStyleBottom: {
    width: '47%',
  },
  buttonStyle: {
    backgroundColor: 'rgba(219, 35, 36, 1.0)',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 47,
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: 2,
    marginRight: 2,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 60,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 8,
    // backgroundColor:'white'
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'black'
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'black'
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
