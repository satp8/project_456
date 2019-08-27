import React,{Component} from 'react';
import axios from 'axios';   
import {connect} from 'react-redux';
import * as projectaction from '../../store/action/index';
import {View,Text,StyleSheet,ImageBackground,Dimensions,ActivityIndicator,TouchableNativeFeedback,TextInput,KeyboardAvoidingView} from 'react-native';
import {Input,Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import bgimg from '../../../asset/Memariani.jpg'
import { showMessage, hideMessage } from "react-native-flash-message";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import FlashMessage from "react-native-flash-message";



export function YourCustomTransition(animValue, position = "top") {
    const opacity = animValue.interpolate({
      inputRange: [0, 1], 
      outputRange: [0, 0.5], 
    });

   
  
    const translateY = animValue.interpolate({
      inputRange: [0,1], 
      outputRange: [180,0],     
    });
  
    return {
      transform: [{ translateY }],
      opacity,
    };
  }

class SignIn extends Component {
    
    authhandler = (type,e) => {
        let userid
        let uservalue
        if(type === 'email'){
            userid = 'email'
            uservalue = e 
        }else if(type === 'password'){ 
            userid = 'password'
            uservalue = e 
        }
      this.props.add_auth(userid,uservalue)  
    } 
  
    onSubmit = () => {  
        var emailval = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        var passval = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

        let email = this.props.email
        let password = this.props.password

        if(email === ''){
            errorinfo = showMessage({
                message: 'Please fill the email',
                floating:true,
                backgroundColor:'#000',
                position:'center',
                transitionConfig: YourCustomTransition,
              });   
        }else if(password === ''){
            errorinfo = showMessage({
                message: 'Please fill the password',
                floating:true,
                backgroundColor:'#000',
                position:'center',
                transitionConfig: YourCustomTransition,
            });   
        }else{
            this.props.on_submit(this.props.email,this.props.password)
        }

        // console.log(this.props) 
        // let errorinfo = null; 
        // if(this.props.error){
        //     errorinfo = showMessage({
        //         message: this.props.error,
        //         floating:true,
        //         backgroundColor:'#000',
        //         position:'center',
        //         transitionConfig: YourCustomTransition,
        //       });   
        // }
    }  
    

    // componentDidUpdate(prevProps) {
    //     // Typical usage (don't forget to compare props):
    //     if (this.props.error !== prevProps.error) {
    //         errorinfo = showMessage({
    //             message: this.props.error,
    //             floating:true,
    //             backgroundColor:'#000',
    //             position:'center',
    //             transitionConfig: YourCustomTransition, 
               
    //           }); 
    //     }
    //   }
    
    render() {
       console.log(this.props.error)

        let loading =  <Button onPress={this.onSubmit} titleStyle={{color:'#000'}} type='outline' title='Submit'  buttonStyle={{borderColor:'#000',borderRadius:10}}/>;
        if(this.props.loading){
            loading = <Button title='Submit' loading titleStyle={{color:'#000'}} type='outline' title='Submit'  buttonStyle={{borderColor:'#000',borderRadius:10}} />
        }  

        if(this.props.error){
            loading = <Button 
            onPress={this.onSubmit} 
            titleStyle={{color:'#000'}}
            type='outline' 
            title='Submit'
            buttonStyle={{borderColor:'#000',borderRadius:10}}
            />;
            }

        if(!this.props.token){  
            this.props.navigation.navigate('Main') 
        }

        let error;
        if(this.props.error){
            error = showMessage({
                message: this.props.error,   
                floating:true,
                backgroundColor:'#000',
                position:'center',
                transitionConfig: YourCustomTransition, 
              });  
            this.props.loading_false()
        }
     
        return(
            <ImageBackground source={bgimg} style={{width:'100%',height:'100%'}}>   
             {/* <KeyboardAwareScrollView> */}
            <View style={styles.container}>
            <View style={{marginTop:100}}> 
               <Input 
                  inputContainerStyle={{borderWidth:1,borderRadius:20,margin:10}} 
                  shake={true}
                  name='email'  

                  spellCheck={false}
                  autoCorrect={false}
                  value={this.props.email}
                  onChangeText={(e) => this.authhandler('email',e)} 
                  placeholder='email'  
                  leftIcon={   
                      <Icon  
                          style={{marginRight:10}} 
                          name='ios-contact' 
                          size={30}
                          color='#000'
                      />
                  } />
                  <View>
                   {this.errorinfo}
                   {error} 
                  </View>
                  <Input 
                  inputContainerStyle={{borderWidth:1,borderRadius:20,margin:10}} 
                  shake={true}
                  secureTextEntry={true}  
                  value={this.props.password}
                  onChangeText={(e)=>this.authhandler('password',e)}
                  placeholder='password' 
                  caretHidden={false}
                  name='password'
                  leftIcon={  
                      <Icon 
                          style={{marginRight:10}} 
                          name='ios-lock'   
                          size={30}
                          color='#000'
                      />
                  } />

                  
                  <TouchableNativeFeedback>
                  <View style={styles.buttonstyle}>  
                  {loading}    
                  </View>
                  </TouchableNativeFeedback>
                  <Text style={styles.signup} onPress={()=>this.props.navigation.navigate('Signup')}>SignUp</Text> 
           </View>
            </View>
            {/* </KeyboardAwareScrollView> */}
            <FlashMessage  animated={true}/>  
            </ImageBackground>

        )
    } 
}



const styles = StyleSheet.create({
    container:{
        flex:1,
    
    },
    buttonstyle:{
        backgroundColor:'transparent',
        color:'#000',
        width:150,
        marginTop:10,
        marginLeft:100  
    },
    signup:{
        color:'blue',
        textDecorationLine:'underline',
        marginTop:10,
        marginLeft: 150

    },
   
})



const mapStateToProps = state => {
    return {
        email: state.auth.email,
        password: state.auth.password,
        loading: state.auth.loading,
        token: state.auth.token,
        error: state.auth.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        add_auth:(userid,uservalue) => dispatch(projectaction.add_auth(userid,uservalue)),
        on_submit:(email,password) => dispatch(projectaction.signin(email,password)),
        loading_false: () => dispatch(projectaction.loading_false()) 

    }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(SignIn); 