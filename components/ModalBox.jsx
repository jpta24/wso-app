import { StyleSheet, Text, TouchableOpacity, View, Modal } from 'react-native'
import React from 'react'


import { Ionicons } from '@expo/vector-icons';

const ModalBox = ({modalVisible, setModalVisible,updateUserRol,caseText,rol}) => {
  const titleText = (caseText)=>{
    if (caseText === 'new') {
      return 'What Rol would you like for this User?'
    }
    if (caseText === 'change') {
      return 'To what Rol would you like to update this User?'
    }
  }

  const btnPrimary = (caseText,rol)=>{
    if (caseText === 'new' || (caseText === 'change' && rol==='rejected')) {
      return {
        func:'member',
        btn:'Member'
      }
    }
    if (caseText === 'change' && rol==='member') {
      return {
        func:'admin',
        btn:'Admin'
      }
    }
  }

  const btnSecondary = (caseText,rol)=>{
    if (caseText === 'new' || (caseText === 'change' && rol==='rejected')) {
      return {
        func:'admin',
        btn:'Admin'
      }
    }
    if (caseText === 'change' && rol==='member') {
      return {
        func:'rejected',
        btn:'Rejected'
      }
    }
  }


  
  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          
          <TouchableOpacity
              style={styles.close}
              onPress={() => setModalVisible(!modalVisible)}>
              <View><Ionicons name="close" size={24} color="white" /></View>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.modalTitleText}>{titleText(caseText)}</Text>
            <Text style={styles.modalText}>Admin users could manage Members, Clients and Tasks.</Text>
            <Text style={styles.modalText}>Member users just have access to Tasks.</Text>
            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={styles.buttonSecondary}
                onPress={() => {
                  updateUserRol(btnSecondary(caseText,rol).func)
                  setModalVisible(!modalVisible)}}>
                <Text style={styles.textStyleSecondary}>{btnSecondary(caseText,rol).btn}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonPrimary}
                onPress={() => {
                  updateUserRol(btnPrimary(caseText,rol).func)
                  setModalVisible(!modalVisible)}}>
                <Text style={styles.textStylePrimary}>{btnPrimary(caseText,rol).btn}</Text>
              </TouchableOpacity>
            </View>
            
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default ModalBox

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 35,
        paddingTop:20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width:'80%'
      },
      buttonPrimary: {
        borderRadius: 5,
        padding: 10,
        elevation: 2,
        width:'45%',
        backgroundColor: '#CC302D',
      },
      buttonSecondary: {
        borderRadius: 5,
        padding: 10,
        elevation: 2,
        width:'45%',
        backgroundColor: 'white',
        borderWidth:1,
        borderColor:'black'
      },
      textStylePrimary: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      textStyleSecondary: {
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalTitleText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize:17,
        fontWeight:'bold'
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'left',
        paddingStart:10,
        width:'95%'
      },
      close:{
        justifyContent:'space-between',
        display:'flex',
        flexDirection:'row',
        width:'100%',
        marginBottom:10
      },
      btnContainer:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around' ,
        width:'90%' 
      }
})