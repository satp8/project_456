import React ,{Component} from 'react';
import {View} from 'react-native'
import Appcontainer from './src/Component/Navigation';
import NetInfo from "@react-native-community/netinfo"; 
import {connect} from 'react-redux';
import * as projectaction from './src/store/action/index'; 
import SplashScreen from 'react-native-splash-screen'

class App extends Component {
  componentDidMount(){
    SplashScreen.hide();
    this.isconnected()
}
isconnected = () => {
    NetInfo.isConnected.addEventListener('connectionChange',this.connectionhandler)
}
connectionhandler = (isConnected) => { 
    console.log(isConnected)
     this.props.isConnected(isConnected)
}
  render() { 
    return ( 
      <View>
        {/* <Appcontainer />  */}
      </View>
    )
  } 
} 

const mapDispatchToProps = dispatch => {
  return{
    isConnected: (connectioninfo) => dispatch(projectaction.isConnected(connectioninfo))
  }

}

export {Appcontainer}    
export  default connect(null,mapDispatchToProps)(App); 

 
 