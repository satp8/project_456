import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import { Input, Button } from 'react-native-elements';
import { Picker } from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { createService, providerServiceLoader, providerServiceValue } from '../../../store/action/provider_service_action'

class SetService extends Component {
  constructor(props) {
    super(props);
  }
  handleServiceInput = (data) => {
    this.props.dispatch(providerServiceValue(data))
  }
  handleSubmit = () => {
    console.log('handle submit called')
    if (this.props.providerservice.value != '') {
      this.props.dispatch(providerServiceLoader(true))
    }
    else {
      alert('Text is Empty');
    }

  }
  componentDidUpdate() {
    if (this.props.providerservice.spinner === true) {
      let accesstoken = this.props.userdata.token
      this.props.dispatch(createService(this.props.providerservice.value, accesstoken))
    }

  }
  toggleSubmitIcon = () => {
    if (this.props.providerservice.spinner === true) {
      return (
        <ActivityIndicator size={40} color="black" />
      )
    }
    else {
      return (
        <Icon
          style={{ marginRight: 10 }}
          name='ios-add-circle'
          size={40}
          color='black'
          onPress={() => this.handleSubmit()}
        />
      )
    }
  }

  render() {
    return (
      <View style={styles.element}>
        <Input
          containerStyle={styles.input}
          inputContainerStyle={{height: 40}}
          value={this.props.providerservice.value}
          placeholder='Enter Service Name'
          onChangeText={this.handleServiceInput}
          rightIcon={
            this.toggleSubmitIcon
          } />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  element: {
    width: "100%"
  },
  input: {
    borderWidth: 1,
    borderRadius: 20,
    width: "100%",
    backgroundColor: '#ffffff'
  }
})


const mapStateToProps = (state) => {
  return {
    userdata: state.auth,
    providerservice: state.providerservice
  }
}
export default connect(mapStateToProps)(SetService); 