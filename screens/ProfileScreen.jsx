import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ImageViewer } from 'react-native'
import React from 'react'
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

import { FontAwesome5 } from '@expo/vector-icons';
import { Feather, MaterialCommunityIcons} from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import Layout from '../components/Layout'

import userIcon from "../assets/userIcon.png";

const ProfileScreen = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [user,setUser] = useState({
        email:'',
        username:'',
        fullName:'',
        phone:'',
        country:'',
        picture:'',
        experience:[],
        capacities:[]
      })
    
    const handleChange = (name, value) => setSignup({ ...user, [name]: value });

    const openImagePickerAsync = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    
        if (permissionResult.granted === false) {
          alert("Permission to camara roll is required");
          return;
        }
    
        const pickerResult = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
          });
        // console.log(pickerResult)
    
        if (!pickerResult.canceled) {
            setUser({...user,picture:pickerResult.assets[0].uri});
        } else {
            alert('You did not select any image.');
        }
    
        // if (Platform.OS === "web") {
        //   let remoteUri = await uploadAnonymousFilesAsync(pickerResult.uri);
        //   setSelectedImage({ localUri: pickerResult.uri, remoteUri });
        // } else {
        //   setSelectedImage({ localUri: pickerResult.uri });
        // }
      };

      const imageSource = user.picture !== ''
    ? { uri: user.picture }
    : userIcon;

    return (
        <Layout>
            <View style={styles.container}>
                <Image
                    source={imageSource}
                    style={styles.image}
                />
                
                <TouchableOpacity style={styles.btnImg} onPress={openImagePickerAsync} >
                    <Text style={styles.btnImgText}>Change Image</Text>
                </TouchableOpacity>
                <View style={styles.fields}>
                    <FontAwesome5 name="address-card" size={30} color="black" />
                    <TextInput
                    style={styles.textInput}
                    placeholder='Full Name'
                    placeholderTextColor='#fffff'
                    onChangeText={(text) => handleChange("fullName", text)}
                    />
                </View>
                <View style={styles.fields}>
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
                </View>
                <View style={styles.fields}>
                    <Entypo name="mobile" size={30} color="black" />
                    <TextInput
                    style={styles.textInput}
                    placeholder='Telephone'
                    placeholderTextColor='#fffff'
                    keyboardType='phone-pad'
                    onChangeText={(text) => handleChange("phone", text)}
                    />
                </View>
                <View style={styles.fields}>
                    <MaterialIcons name="place" size={30} color="black" />
                    <TextInput
                    style={styles.textInput}
                    placeholder='Country'
                    placeholderTextColor='#fffff'
                    onChangeText={(text) => handleChange("country", text)}
                    />
                </View>
                
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
        paddingBottom:50
      },
      image:{
        width:150,
        height:150,
        borderRadius:75
      },
      fields:{
        width:'100%',
        height:50,
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
})