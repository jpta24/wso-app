import React,{ useEffect, useState }  from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import Layout from '../components/Layout'
import Loading from '../components/Loading';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SERVER_URL} from "@env";

import { MaterialCommunityIcons,Entypo,Ionicons,AntDesign} from '@expo/vector-icons';

const ViewBusinessScreen = ({navigation,route}) => {
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
        navigation.setParams({businessID: businessID});
      }, []);
    

if(business) {return (
    <Layout>
          <View style={styles.container}>
              <Image
                  source={ {uri: business.pictureUrl} }
                  style={styles.image}
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

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
      },
      image:{
        width:200,
        height:200,
        borderRadius:75,
        marginBottom:40
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
      textName:{
        paddingStart:20,
        paddingEnd:20,
        fontSize:17,
        fontWeight:'bold',
        paddingBottom:1,
        width:'70%',
        flexWrap:'wrap',
        alignItems: 'flex-start',
    },
    textOther:{
        paddingStart:20,
        paddingEnd:20,
        fontSize:17,
        paddingBottom:8,
        width:'70%',
        flexWrap:'wrap',
        alignItems: 'flex-start',
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