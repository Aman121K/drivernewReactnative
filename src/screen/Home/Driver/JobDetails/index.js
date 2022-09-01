import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import {
  TextInput,
  Appbar,
  DarkTheme,
  DefaultTheme,
  Provider,
  Surface,
  ThemeProvider,
  RadioButton,
} from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Dropdown } from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import APIKit, { setClientToken } from '../../../../shared/APIKit';
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
const JobDetails = ({ navigation }) => {
  const [nightMode, setNightmode] = useState(false);
  const [logedInUserData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [reportingAdrList, setReportingAdrList] = useState([]);
  const [drivertype, setDriverTypeChecked] = useState('1');
  const [allCityList, setallCityList] = useState([]);
  const [address, setAddress] = useState('');
  const [showCityDropDown, setshowCityDropDown] = useState(false);
  const [city, setCity] = useState('');
  const [cityList, setCityList] = useState([]);
  const [showlocalityDropDown, setshowlocalityDropDown] = useState(false);
  const [locality, setLocality] = useState('');
  const [localityList, setLocalityList] = useState([]);
  const makelocalityArray = () => {
    setshowlocalityDropDown(true)
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
  const [religinHindu, setReliginHindu] = useState('');
  const [religinMuslim, setReliginMuslim] = useState('');
  const [religinChristian, setReliginChristian] = useState('');
  const [otherReligin, setothrReligin] = useState('');
  const [language, setLanguage] = useState('')
  const [lagugeHindi, setLanguageHindi] = useState('');
  const [languageEnglish, setLaguageEnglish] = useState('');
  const [languageMarathi, setLanguageMarathi] = useState('')
  const [carList, setCarList] = useState([]);
  const [interviewTimeFrom, setInterviewTimeFrom] = useState();
  const [interviewTimeTo, setInterviewTimeTo] = useState();
  const [dutyhours, setDutyHours] = useState();
  const [salart, setSalary] = useState('');
  const [overtime, setOverTime] = useState('');
  const [ageFrom, setAgeFrom] = useState('');
  const [ageTo, setAgeto] = useState('');
  const [reportdropdown, setreportdropdown] = useState(false);
  const [saveAddressValue, setsaveAddressValue] = useState('0')
  const [languagedemo, setlanguagedemo] = useState([]);

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
  const [lanarray, setLanarray] = useState([
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
  const getAllData = (userid) => {
    setErrortext('');
    setLoading(true)
    // console.log("!!!!! -----...//// User ID: ", userid);

    const payload = { customerid: userid }
    // console.log('All DATA req', payload);

    const onSuccess = ({ data }) => {
      setLoading(false);
      // console.log('All DATA contractual.......////', data);
      var carList = data.car_master.map(car => ({ value: car.id, label: car.car_name + ' ' + '(' + car?.car_type + ')' }));
      // console.log('Car List by aman',carList);
      setCarList(carList)

      var allTm = data.all_timeslot.map(tml => ({ value: tml, label: tml }));
      console.log('Time list', allTm);
      setreportingTimeList(allTm)
      var prevAdrList = data.all_address.map(adrs => ({ value: adrs.id, label: adrs.previous_address, address: adrs.address, city: adrs.city, landmark: adrs.landmark, locality: adrs.locality, zip: adrs.zip }));
      setReportingAdrList(prevAdrList)


      var cityList1 = data.locality_list.map(city => ({ value: city.locality_id, label: city.locality_name }));
      console.log('City or locality both...', cityList1);
      setLocalityList(cityList1)
      setallCityList(data.city_list)
      var cityList = data.city_list.map(city => ({ value: city.city_id, label: city.city_name }));
      // console.log('City list', cityList);
      setCityList(cityList)

      if (allCityList.length > 0) {
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
      var prevCarList = data.all_car.map(car => ({ value: car.id, label: car.car_name + ' ' + '(' + car?.car_type + ')' }));
      console.log("real data....", prevCarList);

      var newRd = { value: data.all_car.length + 1, label: 'Select New Car' };
      // var newData={...prevCarList,...newRd}
      prevCarList.push(newRd)
      setpreviousCarList(prevCarList)

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


  const gotoInerViewPage = () => {
    const body = {
      dutyhour:dutyhours,
      reportingtime:jobreportingtime,
      salary:salart,
      overtime,
      weeklyOff,
      cardetails:car,
      drivertype,
      woff:weeklyOff,
    }
    navigation.navigate('InterviewDetails', { jobDetails: body })
  }
  return (
    <Provider theme={nightMode?DarkTheme:DefaultTheme}>
      <ScrollView>
        <View style={{ width: '90%', alignSelf: 'center' }}>
          <View style={styles.spacerStyle} />
          <TextInput
            mode="outlined"
            label="Duty Hours"
            // style={{height:47}}
            value={dutyhours}
            placeholder="Duty Hour"
            onChangeText={(e) => setDutyHours(e)}
            theme={{ colors: { primary: '#99e8e4', underlineColor: 'yellow', accent: '#99e8e4' } }}
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
            dropDownItemTextStyle={{ color: 'black' }}
            activeColor={'red'}
            theme={{ colors: { primary: '#99e8e4', underlineColor: 'yellow', accent: '#99e8e4' } }}
          />
          <View style={styles.spacerStyle} />

          <TextInput
            mode="outlined"
            label="Salary"
            value={salart}
            placeholder="Salary"
            theme={{ colors: { primary: '#99e8e4', underlineColor: 'yellow', accent: '#99e8e4' } }}
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
            theme={{ colors: { primary: '#99e8e4', underlineColor: 'yellow', accent: '#99e8e4' } }}
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
            dropDownItemTextStyle={{ color: 'black' }}


            dropDownStyle={{ marginTop: 0.1 }}

            multiSelect
          />
          <View style={{ marginTop: '5%' }}>
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
                setCar(item.value)
                console.log("vikkkk", item);
                if (item.label == 'Select New Car') {
                  setIsShowPreviousCarList(true);
                }
                else {
                  setIsShowPreviousCarList(false)
                }
              }}
            />
          </View>
        
          {isShowPreviousCarList == true ?
          <View style={{marginTop:10}}>
                 <Dropdown
                                    style={styles.dropdown}
                                    placeholderStyle={{ color: 'black' }}
                                    selectedTextStyle={{ color: 'black' }}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    iconStyle={styles.iconStyle}
                                    data={carList}
                                    search
                                    maxHeight={350}
                                    labelField="label"
                                    valueField="value"
                                    placeholder="Select New  Car"
                                    searchPlaceholder="Search..."
                                    // value={cardetails.label}
                                    onChange={item => {
                                        setCar(item);
                                        console.log("vikk", item);
                                    }}
                                />
                            </View>
                 : null}
          <View style={{ flexDirection: 'row' }}>

            <TouchableOpacity style={{ flexDirection: 'row', margin: 10, justifyContent: 'space-between', alignContent: 'center', }}

              onPress={() => setDriverTypeChecked('1')}

            >
              <Ionicons name={drivertype === '1' ? 'radio-button-on' : 'radio-button-off-sharp'} size={20} color={'red'} />

              <Text style={{ marginLeft: 10, color: 'black' }}>Regualr</Text>

            </TouchableOpacity>
            <TouchableOpacity style={{ flexDirection: 'row', margin: 10, justifyContent: 'space-between', alignContent: 'center' }}

              onPress={() => setDriverTypeChecked('2')}

            >

              <Ionicons name={drivertype === '2' ? 'radio-button-on' : 'radio-button-off-sharp'} size={20} color={'red'} />

              <Text style={{ marginLeft: 10, color: 'black' }}>Chauffer</Text>

            </TouchableOpacity>

          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%', alignSelf: 'center', marginTop: '10%' }}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ backgroundColor: 'green', padding: '3%', borderRadius: 5, width: '25%' }}>
              <View>
                <Text style={{ color: 'white' }}>Previous</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => gotoInerViewPage()} style={{ backgroundColor: 'green', padding: '3%', borderRadius: 5, width: '25%', alignItems: 'center' }}>
              <View>
                <Text style={{ color: 'white' }}>Next</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Provider>
  )
}
export default JobDetails;