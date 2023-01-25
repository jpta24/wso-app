import React from 'react'
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View, Image, TextInput,TouchableOpacity, FlatList } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather, MaterialCommunityIcons} from '@expo/vector-icons';
import axios from 'axios';

import {SERVER_URL} from "@env";

import icon from "../assets/wso-logo.png";

import Layout from "../components/Layout";

const SignupScreen = () => {
  const navigation = useNavigation();
  const [signup, setSignup] = useState({
    email:'',
    username:'',
    password:''
  })

  const storeData = async () => {
    try {
      await AsyncStorage.setItem('hasSigned', 'true')
    } catch (e) {
      console.log(e);
    }
  }
  
const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('hasSigned')
    if(value === 'true') {
      navigation.navigate('LoginScreen');
    }
    return value
    
  } catch(e) {
    console.log(e);
  }
}

const removeValue = async () => {
  try {
    await AsyncStorage.removeItem('hasSigned')
  } catch(e) {
    console.log(e);
  }
}

getData()
// removeValue()
  
	const [errorMessage, setErrorMessage] = useState(undefined);

  const handleChange = (name, value) => setSignup({ ...signup, [name]: value });

  const handleSignupSubmit = () => {
    const { username, password, email } = signup

		const requestBody = { username, password, email };
		// Make an axios request to the API
		// If POST request is successful redirect to login page
		// If the request resolves with an error, set the error message in the state
		axios
			.post(`${SERVER_URL}/auth/signup`, requestBody)
			.then((response) => {
        storeData()
				navigation.navigate('LoginScreen');
			})
			.catch((error) => {
				const errorDescription = error.response.data.message;
				setErrorMessage(errorDescription);
			});
	};

  return (
    <Layout>
      <View style={styles.container}>
        <Image
          source={icon}
          style={styles.image}
        />
        <View style={styles.fields}>
          <MaterialCommunityIcons name="email-outline" size={30} color="black" />
          <TextInput
          style={styles.textInput}
          placeholder='Email'
          placeholderTextColor='#fffff'
          onChangeText={(text) => handleChange("email", text)}
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
        <TouchableOpacity style={styles.button} onPress={handleSignupSubmit} >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.link} >
          <Text style={styles.linkText}>Already have an account? Log In</Text>
        </TouchableOpacity>
      </View>
    </Layout>
  )
}

export default SignupScreen

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