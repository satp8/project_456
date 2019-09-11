import React, { Component } from 'react';
import { Container, Content, List, Card } from 'native-base'
import { ActivityIndicator, View } from 'react-native'
import { Loader, status_details } from '../../../store/action/providerstatus'
import CustomerView from './customerdetailsview'
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux'

class StatusHome extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Service Status',
            headerRight: (
                <View style={{marginRight : 5}}>
                    <Icon
                        name='ios-refresh'
                        size={25}
                        color='#fff'
                        style={{ fontWeight: 'bold', marginRight: 15 }}
                        onPress={navigation.getParam('handleRefresh')}
                    />
                </View>
            )
        }
    };
    _handleRefresh = () => {
        this.props.dispatch(Loader())
    }
    componentDidMount() {
        this.props.dispatch(Loader())
         this.props.navigation.setParams({ handleRefresh: this._handleRefresh });
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
        } else if (loader === false && Object.entries(statusdetails).length != 0) {

            return (
                <Container>
                    <Content>
                        <Card>
                        <List>
                            <CustomerView statusdetails={statusdetails.data} />
                        </List>
                        </Card>
                    </Content>
                </Container>
            )
        }
        else {
            return (
                null
            )
        }
    }
}
const mapStateToProps = (state) => {
    return {
        userdata: state.auth,
        statusrequestdetails: state.providerstatus
    }
}
export default connect(mapStateToProps)(StatusHome)