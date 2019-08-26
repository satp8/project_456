import React from 'react';
import {createAppContainer,createSwitchNavigator,createStackNavigator} from 'react-navigation';
import SignUp from './AuthComponent/SignUp';
import SignIn from './AuthComponent/SignIn';
import Main from './MainComponent/Main';
import Profile from './MainComponent/Profile';

const authStack = createSwitchNavigator({
    signin: SignIn,
    signup: SignUp
})

const mainStack = createStackNavigator({
    main:Main, 
    profile:Profile 
})

const appStack = createSwitchNavigator({
   auth:authStack,
   main:mainStack
},
{
    initialRouteName: 'auth',
} 
)

const appContainer = createAppContainer(appStack)  

export default appContainer;
