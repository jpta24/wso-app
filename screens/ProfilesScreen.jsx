import React,{ useContext, useEffect, useState } from 'react'
import { Text, TouchableOpacity, View, Image } from 'react-native'
import { useIsFocused } from "@react-navigation/native";
import Layout from '../components/Layout'
import { AuthContext } from "../context/auth.context";
import { styles } from "../styles/styles.js";

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SERVER_URL} from "@env";

import { FontAwesome,MaterialIcons } from '@expo/vector-icons';
import userIcon from "../assets/userIcon.png";
import businessIcon from "../assets/businessIcon.png";
import Loading from '../components/Loading';

const ProfilesScreen = ({navigation}) => {
    const { user:userID,logOutUser,authenticateUser} = useContext(AuthContext);
    const [profile, setProfile] = useState(null)
    const isFocused = useIsFocused();
    // console.log(isFocused);
    // console.log(userID);
    const storeHasSigned = async () => {
      try {
        const isYetSigned = await AsyncStorage.getItem('hasSigned')
        if (!isYetSigned) {
          await AsyncStorage.setItem('hasSigned', 'true')
        }
      } catch (e) {
        console.log(e);
      }
    }

    const getProfileInfo = async ()=>{
      const token = await AsyncStorage.getItem('authToken')
      if (userID) {
        axios.get(`${SERVER_URL}/users/profiles/${userID._id}`,{headers: {Authorization: `Bearer ${token}`}})
      .then(response =>{
         setProfile(response.data)
      })
      .catch(err=>console.log(err));
      }
    }

    useEffect(() => {
      getProfileInfo()
      storeHasSigned()
      authenticateUser()
    }, [isFocused])

    if(profile)  {
      const imageSource = profile.pictureUrl ? { uri: profile.pictureUrl } : userIcon;
   return (
        <Layout>
            <View style={styles.container}>
                <TouchableOpacity style={styles.buttonProfile} onPress={()=>{
                  profile.businessID ? 
                  navigation.navigate('ViewProfileScreen',{userID:profile._id}) 
                  :
                  navigation.navigate('CreateProfileScreen')
                  }}>
                  {/* <FontAwesome name="user" size={200} color="black" /> */}
                    <Image
                        source={imageSource}
                        style={styles.image250r10}
                    />
                    <Text style={styles.buttonProfileText}>{(profile && !profile.fullName) ? 'Create a Personal Profile' : 'View Personal Profile'}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonProfile} onPress={()=>{
                  profile.businessID ? 
                  navigation.navigate('ViewBusinessScreen',{businessID:profile.businessID._id,profileRol:userID.rol}) 
                  :
                  navigation.navigate('CreateBusinessScreen')
                  } } >
                    <Image
                        source={(profile.businessID) ? {uri:profile.businessID.pictureUrl} : businessIcon}
                        style={styles.image250r10}
                    />
                    <Text style={styles.buttonProfileText}>{(!profile.businessID) ? 'Create a Business Profile' : 'View/Edit Business Profile'}</Text>
                </TouchableOpacity>
            </View>
            
        </Layout>
    )
   } 
    else {
      return <Loading/>
    }
  }
  


export default ProfilesScreen
