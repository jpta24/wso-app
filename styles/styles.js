import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    btnImg:{
        marginTop:5,
        backgroundColor:'#F0F0F0',
        paddingHorizontal:10,
        paddingVertical:5,
        display:'flex',
        alignItems:'center',
        borderRadius:5,
    },
    buttonProfile:{
        marginTop:5,
        paddingVertical:20,
        display:'flex',
        alignItems:'center',
        borderRadius:10,
    },
    buttonProfileSO:{
        marginTop:20,
        paddingHorizontal:40,
        backgroundColor:'#CC302D',
        paddingVertical:10,
        display:'flex',
        alignItems:'center',
        borderRadius:10,
    },
    buttonProfileText:{
        fontSize:17,
        padding:5,
        fontWeight:'bold'
    },
    buttonPrimary:{
        marginTop:20,
        width:'80%',
        backgroundColor:'#CC302D',
        paddingVertical:20,
        display:'flex',
        alignItems:'center',
        borderRadius:10,
    },
    buttonPrimaryText:{
        fontSize:17,
        color:'#ffff'
    },
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        paddingBottom:20
    },
    fields:{
        width:'100%',
        minHeight:50,
        height:'auto',
        paddingStart:20,
        paddingEnd:20,
        paddingTop:5,
        marginVertical:5,
        borderBottomColor:'black',
        borderBottomWidth:2,
        fontSize:17,
        display:'flex',
        flexDirection:'row'
    },
    fields50:{
        width:'50%',
        minHeight:50,
        height:'auto',
        paddingStart:20,
        paddingEnd:20,
        paddingTop:5,
        marginVertical:5,
        borderBottomColor:'black',
        borderBottomWidth:2,
        fontSize:17,
        display:'flex',
        flexDirection:'row'
    },
    image:{
        width:200,
        height:200,
        borderRadius:75
    },
    image200r100:{
        width:200,
        height:200,
        borderRadius:100
    },
    image200r50:{
        width:200,
        height:200,
        marginBottom:50
        },
    image250r10:{
        width:250,
        height:250,
        borderRadius:10
    },
    selectCompanyField:{
        paddingHorizontal:20,
        paddingBottom:5
    },
    textInput:{
        paddingStart:20,
        paddingEnd:20,
        fontSize:17,
        paddingBottom:8
    },
    linkText:{
        marginTop:10,
        fontSize:15,
    },
    errorText:{
        color:'#CC302D',
        fontSize:15,
        marginVertical:3
    }
    
})