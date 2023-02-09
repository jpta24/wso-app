import React,{ useContext, useEffect, useState } from 'react'
import { Text, TouchableOpacity, View, Image } from 'react-native'
import { useIsFocused } from "@react-navigation/native";
import Layout from '../components/Layout'
import { AuthContext } from "../context/auth.context";
import { styles } from "../styles/styles.js";

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SERVER_URL} from "@env";

import userIcon from "../assets/userIcon.png";
import businessIcon from "../assets/businessIcon.png";
import Loading from '../components/Loading';

const ProfilesScreen = ({navigation}) => {
    const { user:userID,logOutUser } = useContext(AuthContext);
    const [user, setUser] = useState(null)
    const isFocused = useIsFocused();

    const getUserInfo = async ()=>{
      const token = await AsyncStorage.getItem('authToken')
      if (userID) {
        axios.get(`${SERVER_URL}/users/profiles/${userID._id}`,{headers: {Authorization: `Bearer ${token}`}})
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
                <TouchableOpacity style={styles.buttonProfile} onPress={()=>navigation.navigate('CreateProfileScreen')}>
                    <Image
                        source={userIcon}
                        style={styles.image250r10}
                    />
                    <Text style={styles.buttonProfileText}>{(user && !user.fullName) ? 'Create a Personal Profile' : 'View/Edit Personal Profile'}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonProfile} onPress={()=>{
                  user.businessID ? navigation.navigate('ViewBusinessScreen',{businessID:user.businessID._id}) :
                  navigation.navigate('CreateBusinessScreen')
                  } } >
                    <Image
                        source={(user.businessID) ? {uri:user.businessID.pictureUrl} : businessIcon}
                        style={styles.image250r10}
                    />
                    <Text style={styles.buttonProfileText}>{(!user.businessID) ? 'Create a Business Profile' : 'View/Edit Business Profile'}</Text>
                </TouchableOpacity>
                {user.rol ==='user' && <TouchableOpacity style={styles.buttonProfileSO} onPress={logOutUser} >
                    <Text style={styles.buttonProfileText}>Log Out</Text>
                </TouchableOpacity>}
            </View>
            
        </Layout>
    )
   } 
    else {
      return <Loading/>
    }
  }
  


export default ProfilesScreen
