import React,{Component} from 'react';
import {Text,View,FlatList,StyleSheet,TouchableNativeFeedback,ActivityIndicator} from 'react-native';
import {Image,Card,ListItem} from 'react-native-elements';
import {connect} from 'react-redux';
import * as projectaction from '../../store/action/index';
import axios from 'axios';
import bgimg from '../../../asset/download.jpeg';
import TimedSlideshow from 'react-native-timed-slideshow';

class Home extends Component {  
     
        componentDidMount(){
          console.log(this.props.token) 
          let data = {
            token: this.props.token
          } 
          axios.get('http://13.127.108.174:3000/uc/serviceList',{
            headers:{
              'x-access-token':'0tu8kvtwrj9m'  
            }
          })  
          .then(response => {
            // console.log(response.data.data.serviceName)  
            this.props.add_service(response.data.data)
          }) 
        }
             
      
        render() {
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
              <TimedSlideshow
              items={items} 
              showProgressBar={false}
              duration={5000}
              footerStyle={{paddingTop:5,height:'100%'}} 
             
            />  
            </View>
            <FlatList 
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
                        onPress={()=>this.props.navigation.navigate('Service')}

                        />
                  }
              />
              </View>
          }

          return (
           <View style={styles.container}>
             {loading}
           </View>      
 )
  }      
     } 
        
         const styles = StyleSheet.create({
          container: {
           flex: 1,
          },
          slide:{
            height:'35%',
            margin:10,
            borderRadius:20
          }
        })
        

const mapStateToProps = state => {
  return {
    token:state.auth.token,
    servicedata: state.customerservice.servicedata
  }
}

const mapDispatchToProps = dispatch => {
  return {
    add_service: (data) => dispatch(projectaction.add_service(data)) 
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);  