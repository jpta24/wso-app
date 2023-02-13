import React, { useEffect, useState, useRef  } from 'react'
import { Text, TouchableOpacity, View, Image, TextInput } from 'react-native'
import Layout from '../components/Layout'
import { styles } from "../styles/styles.js";

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SERVER_URL} from "@env";

import Loading from '../components/Loading';

import { MaterialCommunityIcons,Entypo,Ionicons,AntDesign } from '@expo/vector-icons';

const EditBusinessScreen = ({navigation,route}) => {
  // console.log(route.params);
    const businessID = route.params.param
    const [business, setBusiness] = useState(null)
    const [isEnabled, setIsEnabled] = useState(false)
    // console.log(business);
    
    const phoneRef = useRef()
    const countryRef = useRef()
    const streetRef = useRef()
    const cityRef = useRef()
    const emailRef = useRef()

    const handleChange = (name, value) => {
        if (!isEnabled) {
            setIsEnabled(true)
        }
        setBusiness({ ...business, [name]: value }
    )};
    const handleSubChange = (field,name, value) => {
        if (!isEnabled) {
            setIsEnabled(true)
        }
        setBusiness({ ...business, [field]: {...business[field],[name]: value} }
    )};
    const handleCreateBusinessSubmit = async () => {
        if (business.businessName === '' || business.address.street === '' || business.address.city === ''
            || business.address.country === ''|| business.address.phone === '' || business.address.email === '') {
            setErrorMessage('Please fill all fields')
            return
        }
          const token = await AsyncStorage.getItem('authToken')
    
          const requestBody = business;
    
          axios.put(`${SERVER_URL}/business/profile/${businessID}`, requestBody, {headers: {Authorization: `Bearer ${token}`}})
          .then(res => {
              navigation.navigate('ProfilesScreen')})
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

    const getBusinessInfo = async ()=>{
        const token = await AsyncStorage.getItem('authToken')
        axios.get(`${SERVER_URL}/business/profile/${businessID}`,{headers: {Authorization: `Bearer ${token}`}})
        .then(response =>{
           setBusiness(response.data)
        })
        .catch(err=>console.log(err));
    }
    useEffect(() => {
      getBusinessInfo()
    }, [])
    

if(business) {return (
    <Layout>
          <View style={styles.container}>
              <Image
                  source={ {uri: business.pictureUrl} }
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
                  value={business.businessName}
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
                  value={business.address.street}
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
                    value={business.address.city}
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
                    value={business.address.country}
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
                  value={business.address.phone}
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
                    value={business.address.email}
                    />
                </View>
                <TouchableOpacity style={styles.buttonPrimary} onPress={handleCreateBusinessSubmit} >
                  <Text style={styles.buttonPrimaryText}>Edit Profile</Text>
              </TouchableOpacity>
          </View>
      </Layout>
  )}else{
    return <Loading/>
  }
}

export default EditBusinessScreen

