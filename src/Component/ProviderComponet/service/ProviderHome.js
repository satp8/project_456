import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import GetService from './getservice'
import SetService from './setservice'
class ProviderHome extends Component {
    render() {
        return (
            <View style={styles.container}>

                <SetService />

            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#6190E8',
        padding: 10
        
    },


})
export default ProviderHome;