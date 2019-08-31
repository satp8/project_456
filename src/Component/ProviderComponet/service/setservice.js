import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native'
import { Input, Button } from 'react-native-elements';
import { Picker } from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import {createService} from '../../../store/action/service_action'
class SetService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      service: '',
      price: '0',
      description: ''
    };
  }
  handlePickerValue = (data) => {
    this.setState({
      service: data
    })
  }
  handlePriceValue = (data) => {
    this.setState({
      price: data
    })
  }
  handleDescriptionValue = (data) => {
    this.setState({
      description: data
    })

  }
  handleSubmit = () => {
    console.log('handle submit called')
    let data = JSON.stringify(this.state)
    let accesstoken = this.props.userdata.token
    createService(data, accesstoken )
    
  }
  render() {
    return (
      <View style={styles.main1}>
        <View style={styles.element}>
          <Picker
            mode="dropdown"
            style={{ width: "100%", borderWidth: 1, borderRadius: 20 }}
            selectedValue={this.state.service}
            placeholder="Select your SIM"
            onValueChange={(data) => this.handlePickerValue(data)}
          >
            <Picker.Item label="Salon At Home" value="salon_at_home" />
            <Picker.Item label="Cleaning" value="cleaning" />
            <Picker.Item label="Electrician" value="Electrician" />
            <Picker.Item label="Fitness" value="fitness" />
          </Picker>
        </View>
        <View style={styles.element}>
          <Input
            containerStyle={styles.input}
            keyboardType="numeric"
            value={this.state.price}
            placeholder='Price'
            onChangeText={this.handlePriceValue}
            value={this.state.price}
            name='price'
            leftIcon={
              <Icon
                style={{ marginRight: 10 }}
                name='ios-cash'
                size={30}
                color='#000'
              />
            } />
        </View>
        <View style={styles.element}>
          <Input
            containerStyle={styles.input}
            placeholder="Description of service"
            multiline={true}
            numberOfLines={4}
            onChangeText={this.handleDescriptionValue}
            value={this.state.description}
          />
        </View>
        <View style={styles.element}>
          <Button
            onPress={this.handleSubmit}
            title="Solid Button"
          />
        </View>

      </View>

    );
  }
}
const styles = StyleSheet.create({
  main1: {
    height: 500,
    width: "100%",
    padding: 10
  },
  element: {
    padding: 4,
    width: '100%',
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,

  },
  input: {
    borderWidth: 1,
    borderRadius: 20,
    width: '100%'
  }
})


const mapStateToProps = (state) => {
  return {
    userdata: state.auth
  }
}
export default connect(mapStateToProps)(SetService); 