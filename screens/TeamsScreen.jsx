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
import MemberCard from '../components/MemberCard';

const TeamsScreen = ({navigation}) => {
    const { user} = useContext(AuthContext);
    const [members, setMembers] = useState(null)
    const [searchBox, setSearchBox] = useState('')
    const isFocused = useIsFocused();

    const getMembers = async ()=>{
        const token = await AsyncStorage.getItem('authToken')
        axios.get(`${SERVER_URL}/business/members/${user.businessID}`,{headers: {Authorization: `Bearer ${token}`}})
        .then(response =>{
            const data = response.data.members
            setMembers(data)
        })
        .catch(err=>console.log(err));
    }
    
    useEffect(() => {
        getMembers()
    }, [isFocused])

    const [activeTab, setActiveTab] = useState('Active')

    const handleTabsActive = (tab) => {
        setActiveTab(tab)
    }
    const tabActiveIsActive = activeTab === 'Active' ? styles.upTabActive : ''
    const tabPendingIsActive = activeTab === 'Pending' ? styles.upTabActive : ''
    const tabRejectedIsActive = activeTab === 'Rejected' ? styles.upTabActive : ''
    const tabActiveIsActiveText = activeTab === 'Active' ? styles.upTabActiveText : styles.upTabInactiveText
    const tabPendingIsActiveText= activeTab === 'Pending' ? styles.upTabActiveText : styles.upTabInactiveText
    const tabRejectedIsActiveText = activeTab === 'Rejected' ? styles.upTabActiveText : styles.upTabInactiveText

    if (members) {
        const pendingNumber = members.filter(member=>member.rol.includes('Pending')).length
        return (
            <Layout>
                <View style={styles.container}>
                    <View style={styles.upTabs}>
                        <TouchableOpacity style={[styles.upTabsBtn,tabActiveIsActive]} onPress={()=>handleTabsActive('Active')}>
                            <Text style={tabActiveIsActiveText} >Active</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.upTabsBtn,tabPendingIsActive]} onPress={()=>handleTabsActive('Pending')}>
                            <Text style={tabPendingIsActiveText} >{`Pending ${pendingNumber === 0 ? '': ('(' + pendingNumber + ')')}`}</Text>    
                        </TouchableOpacity>  
                        <TouchableOpacity style={[styles.upTabsBtn,tabRejectedIsActive]} onPress={()=>handleTabsActive('Rejected')}>
                            <Text style={tabRejectedIsActiveText} >Rejected</Text>    
                        </TouchableOpacity>   
                    </View>

                    <View style={styles.searchBoxContainer}>
                        <View style={styles.boxSearch} >
                            <Feather name="search" size={24} color="gray" />
                            <TextInput
                                style={styles.textSearch}
                                placeholder='Search a Member by Name'
                                placeholderTextColor='gray'
                                onChangeText={(text) => setSearchBox(text)}
                            />
                        </View>
                    </View>

                    <ScrollView>
                        {members.filter(mem=>{
                        if(activeTab === 'Active'){
                            return mem.rol==='admin' || mem.rol === 'member'
                        }
                        if(activeTab === 'Pending'){
                            return mem.rol.includes('Pending') 
                        }
                        if(activeTab === 'Rejected'){
                            return mem.rol==='rejected' 
                        }
                        })
                        .filter(elem=>{
                            if(searchBox === ''){
                                return elem 
                            } else {
                                return elem.fullName.toLowerCase().includes(searchBox.toLowerCase())
                            }
                        })
                        .sort((a,b)=>{return a.rol.localeCompare(b.rol) || a.fullName.localeCompare(b.fullName) })
                        .map(member=><MemberCard key={member._id} memberData={member} navigation={navigation}/>)}
                    </ScrollView>
                </View>
            </Layout>
            
        )
    }else{
        return <Loading/>
      }
  
}

export default TeamsScreen