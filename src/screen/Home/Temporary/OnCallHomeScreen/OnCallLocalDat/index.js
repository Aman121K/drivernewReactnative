import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import moment from 'moment';
import {
    TextInput,
    DarkTheme,
    DefaultTheme,
    Provider,
} from "react-native-paper";
// import * as Utility from '../../../../../utility/index';
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
const OnCallLocalDat = ({ navigation }) => {
    const [nightMode, setNightmode] = useState(false)
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');
    const [logedInUserData, setUserData] = useState({});
    const [reportingdate, setReportingdate] = useState(new Date())
    const [isReportingdate, setIsReportingdate] = useState(false)
    const [returndate, setReturndate] = useState(new Date())
    const [isreturndate, setIsReturndate] = useState(false)
    const [saveAddressValue, setsaveAddressValue] = useState('0')
    const [show5hours, setShowhours] = useState(false);
    const [show8hours, setShow8Hours] = useState(true);
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
    const [city, setCity] = useState('');
    const [cityList, setCityList] = useState([]);
    const [showlocalityDropDown, setshowlocalityDropDown] = useState(false);
    const [locality, setLocality] = useState('');
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
    const [drivertype, setDriverTypeChecked] = useState('4');

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
                alert('Oops!', 'User id or password incorrect');
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

    const goToOnPickUpAddress = () => {
        if (!cardetails && !reportingTime) {
            alert("All filed is required")
            return
        }

        const body = {
            reportingdate: moment(reportingdate).format('YYYY-MM-DD'),
            reportingtime: reportingTime,
            returndate: dutytype === 'Local' ? "" : moment(returndate).format('YYYY-MM-DD'),
            dutyhour: drivertype,
            drivertype: '1',
            dutytype: 1,
            cardetails: cardetails?.value || "",
        }
        // Utility.setInLocalStorge('onCallLocalDate',body);
        navigation.navigate('OnCallPickUpAddress', { OnCallPickUpAddress: body })
    }
    const newTimeIs = (item) => {
        console.log("time is ....", item)
        setreportingTime(item);
        // if (item > 18) {
        //     setShow8Hours(true);
        //     setShowhours(false);
        // } else {
        //     setShow8Hours(false);
        //     setShowhours(true);
        //     setDriverTypeChecked('5');
        // }
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
                    <View style={{ width: '90%', alignSelf: 'center', marginTop: '5%' }}>
                        <DropDown
                            label={"Select Time *"}
                            mode={"outlined"}
                            visible={showTimeDropDown}
                            showDropDown={() => setshowTimeDropDown(true)}
                            onDismiss={() => setshowTimeDropDown(false)}
                            value={reportingTime}
                            setValue={newTimeIs}
                            list={reportingTimeList}
                            dropDownStyle={{ marginTop: 0.1 }}
                            dropDownItemTextStyle={{ color: 'black' }}
                            activeColor={'green'}
                            theme={{ colors: { primary: '#99e8e4', underlineColor: 'yellow', accent: '#99e8e4' } }}
                        />
                    </View>

                    {show8hours ?
                        <View style={{ flexDirection: 'row', width: '90%', alignSelf: 'center', marginTop: '5%' }}>
                            <TouchableOpacity style={{ flexDirection: 'row', margin: 10, justifyContent: 'space-between', alignContent: 'center' }}
                                onPress={() => setDriverTypeChecked('4')}
                            >
                                <Ionicons name={drivertype === '4' ? 'radio-button-on' : 'radio-button-off-sharp'} size={20} color={'red'} />
                                <Text style={{ marginLeft: 10, color: 'black' }}>4 Hours</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flexDirection: 'row', margin: 10, justifyContent: 'space-between', alignContent: 'center', }}

                                onPress={() => setDriverTypeChecked('8')}
                            >
                                <Ionicons name={drivertype === '8' ? 'radio-button-on' : 'radio-button-off-sharp'} size={20} color={'red'} />

                                <Text style={{ marginLeft: 10, color: 'black' }}>8 Hours</Text>

                            </TouchableOpacity>

                        </View> : null}
                    {show5hours ?
                        <View style={{ flexDirection: 'row', width: '90%', alignSelf: 'center', marginTop: '5%' }}>
                            <TouchableOpacity style={{ flexDirection: 'row', margin: 10, justifyContent: 'space-between', alignContent: 'center', }}

                                onPress={() => setDriverTypeChecked('5')}
                            >
                                <Ionicons name={drivertype === '8' ? 'radio-button-on' : 'radio-button-off-sharp'} size={20} color={'red'} />

                                <Text style={{ marginLeft: 10, color: 'black' }}>5 Hours</Text>

                            </TouchableOpacity>

                        </View> : null}



                    <View style={{ width: '90%', alignSelf: 'center', borderWidth: 1, padding: 10, borderRadius: 5 }}>
                        <Dropdown
                            style={styles.dropdown}
                            placeholderStyle={{ color: 'black' }}
                            selectedTextStyle={{ color: 'black' }}
                            inputSearchStyle={{ color: 'black' }}
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
                        <TouchableOpacity onPress={() => goToOnPickUpAddress()} style={{ backgroundColor: 'green', padding: '3%', borderRadius: 5, width: '25%', alignItems: 'center' }}>
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
export default OnCallLocalDat