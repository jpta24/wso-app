import React, { useState, useContext,useRef } from 'react'
import { StyleSheet, Text, View, Image, TextInput,TouchableOpacity} from 'react-native'
import { useNavigation } from "@react-navigation/native";
import Layout from "../components/Layout"
import { AuthContext } from "../context/auth.context";
import { styles } from "../styles/styles.js";

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SERVER_URL} from "@env"; 

import { Feather} from '@expo/vector-icons';
import icon from "../assets/wso-logo.png";

const LoginScreen = () => {
  const passwordRef = useRef()
    const { storeToken, authenticateUser} = useContext(AuthContext);
    const navigation = useNavigation();
    const [signup, setSignup] = useState({
      username:'',
      password:''
    })
      
    const [errorMessage, setErrorMessage] = useState(undefined);
  
    const handleChange = (name, value) => setSignup({ ...signup, [name]: value });
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

    const handleLoginSubmit = () => {
      const { username, password } = signup
  
          const requestBody = { username, password };
          
          axios
              .post(`${SERVER_URL}/auth/login`, requestBody)
              .then((response) => {
                storeHasSigned()
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
            style={styles.image200r50}
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
            onSubmitEditing={()=>{passwordRef.current.focus()}}
            blurOnSubmit={false}
            returnKeyType='next'
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
            ref={passwordRef}
            />
          </View>
          {errorMessage && <Text style={styles.errorText}>{`* ${errorMessage}`}</Text>}
          <TouchableOpacity style={styles.buttonPrimary} onPress={handleLoginSubmit} >
            <Text style={styles.buttonPrimaryText}>Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.link} onPress={hadleToSignup} >
            <Text style={styles.linkText}>Don't have an account? Sign up</Text>
          </TouchableOpacity>
        </View>
      </Layout>
    )
}

export default LoginScreen
