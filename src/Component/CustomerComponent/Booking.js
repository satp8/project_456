import React,{Component} from 'react';
import {Text,View,FlatList,StyleSheet,TouchableNativeFeedback} from 'react-native';
import {ListItem,Badge,Button} from 'react-native-elements';
import {connect} from 'react-redux';
import axios from 'axios';
import bgimg from '../../../asset/download.jpeg';
import * as projectaction from '../../store/action/index';
import TimedSlideshow from 'react-native-timed-slideshow';
import AsyncStorage from '@react-native-community/async-storage';
import { withNavigation } from 'react-navigation';



class Booking extends Component {

  static navigationOptions= ({navigation}) => {
    return{
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
        state = {
          refreshing:false
        }

        call_function = () => {
          this.props.cleartoken()
        }
        componentDidMount(){ 
          const {navigation} = this.props;
          this.asyncall()  
          this.props.navigation.setParams({call_function: this.call_function})
          this.focusListner = navigation.addListener('didFocus',() => {
            this.asyncall()
          }) 
        }
       
    asyncall = async() => {
      console.log('asyncall')
   
        const usertoken = await AsyncStorage.getItem('usertoken');  
        this.makeRequest(usertoken)
        console.log(usertoken) 
    
} 
        componentWillUnmount(){
          this.focusListner.remove();
        }

     
        makeRequest = (token) => {
          console.log(token)    
          let data = {
            token: token
          } 
          axios.get('http://13.127.108.174:3000/uc/getAllServiceRequest',{
            headers:{
              'x-access-token': data.token   
            }
          })   
          .then(response => {
            console.log(response.data.data)  
            this.props.booking_service(response.data.data) 
            this.setState({
              refreshing:false 
            })
          }) 
        }

        refreshhandler = () => {
          this.setState({
            refreshing:true
          },() => {
            this.asyncall()
          })  
        }

        requesthandler = (requestDetailId) => {
          // alert('hello')
          console.log(requestDetailId,this.props.token)  
          let token = this.props.token

          axios({
            method:'POST',
            url:'http://13.127.108.174:3000/uc/getOneRequestDetail',
            headers:{
                'x-access-token': token,  
                'content-Type':'application/json' 
            },
            data:JSON.stringify({ 
              serviceRequestId:requestDetailId          
            }) 
        })
        .then((response) => { 
           dataresponse = response 
           console.log(dataresponse) 
           this.props.requestDetail(dataresponse)
           this.props.navigation.navigate('RequestDetail')
        }) 

        }
        
   render(){
     console.log(this.props.navigation.state.routeName)
    // let statusid;
    // let statusnoti = Object.keys(this.props.bookingservice)
    // .map((e,i) => {  
    //   return(
    //     this.props.bookingservice[i].status
    //       )}).map((i))
    //  console.log(statusnoti)   
    //     if(statusnoti === 'Pending'){
    //      return statusid = 'error' 
    //     }else if(this.props.bookingservice.status === 'accepted'){
    //       statusid = 'success'
    //     }else if(this.props.bookingservice.status === 'rejected'){
    //       statusid = 'error'
    //     }else if(this.props.bookingservice.status === 'completed'){
    //       statusid = 'warning'
    //     }
    const items = [
      {
        uri: require('../../../asset/slide.jpg'), 
        direction:'left'
      },
      {
        uri: require('../../../asset/slide2.jpg'),
        direction:'right'
      },
      {
        uri: require('../../../asset/slide3.jpg'),
        direction:'left'
      }
    ]
       
     console.log(this.props.bookingservice)

     
       return(

        <View style={styles.container}>  
        {/* {this.props.isFocused? this.makeRequest():null}  */}
        <View style={styles.slide}> 
        <TimedSlideshow
          items={items} 
          showProgressBar={false}
          duration={4000}
          footerStyle={{paddingTop:5,height:'100%'}}
          fullWidth={true} 
          />  
        </View> 
                <FlatList 
              refreshing={this.state.refreshing}
               onRefresh={this.refreshhandler}
                data={
                     
                    Object.keys(this.props.bookingservice).map((e,i) => {  
                    return(
                      this.props.bookingservice[i]
                        )})
                        }
                        keyExtractor = {(item, index) => item._id} 
                        renderItem={({item}) =>
                        
                        <ListItem
                        Component={TouchableNativeFeedback}    
                        bottomDivider 
                        key={item._id}    
                        rightAvatar={{rounded:false, source: bgimg,size:'medium'}}   
                        title={item.description}  
                        
                        badge={{value:item.status,status:"primary"}}  
                        onPress={()=>this.requesthandler(item._id)}
                        /> 
                  }
              />   
        </View> 
       )
   } }

const styles = StyleSheet.create({
  container:{
   flex: 1,

  //  backgroundColor:'#eee', 
  //  marginTop:10,
  //  marginBottom:10, 
  //  marginHorizontal:5,
  //  width:1
  },
  slide:{
    height:'35%',
    margin:10,  
    borderRadius:20
  },  
})

const mapStateToProps = state => {
  return {
    bookingservice: state.customerservice.bookingService,
    token:state.auth.token, 
    
  }
}

const mapDispatchToProps = dispatch => {
  return {
    booking_service: (servicedata) => dispatch(projectaction.booking_service(servicedata)),
    requestDetail: (data) => dispatch(projectaction.requestDetail(data)),
    cleartoken:() => dispatch(projectaction.cleartoken())
 
  }
}

export default withNavigation(connect(mapStateToProps,mapDispatchToProps)(Booking));