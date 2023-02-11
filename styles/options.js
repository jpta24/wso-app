import { TouchableOpacity,View,Text} from 'react-native'
import { Feather } from '@expo/vector-icons';
import { styles } from "../styles/styles.js";

export const optionsDefault =(title)=> {
    return{
    title:title,
    headerStyle: {
        backgroundColor: "rgba(0,0,0,0.8)",
    },
    headerTitleStyle: {
        color: "#ffffff",
    },
    headerTitleAlign: 'center',
    
    headerTintColor: "#fff",

    headerTitleStyle: {
        color: "#ffffff",
    }
}}

export const optionsHeaderRightEdit =(user,navigation,route,title)=>{
    const checkUserRol = (navigation,route) => {
        if (user.rol === 'admin') {
            return (
                <TouchableOpacity  
                    onPress={() =>{
                        title === 'Business' ? 
                            navigation.navigate(`Edit${title}Screen`,{param:route.params.businessID})
                            :
                            navigation.navigate(`Edit${title}Screen`,{param:route.params.userID})
                    }}
                >
                    <Feather name="edit" size={24} color="white" />
                </TouchableOpacity>
            )
        }
    }

    return{
        title: title,
        headerTitleStyle: {
            color: "#ffffff",
        },
        headerTitleAlign: 'center',
        headerStyle: {
            backgroundColor: "rgba(0,0,0,0.8)",
        },
        headerTintColor: "#fff",

        headerTitleStyle: {
            color: "#ffffff",
        },
        headerRight:() => (
            checkUserRol(navigation,route)
        )
    }
}

export const optionsSO = (title,logOutUser) => {
    return {
        title: title,
        headerTitleAlign: 'center',
        headerStyle: {
            backgroundColor: "rgba(0,0,0,0.8)",
        },
        headerTintColor: "#fff",

        headerTitleStyle: {
            color: "#ffffff",
        },
        headerRight:() => (
            <TouchableOpacity onPress={logOutUser}>
                <View style={styles.buttonHeader}>
                    <Text style={styles.buttonHeaderText}>Log Out</Text>
                </View>
                
            </TouchableOpacity>
        )
    }
}