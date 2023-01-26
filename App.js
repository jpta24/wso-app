import React from "react";
import { StyleSheet, Text, View, Image, TextInput,TouchableOpacity} from 'react-native'
import { NavigationContainer,useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import TestScreen from "./screens/TestScreen";
import Dashboard from "./screens/Dashboard";
import ProfileScreen from "./screens/ProfileScreen";

const Stack = createNativeStackNavigator();

export default function App() {  
  
  const removeToken = async () => {
    try {
      await AsyncStorage.removeItem('authToken')
    } catch(e) {
      console.log(e);
    }
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CreateProfileScreen">
        <Stack.Screen
          name="CreateProfileScreen"
          component={ProfileScreen}
          options={{
            title: 'Create Profile',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: "rgba(0,0,0,0.8)",
            },
            headerTintColor: "#fff",

            headerTitleStyle: {
              color: "#ffffff",
            },
          }}
        />
        <Stack.Screen
          name="SignupScreen"
          component={SignupScreen}
          options={{
            title: 'Sign Up',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: "rgba(0,0,0,0.8)",
            },
            headerTintColor: "#fff",

            headerTitleStyle: {
              color: "#ffffff",
            },
          }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            title: 'Log In',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: "rgba(0,0,0,0.8)",
            },
            headerTintColor: "#fff",

            headerTitleStyle: {
              color: "#ffffff",
            },
          }}
        />
        <Stack.Screen
          name="TestScreen"
          component={TestScreen}
          options={{
            title: 'Screen de Prueba',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: "rgba(0,0,0,0.8)",
            },
            headerTintColor: "#fff",

            headerTitleStyle: {
              color: "#ffffff",
            },
          }}
        />
      </Stack.Navigator>
      <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            title: 'Sign Up',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: "rgba(0,0,0,0.8)",
            },
            headerTintColor: "#fff",

            headerTitleStyle: {
              color: "#ffffff",
            },
          }}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            title: 'Dashboard',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: "rgba(0,0,0,0.8)",
            },
            headerTintColor: "#fff",

            headerTitleStyle: {
              color: "#ffffff",
            },
            // headerRight:() => (
            //   <TouchableOpacity 
            //   style={styles.logoutButton} 
            //   onPress={() => navigation.navigate("LoginScreen")}
            //    >
            //     <Text style={styles.logoutButtonText}>Log Out</Text>
            //   </TouchableOpacity>
            // )
          }}
        />
        
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  logoutButton: {
    padding:7,
    backgroundColor:'#CC302D',
    paddingVertical:5,
    display:'flex',
    alignItems:'center',
    borderRadius:3,
  },
  logoutButtonText:{
    color:'#ffff'
  }
});


