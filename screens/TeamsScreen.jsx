import React,{ useContext, useEffect, useState } from 'react'
import { Text, TouchableOpacity, View, Image,ScrollView } from 'react-native'
import { useIsFocused } from "@react-navigation/native";
import Layout from '../components/Layout'
import { AuthContext } from "../context/auth.context";
import { styles } from "../styles/styles.js";

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SERVER_URL} from "@env";

import Loading from '../components/Loading';
import MemberCard from '../components/MemberCard';

const TeamsScreen = ({navigation}) => {
    const { user} = useContext(AuthContext);
    const [members, setMembers] = useState(null)
    // console.log();
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
    }, [])
    // Manage Tabs
    const [activeTab, setActiveTab] = useState('Active')

    const handleTabsActive = (tab) => {
        setActiveTab(tab)
    }
    const tabActiveIsActive = activeTab === 'Active' ? styles.upTabActive : ''
    const tabPendingIsActive = activeTab === 'Pending' ? styles.upTabActive : ''

    if (members) {
        // console.log(members);
        return (
            <Layout>
                <ScrollView>
                    <View style={styles.container}>
                        <View style={styles.upTabs}>
                        <TouchableOpacity style={[styles.upTabsBtn,tabActiveIsActive]} onPress={()=>handleTabsActive('Active')}>
                            <Text style={styles.upTabsText} >Active</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.upTabsBtn,tabPendingIsActive]} onPress={()=>handleTabsActive('Pending')}>
                            <Text style={styles.upTabsText} >Pending</Text>    
                        </TouchableOpacity>    
                    </View>
                        {members.filter(mem=>{
                            if(activeTab === 'Active'){
                                return !mem.rol.includes('Pending')
                            }else{
                                return mem.rol.includes('Pending')    
                            }
                            })
                            .map(member=><MemberCard key={member._id} memberData={member}/>)}
                        
                    </View>
                    
                </ScrollView>
            </Layout>
            
        )
    }else{
        return <Loading/>
      }
  
}

export default TeamsScreen