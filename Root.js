import React, { useContext, useReducer } from "react";
import { TouchableOpacity,View,Text} from 'react-native'
import { NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { optionsDefault } from "./styles/options.js";

import {  AuthContext } from './context/auth.context';

import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import ProfilesScreen from "./screens/ProfilesScreen";
import CreateProfileScreen from "./screens/CreateProfileScreen";
import CreateBusinessScreen from "./screens/CreateBusinessScreen";
import ViewBusinessScreen from "./screens/ViewBusinessScreen";
import EditBusinessScreen from "./screens/EditBusinessScreen";
import SplashScreen from "./screens/SplashScreen";
import DashboardScreen from "./screens/DashboardScreen";

import { Feather } from '@expo/vector-icons';
import Loading from "./components/Loading";

const Stack = createNativeStackNavigator();

const Root = () => {
    const { isLoggedIn, hasSigned,user } = useContext(AuthContext);
    
    if (hasSigned === null || isLoggedIn === null) {
        return <SplashScreen/>
    }else {
    return (
    <NavigationContainer>
        <Stack.Navigator>
        {!hasSigned ? (
            <>
                <Stack.Screen
                    name="SignupScreen"
                    component={SignupScreen}
                    options={optionsDefault('Sign Up')}
                />
                <Stack.Screen
                    name="LoginScreen"
                    component={LoginScreen}
                    options={optionsDefault('Log In')}
                />
            </>
        ) : ( !isLoggedIn ?(
                <>
                    <Stack.Screen
                        name="LoginScreen"
                        component={LoginScreen}
                        options={optionsDefault('Log In')}
                    />
                    <Stack.Screen
                        name="SignupScreen"
                        component={SignupScreen}
                        options={optionsDefault('Sign Up')}
                    />
                </>
            ) : ( !user ? (
                <Stack.Screen
                        name="Loading"
                        component={Loading}
                        options={{
                        headerShown: false
                    }}
                    />
                ) : (
                    user.rol === 'user' ? ( 
                    <>
                        <Stack.Screen
                            name="ProfilesScreen"
                            component={ProfilesScreen}
                            options={optionsDefault('Profiles')}
                        />
                        <Stack.Screen
                            name="CreateProfileScreen"
                            component={CreateProfileScreen}
                            options={optionsDefault('Create Profile')}
                        />
                        <Stack.Screen
                            name="CreateBusinessScreen"
                            component={CreateBusinessScreen}
                            options={optionsDefault('Create Business')}
                        />
                        <Stack.Screen
                            name="ViewBusinessScreen"
                            component={ViewBusinessScreen}
                            options={({navigation,route})=>({
                            title: "Business",
                            headerTitleStyle: {
                                color: "#ffffff",
                            },
                            headerTitleAlign: 'center',
                            headerStyle: {
                                backgroundColor: "rgba(0,0,0,0.8)",
                            },
                            headerTintColor: "#fff",

                            headerTitleStyle: {
                                color: "#ffffff",
                            },
                            headerRight:() => (
                                <TouchableOpacity  
                                onPress={() =>{
                                    navigation.navigate("EditBusinessScreen",{businessID:route.params.businessID})}}
                                >
                                    <Feather name="edit" size={24} color="white" />
                                </TouchableOpacity>
                            )
                            })}
                        />
                        <Stack.Screen
                            name="EditBusinessScreen"
                            component={EditBusinessScreen}
                            options={optionsDefault('Edit Business')}
                        />
                    </>
                    ) : (
                        <>
                            <Stack.Screen
                                name="DashboardScreen"
                                component={DashboardScreen}
                                options={optionsDefault('Dashboard')}
                            />    
                        </>
                    
                    ))
                
            )
        )
        }
          
        </Stack.Navigator>
      </NavigationContainer>
  )}
  
}

export default Root