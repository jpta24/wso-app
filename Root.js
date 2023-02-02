import React, { useContext } from "react";
import { NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {  AuthContext } from './context/auth.context';

import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import Dashboard from "./screens/Dashboard";
import ProfileScreen from "./screens/ProfileScreen";

const Stack = createNativeStackNavigator();

const Root = () => {
    const { isLoggedIn, hasSigned } = useContext(AuthContext);

  return (
    <NavigationContainer>
        <Stack.Navigator>
        {!hasSigned ? (
            <>
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
                        name="Dashboard"
                        component={Dashboard}
                        options={({ navigation }) => ({
                        title: "Dashboard",
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
                        })}
                    />
                    <Stack.Screen
                        name="CreateProfileScreen"
                        component={ProfileScreen}
                        options={({ navigation }) => ({
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
                        })}
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