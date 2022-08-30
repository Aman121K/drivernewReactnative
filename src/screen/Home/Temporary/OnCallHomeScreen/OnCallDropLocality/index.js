import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import moment from 'moment';
import {
    TextInput,
    DarkTheme,
    DefaultTheme,
    Provider
} from "react-native-paper";
import AsyncStorage from '@react-native-async-storage/async-storage';
import APIKit, { setClientToken } from '../../../../../shared/APIKit';
import { Dropdown } from 'react-native-element-dropdown';
import Ionicons from 'react-native-vector-icons/Ionicons';
const styles = StyleSheet.create({
    DateTimeContent: {
        // flexDirection: 'row',
        // justifyContent: 'space-evenly',    
    },
    placeholderStyle: {
        color: 'black',
        marginLeft: '5%'
    },
    selectedTextStyle: {
        color: 'black'
    }
})
const OnCallDropLoacality = ({ navigation, route }) => {
    const { OnacllDropLocality } = route.params;
    console.log("OnacllDropLocality.../", OnacllDropLocality)
    const [nightMode, setNightmode] = useState(false)
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');
    const [logedInUserData, setUserData] = useState({});
    const [reportingdate, setReportingdate] = useState(new Date())
    const [isReportingdate, setIsReportingdate] = useState(false)
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
    const [address, setAddress] = useState('');

    const [allCityList, setallCityList] = useState([]);
    const [city, setCity] = useState(OnacllDropLocality?.city);
    const [cityList, setCityList] = useState([]);
    const [showlocalityDropDown, setshowlocalityDropDown] = useState(false);
    const [locality, setLocality] = useState(OnacllDropLocality?.locality);
    const [localityList, setLocalityList] = useState([]);
    const [toLocality, setTolocality] = useState();

    const [pincode, setPincode] = useState('');

    const [landmark, setLandmark] = useState('');


    //TIME
    const [showTimeDropDown, setshowTimeDropDown] = useState(false);
    const [reportingTime, setreportingTime] = useState('');
    const [reportingTimeList, setreportingTimeList] = useState([]);

    const [previousCarList, setpreviousCarList] = useState([]);
    const [cardetails, setCar] = useState();
    const [carList, setCarList] = useState([]);
    const [isSaveAddress, setisSaveAddress] = useState(false);
    const [drivertype, setDriverTypeChecked] = useState('2');

    const [dutytype, setdutyType] = useState('');
    const [totalDays, setTotalDays] = useState('1');

    const [dutyhour, setDutyHour] = useState('');

    const [dutyhoursList, setDutyhoursList] = useState([]);

    const [toCity, setToCity] = useState('');


    const [remarks, setremarks] = useState('');
    const [allAdress1, setAlladress1] = useState([])
    const getToken = async () => {
        try {
            let userData = await AsyncStorage.getItem("userData");
            console.log("!!!!! ----- User data  :-", userData);
            const data = JSON.parse(userData)
            setUserData(data)
            console.log("!!!!! ----- User ID: ", logedInUserData.user_id);
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
            setLoading(false);
            console.log('All DATA', data);
            var allTm = data.all_timeslot.map(tml => ({ value: tml, label: tml }));
            setreportingTimeList(allTm)
            setAlladress1(data.all_address);
            var customhours = data.duty_hour.map(hr => ({ name: hr.hours, id: hr.id, status: 'false' }))
            setDutyhoursList(customhours)
            var prevAdrList = data.all_address.map(adrs => ({ value: adrs.id, label: adrs.previous_address, address: adrs.address, city: adrs.city, landmark: adrs.landmark, locality: adrs.locality, zip: adrs.zip }));
            setReportingAdrList(prevAdrList)
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

    const chekDate = () => {
        console.log(" return date is", returndate)
        console.log(new Date(returndate).getDate());
    }

    const onCallFinalStage = () => {
        OnacllDropLocality['location'] = drivertype;
        OnacllDropLocality['drop_city'] = city
        OnacllDropLocality['drop_locality'] = locality;
        navigation.navigate('OnCallFinalStage', { OnCallFinalStage: OnacllDropLocality })
    }
    return (
        <Provider theme={nightMode ? DarkTheme : DefaultTheme}>
            <ScrollView>
                <View style={{ marginTop: '10%' }}>
                    <View style={{ width: '90%', alignSelf: 'center', marginTop: '5%' }}>
                        <TouchableOpacity style={{ flexDirection: 'row', margin: 10, alignContent: 'center' }}
                            onPress={() => setDriverTypeChecked('2')}
                        >
                            <Ionicons name={drivertype === '2' ? 'radio-button-on' : 'radio-button-off-sharp'} size={20} color={'red'} />
                            <Text style={{ color: 'black', marginLeft: 10 }}>Drop me in same location as picked up</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flexDirection: 'row', margin: 10, alignContent: 'center', }}

                            onPress={() => setDriverTypeChecked('1')}
                        >
                            <Ionicons name={drivertype === '1' ? 'radio-button-on' : 'radio-button-off-sharp'} size={20} color={'red'} />

                            <Text style={{ color: 'black', marginLeft: 10 }}>Drop me else where</Text>

                        </TouchableOpacity>

                    </View>

                    {drivertype === '1' ?
                        <>
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
                                        var localList = item?.localityarray.map(local => ({ value: local.locality_id, label: local.locality_name }));
                                        // console.log('localList', localList)
                                        setLocalityList(localList)
                                        setCity(item?.value)
                                    }}
                                />
                            </View>
                            <View style={{ width: '90%', alignSelf: 'center', marginTop: 20, borderWidth: 1, borderColor: 'black', padding: 5, borderRadius: 10 }}>
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
                                    placeholder="Select new Locality*"
                                    searchPlaceholder="Search..."
                                    value={locality}
                                    onChange={item => {
                                        console.log("vikkkk", item);
                                        var localList = item?.localityarray.map(local => ({ value: local.locality_id, label: local.locality_name }));
                                        // console.log('localList', localList)
                                        setLocalityList(localList)
                                        setTolocality(item.value);

                                    }}
                                />
                            </View>
                        </> : null}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%', alignSelf: 'center', marginTop: '10%' }}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{ backgroundColor: 'green', padding: '3%', borderRadius: 5, width: '25%' }}>
                            <View>
                                <Text style={{ color: 'white' }}>Previous</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => onCallFinalStage()} style={{ backgroundColor: 'green', padding: '3%', borderRadius: 5, width: '25%', alignItems: 'center' }}>
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
export default OnCallDropLoacality