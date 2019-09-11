import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator, createBottomTabNavigator, StackViewTransitionConfigs, } from 'react-navigation';
import SignUp from './AuthComponent/SignUp';
import SignIn from './AuthComponent/SignIn';
import Main from './CustomerComponent/Home';
import Profile from './CustomerComponent/Profile';
import Booking from './CustomerComponent/Booking';
import ProviderHome from './ProviderComponet/service/ProviderHome'
import Service from './CustomerComponent/Service'
import ProviderStatusScreen from './ProviderComponet/status/statushome'
import ProviderStatusDetails from './ProviderComponet/status/customerstatusview'
import Search from './ProviderComponet/status/search'
import Icon from 'react-native-vector-icons/Ionicons';



const AuthStack = createSwitchNavigator({
    Signin: SignIn,
    Signup: SignUp,

}, {
        initialRouteName: 'Signin'
    })

const CustomerStack = createBottomTabNavigator({
    Home: Main,
    Booking: Booking,
    Profile: Profile,

},
    {
        initialRouteName: 'Home',
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'Home') {
                    iconName = 'ios-planet'
                    return focused ?
                        <Icon name={iconName} size={30} color='#0abde3' /> : <Icon name={iconName} size={30} color='#c8d6e5' />;

                }
                if (routeName === 'Profile') {
                    iconName = 'ios-contact'
                    return focused ?
                        <Icon name={iconName} size={25} color='#0abde3' /> : <Icon name={iconName} size={25} color='#c8d6e5' />;

                }
                if (routeName === 'Booking') {
                    iconName = 'ios-paper-plane'
                    return focused ?
                        <Icon name={iconName} size={25} color='#0abde3' /> : <Icon name={iconName} size={25} color='#c8d6e5' />;

                }

            },
        }),
        tabBarOptions: {
            activeTintColor: '#0abde3',
        }
    })

const CustomerServiceStack = createStackNavigator({
    Service: Service
})
const ProviderServiceStack = createStackNavigator({
    ProviderService: {
        screen: ProviderHome,
    }
},
    {

        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#6190E8',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        },

    })
const ProviderStatusStack = createStackNavigator({
    Status: {
        screen: ProviderStatusScreen,

    },
    StatusDetails : {
        screen: ProviderStatusDetails
    },
    Search: {
        screen: Search
    }
    }, {
        transitionConfig: () => StackViewTransitionConfigs.NoAnimation,
        defaultNavigationOptions: {
            gesturesEnabled: false,
            headerStyle: {
                backgroundColor: '#6190E8',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        },

    })
const ProviderStack = createBottomTabNavigator({
    Provider: {
        screen: ProviderServiceStack,
        navigationOptions: {
            tabBarLabel: 'Services',
            tabBarIcon: ({ tintColor }) => {
                return <Icon name="ios-paper" color={tintColor} size={20} />
            }
        }
    },
    Status: {
        screen: ProviderStatusStack,
        navigationOptions: {
            tabBarLabel: 'Status',
            tabBarIcon: ({ tintColor }) => {
                return <Icon name="ios-notifications" color={tintColor} size={20} />
            }
        }
    }
},

    {
        initialRouteName: 'Provider',
        tabBarOptions: {
            keyboardHidesTabBar: true
        }
    })

const AppStack = createSwitchNavigator({
    //    Auth:AuthStack,
    //    Customer:CustomerStack,  
    Provider: ProviderStack,
    //    Service:CustomerServiceStack    
},
    {
        initialRouteName: 'Provider',
    }
)

const AppContainer = createAppContainer(AppStack)

export default AppContainer;
