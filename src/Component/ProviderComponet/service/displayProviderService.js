import React, { Component } from 'react';
import { View, Modal, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { Input } from 'react-native-elements';
import { Button, Text, Left, Right, Body, Content } from 'native-base'
class displayProviderService extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            updatedValue: ''
        };
    }

    toggleDelete = () => {
        Alert.alert(
            this.props.item.serviceName,
            'Are You Sure Want To delete This Service',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => this.props.delete(this.props.item._id) },
            ],
            { cancelable: false },
        );
    }
    toggleModal = () => {
        this.setState((prevstate) => {
            console.log(prevstate.modalVisible)
            return {
                modalVisible: !prevstate.modalVisible
            }
        })
    }
    handleModalSubmit = () => {
        this.toggleModal()
        this.props.update(this.props.item._id, this.state.updatedValue)
    }
    componentDidUpdate() {
        console.log(this.props.item)
    }
    render() {
        console.log('item...', this.props.item)
        return (
            <View style={styles.listcontainer}>
                <View style={{ width: '72%', justifyContent: 'flex-start'}}>
                    <Text style={styles.listtext}>{this.props.item.serviceName}</Text>
                </View>
                <View style={{ justifyContent: 'center', marginRight: 5 }}>
                    <Icon.Button
                        name='ios-trash'
                        size={35}
                        color='red'
                        style={{ backgroundColor: '#fff', padding: 2 }}
                        onPress={this.toggleDelete}
                    />
                </View>
                <View style={{ justifyContent: 'center' }}>
                    <Icon.Button
                        name="ios-create"
                        size={35}
                        color='#6190E8'
                        style={{ backgroundColor: '#fff', padding: 2 }}
                        onPress={this.toggleModal}
                    />

                </View>


                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#00000080',
                        opacity: 50
                    }}>
                        <View style={{
                            width: 350,
                            height: 330,
                            backgroundColor: '#fff',

                        }}>

                            <View style={{ flex: 1 }}>
                                <View style={styles.modalheader}>
                                    <Text style={{ fontSize: 25, color: 'white' }}>Update Service</Text>
                                </View>
                                <View style={styles.modalContent}>
                                    <View style={styles.elements}>
                                        <Input
                                            containerStyle={styles.modalinput}
                                            editable={false}
                                            value={this.props.item.serviceName}
                                            inputContainerStyle={{height : 40}}
                                        />
                                    </View>
                                    <View style={styles.elements}>
                                        <Input
                                            placeholder="Enter Update Service Name"
                                            containerStyle={styles.modalinput}
                                            inputContainerStyle={{height : 40}}
                                            value={this.state.updatedValue}
                                            onChangeText={text => this.setState({
                                                updatedValue: text
                                            })}
                                        />
                                    </View>
                                </View>
                                <View style={styles.modalFooter}>

                                    <TouchableOpacity
                                        style={styles.modalsubmitbtn}
                                        onPress={this.handleModalSubmit}
                                    >
                                        <Text style={styles.text}> Submit </Text>
                                    </TouchableOpacity>


                                    <TouchableOpacity
                                        style={styles.modalcancelbtn}
                                        onPress={this.toggleModal}
                                    >
                                        <Text style={styles.text}> Cancel </Text>
                                    </TouchableOpacity>

                                </View>
                            </View>

                        </View>
                    </View>
                </Modal>
            </View>

        );
    }
}
const styles = StyleSheet.create({
    listcontainer: {
        flexDirection: 'row',
        height: 40,
        marginBottom: 10,
    },
    listtext: {
        fontSize: 20,
    },
    text: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold'
    },

    modalheader: {
        flex: 0.2,
        backgroundColor: '#6190E8',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContent: {
        flex: 0.6,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5
    },
    modalFooter: {
        flex: 0.2,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10

    },
    modalsubmitbtn: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#6190E8',
        width: '40%',
        height: "60%",
        borderWidth: 1,
        borderRadius: 20,

    },
    modalcancelbtn: {
        backgroundColor: '#E0263D',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 20,
        width: '40%',
        height: "60%",

    },
    modalinput: {
        borderWidth: 1,
        borderRadius: 20,
        width: "100%",
        backgroundColor: '#ffffff',
    },
    elements: {
        marginBottom: 15,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }

})
export default displayProviderService;