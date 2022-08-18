import React, { useRef, useState, useEffect } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import {
    TextInput,
    Provider,
    DarkTheme,
    DefaultTheme
} from "react-native-paper";
import RBSheet from "react-native-raw-bottom-sheet";
import AsyncStorage from '@react-native-async-storage/async-storage';
import APIKit, { setClientToken } from '../../../../shared/APIKit';
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
const Address = ({ navigation, route }) => {
    const { additionDetails } = route.params;
    const refRBSheet = useRef();
    const refRBSheetNewAddress = useRef();
    const [logedInUserData, setUserData] = useState({});
    const [reportingAddress,setReportingAddress]=useState('');
    const [loading, setLoading] = useState(false);
    const [nightMode, setNightMode] = useState(false);
    const [errortext, setErrortext] = useState('');
    const [reportingAdrList, setReportingAdrList] = useState(['', '']);
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
            var localList = selectedCity.all_locality.map(local => ({ value: local.locality_id, label: local.locality_name }));
            setLocalityList(localList)
            setshowlocalityDropDown(true)
        }
    }
    const [showCarDrpDwn, setShowCarDrpDwn] = useState(false);
    const [car, setCar] = useState('');
    const [previousCarList, setpreviousCarList] = useState([]);

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

    const [carList, setCarList] = useState([]);
    const [chooseAddress, setChooseAddress] = React.useState();

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
            var carList = data.car_master.map(car => ({ value: car.id, label: car.car_name }));
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
            setLoading(false);
            console.log("!!!!----Error", error);
            console.log("!!!!----Error Response", error.response);
            console.log("!!!!----error.response.data", error.response.data);
            console.log("!!!!----error.response.status", error.response.status);
            console.log("!!!!----headers", error.response.headers);
            setTimeout(() => {
                Alert.alert('Oops!', 'User id or password incorrect');
            }, 100);
        };

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

    const OnselectAddress = (item) => {
        setChooseAddress(item)
        refRBSheet.current.close();
    }


    const handleSubmitPress = () => {
        additionDetails['reporting_address'] = reportingAddress || "";
        additionDetails['address'] = address || "";
        additionDetails['city'] = city || "",
        additionDetails['locality'] = locality || "",
        additionDetails['pincode'] = pincode || "",
        additionDetails['landmark'] = landmark || "",
        additionDetails['status']=1,
        additionDetails['customer_id'] = logedInUserData?.user_id;

        console.log("Final Payload is...>>>",additionDetails);
        const onSuccess = ({ data }) => {
            setLoading(false);
            console.log("AMan data..", data);
            setTimeout(() => {
               alert('Success!');
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
            // console.log("!!!!----Error", error);
        };
        APIKit.post('/Booking/contractual_book', additionDetails)
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
                // setisSaveAddress(true)
                // setsaveAddressValue('1');
                setAddress(item?.address);
                setPincode(item?.zip);
                setLocality(item?.locality);
                setLandmark(item?.landmark);
                // setToCity(item?.city);
                // setTolocality(item?.locality)
              }}
            />
          </View>
                    <TouchableOpacity onPress={() => refRBSheetNewAddress.current.open()}>
                        <View style={{ borderWidth: 1, borderColor: 'grren', padding: 15, marginTop: '6%', width: '90%', alignSelf: 'center', borderRadius: 10 }}>
                            <Text style={{ color: 'black' }}>Select New Address</Text>
                        </View>
                        <View style={{ padding: 15, marginTop: '6%', width: '90%', alignSelf: 'center', borderRadius: 10 }}>
                            <Text style={{ color: 'black' }}>{chooseAddress}</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%', alignSelf: 'center', marginTop: '10%' }}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{ backgroundColor: 'green', padding: '3%', borderRadius: 5, width: '25%' }}>
                            <View>
                                <Text style={{ color: 'white' }}>Previous</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleSubmitPress()} style={{ backgroundColor: 'green', padding: '3%', borderRadius: 5, width: '25%', alignItems: 'center' }}>
                            <View>
                                <Text style={{ color: 'white' }}>Next</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <RBSheet
                        ref={refRBSheet}
                        height={500}
                        customStyles={{
                        }}
                    >
                        <View style={{ marginTop: '5%' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%', alignSelf: 'center' }}>
                                <View style={{ padding: 10, backgroundColor: 'gray', borderRadius: 5, width: '80%' }}>
                                    <Text>Rest House noida shaghdffvfgsfgavhkfiufvnasgfvenmcm.dhfgwe</Text>
                                </View>
                                <View style={{ backgroundColor: 'gray', padding: 5, borderRadius: 5, width: '18%', alignItems: 'center' }}>
                                    <TouchableOpacity onPress={() => OnselectAddress('choose address')}>
                                        <Text>Select</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </RBSheet>
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

                                            console.log("vikkkk", item);
                                            setCity(item.value)
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
                                            setLocality(item.value);
                                        }}
                                    />
                                    <View style={styles.spacerStyle} />
                                    <TextInput
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
                                            <Text style={{ color: 'white' }}>Previous</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => refRBSheetNewAddress.current.close()} style={{ backgroundColor: 'green', padding: '3%', borderRadius: 5, width: '25%', alignItems: 'center' }}>
                                        <View>
                                            <Text style={{ color: 'white' }}>Next</Text>
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
export default Address