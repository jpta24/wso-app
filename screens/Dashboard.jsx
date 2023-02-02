import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'

import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

import Layout from '../components/Layout'

import userIcon from "../assets/userIcon.png";
import businessIcon from "../assets/businessIcon.png";

const Dashboard = ({navigation}) => {
    const { user,logOutUser } = useContext(AuthContext);

   return (
        <Layout>
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('CreateProfileScreen')}>
                    <Image
                        source={userIcon}
                        style={styles.image}
                    />
                    <Text style={styles.buttonText}>Create a Personal Profile</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}  >
                    <Image
                        source={businessIcon}
                        style={styles.image}
                    />
                    <Text style={styles.buttonText}>Create a Business</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonSO} onPress={logOutUser} >
                    <Text style={styles.buttonText}>Log Out</Text>
                </TouchableOpacity>
            </View>
            
        </Layout>
    )
  }
  
// }

export default Dashboard

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