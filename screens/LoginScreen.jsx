import React, { useState, useContext } from 'react'
import { StyleSheet, Text, View, Image, TextInput,TouchableOpacity} from 'react-native'
import { useNavigation } from "@react-navigation/native";
import Layout from "../components/Layout";

import axios from 'axios';
import {SERVER_URL} from "@env"; 

import { Feather} from '@expo/vector-icons';
import icon from "../assets/wso-logo.png";

const LoginScreen = () => {
    const { storeToken, authenticateUser} = useContext(AuthContext);
    const navigation = useNavigation();
    const [signup, setSignup] = useState({
      username:'',
      password:''
    })
      
    const [errorMessage, setErrorMessage] = useState(undefined);
  
    const handleChange = (name, value) => setSignup({ ...signup, [name]: value });

    const handleLoginSubmit = () => {
      const { username, password } = signup
  
          const requestBody = { username, password };
          
          axios
              .post(`${SERVER_URL}/auth/login`, requestBody)
              .then((response) => {
                storeToken(response.data.authToken)
                authenticateUser()
              })
              .catch((error) => {
                  const errorDescription = error.response.data.message;
                  setErrorMessage(errorDescription);
              });
      };
  
    const hadleToSignup = () => {
      navigation.navigate('SignupScreen')
    }
  
    return (
      <Layout>
        <View style={styles.container}>
          <Image
            source={icon}
            style={styles.image}
          />
          <View style={styles.fields}>
            <Text
            style={styles.textInput}/>
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
            <Feather name="lock" size={30} color="black" />
            <TextInput
            style={styles.textInput}
            secureTextEntry={true}
            placeholder='Password'
            placeholderTextColor='#fffff'
            onChangeText={(text) => handleChange("password", text)}
            />
          </View>
          {errorMessage && <Text style={styles.errorText}>{`* ${errorMessage}`}</Text>}
          <TouchableOpacity style={styles.button} onPress={handleLoginSubmit} >
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.link} onPress={hadleToSignup} >
            <Text style={styles.linkText}>Don't have an account? Sign up</Text>
          </TouchableOpacity>
        </View>
      </Layout>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container:{
      flex:1,
      justifyContent:'center',
      alignItems:'center'
    },
    image:{
      width:200,
      height:200,
      marginBottom:50
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
    linkText:{
      marginTop:10,
      fontSize:15,
    },
    errorText:{
      color:'#CC302D',
      fontSize:15,
      marginVertical:3
    }
  })