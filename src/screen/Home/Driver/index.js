// Import React and Component
import React, { useState, createRef, useEffect } from 'react';
import {
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Dimensions,
  Alert,
  // TextInput
} from 'react-native';
import {
  TextInput,
  Appbar,
  DarkTheme,
  DefaultTheme,
  Provider,
  Surface,
  ThemeProvider,
  RadioButton,
  Text
} from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import APIKit, { setClientToken } from '../../../shared/APIKit';
import { Dropdown } from 'react-native-element-dropdown';
import DatePicker from 'react-native-date-picker'
import moment from 'moment';

// import Loader from './Components/Loader';
const DriverScreen = ({ navigation }) => {
  const [nightMode, setNightmode] = useState(false);
  const [logedInUserData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const { width, height } = Dimensions.get("screen")
  // const [reportingAddress, setReportingAddress] = useState ('');
  //MARK:- Reporting Address
  const [showReportingAddress, setshowReportingAddress] = useState(false);
  const [reportingAddress, setreportingAddress] = useState('');
  const [reportingAdrList, setReportingAdrList] = useState([]);
  const [showTimeDropDown1, setshowTimeDropDown1] = useState(false);
  const [showTimeDropDown2, setshowTimeDropDown2] = useState(false);
  const [showTimeDropDown3, setshowTimeDropDown3] = useState(false);
  const [isSaveAddress, setisSaveAddress] = useState(false);
  const [returndate, setReturndate] = useState(new Date())
  const [language1, setLanguage1] = useState(false);
  const [language2, setLanguage2] = useState(false);
  const [language3, setLanguage3] = useState(false);
  const [religion1, setreligion1] = useState(false);
  const [religion2, setreligion2] = useState(false);
  const [religion3, setreligion3] = useState(false);
  const [religion4, setreligion4] = useState(false);
  const [drivertype, setDriverTypeChecked] = useState('1');

  //MARK:- City
  const [allCityList, setallCityList] = useState([]);
  const [address, setAddress] = useState('');
  const [showCityDropDown, setshowCityDropDown] = useState(false);
  const [city, setCity] = useState('');
  const [cityList, setCityList] = useState([]);

  const [showlocalityDropDown, setshowlocalityDropDown] = useState(false);
  const [locality, setLocality] = useState('');
  const [localityList, setLocalityList] = useState([]);
  // const [reportingAdrList, setReportingAdrList] = useState ([]); 
  const makelocalityArray = () => {
    setshowlocalityDropDown(true)
    // console.log('City id', city)
    let arrFilterCt = allCityList.filter(obj => {
      return obj.city_id === city
    })
    if (arrFilterCt.length > 0) {
      let selectedCity = arrFilterCt[0]
      // console.log('City', selectedCity)
      var localList = selectedCity.all_locality.map(local => ({ value: local.locality_id, label: local.locality_name }));
      // console.log('localList', localList)
      setLocalityList(localList)
      setshowlocalityDropDown(true)
    }
  }

  //MARK:- CAR
  const [showCarDrpDwn, setShowCarDrpDwn] = useState(false);
  const [car, setCar] = useState('');
  const [chooseCar, setChooseCar] = useState('');
  const [previousCarList, setpreviousCarList] = useState([]);
  const [newaddress, setNewAddres] = useState();

  const [showAllCarDropDown, setshowAllCarDropDown] = useState(false);
  const [allCarList, setallCarList] = useState([]);
  const [isShowPreviousCarList, setIsShowPreviousCarList] = useState(false);

  const [showReportingDropDown, setshowReportingDropDown] = useState(false);
  const [reportingTime, setreportingTime] = useState('');
  const [jobreportingtime, setJobreportingTime] = useState();
  const [reportingTimeList, setreportingTimeList] = useState([]);
  const [pincode, setPincode] = useState('');
  const [landmark, setLandmark] = useState('');
  const [isreturndate, setIsReturndate] = useState(false)
  const [open, setDateOpen] = useState(false)

  const [showMultiSelectDropDown, setShowMultiSelectDropDown] = useState(false);
  const [weeklyOff, setweeklyOff] = useState('');
  const [reportingdate, setReportingdate] = useState(new Date())
  const [isReportingdate, setIsReportingdate] = useState(false)
  const [eatingHabits, setEatingHabit] = useState('');
  const [religion, setReligion] = useState('');
  const [religinHindu,setReliginHindu]=useState('');
  const [religinMuslim,setReliginMuslim]=useState('');
  const [religinChristian,setReliginChristian]=useState('');
  const [otherReligin,setothrReligin]=useState('');
  const [language, setLanguage] = useState('')
  const [lagugeHindi,setLanguageHindi]=useState('');
  const [languageEnglish,setLaguageEnglish]=useState('');
  const [languageMarathi,setLanguageMarathi]=useState('')
  const [carList, setCarList] = useState([]);
  const [interviewTimeFrom, setInterviewTimeFrom] = useState();
  const [interviewTimeTo, setInterviewTimeTo] = useState();
  const [dutyhours, setDutyHours] = useState();
  const [salart, setSalary] = useState('');
  const [overtime, setOverTime] = useState('');
  const [ageFrom, setAgeFrom] = useState('');
  const [ageTo, setAgeto] = useState('');
  const [reportdropdown, setreportdropdown] = useState(false);
  const [saveAddressValue,setsaveAddressValue]=useState('0')
  const [languagedemo,setlanguagedemo]=useState([]);

  // const [drivertype, setDriverTypeChecked] = useState('Uniform');
  const weeklyOffList = [
    {
      label: "Monday",
      value: "Monday",
    },
    {
      label: "Tuesday",
      value: "Tuesday",
    },
    {
      label: "Wednesday",
      value: "Wednesday",
    },
    {
      label: "Thursday",
      value: "Thursday",
    },
    {
      label: "Friday",
      value: "Friday",
    },
    {
      label: "Saturday",
      value: "Saturday",
    },
    {
      label: "Sunday",
      value: "Sunday",
    },
  ];
  const [lanarray,setLanarray] = useState([
    {
      label: "English",
      id: "1",
    },
    {
      label: "Hindi",
      id: "2",
    },
    {
      label: "Marathi",
      id: "3",
    }
  ]);
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
    setLoading(true)
    console.log("vikkk...",languagedemo);
    //     {"reporting_address":"","address":"","city":"","locality":"","pincode":"","landmark":"","customer_id":"","woff":"","religion":"",
    // "language":"","reportingtime":"","cardetails":"","drivertype":"","dutyhour":"","salary":"","overtime":"",
    // "interviewdate":"","interviewtimefrom":"","interviewtimeto":"","agefrom":"","ageto":"","eathabit":""}

    // moment(reportingdate).format('YYYY-MM-DD')
    
    const payload = {
      "reporting_address": reportingAddress, "address": address, "city": city, "locality": locality, "pincode": pincode, "landmark": landmark, "customer_id": logedInUserData.user_id, "woff": weeklyOff, "religion":religinHindu+religinMuslim+religinChristian+otherReligin,
      "language": languageEnglish+lagugeHindi+languageMarathi, "reportingtime": jobreportingtime, "cardetails": car, "drivertype": drivertype, "dutyhour": dutyhours, "salary": salart, "overtime": overtime,
      "interviewdate": moment(reportingdate).format('YYYY-MM-DD'), "interviewtimefrom": interviewTimeFrom, "interviewtimeto": interviewTimeTo, "agefrom": ageFrom, "ageto": ageTo, "eathabit": eatingHabits,"status":saveAddressValue
      // customer_id : logedInUserData.user_id, 
      // reporting_address:reportingAddress,
      // address, 
      // city, 
      // locality, 
      // pincode,
      // landmark, 
      // cardetails:"",
      // drivertype:"", 
      // dutytype:"",
      // dutyhour:dutyhours, 
      // salary:salart,
      // overtime:overtime,
      // interviewdate:reportingTime,
      // interviewtimefrom:interviewTimeFrom,
      // interviewtimeto:interviewTimeTo,
      // agefrom:ageFrom,
      // ageto:ageTo,
      // eathabit:eatingHabits

    };

    // console.log("Save DAta is.", payload);

    const onSuccess = ({ data }) => {
      setLoading(false);
      console.log("AMan data..", data);
      setTimeout(() => {
        Alert.alert('Success!');
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
      // console.log("!!!!----Error", error);
    };
    APIKit.post('/Booking/contractual_book', payload)
      .then(onSuccess)
      .catch(onFailure);
  };

  const getAllData = (userid) => {
    setErrortext('');
    setLoading(true)
    // console.log("!!!!! -----...//// User ID: ", userid);

    const payload = { customerid: userid }
    // console.log('All DATA req', payload);

    const onSuccess = ({ data }) => {
      setLoading(false);
      // console.log('All DATA contractual.......////', data);
      var carList = data.car_master.map(car => ({ value: car.id, label: car.car_name }));
      // console.log('Car List by aman',carList);
      setCarList(carList)

      var allTm = data.all_timeslot.map(tml => ({ value: tml, label: tml }));
      // console.log('Time list', allTm);
      setreportingTimeList(allTm)
      var prevAdrList = data.all_address.map(adrs => ({ value: adrs.id, label: adrs.previous_address, address: adrs.address, city: adrs.city, landmark: adrs.landmark, locality: adrs.locality, zip: adrs.zip }));
      setReportingAdrList(prevAdrList)


      var cityList1 = data.locality_list.map(city => ({ value: city.locality_id, label:city.locality_name}));
      console.log('City or locality both...',cityList1);
      setLocalityList(cityList1)
      // var prevCarList = data.all_car.map(prvCar => ({value: prvCar.id, label: prvCar.previous_address }))

      // if(data.city_list.length>0){
      //   console.log("vikass");
      //   // console.log("city list loyality list...",data.city_list.all_locality)
      // }

      setallCityList(data.city_list)
      var cityList = data.city_list.map(city => ({ value: city.city_id, label: city.city_name }));
      // console.log('City list', cityList);
      setCityList(cityList)

      if(allCityList.length>0){
        console.log("lol..");
        let arrFilterCt = allCityList.filter(obj => {
          return obj.city_id === city
        })
        if (arrFilterCt.length > 0) {
          console.log("arrFilterct");
          let selectedCity = arrFilterCt[0]
          // console.log('City', selectedCity)
          var localList = selectedCity.all_locality.map(local => ({ value: local.locality_id, label: local.locality_name }));
          console.log('Aman Vikas', localList)
          setLocalityList(localList)
          setshowlocalityDropDown(true)
        }
      }
      var prevCarList = data.all_car.map(car => ({ value: car.car_id, label: car.car_name }));
      console.log("real data....", prevCarList);

      var newRd = { value: data.all_car.length + 1, label: 'Select New Car' };
      // var newData={...prevCarList,...newRd}
      prevCarList.push(newRd)
      setpreviousCarList(prevCarList)
      //  if (prevCarList.length > 0) { 
      //   prevCarList(prevCarList)
      //   setIsShowPreviousCarList(false)
      // }
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

  const getToken = async () => {
    try {
      let userData = await AsyncStorage.getItem("userData");
      console.log("!!!!! ----- User data  :-", userData);
      const data = JSON.parse(userData)
      console.log("!!!!! ----- User Obj: ", data.name, data.user_id);
      setUserData(data)
      console.log("Real User Id: ", logedInUserData.user_id);

      //2 For Assigned Task
      getAllData(data.user_id)

    } catch (error) {
      console.log("!!!!! ----- Something went wrong, while getting user token", error);
    }
  }

  useEffect(() => {
    console.log('DriverScreen loaded')
    getToken()
  }, [])

  const openLocalDatePkr = () => {
    setIsReportingdate(true)
    setIsReturndate(false)
    setDateOpen(true)
  };
  const selectMarathi = () => {
    const abc=languagedemo;
    const finindex=abc.indexOf(3)
    if(finindex>-1){
      abc.splice(finindex,1);
    }
    else{
      abc.push('3')
    }
    setlanguagedemo(abc);
    setLanguage('3')
    setLanguageMarathi('3');
    setLanguage1(!language1);
  }
  const selectHindi = () => {
    const abc=languagedemo;
    const finindex=abc.indexOf(2)
    if(finindex>-1){
      abc.splice(finindex,1);
    }
    else{
      abc.push('2')
    }
    setlanguagedemo(abc);
    setLanguage('2')
    setLanguageHindi('2')
    setLanguage2(!language2);
  }
  const selectEnglish = (id) => {
    console.log(id)
    const abc=languagedemo;
    const finindex=abc.indexOf(id)
    console.log("finidx",finindex);
    if(finindex>-1){
      abc.splice(finindex,1);
    }
    else{
      abc.push(id)
    }
    // setlanguagedemo(abc);
    // setLanguage('1')
    // setLaguageEnglish('1');
    // setLanguage3(!language3);
  }
  const onSearch = (text) => {
    console.log(text)
  }
  const selectedItemRecordsSave = (item) => {
    setreportingAddress(item.label)
    setCity(item.city)
    setAddress(item.address);
    setPincode(item.zip);
    setLocality(item.locality);
    setLandmark(item.landmark);
    setreportdropdown(false);
  }
  const setDate = (date) => {

    if (isReportingdate) {
      setReportingdate(date)
    } else if (isreturndate) {
      setReturndate(date)
    }
  }
  const setReligion1=()=>{
    setReligion('1')
    setReliginHindu('1');
    setreligion1(!religion1);
  }
  const setReligion2=()=>{
    setReligion('2');
    setReliginMuslim('2');
    setreligion2(!religion2)
  }
  const setReligion3=()=>{
    setReligion('3')
    setReliginChristian('3');
    setreligion3(!religion3);
  }
  const setReligion4=()=>{
    setReligion('4');
    setothrReligin('4');
    setreligion4(!religion4);
  }
  const saveAddressData=()=>{
    setisSaveAddress(!isSaveAddress)
    setsaveAddressValue('1');
  }
  return (
    <Provider theme={nightMode ? DarkTheme : DefaultTheme}>
      <SafeAreaView style={{ flex: 1, margin: 20 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
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
                searchPlaceholder="Search"
                value={reportingAddress}
                onChange={item => {
                  console.log("vikkkk", item);
                  setreportingAddress(item.value)
                  setCity(item.city)
                  setisSaveAddress(true);
                  setAddress(item.address);
                  setPincode(item.zip);
                  setLocality(item.locality);
                  setLandmark(item.landmark);
                }}
              />

              {/* </View> */}

              <View style={styles.spacerStyle} />
              <TextInput
              // style={{height:47}}
                mode="outlined"
                label="Address"
                value={address}
                onChangeText={(e) => setAddress(e)}
                placeholder="Enter address"
                theme={{ colors: { primary: '#99e8e4',underlineColor:'yellow', accent:'#99e8e4'}}}
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
          // setGender(item.value);
        // setReportingAddress(item.value)
          console.log("vikkkk",item);
          setCity(item.city)
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
          console.log("vikkkk",item);
          setLocality(item.locality);
          // setisSaveAddress(true)
          // setAddress(item.address);
          // setPincode(item.zip);
          // setLocality(item.locality);
          // setLandmark(item.landmark);
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
                theme={{ colors: { primary: '#99e8e4',underlineColor:'yellow', accent:'#99e8e4'}}}
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
                theme={{ colors: { primary: '#99e8e4',underlineColor:'yellow', accent:'#99e8e4'}}}
                maxLength={50}
                keyboardType='default'

              />
               <View style={styles.spacerStyle} />
                  <TouchableOpacity style={{flexDirection:'row',margin:10,  justifyContent: 'flex-start',alignContent: 'center',}}
                   onPress={() =>saveAddressData()}
                  >
              
                      <Ionicons name={isSaveAddress ? 'checkbox': 'square-outline'} size={20} color={'red'} />

                     <Text style={{marginLeft:10,color:'black'}}>Save Address</Text>

                 </TouchableOpacity>

              <View style={styles.spacerStyle} />
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={previousCarList}
                maxHeight={100}
                labelField="label"
                valueField="value"
                placeholder="Select a Car *"
                searchPlaceholder="Search..."
                value={car}
                onChange={item => {
                  setCar(item.label)
                  console.log("vikkkk", item);
                  if (item.label == 'Select New Car') {
                    // Alert.alert("choose kar enable");
                    setIsShowPreviousCarList(true);
                  }
                  else {
                    setIsShowPreviousCarList(false)
                  }
                  // setChooseCarStatus(true);
                  // setCity(item.city)
                  // setAddress(item.address);
                  // setPincode(item.zip);
                  // setLocality(item.locality);
                  // setLandmark(item.landmark);
                }}
              />
              {/* <DropDown
                label={"Select a Car"}
                mode={"outlined"}
                visible={showCarDrpDwn}
                showDropDown={() => setShowCarDrpDwn(true)}
                onDismiss={() => setShowCarDrpDwn(false)}
                value={car}
                setValue={setCar}
                list={previousCarList}
                dropDownStyle={{ marginTop: 0.1 }}
                activeColor={'red'}
                theme={{ colors: { surface: 'green', primary: 'red', underlineColor: 'yellow', accent: 'red' } }}
              /> */}
              <View style={styles.spacerStyle} />
              {isShowPreviousCarList == true ?
                <DropDown
                  label={"Choose a Car"}
                  mode={"outlined"}
                  visible={showAllCarDropDown}
                  showDropDown={() => setshowAllCarDropDown(true)}
                  onDismiss={() => setshowAllCarDropDown(false)}
                  value={car}
                  setValue={setCar}
                  list={carList}
                  dropDownStyle={{ marginTop: 0.1 }}
                  dropDownItemTextStyle={{color:'black'}}
                  activeColor={'red'}
                  theme={{ colors: { primary: '#99e8e4',underlineColor:'yellow', accent:'#99e8e4'}}}
                /> : null}

              <View style={styles.spacerStyle} />

              <Text style={{ marginLeft: 10, fontWeight: 'bold',color:'black' }}>Driver Type</Text>

              <View style={{ flexDirection: 'row' }}>

                <TouchableOpacity style={{ flexDirection: 'row', margin: 10, justifyContent: 'space-between', alignContent: 'center', }}

                  onPress={() => setDriverTypeChecked('1')}

                >
                  <Ionicons name={drivertype === '1' ? 'radio-button-on' : 'radio-button-off-sharp'} size={20} color={'red'} />

                  <Text style={{ marginLeft: 10 ,color:'black'}}>Regualr</Text>

                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: 'row', margin: 10, justifyContent: 'space-between', alignContent: 'center' }}

                  onPress={() => setDriverTypeChecked('2')}

                >

                  <Ionicons name={drivertype === '2' ? 'radio-button-on' : 'radio-button-off-sharp'} size={20} color={'red'} />

                  <Text style={{ marginLeft: 10,color:'black' }}>Chauffer</Text>

                </TouchableOpacity>

              </View>
              {/* <View style={styles.spacerStyle} /> */}
              <View style={{ marginTop: 20 }}>
                <Text style={{ fontSize: 18, fontWeight: '700',color:'black' }}>Job Details</Text>
              </View>
              <View style={styles.spacerStyle} />
              <TextInput
                mode="outlined"
                label="Duty Hours"
                // style={{height:47}}
                value={dutyhours}
                placeholder="Duty Hour"
                onChangeText={(e) => setDutyHours(e)}
                theme={{ colors: { primary: '#99e8e4',underlineColor:'yellow', accent:'#99e8e4'}}}
                keyboardType='number-pad'

              />
              <View style={styles.spacerStyle} />

              <DropDown
                label={"Reporting Time"}
                mode={"outlined"}
                visible={showReportingDropDown}
                showDropDown={() => setshowReportingDropDown(true)}
                onDismiss={() => setshowReportingDropDown(false)}
                value={jobreportingtime}
                setValue={setJobreportingTime}
                list={reportingTimeList}
                dropDownStyle={{ marginTop: 0.1 }}
                dropDownItemTextStyle={{color:'black'}}
                activeColor={'red'}
                theme={{ colors: { primary: '#99e8e4',underlineColor:'yellow', accent:'#99e8e4'}}}
              />
              <View style={styles.spacerStyle} />

              <TextInput
                mode="outlined"
                label="Salary"
                value={salart}
                placeholder="Salary"
                theme={{ colors: { primary: '#99e8e4',underlineColor:'yellow', accent:'#99e8e4'}}}
                maxLength={10}
                keyboardType='number-pad'
                onChangeText={(e) => setSalary(e)}

              />
              <View style={styles.spacerStyle} />

              <TextInput
                mode="outlined"
                label="Overtime"
                value={overtime}
                // style={{height:47}}
                placeholder="Overtime"
                onChangeText={(e) => setOverTime(e)}
                theme={{ colors: { primary: '#99e8e4',underlineColor:'yellow', accent:'#99e8e4'}}}
                maxLength={10}
                keyboardType='number-pad'

              />
              <View style={styles.spacerStyle} />
              <DropDown
                label={"Weekly Off"}
                mode={"outlined"}
                visible={showMultiSelectDropDown}
                showDropDown={() => setShowMultiSelectDropDown(true)}
                onDismiss={() => setShowMultiSelectDropDown(false)}
                value={weeklyOff}
                setValue={setweeklyOff}
                list={weeklyOffList}
                dropDownItemTextStyle={{color:'black'}}


                dropDownStyle={{ marginTop: 0.1 }}

                multiSelect
              />
              <View style={styles.spacerStyle} />
              <View>
                <Text style={{ fontSize: 18, fontWeight: '800',color:'black' }}>Interview Details</Text>
              </View>
              <View style={styles.spacerStyle} />
              <View style={styles.DateTimeContent}>

                <TextInput
                  pointerEvents="none"
                  mode="outlined"
                  label="Interview Date"
                  // style={{height:47}}
                  // value={moment(reportingdate).format('YYYY-MM-DD')}
                  value={moment(reportingdate).format('DD-MM-YYYY')}
                  placeholder="Reporting Date"
                  theme={{ colors: { primary: '#99e8e4',underlineColor:'yellow', accent:'#99e8e4'}}}
                  maxLength={10}
                  keyboardType='default'
                  onTouchStart={() => openLocalDatePkr()}
                  right={<TextInput.Icon name="calendar" />}
                />

              </View>
              <View style={styles.spacerStyle} />
              <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <View style={styles.SectionStyleBottom}>
                  <DropDown
                    label={"Time From"}
                    mode={"outlined"}
                    visible={showTimeDropDown2}
                    showDropDown={() => setshowTimeDropDown2(true)}
                    onDismiss={() => setshowTimeDropDown2(false)}
                    value={interviewTimeFrom}
                    setValue={setInterviewTimeFrom}
                    list={reportingTimeList}
                    dropDownStyle={{ marginTop: 0.1 }}
                    dropDownItemTextStyle={{color:'black'}}
                    activeColor={'green'}
                    theme={{ colors: { primary: '#99e8e4',underlineColor:'yellow', accent:'#99e8e4'}}}

                  />
                </View>
                <View style={styles.SectionStyleBottom}>
                  <DropDown
                    label={"Time To"}
                    mode={"outlined"}
                    visible={showTimeDropDown3}
                    showDropDown={() => setshowTimeDropDown3(true)}
                    onDismiss={() => setshowTimeDropDown3(false)}
                    value={interviewTimeTo}
                    setValue={setInterviewTimeTo}
                    dropDownItemTextStyle={{color:'black'}}
                    list={reportingTimeList}
                    dropDownStyle={{ marginTop: 0.1 }}
                    activeColor={'green'}
                    theme={{ colors: { primary: '#99e8e4',underlineColor:'yellow', accent:'#99e8e4'}}}

                  />
                </View>
              </View>
              <View style={styles.spacerStyle} />
              <View>
                <Text style={{ fontSize: 18, fontWeight: '800',color:'black'}}>Additional Information</Text>
              </View>
              <View style={styles.spacerStyle} />
              <View style={styles.spacerStyle1} >
                <View style={{ width: '45%' }}>

                  <TextInput
                    mode="outlined"
                    label="Age from"
                    // style={{height:47}}
                    value={ageFrom}
                    placeholder="Age from "
                    theme={{ colors: { primary: '#99e8e4',underlineColor:'yellow', accent:'#99e8e4'}}}
                    maxLength={10}
                    onChangeText={(e) => setAgeFrom(e)}
                    keyboardType='number-pad'
                  />
                </View>
                <View style={{ width: '45%' }}>
                  <TextInput
                    mode="outlined"
                    label="Age To"
                    // style={{height:47}}
                    value={ageTo}
                    placeholder="Age To"
                    onChangeText={(e) => setAgeto(e)}
                    theme={{ colors: { primary: '#99e8e4',underlineColor:'yellow', accent:'#99e8e4'}}}
                    maxLength={10}
                    keyboardType='number-pad'
                  />
                </View>
              </View>
              <View style={styles.spacerStyle} />
              <View>
                <Text style={{ fontSize: 15, fontWeight: '500',color:'black' }}>Eating Habits</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={styles.radioButton} onPress={() => setEatingHabit('1')} >
                  <Ionicons name={eatingHabits === '1' ? 'radio-button-on' : 'radio-button-off-sharp'} size={20} color={'red'} />
                  <Text style={{ marginLeft: 10 ,color:'black'}}>Vegeterian</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.radioButton} onPress={() => setEatingHabit('2')} >
                  <Ionicons name={eatingHabits === '2' ? 'radio-button-on' : 'radio-button-off-sharp'} size={20} color={'red'} />
                  <Text style={{ marginLeft: 10,color:'black' }}>Non Vegeterian</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.spacerStyle} />
              <View>
                <Text style={{ fontSize: 15, fontWeight: '500',color:'black' }}>Religion</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={styles.radioButtonreligion} onPress={() => setReligion1()} >
                  <Ionicons name={religion1 ? 'checkbox' : 'square-outline'} size={20} color={'red'} />
                  <Text style={{ marginLeft: 2 ,color:'black'}}>Hindu</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.radioButtonreligion} onPress={() => setReligion2()} >
                  <Ionicons name={religion2 ?'checkbox' : 'square-outline'} size={20} color={'red'} />
                  <Text style={{ marginLeft: 2,color:'black' }}>Muslim</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.radioButtonreligion} onPress={() => setReligion3()} >
                  <Ionicons name={religion3 ?'checkbox' : 'square-outline'} size={20} color={'red'} />
                  <Text style={{ marginLeft: 2,color:'black' }}>Christian</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.radioButtonreligion} onPress={() => setReligion4()} >
                  <Ionicons name={religion4 ?'checkbox' : 'square-outline'} size={20} color={'red'} />
                  <Text style={{ marginLeft: 2 ,color:'black'}}>Zorathastian</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.spacerStyle} />
              <View>
                <Text style={{color:'black'}}>Language Known</Text>
              </View>
              <View style={styles.spacerStyle} /> 
               <View style={{ flexDirection: 'row', }}>
                <TouchableOpacity style={styles.radioButtonlanguage} onPress={() => selectMarathi()} >

                  <Ionicons name={language1 ? 'checkbox' : 'square-outline'} size={20} color={'red'} />
                  <Text style={{ marginLeft: 5,color:'black' }}>Marathi</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.radioButtonlanguage} onPress={() => selectHindi()} >
                  <Ionicons name={language2 ? 'checkbox' : 'square-outline'} size={20} color={'red'} />
                  <Text style={{ marginLeft: 10,color:'black' }}>Hindi</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.radioButtonlanguage} onPress={() => selectEnglish()} >
                  <Ionicons name={language3 ? 'checkbox' : 'square-outline'} size={20} color={'red'} />
                  <Text style={{ marginLeft: 10 ,color:'black'}}>English</Text>
                </TouchableOpacity>

              </View>


            {/* ////// new  langauge flo set */}
{/* {lanarray.length>0 && lanarray.map((index,item)=>(
            <TouchableOpacity style={styles.radioButtonlanguage} onPress={() => selectEnglish(index.value)} >
                  <Ionicons name={languagedemo.includes(lanarray.value) ? 'checkbox' : 'square-outline'} size={20} color={'red'} />
                  <Text style={{ marginLeft: 10 }}>{index.label}</Text>
                </TouchableOpacity>
                
                ))} */}





              <View style={styles.spacerStyle} />
              <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={handleSubmitPress}
              // onPress={() => navigation.navigate('HomeScreen')}
              >
                <Text style={styles.buttonTextStyle}>Save</Text>
              </TouchableOpacity>
              <View style={styles.spacerStyle} />


            </KeyboardAvoidingView>
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
          </View>
        </ScrollView>
      </SafeAreaView>
    </Provider>
  );
};

export default DriverScreen;
const styles = StyleSheet.create({
  spacerStyle: {
    marginBottom: 15,
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
    color:'black'
  },
  selectedTextStyle: {
    fontSize: 16,
    color:'black'
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