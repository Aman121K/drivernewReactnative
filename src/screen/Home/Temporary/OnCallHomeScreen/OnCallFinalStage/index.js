import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import moment, { defaultFormat } from 'moment';
import {
  DarkTheme,
  DefaultTheme,
  Provider
} from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import APIKit, { setClientToken } from '../../../../../shared/APIKit';
import { Dropdown } from 'react-native-element-dropdown';
import DatePicker from 'react-native-date-picker'
import Loader from '../../../../../component/Loader';
const styles = StyleSheet.create({
  DateTimeContent: {

  },
})
const OnCallFinalStage = ({ navigation, route }) => {
  const { OnCallFinalStage } = route.params;
  // console.log("Final Stage params is...", OnCallFinalStage);
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

  const [showReportingDropDown, setshowReportingDropDown] = useState(false);
  const [reportingAddress, setReportingAddress] = useState('');
  const [reportingAdrList, setReportingAdrList] = useState([]);
  const [address, setAddress] = useState('');
  const [allCityList, setallCityList] = useState([]);
  const [city, setCity] = useState('');
  const [cityList, setCityList] = useState([]);
  const [showlocalityDropDown, setshowlocalityDropDown] = useState(false);
  const [localityList, setLocalityList] = useState([]);
  const [pincode, setPincode] = useState('');
  const [landmark, setLandmark] = useState('');
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
  const [dutyhour, setDutyHour] = useState('');
  const [price, setPrice] = useState('');
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
  const [userId,setuserId]=useState();
  const handleRemarks = rmk => {
    setremarks(rmk);
  };

  const getToken = async () => {
    try {
      let userData = await AsyncStorage.getItem("userData");
      console.log("!!!!! ----- User data  :-", userData);
      const data = JSON.parse(userData)
      setUserData(data)
      console.log("!!!!! ----- User ID use id details: ", logedInUserData.user_id);
      getAllData(data.user_id)
      setuserId(data.user_id);


    } catch (error) {
      // console.log("!!!!! ----- Something went wrong, while getting user token", error);
    }
  }

  const getAllData = (userid) => {
    setErrortext('');
    setLoading(true)
    // console.log("!!!!! ----- User Aman ID: ", userid);
    const payload = { customerid: userid }
    // console.log('All DATA req', payload);

    const onSuccess = ({ data }) => {
      // Set JSON Web Token on success
      setLoading(false);
      // console.log('All DATA', data);

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
      // console.log('City list', cityList);
      setCityList(cityList)

      var cityList1 = data.locality_list.map(city => ({ value: city.locality_id, label: city.locality_name }));
      // console.log('City or locality both...', cityList1);
      setLocalityList(cityList1)

      var prevCarList = data.all_car.map(car => ({ value: car.car_id, label: car.car_name }));
      prevCarList.push({ value: 0, label: 'Select New Car' });
      setpreviousCarList(prevCarList)


      var carList = data.car_master.map(car => ({ value: car.id, label: car.car_name }));
      setCarList(carList)
    };

    const onFailure = error => {
      setLoading(false);
      console.log("!!!!----Error", error);
      console.log("!!!!----Error Response", error.response);
      console.log("!!!!----error.response.data", error.response.data);
      console.log("!!!!----error.response.status", error.response.status);
      console.log("!!!!----headers", error.response.headers);
      setTimeout(() => {
        alert('Oops!', 'User id or password incorrect');
      }, 100);
    };

    APIKit.post('/Booking/previousRecord', payload)
      .then(onSuccess)
      .catch(onFailure);
  };
  const getPriceApi = async () => {
    try {
      const response = await fetch(`https://driversuvidha.in/CRM/api/Booking/pricing?duty_type=${OnCallFinalStage?.dutytype}&duty_hours=${OnCallFinalStage?.dutyhour}&city_id=${OnCallFinalStage?.city}`);
      const json = await response.json();
      setPrice(json?.price)
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getToken()
    // getPriceApi()
  }, [])

  const handleSubmitPress = () => {
    setLoading(true)
    console.log("user details is...",userId)
      OnCallFinalStage['customer_id'] = logedInUserData.user_id || "",
      OnCallFinalStage['no_of_day'] = OnCallFinalStage?.no_of_day || "1",
      OnCallFinalStage['tocity'] = OnCallFinalStage?.tocity || "",
      OnCallFinalStage['drop_city'] =OnCallFinalStage?.city || "",
      OnCallFinalStage['drop_locality'] = OnCallFinalStage?.locality || "",
      OnCallFinalStage['driverpreference'] = driverDetails,
      OnCallFinalStage['remark'] = remarks,
      OnCallFinalStage['reporting_address'] = "",
      OnCallFinalStage['price'] = price;
    console.log("Test....", OnCallFinalStage);
    const onSuccess = ({ data }) => {
      setLoading(false);
      console.log(data);
      setTimeout(() => {
        alert('Your Booking is Successfully Booked!');
      }, 100);
      navigation.navigate('BottomTab')
      if (data.status == true) {
      } else {
      }

    };
    const onFailure = error => {
      setLoading(false);

      setTimeout(() => {
        alert('Success!');
      }, 100);
      navigation.navigate('BottomTab')
    };
    APIKit.post('/Booking/oncall_book', OnCallFinalStage)
      .then(onSuccess)
      .catch(onFailure);
  };
  return (
    <Provider theme={nightMode ? DarkTheme : DefaultTheme}>
      <ScrollView>
        <View style={{ marginTop: '10%' }}>
          <View style={styles.DateTimeContent}>
          </View>
          <View style={{ width: '90%', alignSelf: 'center' }}>
            <DropDown
              label={"Select Previous Booked Driver"}
              mode={"outlined"}
              visible={showDriverDropDown}
              showDropDown={() => setshowDriverDropDown(true)}
              onDismiss={() => setshowDriverDropDown(false)}
              value={driverDetails}
              setValue={setdriverDetails}
              list={driverList}
              dropDownStyle={{ marginTop: 0.1, height: 10 }}
              dropDownItemTextStyle={{ color: 'black' }}
              activeColor={'red'}
              theme={{ colors: { primary: '#99e8e4', underlineColor: 'yellow', accent: '#99e8e4' } }}
            />
          </View>
          <View style={{ borderWidth: 1, padding: 5, marginTop: '6%', width: '90%', alignSelf: 'center', borderRadius:5, }}>
            <TextInput placeholder='Remarks' multiline={true} placeholderTextColor="black" style={{ color: 'black' ,width:'90%'}} onChangeText={(e) => setremarks(e)}
            ></TextInput>

          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%', alignSelf: 'center', marginTop: '10%' }}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ backgroundColor: 'green', padding: '3%', borderRadius: 5, width: '35%', alignItems: 'center' }}>
              <View>
                <Text style={{ color: 'white' }}>Previous</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSubmitPress()} style={{ backgroundColor: 'green', padding: '3%', borderRadius: 5, width: '35%', alignItems: 'center' }}>
              <View>
                <Text style={{ color: 'white' }}>Book Now</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Provider>
  )
}
export default OnCallFinalStage