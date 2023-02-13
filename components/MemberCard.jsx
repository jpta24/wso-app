import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const MemberCard = ({memberData}) => {
    // console.log(memberData.position);
  return (
    <TouchableOpacity  style={styles.card}>
        <View  style={styles.imageContainer}>
            <Image
                source={ {uri: memberData.pictureUrl} }
                style={styles.image}
            />
        </View>
        
        <View style={styles.textContainer}>
            <Text style={styles.textName}>{memberData.fullName}</Text>
            <Text style={styles.textPosition}>{memberData.position}</Text>
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
        backgroundColor:'rgba(0,0,0,0.05)',
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
        marginTop:20
    },
    textName:{
        fontSize:20,
        fontWeight:'bold'
    },
    textPosition:{
        fontSize:15
    }
})