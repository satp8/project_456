import React,{Component} from 'react';
import {Text} from 'react-native';

class Service extends Component {
    static navigationOptions =() => {
        return {
            title: 'service',

        }
    }
   render(){ 
       return(
           <Text>Profile</Text>
       )
   }
}

class LogoTitle extends React.Component {
    render() {
      return (
        <Image
        //   source={require('./spiro.png')}
          style={{ width: 30, height: 30 }}
        />
      );
    }
  }

export default Service;