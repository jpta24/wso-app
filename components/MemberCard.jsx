import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import {textField} from '../utils/functions';

const MemberCard = ({memberData, navigation}) => {
    // console.log(memberData.position);
  return (
    <TouchableOpacity  style={styles.card} onPress={()=>navigation.navigate('ViewProfileScreen', {userID:memberData._id})}>
        <View  style={styles.imageContainer}>
            <Image
                source={ {uri: memberData.pictureUrl} }
                style={styles.image}
            />
        </View>
        
        <View style={styles.textContainer}>
            <Text style={styles.textName}>{memberData.fullName}</Text>
            <Text style={styles.textPosition}>{memberData.position}</Text>
            <Text style={styles.textRol}>{textField(memberData.rol)}</Text>
        </View>
    </TouchableOpacity>
  )
}

export default MemberCard

const styles = StyleSheet.create({
    card:{
        display:'flex',
        flexDirection:'row',
        borderWidth:1,
        borderColor:'gray',
        borderRadius:10,
        backgroundColor:'rgba(188,188,188,0.15)',
        height:100,
        marginVertical:5
    },
    imageContainer:{
        width:'25%',
        padding:20
    },
    image:{
        width:60,
        height:60,
        borderRadius:30
    },
    textContainer:{
        width:'60%',
        marginTop:15
    },
    textName:{
        fontSize:20,
        fontWeight:'bold'
    },
    textPosition:{
        fontSize:15
    },
    textRol:{
        fontSize:13
    }
})