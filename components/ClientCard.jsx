import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Feather,FontAwesome } from '@expo/vector-icons';

const ClientCard = ({clientData, navigation,handleChangeStatusClient}) => {
    // console.log(clientData.position);
    
  return (
    <TouchableOpacity  style={styles.card} onPress={()=>navigation.navigate('ViewClienScreen', {clientID:clientData._id})}>
        <View  style={styles.imageContainer}>
            <Image
                source={ {uri: clientData.pictureUrl} }
                style={styles.image}
            />
        </View>
        
        <View style={styles.textContainer}>
            <Text style={styles.textName}>{clientData.clientName}</Text>
            <Text style={styles.textPosition}>{clientData.address.country}</Text>
            {/* <Text style={styles.textRol}>{textField(clientData.rol)}</Text> */}
        </View>
        <TouchableOpacity onPress={()=>handleChangeStatusClient(clientData)}>
            {!clientData.saved ? <Feather name="star" size={24} color="black" style={{paddingTop:15}} /> :
            <FontAwesome name="star" size={24} color="black" style={{paddingTop:15}} />}
        </TouchableOpacity>
    </TouchableOpacity>
  )
}

export default ClientCard

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