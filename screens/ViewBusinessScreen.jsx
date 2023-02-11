import React,{ useEffect, useState }  from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import Layout from '../components/Layout'
import Loading from '../components/Loading';
import { styles } from "../styles/styles.js";

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SERVER_URL} from "@env";

import { MaterialCommunityIcons,Entypo,Ionicons,AntDesign} from '@expo/vector-icons';

const ViewBusinessScreen = ({navigation,route}) => {
  const profileRol= route.params.profileRol
    const businessID = route.params.businessID
    const [business, setBusiness] = useState(null)
    

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

    useEffect(() => {
      if (profileRol === 'admin') {
        navigation.setParams({businessID: businessID});
      }
        
      }, []);
    

if(business) {return (
    <Layout>
          <View style={styles.container}>
              <Image
                  source={ {uri: business.pictureUrl} }
                  style={[styles.image,{marginBottom:40}]}
              />
              <View style={styles.fields}>
                <Ionicons name="md-business-sharp" size={30} color="black" />
                  <Text style={styles.textName}>Business: {business.businessName} </Text>
              </View>
              <View style={styles.fields}>
                  <AntDesign name="swapright" size={30} color="black" />
                  <View>
                  <Text style={styles.textOther}>{`Address:`}</Text>
                  <Text style={styles.textOther}>{`${business.address.street}, ${business.address.city} - ${business.address.country}.`}</Text>
                  </View>
              </View>
              
              <View style={styles.fields}>
                  <Entypo name="mobile" size={30} color="black" />
                  <Text style={styles.textOther}>{`${business.address.phone}`}</Text>
              </View>
              <View style={styles.fields}>
                    <MaterialCommunityIcons name="email-outline" size={30} color="black" />
                    <Text style={styles.textOther}>{`${business.address.email}`}</Text>
                </View>
          </View>
      </Layout>
  )}else{
    return <Loading/>
  }
}

export default ViewBusinessScreen
