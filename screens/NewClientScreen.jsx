import React, { useState, useRef }  from 'react'
import {  Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import Layout from '../components/Layout'
import { styles } from "../styles/styles.js";

import * as ImagePicker from "expo-image-picker";

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SERVER_URL} from "@env";

import { Feather,FontAwesome5,Entypo,MaterialIcons,Ionicons,AntDesign,MaterialCommunityIcons} from '@expo/vector-icons';
import userIcon from "../assets/userIcon.png";

const NewClientScreen = ({navigation,route}) => {
    
    const phoneRef = useRef()
    const countryRef = useRef()
    const contactPersonRef = useRef()
    const cityRef = useRef()
    const emailRef = useRef()

    const [errorMessage, setErrorMessage] = useState(undefined);
    const [client,setClient] = useState({
        clientName:'',
        address:{
            contactName:'',
            city:'',
            country:'',
			phone:'',
			email:''
        },
        pictureUrl:'',
      })
    
    const handleChange = (name, value) => setClient({ ...client, [name]: value });
    const handleSubChange = (field,name, value) => setClient({ ...client, [field]: {...client[field],[name]: value} });
      
    const handleCreateClientSubmit = async () => {
        const businessID = route.params.param
        if (client.clientName === '' || client.address.country === '' ) {
            setErrorMessage('Please fill all fields')
            return
        }

        const requestBody = client;
        const token = await AsyncStorage.getItem('authToken')
        axios.post(`${SERVER_URL}/business/client/${businessID}`, requestBody, {headers: {Authorization: `Bearer ${token}`}})
        .then(res => {
            navigation.navigate('ClientsScreen')
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
                setClient({...client, [field]:res.data.fileUrl})})
          .catch(err=>console.log(err));
        } else {
            alert('You did not select any image.');
        }
      };

    return (
        <Layout>
            <View style={[styles.container]}>
            {client.pictureUrl !== ''
                ? <Image
                            source={ {uri: client.pictureUrl} }
                            style={styles.image200r100}
                        /> 
                : <MaterialIcons name="business-center" size={120} color="black" style={{borderRadius:60,borderWidth:3,borderColor:'black'}}/>}
                
                <TouchableOpacity 
                  style={[styles.btnImg,{backgroundColor:'#F0F0F0'}]} 
                  onPress={()=>openImagePickerAsync('pictureUrl')} >
                    <Text style={styles.btnImgText}>Change Image</Text>
                </TouchableOpacity>
                <View style={styles.fields}>
                <MaterialIcons name="business-center" size={30} color="black" />
                    <TextInput
                    style={styles.textInput}
                    placeholder='Client Company Name'
                    returnKeyType='next'
                    onSubmitEditing={()=>{contactPersonRef.current.focus()}}
                    blurOnSubmit={false}
                    placeholderTextColor='#fffff'
                    onChangeText={(text) => handleChange("clientName", text)}
                    />
                </View>
                <View style={styles.fields}>
                    <FontAwesome5 name="address-card" size={30} color="black" />
                    <TextInput
                    style={styles.textInput}
                    placeholder='Contact Person'
                    returnKeyType='next'
                    blurOnSubmit={false}
                    placeholderTextColor='#fffff'
                    onSubmitEditing={()=>{cityRef.current.focus()}}
                    onChangeText={(text) => handleSubChange('address',"contactName", text)}
                    ref={contactPersonRef}
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

                {errorMessage && <Text style={styles.errorText}>{`* ${errorMessage}`}</Text>}
                <TouchableOpacity style={styles.buttonPrimary} onPress={handleCreateClientSubmit} >
                    <Text style={styles.buttonPrimaryText}>Create Client</Text>
                </TouchableOpacity>
                
            </View>
        </Layout>
    )
}


export default NewClientScreen