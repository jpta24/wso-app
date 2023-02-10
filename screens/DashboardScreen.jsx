import React, { useState, useRef,useContext }  from 'react'
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import Layout from '../components/Layout'
import { AuthContext } from "../context/auth.context";
import { styles } from "../styles/styles.js";

import profilesIcon from "../assets/profilesIcon.png";
import teamsIcon from "../assets/teamsIcon.png";
import clientsIcon from "../assets/clientsIcon.png";
import tasksIcon from "../assets/tasksIcon.png";

const DashboardScreen = ({navigation}) => {
    
    const { user:userID } = useContext(AuthContext);
    console.log(userID);
  return (
    <Layout>
      <View style={styles.container}>
        <View style={styles.containerDashboard}>
          <TouchableOpacity style={styles.buttonProfile} onPress={()=>navigation.navigate('CreateProfileScreen')}>
            <Image
                source={profilesIcon}
                style={styles.image150r10}
            />
            <Text style={styles.buttonProfileText}>Profiles</Text>
          </TouchableOpacity>
          {<TouchableOpacity style={styles.buttonProfile} onPress={()=>navigation.navigate('CreateProfileScreen')}>
            <Image
                source={teamsIcon}
                style={styles.image150r10}
            />
            <Text style={styles.buttonProfileText}>Teams</Text>
          </TouchableOpacity>}
        </View>
        <View style={styles.containerDashboard}>
          <TouchableOpacity style={styles.buttonProfile} onPress={()=>navigation.navigate('CreateProfileScreen')}>
            <Image
                source={clientsIcon}
                style={styles.image150r10}
            />
            <Text style={styles.buttonProfileText}>Clients</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonProfile} onPress={()=>navigation.navigate('CreateProfileScreen')}>
            <Image
                source={tasksIcon}
                style={styles.image150r10}
            />
            <Text style={styles.buttonProfileText}>Tasks</Text>
          </TouchableOpacity>
        </View>
        
      </View>        
    </Layout>
  )
}

export default DashboardScreen
