import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import moment from 'moment';
import {
  TextInput,
  DarkTheme,
  DefaultTheme,
  Provider,
} from "react-native-paper";
import { Dropdown } from 'react-native-element-dropdown';
import DropDown from "react-native-paper-dropdown";
import DatePicker from 'react-native-date-picker'
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import APIKit, { setClientToken } from '../../../../../shared/APIKit';
import Loader from '../../../../../component/Loader';
const styles = StyleSheet.create({
  DateTimeContent: {
    // flexDirection: 'row',
    // justifyContent: 'space-evenly',    
  },
  placeholderStyle: {
    color: 'black'
  },
  selectedTextStyle: { color: 'black' }
})
const OnCallOutStationDate = ({ navigation }) => {
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
  const [totalDays, setTotalDays] = useState('Total Number of Days');

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
  const onCallPickupAddress1 = () => {
    if(!cardetails && !reportingTime){
      alert("All filed is required")
      return
  }
    const body = {
      reportingdate: moment(reportingdate).format('YYYY-MM-DD'),
      reportingtime: reportingTime,
      returndate: dutytype === 'Local' ? "" : moment(returndate).format('YYYY-MM-DD'),
      dutyhour: drivertype,
      drivertype: '1',
      dutytype: 2,
      no_of_day: "1",
      city:city,
      cardetails:cardetails?.value || "",
    }
    navigation.navigate('OnCallPickUpAddress',{OnCallPickUpAddress:body})
  }
  return (
    <Provider theme={nightMode ? DarkTheme : DefaultTheme}>
      <ScrollView>
        <Loader loading={loading} />
        <View style={{ marginTop: '10%' }}>
          <View style={styles.DateTimeContent}>
            <TextInput
              style={{ width: '90%', alignSelf: 'center' }}
              pointerEvents="none"
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
            <View style={styles.SectionStyleBottom}>
              <TextInput
                style={{ width: '90%', alignSelf: 'center', marginTop: '5%' }}
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
        
          <View style={{ width: '90%', alignSelf: 'center', marginTop: '5%', borderWidth: 1, borderRadius: 5, borderColor: 'black', padding: 15 }}>
            <Text style={{ color: 'black' }}>{totalDays}</Text>
          </View>
          <View style={{ width: '90%', alignSelf: 'center', marginTop: '5%' }}>
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
              dropDownItemTextStyle={{ color: 'black' }}
              activeColor={'green'}
              theme={{ colors: { primary: '#99e8e4', underlineColor: 'yellow', accent: '#99e8e4' } }}
            />
          </View>
          <View style={{ borderWidth: 1, borderColor: 'black', width: '90%', alignSelf: 'center', marginTop: '5%', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5 }}>
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
                console.log("vikkkk", item);
                setCity(item?.value)
              }}
            />
          </View>
          <View style={{width:'90%',alignSelf:'center',borderWidth:1,padding:10,borderRadius:5,marginTop:15}}>
                    <Dropdown
                style={styles.dropdown}
                placeholderStyle={{color:'black'}}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={carList}
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
                //   if (item.label == 'Select New Car') {
                //     setIsShowPreviousCarList(!isShowPreviousCarList)
                //   }
                //   else {
                //     setIsShowPreviousCarList(false)
                //   }
                }}
              />
              </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%', alignSelf: 'center', marginTop: '10%' }}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ backgroundColor: 'green', padding: '3%', borderRadius: 5, width: '25%' }}>
              <View>
                <Text style={{ color: 'white' }}>Previous</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onCallPickupAddress1()} style={{ backgroundColor: 'green', padding: '3%', borderRadius: 5, width: '25%', alignItems: 'center' }}>
              <View>
                <Text style={{ color: 'white' }}>Next</Text>
              </View>
            </TouchableOpacity>
          </View>
          <DatePicker
            modal
            minDate={new Date()}
            minimumDate={new Date(new Date().getTime() + 24 * 60 * 60 * 1000)}
            mode={isReportingdate || isreturndate ? "date" : "time"}
            open={open}
            date={reportingdate}
            onConfirm={(date) => {
              setDateOpen(false)
              console.log("Return date choose may...", date)
              setDate(date)


            }}
            onCancel={() => {
              setDateOpen(false)
            }}
          />
        </View>
      </ScrollView>
    </Provider>
  )
}
export default OnCallOutStationDate;