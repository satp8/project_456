    import React from 'react';
    import {createAppContainer,createSwitchNavigator,createStackNavigator, createBottomTabNavigator} from 'react-navigation';
    import SignUp from './AuthComponent/SignUp';
    import SignIn from './AuthComponent/SignIn';
    import Main from './MainComponent/Main';
    import Profile from './MainComponent/Profile';
    import Icon from 'react-native-vector-icons/Ionicons';


    const AuthStack = createSwitchNavigator({ 
        Signin: SignIn, 
        Signup: SignUp,
        
    },{
        initialRouteName:'Signin'
    })

    const MainStack = createBottomTabNavigator({   
        Main:Main, 
        Profile:Profile 
    },
    {
        initialRouteName:'Main'
    })
    
    const AppStack = createSwitchNavigator({
       Main:MainStack,  
       Auth:AuthStack,
    
    },
    {
        initialRouteName: 'Auth', 
    }  
    )
  
    const AppContainer = createAppContainer(AppStack)  

    export default AppContainer;
