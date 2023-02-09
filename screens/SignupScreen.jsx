import React, { useState,useContext,useRef }  from 'react'
import { Text, View, Image, TextInput,TouchableOpacity} from 'react-native'
import Layout from "../components/Layout";
import { AuthContext } from "../context/auth.context";
import { styles } from "../styles/styles.js";

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SERVER_URL} from "@env";

import { Feather, MaterialCommunityIcons} from '@expo/vector-icons';
import icon from "../assets/wso-logo.png";

const SignupScreen = ({navigation}) => {
  const { setHasSigned } = useContext(AuthContext);
  const [signup, setSignup] = useState({
    email:'',
    username:'',
    password:''
  })

  const usernameRef = useRef()
  const passwordRef = useRef()

  const storeHasSigned = async () => {
    try {
      await AsyncStorage.setItem('hasSigned', 'true')
    } catch (e) {
      console.log(e);
    }
  }
  
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
        storeHasSigned()
        setHasSigned(true)
        navigation.navigate('LoginScreen')
			})
			.catch((error) => {
        console.log(error);
				const errorDescription = error.response.data.message;
				setErrorMessage(errorDescription);
			});
	};

  const hadleToLogin = () => {
    navigation.navigate('LoginScreen')
  }

  return (
    <Layout>
      <View style={styles.container}>
        <Image
          source={icon}
          style={styles.image200r50}
        />
        <View style={styles.fields}>
          <MaterialCommunityIcons name="email-outline" size={30} color="black" />
          <TextInput
          style={styles.textInput}
          placeholder='Email'
          placeholderTextColor='#fffff'
          onChangeText={(text) => handleChange("email", text)}
          onSubmitEditing={()=>{usernameRef.current.focus()}}
          blurOnSubmit={false}
          returnKeyType='next'
          />
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
          ref={usernameRef}
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
          blurOnSubmit={false}
          ref={passwordRef}
          />
        </View>
        {errorMessage && <Text style={styles.errorText}>{`* ${errorMessage}`}</Text>}
        <TouchableOpacity style={styles.buttonPrimary} onPress={handleSignupSubmit} >
          <Text style={styles.buttonPrimaryText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.link} onPress={hadleToLogin} >
          <Text style={styles.linkText}>Already have an account? Log In</Text>
        </TouchableOpacity>
      </View>
    </Layout>
  )
}

export default SignupScreen
