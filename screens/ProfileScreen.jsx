import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState, useRef }  from 'react'
import * as ImagePicker from "expo-image-picker";
import axios from 'axios';

import {SERVER_URL} from "@env";

import { FontAwesome5 } from '@expo/vector-icons';
import { Feather, MaterialCommunityIcons} from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import Layout from '../components/Layout'

import userIcon from "../assets/userIcon.png";
import CheckboxProfile from '../components/CheckboxProfile';

const ProfileScreen = ({navigation}) => {
    //SET USER WITH PARAMS AND FIX SUBMIT ROUTE WITH ID

    const phoneRef = useRef()
    const countryRef = useRef()
    const [user,setUser] = useState({
        // email:'',
        // username:'',
        fullName:'',
        phone:'',
        country:'',
        pictureUrl:'',
        experience:{
            coordinator:false,
            protectionOfficer:false,
            driver:false,
            intempreter:false
        }
      })
    
    const handleChange = (name, value) => setUser({ ...user, [name]: value });
    const handleCheckboxChange = (name, value) => setUser({ ...user, experience:{...user.experience, [name]: value} });
    const storedToken = async () => {
        try {
          const token = await AsyncStorage.getItem('authToken')
          return token
          
        } catch(e) {
          console.log(e);
        }
      }

    const handleCreateProfileSubmit = () => {
        const token = storedToken()
        const requestBody = user;

        axios.post(`${SERVER_URL}/users`, requestBody, {headers: {Authorization: `Bearer ${token}`}})
        .then(res => {
            navigation.navigate('Dashboard')})
      .catch(err=>console.log(err));
    }

    const openImagePickerAsync = async (field) => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    
        if (permissionResult.granted === false) {
          alert("Permission to camara roll is required");
          return;
        }
    
        const pickerResult = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
            aspect: [2, 2],
          });
        // console.log(pickerResult)
    
        if (!pickerResult.canceled) {
            const form = new FormData()
            form.append('imageUrl', {
            uri : pickerResult.assets[0].uri,
            type: pickerResult.assets[0].type + '/jpeg',
            name: 'name'
            });
            axios.post(`${SERVER_URL}/api/upload`, form, {
                headers: {Accept: 'application/json',
                  'Content-Type': 'multipart/form-data'
                },
              })
            .then(res => {
                setUser({...user, [field]:res.data.fileUrl})})
          .catch(err=>console.log(err));
        } else {
            alert('You did not select any image.');
        }
      };
      const imageSource = user.pictureUrl !== ''
    ? { uri: user.pictureUrl }
    : userIcon;

    return (
        <Layout>
            <View style={styles.container}>
                <Image
                    source={imageSource}
                    style={styles.image}
                />
                
                <TouchableOpacity style={styles.btnImg} onPress={()=>openImagePickerAsync('pictureUrl')} >
                    <Text style={styles.btnImgText}>Change Image</Text>
                </TouchableOpacity>
                <View style={styles.fields}>
                    <FontAwesome5 name="address-card" size={30} color="black" />
                    <TextInput
                    style={styles.textInput}
                    placeholder='Full Name'
                    returnKeyType='next'
                    onSubmitEditing={()=>{phoneRef.current.focus()}}
                    blurOnSubmit={false}
                    placeholderTextColor='#fffff'
                    onChangeText={(text) => handleChange("fullName", text)}
                    />
                </View>
                {/* <View style={styles.fields}>
                    <Feather name="user" size={30} color="black" />
                    <TextInput
                    style={styles.textInput}
                    placeholder='Username'
                    placeholderTextColor='#fffff'
                    onChangeText={(text) => handleChange("username", text)}
                    />
                </View>
                <View style={styles.fields}>
                    <MaterialCommunityIcons name="email-outline" size={30} color="black" />
                    <TextInput
                    style={styles.textInput}
                    placeholder='Email'
                    placeholderTextColor='#fffff'
                    keyboardType='email-address'
                    onChangeText={(text) => handleChange("email", text)}
                    />
                </View> */}
                <View style={styles.fields}>
                    <Entypo name="mobile" size={30} color="black" />
                    <TextInput
                    style={styles.textInput}
                    placeholder='Telephone'
                    placeholderTextColor='#fffff'
                    keyboardType='phone-pad'
                    onChangeText={(text) => handleChange("phone", text)}
                    returnKeyType='next'
                    onSubmitEditing={()=>{countryRef.current.focus()}}
                    blurOnSubmit={false}
                    ref={phoneRef}
                    />
                </View>
                <View style={styles.fields}>
                    <MaterialIcons name="place" size={30} color="black" />
                    <TextInput
                    style={styles.textInput}
                    placeholder='Country'
                    placeholderTextColor='#fffff'
                    onChangeText={(text) => handleChange("country", text)}
                    ref={countryRef}
                    />
                </View>
                <View style={styles.fields}>
                    <Feather name="star" size={30} color="black" />
                    <Text style={styles.textTitleField}>
                        Experience
                    </Text>
                    <View style={styles.CheckboxList}>
                        {Object.keys(user.experience).sort((a,b)=>a.localeCompare(b)).map(elem => {
                        return <CheckboxProfile key={elem} user={user} field={elem} handleCheckboxChange={handleCheckboxChange}/>
                    })}
                    </View>
                </View>
                <TouchableOpacity style={styles.button} onPress={handleCreateProfileSubmit} >
                    <Text style={styles.buttonText}>Create Profile</Text>
                </TouchableOpacity>
                
            </View>
        </Layout>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
      },
      image:{
        width:150,
        height:150,
        borderRadius:75
      },
      fields:{
        width:'100%',
        minHeight:50,
        height:'auto',
        paddingStart:20,
        paddingEnd:20,
        paddingTop:5,
        marginVertical:5,
        borderBottomColor:'black',
        borderBottomWidth:2,
        fontSize:17,
        display:'flex',
        flexDirection:'row'
      },
      textInput:{
        paddingStart:20,
        paddingEnd:20,
        fontSize:17,
        paddingBottom:8
    },
    btnImg:{
        marginTop:5,
        backgroundColor:'#F0F0F0',
        paddingHorizontal:10,
        paddingVertical:5,
        display:'flex',
        alignItems:'center',
        borderRadius:5,
      },
      textTitleField:{
        paddingStart:20,
        paddingEnd:20,
        fontSize:17,
        paddingBottom:8
      },
      button:{
        marginTop:20,
        width:'80%',
        backgroundColor:'#CC302D',
        paddingVertical:20,
        display:'flex',
        alignItems:'center',
        borderRadius:10,
      },
      buttonText:{
        fontSize:17,
        color:'#ffff'
      },
})