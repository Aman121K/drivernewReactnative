
import React, {useState, useEffect} from 'react';
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
import axios from 'axios';
// import ImagePicker from 'react-native-image-crop-picker';
import Loader from '../../../component/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ProfileDetails = ({navigation}) => {
  const [userEmail, setUserEmail] = useState('');
  const [loginuserData,setUserData]=useState();
  const [userName,setUserName]=useState('');
  const [mobile,setMobile]=useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const {width, height} = Dimensions.get("screen")
  // const passwordInputRef = createRef();
  const [image,setImage]=useState();
  const getToken = async () => {
    try {
      let userData = await AsyncStorage.getItem("userData");
      console.log("!!!!! ----- User data  :-", userData);
      // console.log("username is..",userData.name)
      const data = JSON.parse(userData)
      console.log("profile Email is,...",data.email);
      setUserName(data.name);
      setUserEmail(data.email);
      setMobile(data.mobile);
     
      console.log("!!!!! ----- User Obj: ", data.name, data.user_id);
      setUserData(data.user_id)

      //2 For Assigned Task
      // getAllData(data.user_id)

    } catch (error) {
      console.log("!!!!! ----- Something went wrong, while getting user token", error);
    }
  }
const getUserDetails=async()=>{
  setLoading(true)
  let response = await axios.post(
    'http://driversuvidha.xyz/CRM/api/Profile/customer_profile',
    {
      "customerid":  loginuserData
    },
  );
 
  setUserEmail(response.data.email)
  setUserName(response.data.name);
  setMobile(response.data.mobile);
  
  setLoading(false);
}
  const handleSubmitPress = async() => {
    setErrortext('');
    // if (!userEmail) {
    //   alert('Please fill Email');
    //   return;
    // }
   
    setLoading(true);
let response = await axios.post(
  'http://driversuvidha.xyz/CRM/api/Profile/updateCustomerProfile',
  {
    "customerid":  loginuserData,
    "name":userName,
    "email": userEmail
  },
  {
  headers:{
        //Header Defination
        'Content-Type':
        'application/x-www-form-urlencoded;charset=UTF-8',
      },
    }
);
console.log('new updated data is ...', response.data);
if(response.data){
  getUserDetails()
}
setLoading(false);
    // fetch('http://localhost:3000/api/user/login', {
    //   method: 'POST',
    //   body: formBody,
    //   headers: {
    //     //Header Defination
    //     'Content-Type':
    //     'application/x-www-form-urlencoded;charset=UTF-8',
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //     //Hide Loader
    //     setLoading(false);
    //     console.log(responseJson);
    //     // If server response message same as Data Matched
    //     if (responseJson.status === 'success') {
    //       AsyncStorage.setItem('user_id', responseJson.data.email);
    //       console.log(responseJson.data.email);
    //       navigation.replace('DrawerNavigationRoutes');
    //     } else {
    //       setErrortext(responseJson.msg);
    //       console.log('Please check your email id or password');
    //     }
    //   })
    //   .catch((error) => {
    //     //Hide Loader
    //     setLoading(false);
    //     console.error(error);
    //   });
  };
  const UserLogout=()=>{
    // Alert.alert("Go back")
    AsyncStorage.setItem('userData','');
    navigation.navigate("Login");
  }
  useEffect(()=>{
    getToken()
    // getUserDetails()
  },[])

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'red'}}>
    <View style={styles.mainBody}>

    <View style={styles.ContentView}>
   
    <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
              flex: 1,
            }}>
               {loading?
    <Loader loading={loading} />:null}
     <View style={{alignSelf:'center',alignItems:'flex-end',marginTop:'2%'}}>
          <Text style={{fontSize:20,fontWeight:'500',color:'black'}}>User Profile</Text>
            </View>
            <View >
              <KeyboardAvoidingView enabled>
                <View style={styles.SectionStyle}>
                    <TextInput
                      mode="outlined"
                      label="Name"
                      value={userName}
                      onChangeText={(e)=>setUserName(e)}
                      placeholder="Enter name"
                      theme={{ colors: { primary: '#99e8e4',underlineColor:'yellow', accent:'#99e8e4'}}}
                    
                    />
                </View>
                <View style={styles.SectionStyle}>
                    <TextInput
                      mode="outlined"
                      label="Email"
                      value={userEmail}
                      onChangeText={(e)=>setUserEmail(e)}
                      placeholder="Enter email"
                      theme={{ colors: { primary: '#99e8e4',underlineColor:'yellow', accent:'#99e8e4'}}}
                      // maxLength={10}
                      keyboardType = 'email-address'

                      //right={<TextInput.Affix text="/100" />}
                    />
                </View>
                <View style={styles.SectionStyle}>
                    <TextInput
                      mode="outlined"
                      label="Phone number"
                      value={mobile}
                      placeholder="Enter phone number"
                      theme={{ colors: { primary: '#99e8e4',underlineColor:'yellow', accent:'#99e8e4'}}}
                      maxLength={10}
                      keyboardType = 'default'
                      editable={false}

                      //right={<TextInput.Affix text="/100" />}
                    />
                </View>
               
                <TouchableOpacity
                  style={styles.buttonStyle}
                  activeOpacity={0.5}
                  onPress={()=>handleSubmitPress()}>
                  <Text style={styles.buttonTextStyle}>Update Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonStyle1}
                  onPress={()=>UserLogout()}>
                    <View>
                  <Text style={{color:'rgba(219, 35, 36, 1.0)',top:9,fontSize:15,fontWeight:'700'}}>Logout</Text>
                  </View>
                </TouchableOpacity>

               
                <View style={styles.bottomContent}>
                </View>
              </KeyboardAvoidingView>
             
            </View>
          </ScrollView>
         
    </View>
  </View>
    </SafeAreaView>
  );
};

export default ProfileDetails;
const styles = StyleSheet.create({
  
  mainBody: {
   // justifyContent: 'center', //Centered horizontally
    alignItems: 'center', //Centered vertically
    flex:2,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignContent: 'space-between',
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 100/2,
    borderWidth: 4,
    borderColor:'black',
    backgroundColor:'gray',
    justifyContent: "center",


 },
  TopImage: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: "center",
    alignItems: 'center'

  },
  Logo:{
    width: '50%', 
    height: '30%',
    resizeMode: 'contain',
    justifyContent: "flex-start",
    position: 'absolute',
    right: 1,
    top: 20,
    //backgroundColor: '#FFFFFF'           
  },
  ContentView:{ width: '100%',
   height: '100%', 
   backgroundColor:'#eff3f4',
   
},
  SectionStyle: {
    marginTop: 20,
    marginLeft:20,
    marginRight:20
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
  buttonStyle1: {
    backgroundColor: 'white',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: 'rgba(219, 35, 36, 1.0)',
    borderWidth:2,
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
 
  bottomContent:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    //backgroundColor:'red',
    marginLeft:20,
    marginRight:20
  }
});