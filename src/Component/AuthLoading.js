import React,{Component} from 'react';
import {connect} from 'react-redux';
import {View,ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {withNavigation} from 'react-navigation';

class Authloading extends Component {
   
    componentDidMount(){ 
        this.asyncall()
    } 

    asyncall = async() => {
          console.log('asyncall')
       
            const usertoken = await AsyncStorage.getItem('usertoken');  
            const role = await AsyncStorage.getItem('usertype');  
            console.log(usertoken? 'Service':'Auth')
            if(usertoken && role === 'customer'){
                this.props.navigation.navigate('Service')              
            }
            // else if(usertoken && role === 'serviceProvider'){
            //     this.props.navigation.navigate('Provider')              
            // }
            else{
                this.props.navigation.navigate('Auth')              
            }
        
    }

    render(){
                     
        return(
         <View style={{flex:1,alignItems:'center',justifyContent:'center'}}> 
         <ActivityIndicator size='large' color='#000'/>
         </View> 
        )
    }
}

export default connect()(Authloading); 