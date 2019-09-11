import React from 'react';
import { Button } from 'react-native-elements';
import { createAppContainer, createSwitchNavigator, createStackNavigator, createBottomTabNavigator, StackViewTransitionConfigs } from 'react-navigation';
import SignUp from './AuthComponent/SignUp';
import SignIn from './AuthComponent/SignIn';
import Main from './CustomerComponent/Home';
import Profile from './CustomerComponent/Profile';
import Booking from './CustomerComponent/Booking';
import ProviderHome from './ProviderComponet/service/ProviderHome';
import Service from './CustomerComponent/Service';
import RequestDetail from './CustomerComponent/requestDetail';
import Icon from 'react-native-vector-icons/Ionicons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import AuthLoading from './AuthLoading';
import { FluidNavigator, Transition } from 'react-navigation-fluid-transitions';

import ProviderStatusScreen from './ProviderComponet/status/statushome'
import ProviderStatusDetails from './ProviderComponet/status/customerstatusview'
import Search from './ProviderComponet/status/search'

const AuthStack = createSwitchNavigator({
    Signin: SignIn,
    Signup: SignUp,

}, {
        initialRouteName: 'Signin'
    })


const HomeStack = createStackNavigator({
    home: Main,
}, {
        defaultNavigationOptions: ({ navigation }) => ({

            title: 'Home',
            headerStyle: {
                backgroundColor: '#000',

            },
            headerTitleStyle: {
                color: '#fff',
            }
        }),
    },
    {

    })

const BookingStack = createStackNavigator({
    book: Booking,
}, {
        defaultNavigationOptions: ({ navigation }) => ({

            title: 'Book',
            headerStyle: {
                backgroundColor: '#000',
            },
            headerTitleStyle: {
                color: '#fff'
            }
        }),
    })

const ProfileStack = createStackNavigator({
    profile: Profile
}, {
        defaultNavigationOptions: ({ navigation }) => ({

            title: 'Profile',
            headerStyle: {
                backgroundColor: '#000',
            },
            headerTitleStyle: {
                color: '#fff'
            }
        }),
    })

const CustomerStack = createBottomTabNavigator({
    Home: HomeStack,
    Booking: BookingStack,
    Profile: ProfileStack,

},
    {
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
        },
        barStyle: { backgroundColor: '#fff' }

    },
)


const ServiceStack = createStackNavigator({
    service: Service
}, {
        defaultNavigationOptions: ({ navigation }) => ({

            title: 'Service',
            headerStyle: {
                backgroundColor: '#000',

            },
            headerTitleStyle: {
                color: '#fff',
                transform: [{ translateX: -20 }]
            }
        }),
    })

const RequestStack = FluidNavigator({
    RequestDetail: RequestDetail
}, {
        defaultNavigationOptions: ({ navigation }) => ({

            title: 'RequestDetail',
            headerStyle: {
                backgroundColor: '#000',


            },
            headerTitleStyle: {
                color: '#fff',
                translateX: -20
            }
        }),
    })


const CustomerServiceStack = createStackNavigator({
    Home: CustomerStack,
    Service: ServiceStack,
    RequestDetail: RequestStack
}, {
        initialRouteName: 'Home',
        headerMode: 'none',
    }
)


const ProviderServiceStack = createStackNavigator({
    ProviderService: {
        screen: ProviderHome,

    },
    ProviderProfile : {
        screen : Profile
    }

},
    {

        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: 'black',
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
    StatusDetails: {
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
                backgroundColor: 'black',
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
                return <Icon name="ios-paper" color='black' size={20} />
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
    Authloading: AuthLoading,
    Auth: AuthStack,
    Service: CustomerServiceStack,
    Provider: ProviderStack,

},
    {
        initialRouteName: 'Authloading',

    }
)

const AppContainer = createAppContainer(AppStack)

export default AppContainer;
