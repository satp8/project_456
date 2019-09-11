import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import GetService from './getservice'
import SetService from './setservice'
import Icon from 'react-native-vector-icons/Ionicons';
class ProviderHome extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Services',
            headerStyle: {
                shadowOpacity: 0,
                elevation: 0,
                backgroundColor : 'black'
            },
            headerRight: (
                <View style={{ flexDirection: 'row', marginRight: 15 }}>
                    <Icon.Button
                        name='ios-contact'
                        size={30}
                        color='#fff'
                        style={{ backgroundColor: 'black' }}
                        onPress={() => navigation.navigate('ProviderProfile')}
                    />
                </View>

            )
        }


    };
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <SetService />
                </View>
                <GetService />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'flex-start',
    },
    inputContainer: {
        height: 100,
        width: '100%',
        justifyContent: 'center',
        padding: 15,
    },
    // mainContainer : {
    //     height : "100%",
    //     width : '100%',
    //     borderWidth : 2,
    //     justifyContent : 'center',
    //     alignItems : 'center',
    //     backgroundColor : 'red'    
    // }

})
export default ProviderHome;