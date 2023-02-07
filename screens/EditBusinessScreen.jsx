import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput } from 'react-native'

import { useEffect, useState, useRef  } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from "axios";

import {SERVER_URL} from "@env";

import Layout from '../components/Layout'

import { MaterialCommunityIcons} from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Loading from '../components/Loading';

const EditBusinessScreen = ({navigation,route}) => {
    const businessID = route.params.businessID
    const [business, setBusiness] = useState(null)
    const [isEnabled, setIsEnabled] = useState(false)
    
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
        if (business.name === '' || business.address.street === '' || business.address.city === ''
            || business.address.country === ''|| business.address.phone === '' || business.address.email === '') {
            setErrorMessage('Please fill all fields')
            return
        }
          const token = await AsyncStorage.getItem('authToken')
    
          const requestBody = business;
    
          axios.put(`${SERVER_URL}/business/${business.businessID._id}`, requestBody, {headers: {Authorization: `Bearer ${token}`}})
          .then(res => {
              navigation.navigate('ProfilesScreend')})
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

    const getBusinessInfo = async ()=>{
        const token = await AsyncStorage.getItem('authToken')
        axios.get(`${SERVER_URL}/business/${businessID}`,{headers: {Authorization: `Bearer ${token}`}})
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
                <TouchableOpacity style={styles.button} onPress={handleCreateBusinessSubmit} >
                  <Text style={styles.buttonText}>Edit Profile</Text>
              </TouchableOpacity>
          </View>
      </Layout>
  )}else{
    return <Loading/>
  }
}

export default EditBusinessScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
      },
      image:{
        width:200,
        height:200,
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
      fields50:{
        width:'50%',
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
    textInput50:{
        width:50,
        paddingStart:20,
        paddingEnd:20,
        fontSize:17,
        paddingBottom:8
    },
    btnImg:{
        marginTop:5,
        paddingHorizontal:10,
        paddingVertical:5,
        display:'flex',
        alignItems:'center',
        borderRadius:5,
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