import React ,{Component} from 'react';
import {View} from 'react-native'
import Appcontainer from './src/Component/Navigation';
import FlashMessage from "react-native-flash-message";

class App extends Component {

  render() { 
    return (
      <View>
      <Appcontainer />
      <FlashMessage position="top" animated={true}/> 
      </View>
    )
  }
}

export default App; 