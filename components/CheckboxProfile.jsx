import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Checkbox from 'expo-checkbox';

import {textField} from '../utils/functions';

const CheckboxProfile = ({user,field, handleCheckboxChange}) => {
  return (
    <View style={styles.checkboxContainer}>
        <Checkbox
            style={styles.checkbox}
            value={user.experience[field]}
            onValueChange={(value) => {
                handleCheckboxChange(field,value)
            }}
            color={user.experience[field] ? '#CC302D' : undefined}
            />
        <Text style={styles.textCheckbox}>{textField(field)}</Text>    
    </View>
  )
}

export default CheckboxProfile

const styles = StyleSheet.create({
    checkbox: {
        margin: 8,
      },
      checkboxContainer: {
        display:'flex',
        flexDirection:'row'
      },
      textCheckbox:{
        paddingTop:7
      }
})