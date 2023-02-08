import React from 'react'
import { StyleSheet, Text, Image, View } from 'react-native'
import Layout from './Layout'

import icon from "../assets/wso-logo.png";

const Loading = () => {
  return (
    <Layout>
      <View style={styles.container}>
      <Image
            source={icon}
            style={styles.image}
          />
        <Text>LOADING</Text>
      </View>
    </Layout>
  )
}

export default Loading

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    paddingBottom:50
  },
  image:{
    width:150,
    height:150,
},
})