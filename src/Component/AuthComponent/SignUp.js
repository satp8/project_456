import React,{Component} from 'react';
import * as projectAction from '../../store/action/index';
import {connect} from 'react-redux';
import {View,Text,StyleSheet,ImageBackground,ActivityIndicator,TouchableNativeFeedback,TextInput,Dimensions} from 'react-native';
import {Input,Button,CheckBox} from 'react-native-elements';
import bgimg from '../../../asset/Memariani.jpg'
import Icon from 'react-native-vector-icons/Ionicons';
import { showMessage, hideMessage } from "react-native-flash-message";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import FlashMessage from "react-native-flash-message";
const { width } = Dimensions.get('window');


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
        if(type === 'customer'){
            userType = 'customer'
          

        }else if(type === 'serviceProvider'){ 
            userType = 'serviceProvider'
         
        }
       
        this.props.checkbox(userType)
    }

    authhandler = (type,e) => {
        let userid
        let uservalue
        if(type === 'email' && (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
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
        var emailval = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        var passval = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

        let name = this.props.name
        let email = this.props.email
        let password = this.props.password
        if(name === ''){
            errorinfo = showMessage({
                message: 'Please fill the name',
                floating:true,
                backgroundColor:'#000',
                position:'center',
                transitionConfig: YourCustomTransition,
              });   
        }else if(email === ''){
            errorinfo = showMessage({
                message: 'Please fill the email',
                floating:true,
                backgroundColor:'#000',
                position:'center',
                transitionConfig: YourCustomTransition,
              });   
        }else if(!email.match(emailval)){
            errorinfo = showMessage({
                message: 'Invalid email',
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
        }
        // else if(!password.match(passval)){
        //     errorinfo = showMessage({
        //         message: 'Invalid Password',
        //         floating:true,
        //         backgroundColor:'#000',
        //         position:'center',
        //         transitionConfig: YourCustomTransition,
        //     }); 
        // }
        else if(this.props.customer === false && this.props.serviceProvider === false){
            errorinfo = showMessage({
                message: 'Please choose the role',
                floating:true,
                backgroundColor:'#000',
                position:'center',
                transitionConfig: YourCustomTransition, 
              }); 
        }

        if(this.props.customer === true && this.props.serviceProvider === false){
            this.props.signup_form_database(name,email,password,'customer') 
        }else if(this.props.customer === false && this.props.serviceProvider === true){
            this.props.signup_form_database(name,email,password,'serviceProvider') 
        }
        
        if(!this.props.connection){
            error = showMessage({ 
                message: 'Connection Error',   
                floating:true,
                backgroundColor:'#000',
                position:'center',
                transitionConfig: YourCustomTransition, 
              });  
            this.props.loading_false()  
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
        let network;
        if(!this.props.connection){ 
            network = <View style={styles.offlineContainer}>
                      <Text style={styles.offlineText}>No Internet Connection</Text>
                      </View>
        }
        if(this.props.loading){
            loading = <Button 
            title='Submit' 
            loading 
            titleStyle={{color:'#000'}}
            type='outline' title='Submit'
            buttonStyle={{borderColor:'#000',borderRadius:10}}
            />
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

        if(this.props.form_submit){
            this.props.navigation.navigate('signin')
            this.props.loading_false()  
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
            <ImageBackground source={bgimg} style={{width: '100%', height: '100%'}}>
                 <KeyboardAwareScrollView>
            <View style={styles.container}>
              {network}
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
                  {error}
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

                  <View style={{flexDirection:'row',marginLeft:25}}>
                  <CheckBox 
                    title='Customer'   
                    checked={this.props.customer}
                    containerStyle={{backgroundColor:'transparent',borderWidth:0}}  
                    checkedColor='#2c3e50'
                    onPress={(e)=> this.checkboxhandler('customer')}  

                  />
                  <CheckBox 
                    title='ServiceProvider' 
                    checked={this.props.serviceProvider}
                    containerStyle={{backgroundColor:'transparent',borderWidth:0}}
                    checkedColor='#2c3e50'  
                    
                    onPress={(e)=> this.checkboxhandler('serviceProvider')}

                  />
                  </View>

                  <TouchableNativeFeedback> 
                  <View style={styles.buttonstyle}>  
                  {loading}
                  </View>
                  </TouchableNativeFeedback> 
                  <Text style={{marginTop:10,marginLeft:100}}>Already signUp? <Text style={{ color:'blue',textDecorationLine:'underline'}} onPress={()=> this.props.navigation.navigate('Signin')}>SignIn</Text></Text>
                  
           </View>
            </View>
            </KeyboardAwareScrollView>
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
    offlineContainer: {
        backgroundColor: '#b52424',
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width,
        position: 'absolute',
        
      },
  offlineText: { color: '#fff' }
})

const mapStateToprops = (state) => {
    return {
        email: state.auth.email,
        password: state.auth.password,
        name:state.auth.name,
        form_submit: state.auth.formSubmit, 
        loading:state.auth.loading,
        token: state.auth.token,
        customer:state.auth.customer,
        serviceProvider:state.auth.serviceProvider,
        error:state.auth.error,
        connection: state.customerservice.connectionInfo 

    }
}

const mapDispatchToProps = dispatch => {
    return {
        signup_form_submission: (userid,uservalue) => dispatch(projectAction.signup_form_submission(userid,uservalue)),
        signup_form_database: (name,email,password,role) => dispatch(projectAction.signup_form_database(name,email,password,role)),
        loading_false:() => dispatch(projectAction.loading_false()),
        checkbox: (userType) => dispatch(projectAction.checkbox(userType)),
        loading_false: () => dispatch(projectAction.loading_false())
    }
}
export default connect(mapStateToprops,mapDispatchToProps)(SignUp);