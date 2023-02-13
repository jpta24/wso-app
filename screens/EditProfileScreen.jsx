import React, { useEffect, useState, useRef  } from 'react'
import { Text, TouchableOpacity, View, Image, TextInput, ScrollView } from 'react-native'
import Layout from '../components/Layout'
import { styles } from "../styles/styles.js";

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SERVER_URL} from "@env";

import Loading from '../components/Loading';
import SelectInput from '../components/SelectInput';

import { Entypo,Feather,Ionicons,MaterialIcons,MaterialCommunityIcons,FontAwesome5 } from '@expo/vector-icons';

const EditProfileScreen = ({navigation,route}) => {
    const userID = route.params.param
    const [profile, setProfile] = useState(null)
    const [businesses, setBusinesses] = useState([])
        
    const positionRef = useRef()
    const usernameRef = useRef()
    const emailRef = useRef()
    const countryRef = useRef()
    const phoneRef = useRef()

    const handleChange = (name, value) => {
        setProfile({ ...profile, [name]: value }
    )};

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
                setProfile({...profile, [field]:res.data.fileUrl})})
          .catch(err=>console.log(err));
        } else {
            alert('You did not select any image.');
        }
      };

      const handleProfileEditSubmit = async () => {
        if (profile.fullName === '' || profile.position === '' || profile.username === ''
            || profile.email === ''|| profile.country === '' || profile.phone === '' || profile.businessID === '') {
            setErrorMessage('Please fill all fields')
            return
        }
          const token = await AsyncStorage.getItem('authToken')
          const requestBody = profile

          if (profile.businessID.businessName) {
            requestBody.businessID=profile.businessID._id
          }
    
          axios.put(`${SERVER_URL}/users/profile/${userID}`, requestBody, {headers: {Authorization: `Bearer ${token}`}})
          .then(res => {
              navigation.navigate('ProfilesScreen')})
        .catch(err=>console.log(err));
      }

  const getProfileInfo = async ()=>{
      const token = await AsyncStorage.getItem('authToken')
      axios.get(`${SERVER_URL}/users/profile/${userID}`,{headers: {Authorization: `Bearer ${token}`}})
      .then(response =>{
         setProfile(response.data)
      })
      .catch(err=>console.log(err));
  }
  useEffect(() => {
    getProfileInfo()
  }, [])

  const getBusinesses = async ()=>{
    const token = await AsyncStorage.getItem('authToken')
    axios.get(`${SERVER_URL}/business/profile`,{headers: {Authorization: `Bearer ${token}`}})
    .then(response =>{
        const data = response.data

        setBusinesses(data)
    })
    .catch(err=>console.log(err));
}

useEffect(() => {
    getBusinesses()
}, [])
  

  if(profile) {
    // console.log(profile);
    return (
        <Layout>
            <ScrollView>
                <View style={styles.container}>
                    <Image
                        source={ {uri: profile.pictureUrl} }
                        style={styles.image200r100}
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
                        onSubmitEditing={()=>{positionRef.current.focus()}}
                        blurOnSubmit={false}
                        placeholderTextColor='#fffff'
                        onChangeText={(text) => handleChange('fullName', text)}
                        value={profile.fullName}
                        />
                    </View>
                    <View style={styles.fields}>
                        <Feather name="star" size={30} color="black" />
                        <TextInput
                        style={styles.textInput}
                        placeholder='Position'
                        returnKeyType='next'
                        onSubmitEditing={()=>{usernameRef.current.focus()}}
                        blurOnSubmit={false}
                        placeholderTextColor='#fffff'
                        onChangeText={(text) => handleChange('position', text)}
                        value={profile.position}
                        ref={positionRef}
                        />
                    </View>
                    <View style={styles.fields}>
                        <Feather name="user" size={30} color="black" />
                        <TextInput
                        style={styles.textInput}
                        returnKeyType='next'
                        blurOnSubmit={false}
                        placeholderTextColor='#fffff'
                        placeholder='Username'
                        onSubmitEditing={()=>{emailRef.current.focus()}}
                        onChangeText={(text) => handleChange('username', text)}
                        value={profile.username}
                        ref={usernameRef}
                        />
                    </View>
                    <View style={styles.fields}>
                        <MaterialCommunityIcons name="email-outline" size={30} color="black" />
                        <TextInput
                        style={styles.textInput}
                        returnKeyType='next'
                        blurOnSubmit={false}
                        placeholderTextColor='#fffff'
                        placeholder='Email'
                        keyboardType='email-address'
                        onSubmitEditing={()=>{countryRef.current.focus()}}
                        onChangeText={(text) => handleChange('email', text)}
                        value={profile.email}
                        ref={emailRef}
                        />
                    </View>
                    <View style={styles.fields}>
                        <MaterialIcons name="place" size={30} color="black" />
                        <TextInput
                        style={styles.textInput}
                        returnKeyType='next'
                        blurOnSubmit={false}
                        placeholderTextColor='#fffff'
                        placeholder='Country'
                        onSubmitEditing={()=>{phoneRef.current.focus()}}
                        onChangeText={(text) => handleChange('country', text)}
                        value={profile.country}
                        ref={countryRef}
                        />
                    </View>
                    <View style={styles.fields}>
                        <Entypo name="mobile" size={30} color="black" />
                        <TextInput
                        style={styles.textInput}
                        placeholder='Telephone'
                        placeholderTextColor='#fffff'
                        keyboardType='phone-pad'
                        onChangeText={(text) => handleChange('phone', text)}
                        blurOnSubmit={false}
                        value={('' + profile.phone)}
                        ref={phoneRef}
                        />
                    </View>
                    <View style={styles.fields}>
                        <Ionicons name="md-business-sharp" size={30} color="black" />
                        <View style={styles.selectCompanyField}>
                            <SelectInput data={businesses} setProfile={setProfile} profile={profile}/>
                        </View>
                    </View>
                    {/* <View style={styles.fields}>
                        <Feather name="star" size={30} color="black" />
                        <Text style={styles.textTitleField}>
                            Experience
                        </Text>
                        <View style={styles.CheckboxList}>
                            {Object.entries(user.experience).filter(elem=>elem[1]===true).sort((a,b)=>a[0].localeCompare(b[0])).map(elem => {
                            return <Text key={elem[0]}>{elem[0]}</Text>
                        })}
                        </View>
                    </View> */}
                    <TouchableOpacity style={styles.buttonPrimary} onPress={handleProfileEditSubmit} >
                        <Text style={styles.buttonPrimaryText}>Edit Profile</Text>
                    </TouchableOpacity>
                </View>    
            </ScrollView>  
        </Layout>
    )
  }else{
    return <Loading/>
  }
}

export default EditProfileScreen
