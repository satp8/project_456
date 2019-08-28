    import React from 'react';
    import {createAppContainer,createSwitchNavigator,createStackNavigator, createBottomTabNavigator} from 'react-navigation';
    import SignUp from './AuthComponent/SignUp';
    import SignIn from './AuthComponent/SignIn';
    import Main from './CustomerComponent/Main';
    import Profile from './CustomerComponent/Profile';
    import Booking from './CustomerComponent/Booking';
    import ProviderHome from './ProviderComponet/ProviderHome' 
    import Icon from 'react-native-vector-icons/Ionicons';


    const AuthStack = createSwitchNavigator({ 
        Signin: SignIn, 
        Signup: SignUp,
        
    },{
        initialRouteName:'Signin'
    })

    const CustomerStack = createBottomTabNavigator({   
        Home:Main,
        Booking:Booking, 
        Profile:Profile,

    },
    {   initialRouteName:'Home',
        defaultNavigationOptions:({navigation}) => ({
            tabBarIcon:({focused,tintColor}) => {
                const {routeName} = navigation.state;
                let iconName;
                if(routeName === 'Home'){
                    iconName = 'ios-planet'  
                    return focused?
                    <Icon name={iconName} size={30} color='#0abde3'/>:<Icon name={iconName} size={30} color='#c8d6e5'/>;   

                }
                if(routeName === 'Profile'){ 
                    iconName = 'ios-contact'   
                    return focused?
                    <Icon name={iconName} size={25} color='#0abde3'/>:<Icon name={iconName} size={25} color='#c8d6e5'/>;   
                    
                }
                if(routeName === 'Booking'){
                    iconName = 'ios-paper-plane'
                    return focused?
                    <Icon name={iconName} size={25} color='#0abde3'/>:<Icon name={iconName} size={25} color='#c8d6e5'/>;   
                    
                }

            },
         }),
         tabBarOptions:{
            activeTintColor: '#0abde3', 
         } 
        })
    
        const ProviderStack = createBottomTabNavigator({   
            ProviderHome:ProviderHome
    
        },
        {
            initialRouteName:'ProviderHome'  
        }
        )

    const AppStack = createSwitchNavigator({
       Auth:AuthStack,
       Customer:CustomerStack,  
       Provider:ProviderStack    
    },
    {
        initialRouteName: 'Auth', 
    }  
    )
  
    const AppContainer = createAppContainer(AppStack)  

    export default AppContainer;
