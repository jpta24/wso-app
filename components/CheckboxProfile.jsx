import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Checkbox from 'expo-checkbox';

const CheckboxProfile = ({user,field, handleCheckboxChange}) => {
    const textField = (field) =>{
        let spaceArr = [0]
        for (let i = 1; i < field.length; i++) {
            if (field.charAt(i) === field.charAt(i).toUpperCase()) {
                spaceArr.push(i)
            }    
        }
        let newWords =''
        let newPos = 1
        for (let i = 0; i < spaceArr.length; i++) {
               newWords += field[spaceArr[i]].toUpperCase() + field.slice(spaceArr[i]+1,spaceArr[i+1]) + ' '
        }
        return newWords
    }
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