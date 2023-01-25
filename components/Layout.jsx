import React from 'react'
import { View, StatusBar, StyleSheet } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

const Layout = ({ children }) => {
  return (
    <View style={styles.background}>
      <StatusBar backgroundColor="rgba(0,0,0,0.8)" />
      <LinearGradient
        // Background Linear Gradient
        colors={['rgba(0,0,0,0.8)', 'transparent']}
        style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: '100%'
        }}
      />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
      },
  });

export default Layout
