import React, { Component } from 'react';
import { View, Modal, TouchableOpacity, ActivityIndicator, Alert, StyleSheet } from 'react-native'
import { Container, Header, Content, Card, CardItem, Text, Badge, Picker, Body, Button, Right, Left, H2 } from 'native-base';
import { UpdateStatusLoader, UpdateStatus, UpdateValue } from '../../../store/action/providerstatus'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons';
class customerstatusmodal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedStatusValue: ''
        };
    }
    getPickerValue = (pickerstatus) => {
        let list_item = [];
        let value;
        if (pickerstatus === 'Accepted') {
            list_item = ['Completed']
        }
        else if (pickerstatus === 'Pending') {
            list_item = ['Accepted', 'Rejected', 'Completed']
        }
        value = list_item.map((x, i) => {
            return (<Picker.Item label={x} key={i} value={x} />)
        })
        return value

    }
    toggleSubmitbtn = () => {

        if (this.props.statusrequestdetails.updatestatusloader === true) {
            return (
                <ActivityIndicator size="large" color="#6190E8" />
            )
        }
        else {
            return (
                <Button style={{ backgroundColor: '#6190E8' }} onPress={this.handleModalSubmit}>
                    <Text>Submit</Text>
                </Button>
            )
        }
    }
    handleModalSubmit = () => {
        if (this.props.statusrequestdetails.statusvalue === '') {
            Alert.alert(
                'Warning',
                'Please Select Update Status',
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false },
            );
        }
        else {
            this.props.dispatch(UpdateStatusLoader())
        }
    }
    componentDidUpdate(prevprops, prevstate) {
        const { updatestatusloader } = this.props.statusrequestdetails
        if (updatestatusloader === true) {
            let requestBody = {
                serviceRequestId: this.props.data.serviceRequestId,
                status: this.props.statusrequestdetails.statusvalue
            }
            this.props.dispatch(UpdateStatus(requestBody))

        }
        else if (updatestatusloader === false) {
            this.props.closeModal(false)
        }

    }
    render() {
        const { name, status, color, description } = this.props.data
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.props.visible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}>
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(52, 52, 52, 0.8)',

                }}>
                    <View style={{
                        width: 350,
                        height: 380,
                        padding: 4
                    }}>

                        <Container>
                            <Content>
                                <CardItem style={{ height: 60, backgroundColor: '#6190E8' }} header bordered>
                                    <Left>
                                        <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'white' }}>UpdateStatus</Text>
                                    </Left>
                                    <Right>
                                        <Icon.Button
                                            name='ios-close-circle'
                                            size={30}
                                            color='black'
                                            onPress={this.props.closeModal(false)}
                                            backgroundColor='#6190E8'
                                        />
                                    </Right>
                                </CardItem>

                                <Card>
                                    <CardItem bordered>
                                        <Left>
                                            <Text style={styles.itemlabel}>CurrentStatus</Text>
                                        </Left>
                                        <Right style={styles.modalrightcontent}>
                                            <Badge style={{ backgroundColor: color }}>
                                                <Text style={{ color: 'white' }}>{status}</Text>
                                            </Badge>
                                        </Right>
                                    </CardItem>
                                    <CardItem bordered>
                                        <Left>
                                            <Text style={styles.itemlabel}>ServiceName</Text>
                                        </Left>
                                        <Right style={styles.modalrightcontent}>
                                            <Text>{name}</Text>
                                        </Right>
                                    </CardItem>
                                    <CardItem bordered>
                                        <Left>
                                            <Text style={styles.itemlabel}>Description</Text>
                                        </Left>
                                        <Right style={styles.modalrightcontent}>
                                            <Text>{description}</Text>
                                        </Right>
                                    </CardItem>
                                    <CardItem bordered>
                                        <Left>
                                            <Text style={styles.itemlabel}>Update-Status</Text>
                                        </Left>
                                        <Right style={styles.modalrightcontent}>

                                            <Picker
                                                style={{ height: 50, width: "100%" }}
                                                selectedValue={this.props.statusrequestdetails.statusvalue}
                                                onValueChange={(itemValue, itemIndex) =>
                                                    this.props.dispatch(UpdateValue(itemValue))
                                                }>

                                                {this.getPickerValue(status)}

                                            </Picker>
                                        </Right>
                                    </CardItem>
                                    <CardItem footer bordered>
                                        <Body style={{ alignItems: 'center' }}>

                                            {this.toggleSubmitbtn()}


                                        </Body>
                                    </CardItem>

                                </Card>

                            </Content>
                        </Container>



                    </View>
                </View>
            </Modal >
        );
    }
}
const styles = StyleSheet.create({
    itemlabel: {
        fontWeight: 'bold'
    },
    modalrightcontent: {
        alignItems: 'center'
    }
})
const mapStateToProps = (state) => {
    return {
        statusrequestdetails: state.providerstatus
    }
}
export default connect(mapStateToProps)(customerstatusmodal);

