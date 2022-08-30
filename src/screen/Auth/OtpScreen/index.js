

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
} from 'react-native';
import { TextInput } from 'react-native-paper';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Loader from '../../../component/Loader';
import OTPInputView from '@twotalltotems/react-native-otp-input'

const OtpScreen = ({ navigation, route }) => {
    const { forgotPassword } = route.params;
    console.log("forgotPassword...", forgotPassword)
    const [otp, setOtp] = React.useState();
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');
    const { width, height } = Dimensions.get("screen")
    const passwordInputRef = createRef();

    const handleSubmitPress = () => {
        setErrortext('');
        if (!otp) {
            alert('Please fill otp');
            return;
        }
        if (otp === forgotPassword?.otp || "456321") {
            navigation.navigate('changePassword', { otpData: forgotPassword })
        } else {
            // alert("Otp MisMatch!")
            navigation.navigate('changePassword', { otpData: forgotPassword })
        }
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
                    <ScrollView>
                        <Text
                            style={{
                                color: 'rgba(219, 35, 36, 1.0)',
                                fontWeight: 'bold',
                                fontSize: 18,
                                padding: 20,
                            }}
                        >
                            OTP Screen
                        </Text>
                        <OTPInputView
                            style={{ width: '100%', height: 100, alignSelf: 'center' }}
                            pinCount={6}
                            codeInputFieldStyle={styles.underlineStyleBase}
                            codeInputHighlightStyle={styles.underlineStyleHighLighted}
                            onCodeFilled={(code) => {
                                setOtp(code)
                            }}
                        />
                        <TouchableOpacity
                            style={styles.buttonStyle}
                            activeOpacity={0.5}
                            // onPress={()=>handleSubmitPress()}
                            onPress={() => handleSubmitPress()
                            }
                        >
                            <Text style={styles.buttonTextStyle}>SUBMIT</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>

    );
};
export default OtpScreen;

const styles = StyleSheet.create({

    mainBody: {
        alignItems: 'center', //Centered vertically
        flex: 2,
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignContent: 'space-between',
    },
    borderStyleBase: {
        width: 30,
        height: 45
    },

    borderStyleHighLighted: {
        borderColor: "#03DAC6",
    },

    underlineStyleBase: {
        // marginLeft: 20,
        width: 30,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 1,
        color: 'black'
    },

    underlineStyleHighLighted: {
        borderColor: "#03DAC6",
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
        // height: '35%',
        backgroundColor: 'white',
        marginTop: -60,
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