import React, { Component } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native'
import { Container, Content, Card, Text, CardItem, Body } from 'native-base'
import DisplayProviderService from './displayProviderService'
import { connect } from 'react-redux';
import { providerDisplayList, providerDeleteService, providerUpdateService } from '../../../store/action/provider_service_action'
class GetService extends Component {
    constructor(props) {
        super(props);
        this.state = {
            servicesProviderData: [],
            loader: false
        };
    }
    componentDidMount() {
        this.props.dispatch(providerDisplayList(this.props.userdata.token))
    }
    componentDidUpdate() {
        if (this.props.providerservice.display_service_loader === true) {
            this.props.dispatch(providerDisplayList())
        }
    }

    _keyExtractor = (item, index) => item._id;

    handledelete = (data) => {
        let deletetoken = this.props.userdata.token
        this.props.dispatch(providerDeleteService(data, deletetoken))
    }
    handleUpdate = (id, value) => {
        let updatetoken = this.props.userdata.token
        this.props.dispatch(providerUpdateService(id, value, updatetoken))

    }
    _renderItem = ({ item }) => {

        return (
            <DisplayProviderService item={item} delete={this.handledelete} update={this.handleUpdate} />
        )
    }

    render() {
        if (this.props.providerservice.display_service_loader === true) {
            return (
                <View style={styles.container}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                        <ActivityIndicator size={70} color="#0000ff" />
                    </View>
                </View>
            )

        }
        else if (this.props.providerservice.display_service_list != []) {

            return (
                <Container>
                    <Content padder>
                        <Card style={styles.card}>
                            <CardItem header bordered style={{ alignItems: 'center', backgroundColor: 'black' }}>
                                <Text style={styles.headerText}>ServiceList</Text>
                            </CardItem>
                            <CardItem bordered>

                                <FlatList
                                    data={this.props.providerservice.display_service_list}
                                    keyExtractor={this._keyExtractor}
                                    renderItem={this._renderItem}
                                />

                            </CardItem>
                        </Card>
                    </Content>
                </Container >
            )



        } else {
            return (
                <View>
                    <Text>No Service Added</Text>
                </View>
            )

        }

    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,

    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff'
    },
    card: {
        height: 350,
        borderWidth: 2,

    }
})
const mapStateToProps = (state) => {
    return {
        userdata: state.auth,
        providerservice: state.providerservice
    }
}
export default connect(mapStateToProps)(GetService);