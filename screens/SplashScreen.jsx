import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native'

import icon from "../assets/wso-logo.png";

const SplashScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Image
            source={icon}
            style={styles.image}
          />
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
    image:{
        width:150,
        height:150,
        marginTop:235,
        marginHorizontal:130,
        
    },
    container:{
        width:'100%',
    }
})