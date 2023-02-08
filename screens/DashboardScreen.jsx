import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import Layout from '../components/Layout'

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

const styles = StyleSheet.create({})