import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import GetService from './getservice'
import SetService from './setservice'
import Icon from 'react-native-vector-icons/Ionicons';
class ProviderHome extends Component {
    static navigationOptions = {
        title: 'Services',
        headerStyle: {
            shadowOpacity: 0,
            elevation: 0,
            backgroundColor: '#6190E8'
        },
        headerRight: (
            <View style={{ flexDirection: 'row', marginRight : 15 }}>
                <Icon.Button
                    name='ios-contact'
                    size={30}
                    color='#fff'
                    style={{backgroundColor : '#6190E8'}}
                />
            </View>

        )

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
        backgroundColor: '#6190E8',
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