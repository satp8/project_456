import React,{Component} from 'react';
import {Text,Image,View,TouchableOpacity,StyleSheet,PixelRatio,PermissionsAndroid,TouchableWithoutFeedback} from 'react-native';
import {Button,Card} from 'react-native-elements'
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import * as projectaction from '../../store/action/index';
import ImagePicker from 'react-native-image-picker';

class Profile extends Component {
  state = {
    avatarSource: null,

  }
    static navigationOptions= ({navigation}) => {
        return{
        headerTitle:'Profile',
        headerRight: (
            <Button title='Back' 
            onPress={() => {
              navigation.getParam('call_function')()                        
                AsyncStorage.clear().then(() => {
                navigation.navigate('Auth') 
                })     
            }}  
            titleStyle={{color:'#fff'}}
            type='outline' title='Logout'   
            buttonStyle={{borderColor:'#fff',borderRadius:10,marginRight:5}}/>
          )
        }
      }
      call_function = () => {
        this.props.cleartoken()
      }
      componentDidMount(){
      
        this.props.navigation.setParams({call_function: this.call_function})
      }

      selectPhotoTapped = () => {
        const options = {
          quality: 1.0,
          maxWidth: 500,
          maxHeight: 500,
          storageOptions: {
            skipBackup: true,
          }
        }

      ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', response);
      
        if (response.didCancel) {   
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          const source = { uri: response.uri };
      
          // You can also display the image using data:
          // const source = { uri: 'data:image/jpeg;base64,' + response.data };
      
          this.setState({
            avatarSource: source  
          })
        }
      })} 

   render(){

       return(
         
         <View> 
           
         <Image 
         style={{resizeMode:'cover',width:'100%',height:150}} 
         source={require('../../../asset/background.jpg')}
         />
         <TouchableOpacity 
          style={{resizeMode:'cover',width:150,height:150,borderRadius:75,position:'absolute',transform:[{translateY:50},{translateX:100}],backgroundColor:'#eee'}}        
           onPress={() => this.selectPhotoTapped()}         
         >
          <Image  
          style={{resizeMode:'cover',width:150,height:150,borderRadius:75}}
          source={this.state.avatarSource === null ? require('../../../asset/profile.jpeg') :this.state.avatarSource}/> 
         </TouchableOpacity> 
         
         <View style={{transform:[{translateY:50}]}}>
           <Card
           containerStyle={{borderRadius:20}} 
           >  
           <View style={{alignItems:'flex-start',alignContent:'flex-start',justifyContent:'flex-start'}}> 
             <View style={{flexDirection:'row'}}>
                <Text>username</Text>
                <Text style={{marginBottom:10,marginLeft:170}}>{this.props.userName}</Text>  
             </View>
             <View style={{flexDirection:'row'}}>
                <Text>email</Text>
                <Text style={{marginBottom:10,marginLeft:100}}>{this.props.email}</Text> 
             </View>
             <View style={{flexDirection:'row'}}>
                <Text>role</Text>
                <Text style={{marginBottom:10,marginLeft:200}}>{this.props.usertype}</Text>  
             </View>
             
            
           </View>  
           </Card>
         </View>
         </View>
         
       ) 
   }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    borderRadius: 75,
    width: 150,
    height: 150,
  },
});
const mapStateToProps = state => {
  return {
    userName:state.auth.userName,
    email:state.auth.email,
    usertype:state.auth.userType
  }
}

const mapDispatchToProps = dispatch => {
  return {
    cleartoken:() => dispatch(projectaction.cleartoken())
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Profile);