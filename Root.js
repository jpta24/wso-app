import React, { useContext } from "react";
import { TouchableOpacity} from 'react-native'
import { NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {  AuthContext } from './context/auth.context';

import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import ProfilesScreen from "./screens/ProfilesScreen";
import CreateProfileScreen from "./screens/CreateProfileScreen";
import CreateBusinessScreen from "./screens/CreateBusinessScreen";
import ViewBusinessScreen from "./screens/ViewBusinessScreen";
import EditBusinessScreen from "./screens/EditBusinessScreen";
import SplashScreen from "./screens/SplashScreen";

import { Feather } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();

const Root = () => {
    const { isLoggedIn, hasSigned,user } = useContext(AuthContext);
    
  return (
    <NavigationContainer>
        <Stack.Navigator>
        {!hasSigned ? (
            <>
                {/* <Stack.Screen
                    name="SplashScreen"
                    component={SplashScreen}
                    options={{
                        headerShown: false
                    }}
                /> */}
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
            </>
        ) : ( !isLoggedIn ?(
                <>
                    <Stack.Screen
                        name="SplashScreen"
                        component={SplashScreen}
                        options={{
                            headerShown: false
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
                </>
            ) : (
                <>
                    <Stack.Screen
                        name="ProfilesScreen"
                        component={ProfilesScreen}
                        options={{
                        title: "Profiles",
                        headerStyle: {
                            backgroundColor: "#222f3e",
                        },
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
                        // headerRight:() => (
                        //     <TouchableOpacity 
                        //     style={styles.logoutButton} 
                        //     onPress={() =>{
                        //     removeToken()
                        //     navigation.navigate("LoginScreen")}}
                        //     >
                        //     <Text style={styles.logoutButtonText}>Log Out</Text>
                        //     </TouchableOpacity>
                        // )
                        }}
                    />
                    <Stack.Screen
                        name="CreateProfileScreen"
                        component={CreateProfileScreen}
                        options={{
                        title: "Create Profile",
                        headerStyle: {
                            backgroundColor: "#222f3e",
                        },
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
                        }
                        }}
                    />
                    <Stack.Screen
                        name="CreateBusinessScreen"
                        component={CreateBusinessScreen}
                        options={{
                        title: "Create Business",
                        headerStyle: {
                            backgroundColor: "#222f3e",
                        },
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
                        }
                        }}
                    />
                    <Stack.Screen
                        name="ViewBusinessScreen"
                        component={ViewBusinessScreen}
                        options={({navigation,route})=>({
                        title: "Business",
                        headerStyle: {
                            backgroundColor: "#222f3e",
                        },
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
                            // style={styles.logoutButton} 
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
                        options={{
                        title: "Edit Business",
                        headerStyle: {
                            backgroundColor: "#222f3e",
                        },
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
                        }
                        }}
                    />
                </>
            )
        )
        }
          
        </Stack.Navigator>
      </NavigationContainer>
  )
}

export default Root