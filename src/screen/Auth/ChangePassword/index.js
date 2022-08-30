

// Import React and Component
import React, { useState, createRef } from 'react';
import {
    ImageBackground,
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    ScrollView,
    Image,
    Keyboard,
    TouchableOpacity,
    KeyboardAvoidingView,
    Dimensions,
    Alert
} from 'react-native';
import { TextInput } from 'react-native-paper';

import APIKit, { setClientToken } from '../../../shared/APIKit';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Loader from '../../../component/Loader';

const ChangePassword = ({ navigation, route }) => {
    const { otpData } = route?.params
    console.log("otpData..", otpData)
    const [loading, setLoading] = useState(false);
    const [changePassword, setChangePassword] = React.useState();
    const [confirmedPassword, setConfirmedPassword] = React.useState();
    const [errortext, setErrortext] = useState('');
    const { width, height } = Dimensions.get("screen")
    const passwordInputRef = createRef();

    const handleSubmitPress = () => {
        setErrortext('');
        if (!changePassword) {
            alert('Please fill changePassword');
            return;
        }
        if (!confirmedPassword) {
            alert('Please fill confirmedPassword');
            return;
        }
        const payload = { "user_id": otpData?.user_id, "password": changePassword, "confirm_password": confirmedPassword };
        console.log(payload);
        const onSuccess = ({ data }) => {
            setLoading(false);
            console.log("data is..", data);
            if (data.status === "success") {
                navigation.navigate('login')
            } else {
                setTimeout(() => {
                    Alert.alert('Alert!', data.message);
                }, 100);
            }
        };
        const onFailure = error => {
            setLoading(false);
            console.log('!!!!----Error', error);
            console.log('!!!!----Error Response', error.response);
            console.log('!!!!----error.response.data', error.response.data);
            console.log('!!!!----error.response.status', error.response.status);
            console.log('!!!!----headers', error.response.headers);
            setTimeout(() => {
                Alert.alert('Oops!', 'User id or password incorrect');
            }, 100);
        };
        APIKit.post('/profile/change_password', payload).then(onSuccess).catch(onFailure);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={styles.mainBody}>
                <Loader loading={loading} />

                <View style={{ width: '100%', height: height / 4, backgroundColor: 'black' }}>
                    <ImageBackground source={require('../../../../Image/login-bg.png')} resizeMode="cover" style={styles.TopImage}>
                        <Image
                            source={require('../../../../Image/logo.png')}
                            style={styles.Logo}
                        />
                    </ImageBackground>
                </View>
                <View style={styles.ContentView}>
                    <ScrollView
                        // keyboardShouldPersistTaps="handled"
                        contentContainerStyle={{
                            // flex: 1,

                            //justifyContent: 'center',
                            //alignContent: 'center',
                        }}>
                        <View >
                            <KeyboardAvoidingView enabled>
                                <Text
                                    style={{
                                        color: 'rgba(219, 35, 36, 1.0)',
                                        fontWeight: 'bold',
                                        fontSize: 18,
                                        padding: 20,
                                    }}
                                >
                                    Forgot Password
                                </Text>
                                <View style={styles.SectionStyle}>
                                    <TextInput
                                        mode="outlined"
                                        label="Change Password"
                                        placeholder="Change Password"
                                        onChangeText={(number) => setChangePassword(number)}
                                        theme={{ colors: { primary: 'red', underlineColor: 'transparent' } }}
                                        // maxLength={10}
                                        keyboardType='default'

                                    //right={<TextInput.Affix text="/100" />}
                                    />
                                </View>
                                <View style={styles.SectionStyle}>
                                    <TextInput
                                        mode="outlined"
                                        label="Confirmed Password"
                                        placeholder="Confirmed Password"
                                        onChangeText={(number) => setConfirmedPassword(number)}
                                        theme={{ colors: { primary: 'red', underlineColor: 'transparent' } }}
                                        maxLength={10}
                                        keyboardType='default'

                                    //right={<TextInput.Affix text="/100" />}
                                    />
                                </View>

                                <TouchableOpacity
                                    style={styles.buttonStyle}
                                    activeOpacity={0.5}
                                    onPress={() => handleSubmitPress()}
                                // onPress={() => navigation.navigate("Login")
                                // }
                                >
                                    <Text style={styles.buttonTextStyle}>SUBMIT</Text>
                                </TouchableOpacity>

                            </KeyboardAvoidingView>
                        </View>
                    </ScrollView>

                </View>
            </View>
        </SafeAreaView>

    );
};
export default ChangePassword;

const styles = StyleSheet.create({

    mainBody: {
        // justifyContent: 'center', //Centered horizontally
        alignItems: 'center', //Centered vertically
        flex: 2,
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignContent: 'space-between',
    },
    TopImage: {
        flex: 1,
        flexDirection: 'column',
        alignContent: 'space-between'
    },
    Logo: {
        width: '50%',
        height: '30%',
        resizeMode: 'contain',
        justifyContent: "flex-start",
        position: 'absolute',
        right: 1,
        top: 20,
        //backgroundColor: '#FFFFFF'           
    },
    ContentView: {
        width: '90%',
        height: '35%',
        backgroundColor: 'white',
        marginTop: -40,
        borderRadius: 15,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 0.5
    },
    SectionStyle: {
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20
    },
    buttonStyle: {
        backgroundColor: 'rgba(219, 35, 36, 1.0)',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#7DE24E',
        height: 44,
        alignItems: 'center',
        borderRadius: 5,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        marginBottom: 25,
    },
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
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 12,
    },
    bottomContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        //backgroundColor:'red',
        marginLeft: 20,
        marginRight: 20
    }
});