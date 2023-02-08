import React,{ useEffect, useState }  from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import Layout from '../components/Layout'
import Loading from '../components/Loading';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SERVER_URL} from "@env";

import { Entypo,Feather,Ionicons,MaterialIcons,MaterialCommunityIcons } from '@expo/vector-icons';

const ViewProfileScreen = ({navigation,route}) => {
    const userID = route.params.userID
    const [user, setUser] = useState(null)

    const getUserInfo = async ()=>{
        const token = await AsyncStorage.getItem('authToken')
        axios.get(`${SERVER_URL}/user/profile/${userID}`,{headers: {Authorization: `Bearer ${token}`}})
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
    
      if(business) {return (
        <Layout>
              <View style={styles.container}>
                  <Image
                      source={ {uri: user.pictureUrl} }
                      style={styles.image}
                  />
                  <View style={styles.fields}>
                    <FontAwesome5 name="address-card" size={30} color="black" />
                      <Text style={styles.textName}>Name: {user.fullName} </Text>
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
                  <View style={styles.fields}>
                    <Feather name="star" size={30} color="black" />
                    <Text style={styles.textTitleField}>
                        Experience
                    </Text>
                    <View style={styles.CheckboxList}>
                        {Object.entries(user.experience).filter(elem=>elem[1]===true).sort((a,b)=>a[0].localeCompare(b[0])).map(elem => {
                        return <Text key={elem[0]}>{elem[0]}</Text>
                    })}
                    </View>
                </View>
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

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
      },
      image:{
        width:150,
        height:150,
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