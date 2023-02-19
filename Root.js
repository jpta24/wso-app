import React, { useContext } from "react";
import { TouchableOpacity,View,Text} from 'react-native'
import { NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { optionsDefault,optionsHeaderRightEdit,optionsSO,optionsHeaderAddNew } from "./styles/options.js";

import {  AuthContext } from './context/auth.context';

import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import ProfilesScreen from "./screens/ProfilesScreen";
import CreateProfileScreen from "./screens/CreateProfileScreen";
import CreateBusinessScreen from "./screens/CreateBusinessScreen";
import ViewProfileScreen from "./screens/ViewProfileScreen";
import EditProfileScreen from "./screens/EditProfileScreen";
import ViewBusinessScreen from "./screens/ViewBusinessScreen";
import EditBusinessScreen from "./screens/EditBusinessScreen";
import SplashScreen from "./screens/SplashScreen";
import DashboardScreen from "./screens/DashboardScreen";
import TeamsScreen from "./screens/TeamsScreen";
import ClientsScreen from "./screens/ClientsScreen";
import NewClientScreen from "./screens/NewClientScreen";

import { Feather } from '@expo/vector-icons';
import Loading from "./components/Loading";
import { styles } from "./styles/styles.js";

const Stack = createNativeStackNavigator();

const Root = () => {
    const { isLoggedIn, hasSigned,user, logOutUser } = useContext(AuthContext);
        // console.log('root',user);
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
                    <>
                            <Stack.Screen
                                name="DashboardScreen"
                                component={DashboardScreen}
                                options={()=>(
                                    optionsSO('Dashboard',logOutUser)
                                )}
                                
                            /> 
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
                                    name="ViewProfileScreen"
                                    component={ViewProfileScreen}
                                    options={({navigation,route})=>(
                                        optionsHeaderRightEdit(user,navigation,route,'Profile')
                                    )}
                                />
                                <Stack.Screen
                                    name="EditProfileScreen"
                                    component={EditProfileScreen}
                                    options={optionsDefault('Edit Profile')}
                                />
                                <Stack.Screen
                                    name="CreateBusinessScreen"
                                    component={CreateBusinessScreen}
                                    options={optionsDefault('Create Business')}
                                />
                                <Stack.Screen
                                    name="ViewBusinessScreen"
                                    component={ViewBusinessScreen}
                                    options={({navigation,route})=>(
                                        optionsHeaderRightEdit(user,navigation,route,'Business')
                                    )}
                                />
                                <Stack.Screen
                                    name="EditBusinessScreen"
                                    component={EditBusinessScreen}
                                    options={optionsDefault('Edit Business')}
                                />
                                <Stack.Screen
                                    name="TeamsScreen"
                                    component={TeamsScreen}
                                    options={optionsDefault('Teams')}
                                />
                                <Stack.Screen
                                    name="ClientsScreen"
                                    component={ClientsScreen}
                                    options={({navigation,route})=>(
                                        optionsHeaderAddNew(navigation,route,'Clients')
                                    )}
                                />
                                <Stack.Screen
                                    name="NewClientScreen"
                                    component={NewClientScreen}
                                    options={optionsDefault('New Client')}
                                />
                            </>   
                        </>)
                
            )
        )
        }
          
        </Stack.Navigator>
      </NavigationContainer>
  )}
  
}

export default Root