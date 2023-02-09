import React, { useState, useRef,useContext }  from 'react'
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import Layout from '../components/Layout'
import { AuthContext } from "../context/auth.context";
import { styles } from "../styles/styles.js";

import * as ImagePicker from "expo-image-picker";

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SERVER_URL} from "@env";

import { MaterialCommunityIcons,Entypo,Ionicons,AntDesign} from '@expo/vector-icons';
import businessIcon from "../assets/businessIcon.png";

const CreateBusinessScreen = ({navigation}) => {
  const { user:userID,authenticateUser,setUser} = useContext(AuthContext);

  const phoneRef = useRef()
  const countryRef = useRef()
  const streetRef = useRef()
  const cityRef = useRef()
  const emailRef = useRef()

  const [business,setBusiness] = useState({
      businessName:'',
      owner:userID._id,
      address:{
        street:'',
        city:'',
        country:'',
        phone:'',
        email:'',
      },
      pictureUrl:'',
    //   branch:'',
    //   contactPerson:[{
    //     name:'',
    //     phone:'',
    //     email:''
    //   }]
    })
  
  const handleChange = (name, value) => setBusiness({ ...business, [name]: value });
  const handleSubChange = (field,name, value) => setBusiness({ ...business, [field]: {...business[field],[name]: value} });

  const storedToken = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken')
        return token
        
      } catch(e) {
        console.log(e);
      }
    }

  const handleCreateBusinessSubmit = async () => {
    if (business.name === '' || business.address.street === '' || business.address.city === ''
        || business.address.country === ''|| business.address.phone === '' || business.address.email === '') {
        setErrorMessage('Please fill all fields')
        return
    }
      const token = await AsyncStorage.getItem('authToken')

      const requestBody = business;
      
      navigation.navigate('ProfilesScreen')
      axios.post(`${SERVER_URL}/business`, requestBody, {headers: {Authorization: `Bearer ${token}`}})
      .then(res => {
        // setUser({...userID,rol:'admin'})
        navigation.navigate('ProfilesScreen')
      })
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
              setBusiness({...business, [field]:res.data.fileUrl})})
        .catch(err=>console.log(err));
      } else {
          alert('You did not select any image.');
      }
    };
    const imageSource = business.pictureUrl !== ''
  ? { uri: business.pictureUrl }
  : businessIcon;

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
                <Ionicons name="md-business-sharp" size={30} color="black" />
                  <TextInput
                  style={styles.textInput}
                  placeholder='Business Name'
                  returnKeyType='next'
                  onSubmitEditing={()=>{streetRef.current.focus()}}
                  blurOnSubmit={false}
                  placeholderTextColor='#fffff'
                  onChangeText={(text) => handleChange("businessName", text)}
                  />
              </View>
              <View style={styles.fields}>
                  <AntDesign name="swapright" size={30} color="black" />
                  <TextInput
                  style={styles.textInput}
                  placeholder='Street'
                  returnKeyType='next'
                  onSubmitEditing={()=>{cityRef.current.focus()}}
                  blurOnSubmit={false}
                  placeholderTextColor='#fffff'
                  onChangeText={(text) => handleSubChange('address',"street", text)}
                  ref={streetRef}
                  />
              </View>
              <View style={{flexDirection:'row'}}>
              <View style={styles.fields50}>
                    <AntDesign name="swapright" size={30} color="black" />
                    <TextInput
                    style={styles.textInput}
                    placeholder='City'
                    ref={cityRef}
                    onSubmitEditing={()=>{countryRef.current.focus()}}
                    onChangeText={(text) => handleSubChange('address',"city", text)}
                    blurOnSubmit={false}
                    placeholderTextColor='#fffff'
                    returnKeyType='next'
                    />
                </View>
                <View style={styles.fields50}>
                    <TextInput
                    style={styles.textInput}
                    placeholder='Country'
                    ref={countryRef}
                    onSubmitEditing={()=>{phoneRef.current.focus()}}
                    onChangeText={(text) => handleSubChange('address',"country", text)}
                    blurOnSubmit={false}
                    placeholderTextColor='#fffff'
                    returnKeyType='next'
                    />
                </View>
              </View>
              <View style={styles.fields}>
                  <Entypo name="mobile" size={30} color="black" />
                  <TextInput
                  style={styles.textInput}
                  placeholder='Telephone'
                  placeholderTextColor='#fffff'
                  keyboardType='phone-pad'
                  onChangeText={(text) => handleSubChange('address',"phone", text)}
                  returnKeyType='next'
                  onSubmitEditing={()=>{emailRef.current.focus()}}
                  blurOnSubmit={false}
                  ref={phoneRef}
                  />
              </View>
              <View style={styles.fields}>
                    <MaterialCommunityIcons name="email-outline" size={30} color="black" />
                    <TextInput
                    style={styles.textInput}
                    placeholder='Email'
                    placeholderTextColor='#fffff'
                    keyboardType='email-address'
                    onChangeText={(text) => handleSubChange('address',"email", text)}
                    ref={emailRef}
                    />
                </View>
                
              <TouchableOpacity style={styles.buttonPrimary} onPress={handleCreateBusinessSubmit} >
                  <Text style={styles.buttonPrimaryText}>Create Business</Text>
              </TouchableOpacity>
              
          </View>
      </Layout>
  )
}

export default CreateBusinessScreen
