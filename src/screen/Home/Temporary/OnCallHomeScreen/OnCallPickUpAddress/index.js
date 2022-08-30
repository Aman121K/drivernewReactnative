import React, { useRef, useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import moment from 'moment';
import { Dropdown } from 'react-native-element-dropdown';
import {
  TextInput,
  Provider,
  DarkTheme,
  DefaultTheme,
} from "react-native-paper";
import RBSheet from "react-native-raw-bottom-sheet";
import AsyncStorage from '@react-native-async-storage/async-storage';
import APIKit, { setClientToken } from '../../../../../shared/APIKit';
import DatePicker from 'react-native-date-picker'
import Loader from '../../../../../component/Loader';
const styles = StyleSheet.create({
  spacerStyle: {
    marginBottom: 15,
    width: '90%',
    alignSelf: 'center'
  },
  spacerStyle1: {
    flexDirection: 'row',
    marginBottom: 15,
    justifyContent: 'space-between'
  },
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
  radioButton: {
    flexDirection: 'row', marginLeft: 10
  },
  radioButtonreligion: {
    flexDirection: 'row',
    marginLeft: 5
  },
  radioButtonlanguage: {
    flexDirection: 'row',
    marginLeft: 10
  },
  DateTimeContent: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // //backgroundColor:'red',
    // marginTop:20,
    // marginLeft:20,
    // marginRight:20
  },
  SectionStyleBottom: {
    width: '47%',
  },
  bottomContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'black',
    marginTop: 20

  },
  PriceView: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: 20
  },
  // buttonStyle: {
  //   backgroundColor: 'rgba(219, 35, 36, 1.0)',
  //   color: '#FFFFFF',
  //   paddingLeft: 5,
  //   paddingRight: 5,
  //   marginLeft: 5,
  //   marginRight: 5,
  //   marginTop: 20,
  //   marginBottom: 25,
  // },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
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

  buttonStyle: {
    backgroundColor: 'rgba(219, 35, 36, 1.0)',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 48,
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
    // width:'200%',
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
    // backgroundColor:'red'
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
const OnCallPickUpAddress = ({ navigation, route }) => {
  const { OnCallPickUpAddress } = route.params;
  console.log("OnCallPickUpAddress new.....", OnCallPickUpAddress)

  const refRBSheet = useRef();
  const refRBSheetNewAddress = useRef();
  const [nightMode, setNightmode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [logedInUserData, setUserData] = useState({});
  const [reportingdate, setReportingdate] = useState(new Date())
  const [isReportingdate, setIsReportingdate] = useState(false)
  const [returndate, setReturndate] = useState(new Date())
  const [isreturndate, setIsReturndate] = useState(false)
  const [saveAddressValue, setsaveAddressValue] = useState('0')
  const [open, setDateOpen] = useState(false)
  const [ischeckDate, setischeckDate] = useState(false);
  const [chooseAddress, setChooseAddress] = useState('');
  const [addressLevel,setAddressLevel]=useState();
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
      console.log("return date", date);
      console.log("starting date...", reportingdate)

      var msDiff = new Date(date).getTime() - new Date(reportingdate).getTime();    //Future date - current date
      var daysTill30June2035 = Math.floor(msDiff / (1000 * 60 * 60 * 24));
      console.log("Total Dayss...", parseInt(daysTill30June2035));
      if (totalDays < 1) {
        let newDate = parseInt(daysTill30June2035) + parseInt(2)
        console.log("new .....vip", newDate);
        setTotalDays(JSON.stringify(newDate))
        setReturndate(date)
        // setischeckDate(true);
        chekDate()
      } else {
        let newDate = parseInt(daysTill30June2035) + parseInt(1)
        console.log("new .....vip", newDate);
        setTotalDays(JSON.stringify(newDate))
        setReturndate(date)
        // setischeckDate(true);
        chekDate()
      }


    }
  }
  const [showReportingDropDown, setshowReportingDropDown] = useState(false);
  const [reportingAddress, setReportingAddress] = useState('');
  const [reportingAdrList, setReportingAdrList] = useState(['']);
  const handleReportingAddressChange = (item) => {
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
  const [toLocality, setTolocality] = useState();
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

  const [showPreviousCarDropDown, setshowPreviousCarDropDown] = useState(false);
  const [previousCar, setpreviousCar] = useState('');
  const [previousCarList, setpreviousCarList] = useState([]);
  const [isShowPreviousCarList, setIsShowPreviousCarList] = useState(false);

  const [isShowCarList, setisShowCarList] = useState(false);

  const [showCarDropDown, setshowCarDropDown] = useState(false);
  const [cardetails, setCar] = useState();
  const [carList, setCarList] = useState([]);

  const [showDriverDropDown, setshowDriverDropDown] = useState(false);
  const [driverDetails, setdriverDetails] = useState('');
  const [driverList, setDriver] = useState([]);

  const [isSaveAddress, setisSaveAddress] = useState(false);
  const [drivertype, setDriverTypeChecked] = useState('2');

  const [showDutyTypeDropDown, setshowDutyTypeDropDown] = useState(false);
  const [dutytype, setdutyType] = useState('');
  const [totalDays, setTotalDays] = useState('1');
  const [saveAddress,setSaveAddress]=useState('1');

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
      label: "Drop",
      value: "Drop",
    },
  ];
  const [dutyhoursList, setDutyhoursList] = useState([]);
  const [showFromCityDropDown, setshowFromCityDropDown] = useState(false);

  const [showToCityDropDown, setshowToCityDropDown] = useState(false);
  const [toCity, setToCity] = useState('');


  const [remarks, setremarks] = useState('');
  const [allAdress1, setAlladress1] = useState([])
  const [customerendering, setcustomerendering] = useState(false);
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
      console.log("previous address iisss...",prevAdrList)
      var prevCarList = data.all_car.map(prvCar => ({ value: prvCar.id, label: prvCar.previous_address, }))

      setallCityList(data.city_list)
      var cityList = data.city_list.map(city => ({ value: city.city_id, label: city.city_name, localityarray: city?.all_locality }));
      console.log('City list', cityList);
      setCityList(cityList)

      var cityList1 = data.locality_list.map(city => ({ value: city.locality_id, label: city.locality_name }));
      console.log('City or locality both...', cityList1);
      setLocalityList(cityList1)

      var prevCarList = data.all_car.map(car => ({ value: car.car_id, label: car.car_name }));
      //  if (prevCarList.length > 0) { 
      prevCarList.push({ value: 0, label: 'Select New Car' });
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
    if (item.id == 2) {
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

  // if(ischeckDate){
  const chekDate = () => {
    // new Date().getDate()
    console.log(" return date is", returndate)
    console.log(new Date(returndate).getDate());
    // var msDiff = new Date(returndate).getTime() - new Date(reportingdate).getTime();    //Future date - current date
    // var daysTill30June2035 = Math.floor(msDiff / (1000 * 60 * 60 * 24));
    // console.log("Days is...",daysTill30June2035);
    // setTotalDays(JSON.stringify(daysTill30June2035))
    // }
  }
  const dropLocalityPage = () => {
    OnCallPickUpAddress['address'] = address;
    OnCallPickUpAddress['city'] = city;
    OnCallPickUpAddress['locality'] = locality;
    OnCallPickUpAddress['pincode'] = pincode;
    OnCallPickUpAddress['landmark'] = landmark;
    OnCallPickUpAddress['status']=saveAddress;
    if (OnCallPickUpAddress?.dutytype === 1) {
      navigation.navigate('OnCallDropLocality', { OnacllDropLocality: OnCallPickUpAddress })
    } else {
      navigation.navigate('OnCallFinalStage', { OnCallFinalStage: OnCallPickUpAddress })
    }
  }
  return (
    <Provider theme={nightMode ? DarkTheme : DefaultTheme}>
      <ScrollView>
        <Loader loading={loading} />
        <View style={{ marginTop: '10%' }}>
          <View style={styles.DateTimeContent}>
          </View>
          <View style={{ width: '90%', alignSelf: 'center' }}>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={reportingAdrList}
              // search
              maxHeight={250}
              labelField="label"
              valueField="value"
              placeholder="Select Existing Address*"
              searchPlaceholder="Search..."
              value={reportingAddress}
              onChange={item => {
                console.log("login")
                // setGender(item.value);
                setReportingAddress(item.value)
                console.log("vikkkk", item);
                setCity(item.city)
                setSaveAddress("0");
                setAddress(item?.address);
                setPincode(item?.zip);
                setLocality(item?.locality);
                setLandmark(item?.landmark);
                setToCity(item?.city);
                setTolocality(item?.locality)
                setAddressLevel(item?.level)
              }}
            />
          </View>
          <TouchableOpacity onPress={() => refRBSheetNewAddress.current.open()}>
            <View style={{ borderWidth: 1, borderColor: 'grren', padding: 15, marginTop: '6%', width: '90%', alignSelf: 'center', borderRadius: 10 }}>
              <Text style={{ color: 'black' }}>Select New Address</Text>
            </View>
            <View style={{ padding: 15, marginTop: '6%', width: '90%', alignSelf: 'center', borderRadius: 10 }}>
              <Text style={{ color: 'black' }}>{address}{' '}{addressLevel}{' '}{locality}{' '}{landmark}{' '}{pincode}</Text>
            </View>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%', alignSelf: 'center', marginTop: '10%' }}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ backgroundColor: 'green', padding: '3%', borderRadius: 5, width: '25%' }}>
              <View>
                <Text style={{ color: 'white' }}>Previous</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => dropLocalityPage()} style={{ backgroundColor: 'green', padding: '3%', borderRadius: 5, width: '25%', alignItems: 'center' }}>
              <View>
                <Text style={{ color: 'white' }}>Next</Text>
              </View>
            </TouchableOpacity>
          </View>
          <RBSheet
            ref={refRBSheetNewAddress}
            height={500}
            openDuration={10}
            customStyles={{
            }}
          >
            <View>
              <ScrollView>
                <View style={{ width: '90%', alignSelf: 'center', marginTop: '5%' }}>
                  <TextInput
                    // style={{height:47}}
                    mode="outlined"
                    label="Address"
                    value={address}
                    onChangeText={(e) => setAddress(e)}
                    placeholder="Enter address"
                    theme={{ colors: { primary: '#99e8e4', underlineColor: 'yellow', accent: '#99e8e4' } }}
                    maxLength={50}
                    keyboardType='default'
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
                      console.log("vikkkk bhai item", item);
                      setCity(item?.value || "")
                      var localList = item?.localityarray.map(local => ({ value: local.locality_id, label: local.locality_name }));
                      setLocalityList(localList)

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
                      console.log("vikkkk", item);
                      setLocality(item?.value || "1");
                    }}
                  />
                  <View style={styles.spacerStyle} />
                  <TextInput
                    // style={{height:47}}
                    mode="outlined"
                    label="Pin Code"
                    value={pincode}
                    onChangeText={(e) => setPincode(e)}
                    placeholder="Enter Pincode"
                    theme={{ colors: { primary: '#99e8e4', underlineColor: 'yellow', accent: '#99e8e4' } }}
                    maxLength={50}
                    keyboardType='number-pad'
                  />
                  <View style={styles.spacerStyle} />
                  <TextInput
                    mode="outlined"
                    label="Landmark"
                    // style={{height:47}}
                    value={landmark}
                    onChangeText={(e) => setLandmark(e)}
                    placeholder="Enter Landmark"
                    theme={{ colors: { primary: '#99e8e4', underlineColor: 'yellow', accent: '#99e8e4' } }}
                    maxLength={50}
                    keyboardType='default'

                  />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%', alignSelf: 'center', marginTop: '10%' }}>
                  <TouchableOpacity onPress={() => refRBSheetNewAddress.current.close()} style={{ backgroundColor: 'green', padding: '3%', borderRadius: 5, width: '25%' }}>
                    <View>
                      <Text style={{ color: 'white' }}>Cancel</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => refRBSheetNewAddress?.current?.close()} style={{ backgroundColor: 'green', padding: '3%', borderRadius: 5, width: '25%', alignItems: 'center' }}>
                    <View>
                      <Text style={{ color: 'white' }}>Save</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </RBSheet>
        </View>
      </ScrollView>
    </Provider>
  )
}
export default OnCallPickUpAddress