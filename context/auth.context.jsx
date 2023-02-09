import { createContext, useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from "axios";

import {SERVER_URL} from "@env";
 
const AuthContext = createContext();
 
function AuthProviderWrapper(props) {
  
    // 1. State variables are initialized
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasSigned, setHasSigned] = useState(null);
  const [user, setUser] = useState(null);

  const getHasSigned = async () => {
    try {
      const value = await AsyncStorage.getItem('hasSigned')
      if (value) {
        setHasSigned(true)
      } else {
        setHasSigned(false)
      }
      return value
      
    } catch(e) {
      console.log(e);
    }
  }

  /* 
    Functions for handling the authentication status (isLoggedIn, isLoading, user)
    will be added here later in the next step
  */
    const storeToken = async (token) => {
      try {
        await AsyncStorage.setItem('authToken', token)
      } catch (e) {
        console.log(e);
      }
    }

    const storedToken = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken')
        return token
        
      } catch(e) {
        console.log(e);
      }
    }

    const authenticateUser = async (url) => {      
        // Get the stored token from the localStorage
        const token = await AsyncStorage.getItem('authToken')
         // will return either the token or null
        // If the token exists in the localStorage
        if (token) {
          // console.log(storedToken);
          // We must send the JWT token in the request's "Authorization" Headers
          axios.get(
            `${SERVER_URL}/auth/verify`, 
            { headers: { Authorization: `Bearer ${token}`} }
          )
          .then((response) => {
            // If the server verifies that JWT token is valid  
            const user = response.data;
           // Update state variables        
            setIsLoggedIn(true);
            setIsLoading(false);
            setUser(user);  
            return user   
          })
          .catch((error) => {
            // If the server sends an error response (invalid token) 
            // Update state variables         
            setIsLoggedIn(false);
            setIsLoading(false);
            setUser(null);        
          });      //
        } else {
          // If the token is not available (or is removed)
            setIsLoggedIn(false);
            setIsLoading(false);
            setUser(null);      
        }   
      }

      const removeToken = async () => {
        try {
          await AsyncStorage.removeItem('authToken')
          setIsLoggedIn(false)
        } catch(e) {
          console.log(e);
        }
      }
     
      const logOutUser = () => {                 
        // To log out the user, remove the token
        removeToken();
        // and update the state variables    
        authenticateUser();
      }  

    //   ///////////////////RESTART APP UNCOMMENT NEXT BLOCK WITH FUNCTION INVOKE////////////////////////
    //   const removeValue = async () => {
    //   try {
    //     await AsyncStorage.removeItem('hasSigned')
    //   } catch(e) {
    //     console.log(e);
    //   }
    // }
  
    // removeValue()
    // removeToken();

    
      // 3. Checks if we have a JWT token in localStorage
      // If yes, update our state variables accordingly
      // If not, update our state variable isLoading to false
      useEffect(()=>{
        authenticateUser();
        getHasSigned();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])
      
      // 2. Provider component that will share 'value' to the rest of the component tree
  return (
    <AuthContext.Provider value={{ isLoggedIn, isLoading, user, setUser,storeToken, authenticateUser, logOutUser, setHasSigned, hasSigned }}>
      {props.children}
    </AuthContext.Provider>
  )
}
 
export { AuthProviderWrapper, AuthContext };