import React, { Component } from 'react';
import { connect } from 'react-redux'
import CustomerStatus from './customerstatus'
import { Container, Header, Content, List, Card } from 'native-base';
import { Button, StyleSheet, View, Platform, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { RectButton, BorderlessButton } from 'react-native-gesture-handler';
import { Loader, status_details } from '../../../store/action/providerstatus'
class customerstatusview extends Component {

    constructor(props) {
        super(props);
        this.state = {
            refreshing: true
        };
    }
    componentDidMount() {
        this.props.navigation.setParams({ handleRefresh: this._handleRefresh });
    }
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: navigation.getParam('userName'),
            headerRight: (
                <View style={styles.headerbtn}>
                    <BorderlessButton
                        style={{ marginRight: 15 }}>
                        <Icon
                            name="ios-search"
                            onPress={() => navigation.navigate('Search')}
                            size={Platform.OS === 'ios' ? 22 : 25}
                            style={{ fontWeight: 'bold' }}
                            // color={SearchLayout.DefaultTintColor}
                            color="#fff"
                        />
                    </BorderlessButton>
                    <Icon
                        name='ios-refresh'
                        size={25}
                        color='#fff'
                        style={{ fontWeight: 'bold' }}
                        onPress={navigation.getParam('handleRefresh')}
                    />
                </View>
            ),
        };
    };
    _handleRefresh = () => {
        this.props.dispatch(Loader())
    }
    componentDidUpdate() {
        if (this.props.statusrequestdetails.loader === true) {
            let token = this.props.userdata.token
            this.props.dispatch(status_details(token))
        }
    }
    render() {
        const { statusdetails, loader } = this.props.statusrequestdetails
        if (loader === true) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItem: 'center' }}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )
        }
        const { navigation } = this.props;
        const customerId = navigation.getParam('userId');
        let filterdata
        statusdetails.data.filter(item => {
            if (item.key === 'ServiceRequest') {
                filterdata = item.value.filter((value) => {
                    if (value.customerId._id === customerId) {
                        return value
                    }
                    else {
                        return false
                    }
                })
            }
            else {
                return false
            }
        });
        return (
            <Container>
                <Content>
                    <Card>
                        <List>
                            <CustomerStatus navigation={this.props.navigation} filterdata={filterdata} />
                        </List>
                    </Card>
                </Content>
            </Container>
        );


    }
}

const mapStateToProps = (state) => {
    return {
        userdata: state.auth,
        statusrequestdetails: state.providerstatus
    }
}

export default connect(mapStateToProps)(customerstatusview);

const styles = StyleSheet.create({
    headerbtn: {
        flexDirection: 'row',
        marginRight: 3,
        padding: 4
    }


})