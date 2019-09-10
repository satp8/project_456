import React,{Component} from 'react';
import {Text,View,FlatList,StyleSheet,TouchableNativeFeedback,ActivityIndicator,ImageBackground,RefreshControl} from 'react-native';
import {Image,Card,ListItem,Button} from 'react-native-elements';
import {connect} from 'react-redux';
import * as projectaction from '../../store/action/index';
import axios from 'axios';
import bgimg from '../../../asset/download.jpeg';
import TimedSlideshow from 'react-native-timed-slideshow';
import { AndroidBackHandler } from 'react-navigation-backhandler';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/FontAwesome5'; 
import CardView from 'react-native-cardview'
import { withNavigation } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import {Transition} from 'react-navigation-fluid-transitions';


class Home extends Component {  
        static navigationOptions = ({navigation}) => {
          console.log(navigation)
          return {
            title:'Home',
            headerRight:(
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
        state = {
          refreshing:false
        }
        
        call_function = () => {
          this.props.cleartoken()
        }
        componentDidMount(){
          var token =  AsyncStorage.getItem('usertoken')
          console.log(token)  
          this.makeRequest(token)
          this.props.navigation.setParams({call_function: this.call_function})
        }
      
        makeRequest = (token) => {
          console.log(token)  

          let data = {
            token: token
          } 
          axios.get('http://13.127.108.174:3000/uc/serviceList',{
            headers:{ 
              'x-access-token': data.token 
            }
          })   
          .then(response => {
            console.log(response.data.data)  
            this.props.add_service(response.data.data)
            this.setState({
              refreshing:false 
            })
          }) 
        }

        onBackButtonPressAndroid = () => {
          return true
       }
       
       refreshhandler = () => {
         this.setState({
           refreshing:true
         },() => {
           this.makeRequest()
         })
       }
        render() {

          // console.log(this.props.servicedata[0])
          
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

          let loading = <ActivityIndicator size="large" color="#2c3e50" style={{flex:1,justifyContent:'center'}}/>
          if(this.props.servicedata){

           loading = 
              <View style={styles.container}>
              <View style={styles.slide}>
              <FlatList
                
                
              refreshing={this.state.refreshing}
              onRefresh={this.refreshhandler}
              horizontal={true}  
              showsHorizontalScrollIndicator={false}  
              data={[
                {key: 'couch'},
                {key: 'charging-station'},
                {key: 'wrench'}, 
                {key: 'bitcoin'},
               
              ]}
                        keyExtractor = {(item, index) => item[index]} 
                        renderItem={({item}) => 
                        //   <View>    
                        //  <ImageBackground 
                        //   source={require('../../../asset/download.jpeg')} 
                        //   style={{width:150,height:100,marginHorizontal:10,marginVertical:25}}   
                        //   imageStyle={{borderRadius:10}}  blurRadius={0.4} >  
                         
                        //   <View style={styles.overlay}>
                        //   {/* <Text style={{color:'#f1c40f'}}>{item.key}</Text> */}
                        //   <Icons 
                        //     name={item.key}
                        //     size={25} 
                        //     color='#f1c40f'
                        //   />  
                        //   </View> 
                        // </ImageBackground>   
                        //  </View>  
                    
                        <View style={styles.container}>
                        <CardView style={styles.insidelayer}
                        
                        cardElevation={7} 
                        cardMaxElevation={7}  
                        cornerRadius={5}>  
                           <View style={{alignContent:'center',justifyContent:'center',flex:1,alignItems:'center'}}> 
                             {/* <Text style={{width:'100%'}}>hello</Text>  */}
                             <ImageBackground 
                          source={require('../../../asset/download.jpeg')} 
                          style={{width:150,height:100,marginHorizontal:0,marginVertical:25}}     
                          imageStyle={{borderRadius:10}}  blurRadius={0.4} >  
                         
                          <View style={styles.overlay}>
                          {/* <Text style={{color:'#f1c40f'}}>{item.key}</Text> */}
                          <Icons 
                            name={item.key}
                            size={25} 
                            color='#f1c40f'
                          />  
                          </View> 
                        </ImageBackground>  
                          </View>
                        </CardView>
                        </View> 
                      
                         }
                         
              /> 
            </View>
               <FlatList 
               key={Math.random()}
                data={
                     
                    Object.keys(this.props.servicedata).map((e,i) => {  
                    return(
                      this.props.servicedata[i]
                        )})
                        }
                        keyExtractor = {(item, index) => item._id} 
                        renderItem={({item}) =>
                        
                        <ListItem
                        Component={TouchableNativeFeedback}   
                        bottomDivider 
                        key={item._id}    
                        rightAvatar={{rounded:false, source: bgimg,size:'medium'}}  
                        title={item.serviceName}  
                        onPress={()=>this.props.navigation.navigate({
                          routeName:'Service',
                          key:'Service',
                          params:{service:item.serviceName,serviceRequestId:item.serviceProviderId,serviceId:item._id}
                        })}    
                        />
                  }
              />
              </View>
          }
              
        
          return (
           <AndroidBackHandler onBackPress={this.onBackButtonPressAndroid}>
           <View style={styles.container}>
             {loading}
           </View>   
           </AndroidBackHandler>
   
 )
  }      
     } 
        
         const styles = StyleSheet.create({
          container: {
           flex: 1,
        
          //  backgroundColor:'#eee', 
           marginTop:10,
           marginBottom:10,
           marginHorizontal:5,
           width:'100%'
          },
          insidelayer: {
            height:100, 
            aspectRatio:1.4,     
            width:'80%',
            alignItems:'center',
            justifyContent:'center',

            // backgroundColor:'#eee'
        
          },
          overlay:{
            ...StyleSheet.absoluteFillObject,
            backgroundColor:'rgba(13,4,51,0.6)',       
            overflow:'hidden',
            borderRadius:10,
            alignItems:'center',
            flex:1,
            justifyContent:'center',
          },
        })
        


const mapStateToProps = state => {
  return {
    token:state.auth.token,
    servicedata: state.customerservice.servicedata
  }
}

const mapDispatchToProps = dispatch => {
  return {
    add_service: (data) => dispatch(projectaction.add_service(data)),
    cleartoken:() => dispatch(projectaction.cleartoken())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);  