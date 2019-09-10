    import React from 'react';
    import {Button} from 'react-native-elements';
    import {createAppContainer,createSwitchNavigator,createStackNavigator, createBottomTabNavigator} from 'react-navigation';
    import SignUp from './AuthComponent/SignUp';
    import SignIn from './AuthComponent/SignIn';
    import Main from './CustomerComponent/Home';
    import Profile from './CustomerComponent/Profile';
    import Booking from './CustomerComponent/Booking';
    import ProviderHome from './ProviderComponet/ProviderHome';
    import Service from './CustomerComponent/Service';
    import RequestDetail from './CustomerComponent/requestDetail';
    import Icon from 'react-native-vector-icons/Ionicons'; 
    import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
    import AuthLoading from './AuthLoading'; 
    import {FluidNavigator, Transition} from 'react-navigation-fluid-transitions';


    const AuthStack = createSwitchNavigator({ 
        Signin: SignIn, 
        Signup: SignUp,
        
    },{
        initialRouteName:'Signin'
    })


        const HomeStack  = createStackNavigator({
            home:Main,
        },{
            defaultNavigationOptions:({navigation}) => ({
        
                     title:'Home',   
                     headerStyle:{
                         backgroundColor:'#000',  

                     }, 
                     headerTitleStyle:{
                         color:'#fff',
                     }
                   }),
        },
        {
              
        })

        const BookingStack  = createStackNavigator({
            book:Booking,
        },{
            defaultNavigationOptions:({navigation}) => ({
        
                     title:'Book',   
                     headerStyle:{
                         backgroundColor:'#000',
                     }, 
                     headerTitleStyle:{
                         color:'#fff' 
                     }
                   }),
        })

        const ProfileStack  = createStackNavigator({
            profile:Profile
        },{
            defaultNavigationOptions:({navigation}) => ({
        
                     title:'Profile',   
                     headerStyle:{
                         backgroundColor:'#000',
                     }, 
                     headerTitleStyle:{
                         color:'#fff' 
                     }
                   }),
        })

        const CustomerStack = createBottomTabNavigator({  
            Home:HomeStack, 
            Booking:BookingStack,
            Profile:ProfileStack,   

        },
        {   
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
                 },
                 barStyle:{backgroundColor:'#fff'}
                 
                },
        ) 
         

        const ServiceStack  = createStackNavigator({
            service:Service
        },{
            defaultNavigationOptions:({navigation}) => ({
        
                     title:'Service',   
                     headerStyle:{
                         backgroundColor:'#000',
                           
                     }, 
                     headerTitleStyle:{
                         color:'#fff',
                         transform:[{translateX:-20}]
                     }
                   }),
        })

        const RequestStack  = FluidNavigator({
            RequestDetail: RequestDetail
        },{
            defaultNavigationOptions:({navigation}) => ({
        
                     title:'RequestDetail',   
                     headerStyle:{
                         backgroundColor:'#000',
                           

                     }, 
                     headerTitleStyle:{
                         color:'#fff',
                         translateX:-20
                     }
                   }),
        })

 
        const CustomerServiceStack = createStackNavigator({
            Home: CustomerStack,  
            Service: ServiceStack,
            RequestDetail:RequestStack 
        },{
            initialRouteName:'Home',     
            headerMode:'none',
        }
        )

    
        const ProviderStack = createBottomTabNavigator({   
            ProviderHome:ProviderHome
    
        },
        {
            initialRouteName:'ProviderHome'  
        }
        )

        // const AuthloadingStack  = createStackNavigator({
        //     AuthLoading:AuthLoading, 
        // },{
        //     defaultNavigationOptions:({navigation}) => ({
        
        //              title:'Home',   
        //              headerStyle:{
        //                  backgroundColor:'#000',
        //              }, 
        //              headerTitleStyle:{
        //                  color:'#fff'
        //              }
        //            }),
        // },
        // {
        //     headerMode:'none',               
        // })

    const AppStack = createSwitchNavigator({
       Authloading:AuthLoading,    
       Auth:AuthStack, 
       Service:CustomerServiceStack, 
       Provider:ProviderStack, 
         
    },
    {
        initialRouteName:'Authloading',   
      
    }
    )
  
    const AppContainer = createAppContainer(AppStack)  

    export default AppContainer;
