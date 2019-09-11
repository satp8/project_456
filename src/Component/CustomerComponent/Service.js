import React,{Component} from 'react';
import {Button,ListItem,Card,Badge, withBadge,Input, Overlay} from 'react-native-elements';
import {Text,Image,TouchableNativeFeedback,FlatList,View,ImageBackground,StyleSheet,ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/FontAwesome5'; 
import { AndroidBackHandler } from 'react-navigation-backhandler'; 
import { withNavigation } from 'react-navigation';
import {connect} from 'react-redux';
import axios from 'axios';
import * as projectaction from '../../store/action/index';
import CardView from 'react-native-cardview'
import TimedSlideshow from 'react-native-timed-slideshow';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-community/async-storage';



 

class Service extends Component {


    static navigationOptions =({navigation}) => {
        return {

            headerTitle: 'Service',    
            headerLeft: (
              <Button  
              onPress={() => navigation.navigate('Home')}  
              buttonStyle={{backgroundColor:'#000'}}  
              icon={
                <Icon
                  name="ios-arrow-round-back"
                  size={35}  
                  color="#fff"
                />
              }
              />
            ),
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
            ),      
        }
    }

    call_function = () => {
      this.props.cleartoken()
    }
    componentDidMount(){
      
      this.props.navigation.setParams({call_function: this.call_function})
    }
    onBackButtonPressAndroid = () => {
      this.props.navigation.navigate('Home')   
      return true  
    }

   add_service_handler = (servicename) => { 
       this.props.add_individual_service(servicename)
   }

   minus_service_handler = (servicename) => {
        const disable = {
          ...this.props.servicename
        };
        console.log(disable)
        const disablelist  = Object.keys(disable).map(e => {
          return disable[servicename] > 0  
        })
        console.log(disablelist[0])
        if(disablelist[0]){
          this.props.minus_individual_service(servicename) 
        }
  
   }

   requesthandler = (type,value) => {
     
    this.props.add_create_service_request(type,value)

   }
  
   onSubmit = (serviceReqId,serviceId) => {
     description = this.props.servicedescription
     token = this.props.token
     this.props.create_service_request(description,serviceId,serviceReqId,token)
   }

   render(){ 
    
    console.log(this.props.navigation)  
    const { navigation } = this.props;
    const servicenamelist = navigation.getParam('service');  
    const serviceReqId =   navigation.getParam('serviceRequestId') 
    const serviceId = navigation.getParam('serviceId') 
    console.log(this.props.modal)
   
    let modalView;
    if(this.props.modal){
        modalView = <Modal
        isVisible={this.props.modal}
        animationIn="slideInLeft"
        animationOut="slideOutRight"
        > 
          <View style={styles.content}> 
          <Text style={styles.contentTitle}>submit successfully!</Text>
          <Button title='Back' onPress={() => this.props.modal_View()} 
            titleStyle={{color:'#000'}}
            type='outline' title='Back'   
            buttonStyle={{borderColor:'#000',borderRadius:10}}/>
          </View> 
       </Modal>
    }
      
      return(
          
          <AndroidBackHandler onBackPress={this.onBackButtonPressAndroid}>
            <View>
            {modalView}
            </View> 
            <View> 
            {/* <FlatList
              showsHorizontalScrollIndicator={false} 
              data={[
                {key: 'couch'},
                {key: 'chargingStation'},
                {key: 'wrench'},
                {key: 'bitcoin'},
                 
              ]}
                        keyExtractor = {(item, index) => item._id} 
                        renderItem={({item}) => 
                        
                        <View style={styles.container}>
                        <CardView style={styles.insidelayer}
                        cardElevation={2}
                        cardMaxElevation={2}
                        cornerRadius={5}> 
                           <View style={{flexDirection:'row'}}>  
                           <Text style={{width:'80%'}}>
                           {item.key}
                           </Text>
                           <View style={{flexDirection:'row'}}>
                             <Icons 
                               name="plus-square"
                               size={25}
                               color="#000" 
                               onPress={() => this.add_service_handler(item.key)}/>  
                             <Text style={{height:25,marginHorizontal:5,translateY:2}}>
                               {item.key === 'couch'?this.props.servicename.couch:null} 
                               {item.key === 'wrench'? this.props.servicename.wrench:null} 
                               {item.key === 'chargingStation'? this.props.servicename.chargingStation:null}
                               {item.key === 'bitcoin'? this.props.servicename.bitcoin:null}

                            </Text>  
                             <Icons  
                                name="minus-square" 
                                size={25}   
                                color="#000" 
                                onPress={() => this.minus_service_handler(item.key)}/>    
                           </View>
                          </View> 
                        </CardView> 
                        </View> 
                        
                  }
              />  */}
               <View style={{ alignItems:'center',justifyContent:'center', marginTop:10,marginBottom:10,}}>
               <Text style={{fontSize:20}}>{servicenamelist}</Text>              
               </View>
               <View>
               <Input 
               inputContainerStyle={{borderWidth:1,margin:10,paddingBottom:50}} 
               labelStyle={{fontSize:10}}
               placeholder="Enter the description....." 
               onChangeText={(e)=>this.requesthandler('servicedescription',e)}              
               />

               <View style={styles.buttonstyle}> 
               <Button onPress={() => this.onSubmit(serviceReqId,serviceId)} titleStyle={{color:'#000'}} type='outline' title='Submit'  buttonStyle={{borderColor:'#000',borderRadius:10,backgroundColor:'#e67e22',}}/>
               </View> 
               </View>
              </View>     
          </AndroidBackHandler>

       )

   }
}

const styles = StyleSheet.create({
  container: {
    flex:1, 
    alignItems:'center',
    justifyContent:'center',  
    marginTop:10,
    marginBottom:10,
  },
  insidelayer: {
    height:60,
    width:'100%',
    alignItems:'center',
    justifyContent:'center', 
    backgroundColor:'#eee'

  }, 
  buttonstyle:{
    color:'#000', 
    width:150,
    marginTop:10,
    marginLeft:100,
    overflow:'hidden' 
},
modalstyle: {
  flex:1,
  height:25,
},
content: {
  backgroundColor: 'rgba(225,225, 225, 8)',
  padding: 30,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 8,
  borderColor: 'rgba(0, 0, 0, 0.1)',
},
contentTitle: {
  fontSize: 20,
  marginBottom: 12,
  color:'green'
},
})
const mapStateToProps = state => {
  return {
    servicedata: state.customerservice.servicedata,
    servicename: state.customerservice.serviceName,
    disable: state.customerservice.disable,
    servicedescription:state.customerservice.servicedescription,
    serviceRequestId:state.customerservice.serviceRequestId,
    token:state.auth.token, 
    serviceId:state.auth.serviceId, 
    modal: state.customerservice.modal

  }
}
const mapDispatchToProps = dispatch => { 
  return {
    add_service: (data) => dispatch(projectaction.add_service(data)),
    add_individual_service: (indservice) => dispatch(projectaction.add_individual_service(indservice)),
    minus_individual_service: (indservice) => dispatch(projectaction.minus_individual_service(indservice)),
    create_service_request: (description,serviceId,serviceRequestId,token) => dispatch(projectaction.create_service_request(description,serviceId,serviceRequestId,token)),
    add_create_service_request: (userid,uservalue) => dispatch(projectaction.add_create_service_request(userid,uservalue)),
    modal_View: () => dispatch(projectaction.modalView()),
    cleartoken:() => dispatch(projectaction.cleartoken())


    
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Service);