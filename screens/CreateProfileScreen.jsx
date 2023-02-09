import React, { useState, useRef, useEffect,useContext,ScrollView }  from 'react'
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import Layout from '../components/Layout'
import { AuthContext } from "../context/auth.context";
import { styles } from "../styles/styles.js";

import * as ImagePicker from "expo-image-picker";
import { SelectList } from 'react-native-dropdown-select-list'

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SERVER_URL} from "@env";

import CheckboxProfile from '../components/CheckboxProfile';

import { Feather,FontAwesome5,Entypo,MaterialIcons,Ionicons} from '@expo/vector-icons';
import userIcon from "../assets/userIcon.png";
import SelectInput from '../components/SelectInput';

const CreateProfileScreen = ({navigation}) => {
    const { user:userID,setUser} = useContext(AuthContext);

    const phoneRef = useRef()
    const countryRef = useRef()
    const positionRef = useRef()
    const [businesses, setBusinesses] = useState([])
    const [errorMessage, setErrorMessage] = useState(undefined);
    const [profile,setProfile] = useState({
        fullName:'',
        phone:'',
        country:'',
        pictureUrl:'',
        position:'',
        // experience:{
        //     coordinator:false,
        //     protectionOfficer:false,
        //     driver:false,
        //     intempreter:false
        // },
        businessID:'',
      })
    
    const handleChange = (name, value) => setProfile({ ...profile, [name]: value });
    // const handleCheckboxChange = (name, value) => setProfile({ ...profile, experience:{...profile.experience, [name]: value} });
  
    const handleCreateProfileSubmit = async () => {
        if (profile.fullName === '' || profile.phone === '' || profile.country === '' || profile.position === '' ) {
            setErrorMessage('Please fill all fields')
            return
        }
        // if (profile.experience.coordinator===false && profile.experience.protectionOfficer===false && profile.experience.driver===false && profile.experience.intempreter===false) {
        //     setErrorMessage('Please select at least one Experience')
        //     return
        // }
        
        const requestBody = profile;
        const token = await AsyncStorage.getItem('authToken')
        axios.post(`${SERVER_URL}/users/updateUser/${userID._id}`, requestBody, {headers: {Authorization: `Bearer ${token}`}})
        .then(res => {
            // 
            setUser({...userID,rol:'memberPending'})
            // navigation.navigate('ProfilesScreen')
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
                setProfile({...profile, [field]:res.data.fileUrl})})
          .catch(err=>console.log(err));
        } else {
            alert('You did not select any image.');
        }
      };
      const imageSource = profile.pictureUrl !== ''
    ? { uri: profile.pictureUrl }
    : userIcon;

    const getBusinesses = async ()=>{
        const token = await AsyncStorage.getItem('authToken')
        axios.get(`${SERVER_URL}/business`,{headers: {Authorization: `Bearer ${token}`}})
        .then(response =>{
            const data = response.data.map(buz=>{
                return {key:buz._id,value:buz.businessName}
            })

            setBusinesses(data)
        })
        .catch(err=>console.log(err));
    }

    useEffect(() => {
        getBusinesses()
    }, [])

    return (
        <Layout>
            <View style={[styles.container]}>
                <Image
                    source={imageSource}
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
                    onChangeText={(text) => handleChange("fullName", text)}
                    />
                </View>
                <View style={styles.fields}>
                    <Feather name="star" size={30} color="black" />
                    <TextInput
                    style={styles.textInput}
                    placeholder='Position'
                    placeholderTextColor='#fffff'
                    onSubmitEditing={()=>{phoneRef.current.focus()}}
                    onChangeText={(text) => handleChange("position", text)}
                    ref={positionRef}
                    />
                </View>
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
                
                {/* <View style={styles.fields}>
                    <Feather name="star" size={30} color="black" />
                    <Text style={styles.textTitleField}>
                        Experience
                    </Text>
                    <View style={styles.CheckboxList}>
                        {Object.keys(profile.experience).sort((a,b)=>a.localeCompare(b)).map(elem => {
                        return <CheckboxProfile key={elem} profile={profile} field={elem} handleCheckboxChange={handleCheckboxChange}/>
                    })}
                    </View>
                </View> */}
                <View style={styles.fields}>
                    <Ionicons name="md-business-sharp" size={30} color="black" />
                    <View style={styles.selectCompanyField}>
                        <SelectInput data={businesses} setProfile={setProfile} profile={profile}/>
                        {/* <SelectList 
                            setSelected={(val) => setProfile({...profile,businessID:val})} 
                            data={businesses} 
                            save="key"
                            placeholder='Select a Security Company'
                            searchPlaceholder='Search for a Company'
                            maxHeight='200'
                            boxStyles={styles.selectCompanyBox} 
                            inputStyles={styles.selectCompanyInput}
                            // search={false} 
                        /> */}
                    </View>
                    
                </View>
                {errorMessage && <Text style={styles.errorText}>{`* ${errorMessage}`}</Text>}
                <TouchableOpacity style={styles.buttonPrimary} onPress={handleCreateProfileSubmit} >
                    <Text style={styles.buttonPrimaryText}>Create Profile</Text>
                </TouchableOpacity>
                
            </View>
        </Layout>
    )
}

export default CreateProfileScreen
