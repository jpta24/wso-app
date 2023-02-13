import React, { useState, useRef,useContext }  from 'react'
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import Layout from '../components/Layout'
import { AuthContext } from "../context/auth.context";
import { styles } from "../styles/styles.js";

import profilesIcon from "../assets/profilesIcon.png";
import teamsIcon from "../assets/teamsIcon.png";
import clientsIcon from "../assets/clientsIcon.png";
import tasksIcon from "../assets/tasksIcon.png";

import { FontAwesome,MaterialIcons } from '@expo/vector-icons';

const DashboardScreen = ({navigation}) => {
    
    const { user } = useContext(AuthContext);
    // console.log(!user.rol.includes('Pending') && user.rol !== 'member');
  return (
    <Layout>
      <View style={styles.container}>
        <View style={styles.containerDashboard}>
          <TouchableOpacity style={styles.buttonProfile} onPress={()=>navigation.navigate('ProfilesScreen')}>
            <FontAwesome name="user" size={120} color="black" />
            {/* <Image
                source={profilesIcon}
                style={styles.image150r10}
            /> */}
            <Text style={styles.buttonProfileText}>Profiles</Text>
          </TouchableOpacity>
          {(!user.rol.includes('Pending') && user.rol !== 'member') && (
            <TouchableOpacity style={styles.buttonProfile} onPress={()=>navigation.navigate('TeamsScreen')}>
              <FontAwesome name="users" size={120} color="black" />
              {/* <Image
                  source={teamsIcon}
                  style={styles.image150r10}
              /> */}
              <Text style={styles.buttonProfileText}>Teams</Text>
            </TouchableOpacity>)}
        </View>
        {!user.rol.includes('Pending') ? (
          <View style={styles.containerDashboard}>
            {user.rol !== 'member' && (
              <TouchableOpacity style={styles.buttonProfile} onPress={()=>navigation.navigate('CreateProfileScreen')}>
                <MaterialIcons name="business-center" size={120} color="black" />
                {/* <Image
                    source={clientsIcon}
                    style={styles.image150r10}
                /> */}
                <Text style={styles.buttonProfileText}>Clients</Text>
              </TouchableOpacity>)}
              <TouchableOpacity style={styles.buttonProfile} onPress={()=>navigation.navigate('CreateProfileScreen')}>
                <FontAwesome name="tasks" size={120} color="black" />
                {/* <Image
                    source={tasksIcon}
                    style={styles.image150r10}
                /> */}
                <Text style={styles.buttonProfileText}>Tasks</Text>
              </TouchableOpacity>
          </View>
        ) : (
          <>
            <Text style={{fontSize:15}}>Your account has not been confirmed by the Business</Text>
            <Text>Please contact the Business or try again later</Text>
          </>
        )}
        
      </View>        
    </Layout>
  )
}

export default DashboardScreen
