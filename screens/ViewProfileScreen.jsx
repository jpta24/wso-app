import React,{ useEffect, useState }  from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import Layout from '../components/Layout'
import Loading from '../components/Loading';
import { styles } from "../styles/styles.js";

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SERVER_URL} from "@env";

import { Entypo,Feather,Ionicons,MaterialIcons,MaterialCommunityIcons,FontAwesome5 } from '@expo/vector-icons';

const ViewProfileScreen = ({navigation,route}) => {
  // console.log(route.params);
    const userID = route.params.userID
    const [user, setUser] = useState(null)

    const getUserInfo = async ()=>{
        const token = await AsyncStorage.getItem('authToken')
        axios.get(`${SERVER_URL}/users/profile/${userID}`,{headers: {Authorization: `Bearer ${token}`}})
        .then(response =>{
           setUser(response.data)
        })
        .catch(err=>console.log(err));
    }
    
    useEffect(() => {
        getUserInfo()
      }, [])

      useEffect(() => {
        navigation.setParams({userID});
      }, []);
    
      if(user) {return (
        <Layout>
              <View style={styles.container}>
                  <Image
                      source={ {uri: user.pictureUrl} }
                      style={styles.image200r100}
                  />
                  <View style={styles.fields}>
                    <FontAwesome5 name="address-card" size={30} color="black" />
                      <Text style={styles.textName}>{user.fullName} </Text>
                  </View>
                  <View style={styles.fields}>
                      <Feather name="star" size={30} color="black" />
                      <Text style={styles.textOther}>{`${user.position}`}</Text>
                  </View>
                  <View style={styles.fields}>
                    <Feather name="user" size={30} color="black" />
                      <Text style={styles.textOther}>{`${user.username}`}</Text>
                  </View>
                  <View style={styles.fields}>
                        <MaterialCommunityIcons name="email-outline" size={30} color="black" />
                        <Text style={styles.textOther}>{`${user.email}`}</Text>
                    </View>
                  <View style={styles.fields}>
                    <MaterialIcons name="place" size={30} color="black" />
                      <Text style={styles.textOther}>{`${user.country}`}</Text>
                  </View>
                  <View style={styles.fields}>
                      <Entypo name="mobile" size={30} color="black" />
                      <Text style={styles.textOther}>{`${user.phone}`}</Text>
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
                <View style={styles.fields}>
                    <Ionicons name="md-business-sharp" size={30} color="black" />
                      <Text style={styles.textOther}>{`${user.businessID.businessName}`}</Text>
                  </View>

              </View>
          </Layout>
      )}else{
        return <Loading/>
      }
    }

export default ViewProfileScreen

