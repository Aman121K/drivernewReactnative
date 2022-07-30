import React, { useState, createRef, useEffect } from 'react';
import { SafeAreaView, Alert, StyleSheet, View, ScrollView, TouchableOpacity, KeyboardAvoidingView, Dimensions } from 'react-native';
import {
  TextInput,
  DarkTheme,
  DefaultTheme,
  Provider,
  Text
} from "react-native-paper";
import Loader from '../../../component/Loader';
import DropDown from "react-native-paper-dropdown";
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import APIKit, { setClientToken } from '../../../shared/APIKit';
import { Dropdown } from 'react-native-element-dropdown';
import DatePicker from 'react-native-date-picker'
import moment from 'moment';
const TempDriverScreen = ({ navigation }) => {
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
      console.log("starting date...",reportingdate)

      var msDiff = new Date(date).getTime() - new Date(reportingdate).getTime();    //Future date - current date
      var daysTill30June2035 = Math.floor(msDiff / (1000 * 60 * 60 * 24));
      console.log("Total Dayss...",parseInt(daysTill30June2035));
      if(totalDays<1){
        let newDate = parseInt(daysTill30June2035) + parseInt(2)
        console.log("new .....vip", newDate);
        setTotalDays(JSON.stringify(newDate))
        setReturndate(date)
        // setischeckDate(true);
        chekDate()
      }else{
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

  const handleSubmitPress = () => {
    setErrortext('');
    if(!cardetails){
      alert("please select a vechile")
    }
    if (!address) {
      alert('Please fill address');
      return;
    }
    if (!city) {
      alert('Please select City');
      return;
    }
    if (!toCity) {
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
    if (!landmark) {
      alert('Please fill Landmark');
      return;
    }
    if (!landmark) {
      alert('Please fill Landmark');
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
    if(!cardetails){
      alert('please select a vehicle')
    }
    if (dutytype === 'Local') {
      if (!dutyhour) {
        alert('Please select duty hour');
        return;
      }
      if (!toCity) {
        alert('Please select to city');
        return;
      }
      if (!toLocality) {
        alert('Please select to locality');
        return;
      }
      if (!reportingTime) {
        alert('Please select reporting time');
        return;
      }

    }
    if (dutytype === 'Out Station') {

      if (!toCity) {
        alert('Please select to city');
        return;
      }
      if (!returndate) {
        alert('Please select to locality');
        return;
      }
      if (!reportingdate) {
        alert('Please select reporting date');
        return;
      }
      if (!reportingTime) {
        alert('Please select reporting time');
        return;
      }
      if (!totalDays) {
        alert('Please select total days');
        return;
      }

    }
    if (dutytype === 'Drop') {

      if (!toCity) {
        alert('Please select to city');
        return;
      }
      if (!reportingdate) {
        alert('Please select reporting date');
        return;
      }
      if (!reportingTime) {
        alert('Please select reporting time');
        return;
      }
    }
  
    console.log("user id,,,", logedInUserData.user_id)
    var dutytypeNew = 1;
    if (dutytype == 'Local') {
      dutytypeNew = 1
    } else if (dutytype == 'Out Station') {
      dutytypeNew = 2
      // var msDiff = new Date(returndate).getTime() - new Date(reportingdate).getTime();    //Future date - current date
      // var daysTill30June2035 = Math.floor(msDiff / (1000 * 60 * 60 * 24)+1);
      // console.log("Days is...",daysTill30June2035);
    } else if (dutytype == 'Drop') {
      dutytypeNew = 3
    }
    const payload = {
      customer_id: logedInUserData.user_id,
      reporting_address: reportingAddress,
      address,
      city,
      locality,
      pincode,
      landmark,
      cardetails: cardetails.value || "",
      drivertype,
      dutytype: dutytypeNew,
      dutyhour,
      remark: remarks,
      reportingdate: moment(reportingdate).format('YYYY-MM-DD'),
      reportingtime: reportingTime,
      returndate: dutytype === 'Local' ? "" : moment(returndate).format('YYYY-MM-DD'),
      driverpreference: "",
      tocity: toCity,
      status: saveAddressValue,
      drop_city: toCity,
      drop_locality: toLocality,
      no_of_day: totalDays || '0'
    };
    setLoading(true)
    console.log("Test....", payload);

    const onSuccess = ({ data }) => {
      // Set JSON Web Token on success
      setLoading(false);
      console.log(data);
      setTimeout(() => {
        // Alert.alert('Oops!', error.message);
        Alert.alert('Your Booking is Successfully Booked!');
      }, 100);
      navigation.navigate('BottomTab')
      if (data.status == true) {

      } else {

      }

    };
    const onFailure = error => {
      setLoading(false);

      setTimeout(() => {
        Alert.alert('Success!');
      }, 100);
      navigation.navigate('BottomTab')
      console.log("!!!!----Error", error);

    };

    // Show spinner when call is made
    //this.setState({isLoading: true});

    APIKit.post('/Booking/oncall_book', payload)
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
  return (
    <Provider  theme={nightMode ? DarkTheme : DefaultTheme}>
      <SafeAreaView style={styles.safeContainerStyle}>
        <ScrollView showsVerticalScrollIndicator={false}
        >
          <Loader loading={loading} />
          <View >
            <KeyboardAvoidingView enabled>
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
                placeholder="Reporting Address*"
                searchPlaceholder="Search..."
                value={reportingAddress}
                onChange={item => {
                  console.log("login")
                  // setGender(item.value);
                  setReportingAddress(item.value)
                  console.log("vikkkk", item);
                  setCity(item.city)
                  setisSaveAddress(true)
                  setsaveAddressValue('1');
                  setAddress(item.address);
                  setPincode(item.zip);
                  setLocality(item.locality);
                  setLandmark(item.landmark);
                  setToCity(item.city);
                  setTolocality(item.locality)
                }}
              />
              <View style={styles.spacerStyle} />

              <TextInput
                mode="outlined"
                //  style={{height:47}}
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
                maxHeight={250}
                labelField="label"
                valueField="value"
                placeholder="City*"
                searchPlaceholder="Search..."
                value={city}
                onChange={item => {

                  console.log("vikkkk city is", item);
                  setCity(item.value);
                  setToCity(item.value);

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
                maxHeight={250}
                labelField="label"
                valueField="value"
                placeholder="Locality*"
                searchPlaceholder="Search..."
                value={locality}
                onChange={item => {
                  console.log("vikkkk", item);
                  setLocality(item.value);
                  setTolocality(item.value);

                }}
              />
              <View style={styles.spacerStyle} />

              <TextInput
                mode="outlined"
                // style={{height:47}}
                label="Pin Code"
                value={pincode}
                placeholder="Enter Pincode"
                theme={{ colors: { primary: '#99e8e4', underlineColor: 'yellow', accent: '#99e8e4' } }}
                maxLength={10}
                keyboardType='phone-pad'
                onChangeText={handlePincodeChange}
              />
              <View style={styles.spacerStyle} />
              <TextInput
                mode="outlined"
                label="Landmark"
                // style={{height:47}}

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
                <Text style={{ marginLeft: 10,color:'black' }}>Save Address</Text>
              </TouchableOpacity>
              <View style={styles.spacerStyle} />
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={previousCarList}
                maxHeight={200}
                search
                labelField="label"
                valueField="value"
                placeholder="Select a Car *"
                searchPlaceholder="Search..."
                // value={previousCarList}
                onChange={item => {
                  setCar(item);
                  console.log("vikkkk", item.label);
                  if (item.label == 'Select New Car') {
                    setIsShowPreviousCarList(!isShowPreviousCarList)
                  }
                  else {
                    setIsShowPreviousCarList(false)
                  }
                }}
              />

              <View style={styles.spacerStyle} />
              {
                isShowPreviousCarList === true ?

                  <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={carList}
                    search
                    maxHeight={250}
                    labelField="label"
                    valueField="value"
                    placeholder="Select  Car"
                    searchPlaceholder="Search..."
                    // value={cardetails.label}
                    onChange={item => {
                      setCar(item);
                      console.log("vikk", item);
                    }}
                  /> : null}
              <View style={styles.spacerStyle} />

              <Text style={{ marginLeft: 10, fontWeight: 'bold',color:'black' }}>Driver Type</Text>

              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={{ flexDirection: 'row', margin: 10, justifyContent: 'space-between', alignContent: 'center' }}

                  onPress={() => setDriverTypeChecked('2')}

                >

                  <Ionicons name={drivertype === '2' ? 'radio-button-on' : 'radio-button-off-sharp'} size={20} color={'red'} />
                  <Text style={{ marginLeft: 10,color:'black' }}>Regular</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: 'row', margin: 10, justifyContent: 'space-between', alignContent: 'center', }}

                  onPress={() => setDriverTypeChecked('1')}
                >
                  <Ionicons name={drivertype === '1' ? 'radio-button-on' : 'radio-button-off-sharp'} size={20} color={'red'} />

                  <Text style={{ marginLeft: 10,color:'black' }}>Chauffer</Text>

                </TouchableOpacity>

              </View>
              <View style={styles.spacerStyle} />
              <DropDown
                label={"Duty Type"}
                mode={"outlined"}
                visible={showDutyTypeDropDown}
                showDropDown={() => setshowDutyTypeDropDown(true)}
                onDismiss={() => setshowDutyTypeDropDown(false)}
                value={dutytype}
                setValue={setdutyType}
                list={dutyTypeList}
              dropDownItemTextStyle={{color:'black'}}
                // onChange
                dropDownStyle={{ marginTop: 0.1, }}
                activeColor={'black'}
                
                theme={{ colors: { primary: 'black', underlineColor: 'yellow', accent: 'black' } }}
              />
              <View style={styles.spacerStyle} />
              {
                dutytype === 'Local' ?
                  <View style={{ flexDirection: 'column' }}>
                    <Text style={{ marginLeft: 10, marginBottom: 10, fontWeight: 'bold' ,color:'black'}}>Duty Hours</Text>

                    <View style={{ flexDirection: 'row' }}>
                      {dutyhoursList.length > 0 && dutyhoursList.map((item, index) => {
                        return (
                          <TouchableOpacity style={styles.radioButton} onPress={() => setCustomHours(item)} key={index}>
                            <Ionicons name={item.status == true ? 'radio-button-on' : 'radio-button-off-sharp'} size={20} color={'red'} />
                            <Text style={{ marginLeft: 10,color:'black' }}>{item.name} Hrs</Text>
                          </TouchableOpacity>)
                      })}
                    </View>
                    <Dropdown
                      style={styles.dropdown}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      iconStyle={styles.iconStyle}
                      data={cityList}
                      search
                      maxHeight={250}
                      labelField="label"
                      valueField="value"
                      placeholder="City*"
                      searchPlaceholder="Search..."
                      value={toCity}
                      onChange={item => {
                      
                        console.log("vikkkk city is", item);
                        setToCity(item.value)
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
                      maxHeight={250}
                      labelField="label"
                      valueField="value"
                      placeholder="Locality*"
                      searchPlaceholder="Search..."
                      value={toLocality}
                      onChange={item => {
                        // setGender(item.value);
                        // setReportingAddress(item.value)
                        console.log("vikkkk", item);
                        setTolocality(item.value);
                        // setisSaveAddress(true)
                        // setAddress(item.address);
                        // setPincode(item.zip);
                        // setLocality(item.locality);
                        // setLandmark(item.landmark);
                      }}
                    />


                    <View style={styles.spacerStyle} />
                    {/* //DATE AND TIME \\*/}
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
                        <TextInput
                          pointerEvents="none"
                          mode="outlined"
                          // style={{height:47}}
                          label="To Date"
                          value={moment(returndate).format('DD-MM-YYYY')}
                          placeholder="Reporting Date"
                          theme={{ colors: { primary: '#99e8e4', underlineColor: 'yellow', accent: '#99e8e4' } }}
                          maxLength={10}
                          keyboardType='default'
                          onTouchStart={() => openRtnDatePkr()}
                          right={<TextInput.Icon name="calendar" />}
                        />
                      </View>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
                    <View style={styles.SectionStyleBottom}>
                      <DropDown
                        label={"Select Time *"}
                        mode={"outlined"}
                        visible={showTimeDropDown}
                        showDropDown={() => setshowTimeDropDown(true)}
                        onDismiss={() => setshowTimeDropDown(false)}
                        value={reportingTime}
                        setValue={setreportingTime}
                        list={reportingTimeList}
                        dropDownStyle={{ marginTop: 0.1 }}
                        dropDownItemTextStyle={{color:'black'}}
                        activeColor={'green'}
                        theme={{ colors: { primary: '#99e8e4', underlineColor: 'yellow', accent: '#99e8e4' } }}

                      />
                      
                    </View>
                    <View style={{width:'45%'}}>
                    <TextInput
                            mode="outlined"
                            // style={{height:47}}
                            label="Total Days"
                            value={totalDays}
                            placeholder="Total Days"
                            theme={{ colors: { primary: '#99e8e4', underlineColor: 'yellow', accent: '#99e8e4' } }}
                            maxLength={3}
                            keyboardType='phone-pad'
                            editable={false}
                            onChangeText={(e) => setTotalDays(e)}
                          />
                    </View>
                    </View>
                    

                  </View>
                  :
                  dutytype === 'Out Station' ?
                    <View style={{ flexDirection: 'column' }}>
                      <View style={styles.SectionStyle}>

                        <Dropdown
                          style={styles.dropdown}
                          placeholderStyle={styles.placeholderStyle}
                          selectedTextStyle={styles.selectedTextStyle}
                          inputSearchStyle={styles.inputSearchStyle}
                          iconStyle={styles.iconStyle}
                          data={cityList}
                          search
                          maxHeight={250}
                          labelField="label"
                          valueField="value"
                          placeholder="City*"
                          searchPlaceholder="Search..."
                          value={toCity}
                          onChange={item => {
                            // setGender(item.value);
                            // setReportingAddress(item.value)
                            console.log("vikkkk city is", item);
                            setToCity(item.value)
                            // setisSaveAddress(true)
                            // setAddress(item.address);
                            // setPincode(item.zip);
                            // setLocality(item.locality);
                            // setLandmark(item.landmark);
                          }}
                        />
                      </View>
                      <View style={styles.spacerStyle} />

                      <View style={styles.DateTimeContent}>
                        <View style={styles.SectionStyleBottom}>
                          <TextInput
                            pointerEvents="none"
                            mode="outlined"
                            label="From Date *"
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
                          <TextInput
                            pointerEvents="none"
                            mode="outlined"
                            // style={{height:47}}
                            label="To Date *"
                            value={moment(returndate).format('DD-MM-YYYY')}
                            placeholder="Reporting Date"
                            theme={{ colors: { primary: '#99e8e4', underlineColor: 'yellow', accent: '#99e8e4' } }}
                            maxLength={10}
                            keyboardType='default'
                            onTouchStart={() => openRtnDatePkr()}
                            right={<TextInput.Icon name="calendar" />}
                          />
                        </View>
                      </View>
                      <View style={styles.spacerStyle} />

                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ width: "50%" }}>
                          <DropDown
                            label={"Select Time *"}
                            mode={"outlined"}
                            visible={showTimeDropDown}
                            showDropDown={() => setshowTimeDropDown(true)}
                            onDismiss={() => setshowTimeDropDown(false)}
                            value={reportingTime}
                            setValue={setreportingTime}
                            list={reportingTimeList}
                            dropDownStyle={{ marginTop: 0.1 }}
                            activeColor={'green'}
                            theme={{ colors: { primary: '#99e8e4', underlineColor: 'yellow', accent: '#99e8e4' } }}
                          />
                        </View>
                        <View style={{ width: "50%" }}>
                          <TextInput
                            mode="outlined"
                            // style={{height:47}}
                            label="Total Days"
                            value={totalDays}
                            placeholder="Total Days"
                            theme={{ colors: { primary: '#99e8e4', underlineColor: 'yellow', accent: '#99e8e4' } }}
                            maxLength={3}
                            keyboardType='phone-pad'
                            editable={false}
                            onChangeText={(e) => setTotalDays(e)}
                          />
                        </View>
                        <View style={styles.SectionStyleBottom}>

                        </View>
                      </View>
                    </View>
                    :
                    dutytype === 'Drop' ?
                      <View style={{ flexDirection: 'column' }}>

                        <View style={styles.SectionStyle}>

                          <Dropdown
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={cityList}
                            search
                            maxHeight={250}
                            labelField="label"
                            valueField="value"
                            placeholder="City*"
                            searchPlaceholder="Search..."
                            value={toCity}
                            onChange={item => {
                              // setGender(item.value);
                              // setReportingAddress(item.value)
                              console.log("vikkkk city is", item);
                              setToCity(item.value)
                              // setisSaveAddress(true)
                              // setAddress(item.address);
                              // setPincode(item.zip);
                              // setLocality(item.locality);
                              // setLandmark(item.landmark);
                            }}
                          />
                        </View>
                        <View style={styles.spacerStyle} />

                        <View style={styles.DateTimeContent}>
                          <View style={styles.SectionStyleBottom}>
                            <TextInput
                              pointerEvents="none"
                              //  style={{height:47}}
                              mode="outlined"
                              label="From Date *"
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
                              label={"Select Time *"}
                              mode={"outlined"}
                              visible={showTimeDropDown}
                              showDropDown={() => setshowTimeDropDown(true)}
                              onDismiss={() => setshowTimeDropDown(false)}
                              value={reportingTime}
                              setValue={setreportingTime}
                              list={reportingTimeList}
                              dropDownStyle={{ marginTop: 0.1 }}
                              dropDownItemTextStyle={{color:'black'}}
                              activeColor={'green'}
                              theme={{ colors: { primary: '#99e8e4', underlineColor: 'yellow', accent: '#99e8e4' } }}

                            />


                          </View>
                        </View>
                        <View style={styles.spacerStyle} />


                      </View>
                      :
                      null
              }
              <View style={styles.spacerStyle} />

              <DropDown
                label={"Select Driver"}
                mode={"outlined"}
                visible={showDriverDropDown}
                showDropDown={() => setshowDriverDropDown(true)}
                onDismiss={() => setshowDriverDropDown(false)}
                value={driverDetails}
                setValue={setpreviousCar}
                list={driverList}
                dropDownStyle={{ marginTop: 0.1, height: 10 }}
                dropDownItemTextStyle={{color:'black'}}
                activeColor={'red'}
                theme={{ colors: { primary: '#99e8e4', underlineColor: 'yellow', accent: '#99e8e4' } }}
              />
              <View style={styles.spacerStyle} />
              <TextInput
                mode="outlined"
                label={"Remarks"}
            
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
                <Text style={styles.buttonTextStyle}>Book Now</Text>
              </TouchableOpacity>
              <DatePicker
                modal
                minDate={new Date()}
                minimumDate={new Date(new Date().getTime() + 24 * 60 * 60 * 1000)}
                mode={isReportingdate || isreturndate ? "date" : "time"}
                open={open}
                date={reportingdate}
                onConfirm={(date) => {
                  setDateOpen(false)
                  console.log("Return date choose may...",date)
                  setDate(date)


                }}
                onCancel={() => {
                  setDateOpen(false)
                }}
              />
              <View style={styles.spacerStyle} />

            </KeyboardAvoidingView>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Provider>
  );
};

export default TempDriverScreen;
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
    justifyContent: 'space-evenly',
    //backgroundColor:'red',

  },
  SectionStyleBottom: {
    width: '50%',
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
    // color:''
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
    color:'black'
  },
  selectedTextStyle: {
    fontSize: 16,
    color:'black'
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
