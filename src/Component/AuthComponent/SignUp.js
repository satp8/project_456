import React,{Component} from 'react';
import * as projectAction from '../../store/action/index';
import {connect} from 'react-redux';
import {View,Text,StyleSheet,ImageBackground,ActivityIndicator,TouchableNativeFeedback,TextInput} from 'react-native';
import {Input,Button,CheckBox} from 'react-native-elements';
import bgimg from '../../../asset/Memariani.jpg'
import Icon from 'react-native-vector-icons/Ionicons';
import { showMessage, hideMessage } from "react-native-flash-message";

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
 
class SignUp extends Component {
    
    checkboxhandler = (type) => {

        let  userType
        if(type === 'Customer'){
            userType = 'Customer'
          

        }else if(type === 'serviceProvider'){ 
            userType = 'serviceProvider'
         
        }
       
        this.props.checkbox(userType)
    }

    authhandler = (type,e) => {
        let userid
        let uservalue
        if(type === 'email'){
            userid = 'email'
            uservalue = e 

        }else if(type === 'password'){ 
            userid = 'password'
            uservalue = e 
        }else if(type === 'name'){
            userid = 'name'
            uservalue = e
        }
      this.props.signup_form_submission(userid,uservalue)  
    } 

    onSubmit = () => {
        let name = this.props.name
        let email = this.props.email
        let password = this.props.password
        if(name == ''){
            errorinfo = showMessage({
                message: 'Please fill the name',
                floating:true,
                backgroundColor:'#000',
                position:'center',
                transitionConfig: YourCustomTransition,
              });   
        }else if(email == ''){
            errorinfo = showMessage({
                message: 'Please fill the emaIL',
                floating:true,
                backgroundColor:'#000',
                position:'center',
                transitionConfig: YourCustomTransition,
              });   
        }else if(password == ''){
            errorinfo = showMessage({
                message: 'Please fill the password',
                floating:true,
                backgroundColor:'#000',
                position:'center',
                transitionConfig: YourCustomTransition,
              });   
        }else{
        this.props.signup_form_database(name,email,password) 
        }
    }
  
    render(){
        

        let loading =  <Button 
        onPress={this.onSubmit} 
        titleStyle={{color:'#000'}}
        type='outline' 
        title='Submit'
        buttonStyle={{borderColor:'#000',borderRadius:10}}
        />;

        if(this.props.loading){
            loading = <Button 
            title='Submit' 
            loading 
            titleStyle={{color:'#000'}}
            type='outline' title='Submit'
            buttonStyle={{borderColor:'#000',borderRadius:10}}
            />
        } 

        if(this.props.form_submit){
            this.props.navigation.navigate('signin')
            this.props.loading_false()  
        }

        return(
            <ImageBackground source={bgimg} style={{width: '100%', height: '100%'}}>
            <View style={styles.container}>
            <View style={{marginTop:100}}> 
               <Input 
                  inputContainerStyle={{borderWidth:1,borderRadius:20,margin:10}} 
                  shake={true}
                  name='name'  

                  spellCheck={false}
                  autoCorrect={false} 
                  value={this.props.name}
                  onChangeText={(e) => this.authhandler('name',e)} 
                  placeholder='name'  
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
                  </View>
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
                  <Text style={{marginTop:10,marginLeft:100}}>Already signUp? <Text style={{ color:'blue',textDecorationLine:'underline'}} onPress={()=> this.props.navigation.navigate('signin')}>SignIn</Text></Text>
                  
                  <View style={{flexDirection:'row',marginLeft:25}}>
                  <CheckBox 
                    title='Customer' 
                    checked={this.props.Customer}
                    containerStyle={{backgroundColor:'transparent',borderWidth:0}}  
                    checkedColor='#2c3e50'
                    onPress={(e)=> this.checkboxhandler('Customer')}

                  />
                  <CheckBox 
                    title='ServiceProvider' 
                    checked={this.props.serviceProvider}
                    containerStyle={{backgroundColor:'transparent',borderWidth:0}}
                    checkedColor='#2c3e50'  
                    
                    onPress={(e)=> this.checkboxhandler('serviceProvider')}

                  />
                  </View>
           </View>
            </View>
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
})

const mapStateToprops = (state) => {
    return {
        email: state.auth.email,
        password: state.auth.password,
        name:state.auth.name,
        form_submit: state.auth.formSubmit, 
        loading:state.auth.loading,
        token: state.auth.token,
        // checked:state.auth.checked
        Customer:state.auth.Customer,
        serviceProvider:state.auth.serviceProvider
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signup_form_submission: (userid,uservalue) => dispatch(projectAction.signup_form_submission(userid,uservalue)),
        signup_form_database: (name,email,password) => dispatch(projectAction.signup_form_database(name,email,password)),
        loading_false:() => dispatch(projectAction.loading_false()),
        checkbox: (userType) => dispatch(projectAction.checkbox(userType))
    }
}
export default connect(mapStateToprops,mapDispatchToProps)(SignUp);