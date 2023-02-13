import { StyleSheet, TextInput, Text, View, TouchableOpacity,ScrollView, Animated} from 'react-native'
import React, {useState, useRef} from 'react'

import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const SelectInput = ({data,setProfile,profile}) => {
    const [boxIsActive, setBoxIsActive] = useState(true)
    const [selected, setSelected] = useState(profile.businessID ? profile.businessID.businessName : '')
    const [search, setSearch] = useState('')

    const animatedvalue = useRef(new Animated.Value(0)).current;
    const slidedown = () => {
        setBoxIsActive(false)
        Animated.timing(animatedvalue,{
            toValue:130,
            duration:500,
            useNativeDriver:false,
            
        }).start()
    }
    const slideup = () => {
        
        Animated.timing(animatedvalue,{
            toValue:0,
            duration:500,
            useNativeDriver:false,
            
        }).start(() => {
            setSearch('')
            setBoxIsActive(true)})
    }

    // const data = [['value1 (VE)','01'],['value2 (VE)','02'],['value3 (VE)','03'],['value5 (VE)','05'],['value4 (VE)','04']]

  return (
    <View>
        {boxIsActive ? (
            <TouchableOpacity style={styles.box2} onPress={()=>slidedown()}>
                <Text style={styles.text}>{selected ? `${selected}` : 'Select your Security Company'}</Text>
                <Feather name="chevron-down" size={24} color="black" />
            </TouchableOpacity>
            
            ):(
            <View>
                <View style={{display:'flex',flexDirection:'row'}}>
                    <View style={styles.boxSearch} >
                        <Feather name="search" size={24} color="gray" />
                        <TextInput
                            style={styles.textSearch}
                            placeholder='Search for a Company'
                            placeholderTextColor='#fffff'
                            onChangeText={(text) => setSearch(text)}
                        />
                        {/* <Text style={styles.textSearch}>Search for a Company</Text>  */}
                    </View>
                    <TouchableOpacity style={styles.boxSearch} onPress={()=>{
                        slideup()}}>
                        <Ionicons name="close-sharp" size={24} color="black" /> 
                    </TouchableOpacity>
                </View>
                <Animated.View style={{maxHeight:animatedvalue}}>
                    <ScrollView style={styles.dropdown}>
                        {data.length===0 ? <Text style={styles.dropdownItem} >No data Found</Text> :
                        (search === '' ? data : data.filter(elem =>{
                            return (elem.value.toLowerCase().includes(search.toLowerCase()) )
                        })).length === 0 ? <Text style={styles.dropdownItem} >No Companies with this name</Text> :
                        (search === '' ? data : data.filter(elem =>{
                            return (elem.value.toLowerCase().includes(search.toLowerCase()) )
                        })).map((elem)=>{
                            let key=elem.key
                            return (
                                <TouchableOpacity style={styles.boxSearch} key={elem.key} onPress={()=>{
                                    slideup()
                                    setSelected(elem.value)
                                    setProfile({...profile,businessID:key})}}>
                                    <Text style={styles.dropdownItem} >{elem.value}</Text>
                                </TouchableOpacity>
                                )
                        })}
                    </ScrollView>
                </Animated.View>
            </View>
            )
        }    
    </View>
  )
}

export default SelectInput

const styles = StyleSheet.create({
    text:{
        fontSize:17,
        width:'100%'
    },
    textSearch:{
        fontSize:17,
        color:'gray',
        marginHorizontal:8
    },
    box:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        width:'71%'
    },
    box2:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        width:'80%',
        // borderWidth:1,
        // borderColor:'gray',
    },
    boxSearch:{
        display:'flex',
        flexDirection:'row',
    },
    dropdown:{
        borderWidth:1,
        borderColor:'gray',
        borderRadius:10,
        paddingHorizontal:10,
        marginTop:10,
        maxHeight:130,
        overflow:'scroll'
    },
    dropdownItem:{
        fontSize:15,
        marginVertical:5,
        paddingStart:10,
        flexWrap:'wrap',
        alignItems: 'flex-start',
    }

})