import React,{ useContext, useEffect, useState } from 'react'
import { Text, TouchableOpacity, View,ScrollView, TextInput, } from 'react-native'
import { useIsFocused } from "@react-navigation/native";
import Layout from '../components/Layout'
import { AuthContext } from "../context/auth.context";
import { styles } from "../styles/styles.js";

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SERVER_URL} from "@env";

import { Feather } from '@expo/vector-icons';
import Loading from '../components/Loading';
import ClientCard from '../components/ClientCard';

const ClientsScreen = ({navigation}) => {
    const { user} = useContext(AuthContext);
    const [clients, setClients] = useState(null)
    const [searchBox, setSearchBox] = useState('')
    const isFocused = useIsFocused();

    const getClients = async ()=>{
        const token = await AsyncStorage.getItem('authToken')
        axios.get(`${SERVER_URL}/business/clients/${user.businessID}`,{headers: {Authorization: `Bearer ${token}`}})
        .then(response =>{
            const data = response.data.clients
            setClients(data)
        })
        .catch(err=>console.log(err));
    }
    
    useEffect(() => {
        getClients()
    }, [isFocused])

    useEffect(() => {
        navigation.setParams({businessID:user.businessID});
      }, []);

    const [activeTab, setActiveTab] = useState('All')

    const handleTabsActive = (tab) => {
        setActiveTab(tab)
    }
    const tabSavedIsActive = activeTab === 'Saved' ? styles.upTabActive : ''
    const tabAllIsActive = activeTab === 'All' ? styles.upTabActive : ''
    const tabSavedIsActiveText = activeTab === 'Saved' ? styles.upTabActiveText : styles.upTabInactiveText
    const tabAllIsActiveText= activeTab === 'All' ? styles.upTabActiveText : styles.upTabInactiveText

    const handleChangeStatusClient = async(clientData)=>{
        const requestBody = {
            businessID:user.businessID,
            saved:!clientData.saved
        };
        const token = await AsyncStorage.getItem('authToken')
        axios.put(`${SERVER_URL}/business/client/${clientData._id}`, requestBody, {headers: {Authorization: `Bearer ${token}`}})
        .then(res => {
            setClients(res.data.clients)
          })
      .catch(err=>console.log(err));
    }
    if (clients) {
        return (
            <Layout>
                <View style={styles.container}>
                    <View style={styles.upTabs}>
                        <TouchableOpacity style={[styles.upTabsBtn50,tabSavedIsActive]} onPress={()=>handleTabsActive('Saved')}>
                            <Text style={tabSavedIsActiveText} >Saved</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.upTabsBtn50,tabAllIsActive]} onPress={()=>handleTabsActive('All')}>
                            <Text style={tabAllIsActiveText} >All</Text>    
                        </TouchableOpacity>   
                    </View>

                    <View style={styles.searchBoxContainer}>
                        <View style={styles.boxSearch} >
                            <Feather name="search" size={24} color="gray" />
                            <TextInput
                                style={styles.textSearch}
                                placeholder='Search Clients by Name'
                                placeholderTextColor='gray'
                                onChangeText={(text) => setSearchBox(text)}
                            />
                        </View>
                    </View>

                    <ScrollView>
                    {/* clients.map(client=><Text>a</Text>) */}
                        {clients.filter(client=>{
                        if(activeTab === 'Saved'){
                            return client.saved
                        }
                        if(activeTab === 'All'){
                            return client 
                        }
                        })
                        .filter(elem=>{
                            if(searchBox === ''){
                                return elem 
                            } else {
                                return elem.clientName.toLowerCase().includes(searchBox.toLowerCase())
                            }
                        })
                        .sort((a,b)=>{return a.rol.localeCompare(b.rol) || a.clientName.localeCompare(b.clientName) })
                        .map(client=><ClientCard key={client._id} clientData={client} navigation={navigation} handleChangeStatusClient={handleChangeStatusClient}/>)}
                    </ScrollView>
                </View>
            </Layout>
            
        )
    }else{
        return <Loading/>
      }
  
}

export default ClientsScreen