import React, { useState, useRef,useContext }  from 'react'
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import Layout from '../components/Layout'
import { AuthContext } from "../context/auth.context";
import { styles } from "../styles/styles.js";

const DashboardScreen = () => {
    
    const { user:userID,logOutUser } = useContext(AuthContext);
  return (
    <Layout>
      <Text>DashboardScreen</Text>
                <TouchableOpacity style={styles.buttonSO} onPress={logOutUser} >
                    <Text style={styles.buttonText}>Log Out</Text>
                </TouchableOpacity>
    </Layout>
  )
}

export default DashboardScreen
