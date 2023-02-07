import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import { useIsFocused } from "@react-navigation/native";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from "axios";

import {SERVER_URL} from "@env";

import Layout from '../components/Layout'

import userIcon from "../assets/userIcon.png";
import businessIcon from "../assets/businessIcon.png";
import Loading from '../components/Loading';

const ProfilesScreen = ({navigation}) => {
    const { user:userID,logOutUser } = useContext(AuthContext);
    const [user, setUser] = useState(null)
    const isFocused = useIsFocused();

    // console.log(userID._id);

    const getUserInfo = async ()=>{
      const token = await AsyncStorage.getItem('authToken')
      if (userID) {
        axios.get(`${SERVER_URL}/users/${userID._id}`,{headers: {Authorization: `Bearer ${token}`}})
      .then(response =>{
         setUser(response.data)
      })
      .catch(err=>console.log(err));
      }
      
  }

    useEffect(() => {
      getUserInfo()
    }, [isFocused,userID])
    
    if(user)  {
   return (
        <Layout>
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('CreateProfileScreen')}>
                    <Image
                        source={userIcon}
                        style={styles.image}
                    />
                    <Text style={styles.buttonText}>{(user && !user.fullName) ? 'Create a Personal Profile' : 'View/Edit Personal Profile'}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={()=>{
                  user.businessID ? navigation.navigate('ViewBusinessScreen',{businessID:user.businessID._id}) :
                  navigation.navigate('CreateBusinessScreen')
                  } } >
                    <Image
                        source={(user.businessID) ? {uri:user.businessID.pictureUrl} : businessIcon}
                        style={styles.image}
                    />
                    <Text style={styles.buttonText}>{(!user.businessID) ? 'Create a Business Profile' : 'View/Edit Business Profile'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonSO} onPress={logOutUser} >
                    <Text style={styles.buttonText}>Log Out</Text>
                </TouchableOpacity>
            </View>
            
        </Layout>
    )
   } 
    else {
      return <Loading/>
    }
  }
  
// }

export default ProfilesScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        paddingBottom:50
      },
    button:{
        marginTop:5,
        paddingVertical:20,
        display:'flex',
        alignItems:'center',
        borderRadius:10,
      },
      buttonText:{
        fontSize:17,
        padding:5,
        fontWeight:'bold'
      },
      image:{
        width:250,
        height:250,
        borderRadius:10
      },
      buttonSO:{
        marginTop:20,
        paddingHorizontal:40,
        backgroundColor:'#CC302D',
        paddingVertical:10,
        display:'flex',
        alignItems:'center',
        borderRadius:10,
      },
})