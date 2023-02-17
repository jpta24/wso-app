import React,{ useContext,useEffect, useState }  from 'react'
import { TouchableOpacity, Text, View, Image } from 'react-native'
import { AuthContext } from "../context/auth.context";
import Layout from '../components/Layout'
import Loading from '../components/Loading';
import { styles } from "../styles/styles.js";

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SERVER_URL} from "@env";

import { Entypo,Feather,Ionicons,MaterialIcons,MaterialCommunityIcons,FontAwesome5 } from '@expo/vector-icons';
import ModalBox from '../components/ModalBox';

const ViewProfileScreen = ({navigation,route}) => {
  // console.log(route.params);
  const { user:adminID } = useContext(AuthContext);
    const userID = route.params.userID

    const [user, setUser] = useState(null)
    const [modalVisible, setModalVisible] = useState(false);
    const [caseText, setCaseText] = useState('new')
    

    const getUserInfo = async ()=>{
        const token = await AsyncStorage.getItem('authToken')
        axios.get(`${SERVER_URL}/users/profile/${userID}`,{headers: {Authorization: `Bearer ${token}`}})
        .then(response =>{
          
           setUser(response.data)
        })
        .catch(err=>console.log(err));
    }
    
    useEffect(() => {
        getUserInfo()
      }, [])

      useEffect(() => {
        navigation.setParams({userID});
      }, []);

      const updateUserRol = async (rol)=>{
        const requestBody = {
            rol:rol,
            change:{
              by:adminID._id,
              date: new Date(),
              change:`rol to ${rol}`
            }
        }  
        // console.log(requestBody);
          const token = await AsyncStorage.getItem('authToken')
              axios.put(`${SERVER_URL}/users/updateRol/${userID}`,requestBody,{headers: {Authorization: `Bearer ${token}`}})
              .then(response =>{
                
                 setUser(response.data)
              })
              .catch(err=>console.log(err));
        }

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
    
      if(user) {
        return (
        <Layout>
              <View style={styles.container}>
                  <Image
                      source={ {uri: user.pictureUrl} }
                      style={styles.image200r100}
                  />
                  <View style={styles.fields}>
                    <FontAwesome5 name="address-card" size={30} color="black" />
                      <Text style={styles.textName}>{user.fullName} </Text>
                  </View>
                  <View style={styles.fields}>
                      <Feather name="star" size={30} color="black" />
                      <Text style={styles.textOther}>{`${user.position}`}</Text>
                  </View>
                  <View style={styles.fields}>
                    <Feather name="user" size={30} color="black" />
                      <Text style={styles.textOther}>{`${user.username}`}</Text>
                  </View>
                  <View style={styles.fields}>
                        <MaterialCommunityIcons name="email-outline" size={30} color="black" />
                        <Text style={styles.textOther}>{`${user.email}`}</Text>
                    </View>
                  <View style={styles.fields}>
                    <MaterialIcons name="place" size={30} color="black" />
                      <Text style={styles.textOther}>{`${user.country}`}</Text>
                  </View>
                  <View style={styles.fields}>
                  <Feather name="settings" size={30} color="black" />
                      <Text style={styles.textOther}>{`${textField(user.rol)}`}</Text>
                  </View>
                  <View style={styles.fields}>
                      <Entypo name="mobile" size={30} color="black" />
                      <Text style={styles.textOther}>{`${user.phone}`}</Text>
                  </View>
                  {/* <View style={styles.fields}>
                      <Feather name="star" size={30} color="black" />
                      <Text style={styles.textTitleField}>
                          Experience
                      </Text>
                      <View style={styles.CheckboxList}>
                          {Object.entries(user.experience).filter(elem=>elem[1]===true).sort((a,b)=>a[0].localeCompare(b[0])).map(elem => {
                          return <Text key={elem[0]}>{elem[0]}</Text>
                      })}
                      </View>
                  </View> */}
                  <View style={styles.fields}>
                    <Ionicons name="md-business-sharp" size={30} color="black" />
                      <Text style={styles.textOther}>{`${user.businessID.businessName}`}</Text>
                  </View>

                  {user.rol.includes('Pending') && adminID.rol === 'admin' &&
                    <View style={styles.containerBtn}>
                      <TouchableOpacity style={styles.buttonPrimary50} onPress={()=>{
                        setCaseText('new')
                        setModalVisible(true)}} >
                        <Text style={styles.buttonPrimaryText}>Accept</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.buttonSecondary50} onPress={()=>updateUserRol('rejected')} >
                          <Text style={styles.buttonSecondaryText}>Reject</Text>
                      </TouchableOpacity>
                    </View> 
                    }
                    {adminID.rol ==='admin' && adminID._id!==userID && (user.rol === 'member' || user.rol==='rejected') &&
                    <View style={styles.containerBtn}>
                      <TouchableOpacity style={styles.buttonPrimary50} onPress={()=>{
                        setCaseText('change')
                        setModalVisible(true)}} >
                        <Text style={styles.buttonPrimaryText}>Change Rol</Text>
                      </TouchableOpacity>
                    </View> 
                    }
                  
                  
                    <ModalBox modalVisible={modalVisible} setModalVisible={setModalVisible} updateUserRol={updateUserRol} caseText={caseText} rol={user.rol}/>
              </View>
          </Layout>
      )}else{
        return <Loading/>
      }
    }

export default ViewProfileScreen

