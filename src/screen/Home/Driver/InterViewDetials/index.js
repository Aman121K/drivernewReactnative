import React, { useState, useEffect } from 'react';
import { View, Text,TouchableOpacity, ScrollView } from 'react-native';
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
  import { Dropdown } from 'react-native-element-dropdown';
import DatePicker from 'react-native-date-picker'
  import moment from 'moment';
  import DropDown from "react-native-paper-dropdown";
  import Ionicons from 'react-native-vector-icons/Ionicons';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import APIKit, { setClientToken } from '../../../../shared/APIKit';
const InterViewDetails = ({navigation,route}) => {
    const {jobDetails } = route.params;
    console.log("Vikas job details Values is",jobDetails)
    const [nightMode, setNightmode] = useState(false);
    const [logedInUserData, setUserData] = useState({});
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');
    const [reportingAdrList, setReportingAdrList] = useState([]);
    const [drivertype, setDriverTypeChecked] = useState('1');
    const [allCityList, setallCityList] = useState([]);
    const [showTimeDropDown2, setshowTimeDropDown2] = useState(false);
    const [showTimeDropDown3, setshowTimeDropDown3] = useState(false);
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
        console.log('Time list', allTm);
        setreportingTimeList(allTm)
        var prevAdrList = data.all_address.map(adrs => ({ value: adrs.id, label: adrs.previous_address, address: adrs.address, city: adrs.city, landmark: adrs.landmark, locality: adrs.locality, zip: adrs.zip }));
        setReportingAdrList(prevAdrList)
  
  
        var cityList1 = data.locality_list.map(city => ({ value: city.locality_id, label:city.locality_name}));
        console.log('City or locality both...',cityList1);
        setLocalityList(cityList1)
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

    const openLocalDatePkr = () => {
        setIsReportingdate(true)
        setIsReturndate(false)
        setDateOpen(true)
      };
  
    useEffect(() => {
      console.log('DriverScreen loaded')
      getToken()
    }, [])
  
    const setDate = (date) => {

        if (isReportingdate) {
          setReportingdate(date)
        } else if (isreturndate) {
          setReturndate(date)
        }
      }
      const goToAddentialPage=()=>{
        // "interviewdate": moment(reportingdate).format('YYYY-MM-DD')
        jobDetails['interviewdate']=moment(reportingdate).format('YYYY-MM-DD');
        jobDetails['interviewtimefrom']=interviewTimeFrom;
        jobDetails['interviewtimeto']=interviewTimeTo;
        // const body={
          // interviewtimefrom
        //     reportingdate,
        //     interviewTimeFrom,
        //     interviewTimeTo
        // }
        navigation.navigate('AdditionalInformation',{interViewDetails:jobDetails})
      }
    return (
      <Provider theme={nightMode?DarkTheme:DefaultTheme}>
            <ScrollView>
        <View style={{width:'90%',alignSelf:'center'}}>
            <View style={{marginTop:'5%'}}>
                <TextInput
                    pointerEvents="none"
                    mode="outlined"
                    label="Interview Date"
                    // style={{height:47}}
                    // value={moment(reportingdate).format('YYYY-MM-DD')}
                    value={moment(reportingdate).format('DD-MM-YYYY')}
                    placeholder="Reporting Date"
                    theme={{ colors: { primary: '#99e8e4', underlineColor: 'yellow', accent: '#99e8e4' } }}
                    maxLength={10}
                    keyboardType='default'
                    onTouchStart={() => openLocalDatePkr()}
                    right={<TextInput.Icon name="calendar" />}
                />

            </View>
                <View >
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
                        dropDownItemTextStyle={{ color: 'black' }}
                        activeColor={'green'}
                        theme={{ colors: { primary: '#99e8e4', underlineColor: 'yellow', accent: '#99e8e4' } }}

                    />
                </View>
                <View >
                    <DropDown
                        label={"Time To"}
                        mode={"outlined"}
                        visible={showTimeDropDown3}
                        showDropDown={() => setshowTimeDropDown3(true)}
                        onDismiss={() => setshowTimeDropDown3(false)}
                        value={interviewTimeTo}
                        setValue={setInterviewTimeTo}
                        dropDownItemTextStyle={{ color: 'black' }}
                        list={reportingTimeList}
                        dropDownStyle={{ marginTop: 0.1 }}
                        activeColor={'green'}
                        theme={{ colors: { primary: '#99e8e4', underlineColor: 'yellow', accent: '#99e8e4' } }}

                    />
                </View>
    
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
             <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%', alignSelf: 'center', marginTop: '10%' }}>
                <TouchableOpacity  onPress={()=>navigation.goBack()} style={{ backgroundColor: 'green', padding: '3%', borderRadius: 5, width: '25%' }}>
                    <View>
                        <Text style={{ color: 'white' }}>Previous</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>goToAddentialPage()} style={{ backgroundColor: 'green', padding: '3%', borderRadius: 5, width: '25%', alignItems: 'center' }}>
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
export default InterViewDetails;