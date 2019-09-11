import React,{Component} from 'react';
import {Alert,Text,StyleSheet,View,Image,FlatList,TouchableNativeFeedback} from 'react-native'; 
import {Button,Badge,Input,ListItem} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import bgimg from '../../../asset/download.jpeg';
import axios from 'axios';
import Modal from 'react-native-modal';
import { TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import * as projectaction from '../../store/action/index';
import {Transition} from 'react-navigation-fluid-transitions';
 

class requestdetail extends Component {
    state = {
        modal:false,
        type:'',
        comment:'',
        allcomment:[]
    }
    static navigationOptions =({navigation}) => {
        return {

            headerTitle: 'RequestDetail',    
            headerLeft: (
              <Button  
              onPress={() => navigation.navigate('Booking')}   
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
            )   
        }
    }
    call_function = () => {
      this.props.cleartoken()
    }
    componentDidMount(){ 
      this.props.navigation.setParams({call_function: this.call_function})

      if(this.props.status === 'Accepted' || this.props.status === 'Completed'){ 
        let token = this.props.token;
        let serviceRequestId = this.props.requestdetailid 
        axios({
          method:'POST',
          url:'http://13.127.108.174:3000/uc/getComments',
          headers:{
              'x-access-token': token,  
              'content-Type':'application/json' 
          },
          data:JSON.stringify({ 
            serviceRequestId:serviceRequestId         
          })  
        })
        .then((response) => { 
          console.log(response.data.data) 
          var joined = this.state.allcomment.concat(response.data.data);
          this.setState({allcomment:joined})
        })
      }
    } 
    modalhandler = (type) => {
       console.log(type)
       this.setState({
           modal:true,
           type:type
       })} 

    
    deleterequest = () => {
        this.setState({
            modal:false 
        }) 
        console.log(this.props.requestdetailid)
        let token = this.props.token;
        let serviceRequestId = this.props.requestdetailid
        
        axios({
            method:'DELETE',
            url:'http://13.127.108.174:3000/uc/deleteRequest',
            headers:{
                'x-access-token': token,  
                'content-Type':'application/json' 
            },
            data:JSON.stringify({ 
              serviceRequestId:serviceRequestId         
            })  
        })
        .then((response) => { 
           console.log(response)
           this.props.navigation.navigate('Booking')
        }) 

    }

    commenthandler = () => {
      this.setState({
        modal:false 
    }) 
    let token = this.props.token;
    let serviceRequestId = this.props.requestdetailid
    let comment = this.state.comment
    axios({
        method:'POST',
        url:'http://13.127.108.174:3000/uc/addComment',
        headers:{
            'x-access-token': token,  
            'content-Type':'application/json' 
        },
        data:JSON.stringify({ 
          comment:comment,
          serviceRequestId:serviceRequestId         
        })  
    })
    .then((response) => { 
       console.log(response)
       this.props.navigation.navigate('Booking')
    }) 

    }
   render(){
     console.log(this.state.type)
     console.log( Object.keys(this.state.allcomment).map((e,i) => {  
      return(
        this.state.allcomment[e].comment
          )}))
    let modalView;
    if(this.state.modal && this.state.type === 'delete'){ 
        modalView = <Modal
        isVisible={this.state.modal}
        animationIn="slideInLeft"
        animationOut="slideOutRight"
        > 
          <View style={styles.content}>  
          <Text style={styles.contentTitle}>Are you sure?</Text>
          <Button title='Delete' onPress={() => this.deleterequest('delete')} 
            titleStyle={{color:'#000'}}
            type='outline'   
            buttonStyle={{borderColor:'#000',borderRadius:10}}/>
          </View> 
       </Modal>
    }

    if(this.state.modal && this.state.type === 'comment'){ 
      modalView = <Modal
      isVisible={this.state.modal}
      animationIn="slideInLeft"
      animationOut="slideOutRight"
      > 
        <View style={styles.content}>  
        <Text style={styles.contentTitle}>Add comment</Text>
        <Input 
               inputContainerStyle={{borderWidth:1,borderRadius:20,margin:10}} 
               placeholder="comment"
               onChangeText={(e)=>this.setState({comment:e})}              
        />

        <View style={{flexDirection:'row'}}>
        <Button title='submit' onPress={() => this.commenthandler()} 
          titleStyle={{color:'#000'}}
          type='outline'  
          buttonStyle={{borderColor:'#000',borderRadius:10,marginRight:10}}/>
        <Button title='Back' onPress={() => this.setState({modal:false})} 
          titleStyle={{color:'#000'}}
          type='outline'  
          buttonStyle={{borderColor:'#000',borderRadius:10}}/>
        </View> 
      
        </View> 
     </Modal>
  }
       return(
           <View style={styles.container}>
             <View style={{alignItems:'center'}}>
            <View>
               {modalView} 
           </View>
           <Transition shared='home' appear='horizontal' >
           <Text style={{fontSize:20}}>{this.props.requestDescription}</Text>
           </Transition>
           <Image source={bgimg} style={{width:'50%',borderRadius:100,marginTop:20}} />   
           <Badge value={this.props.status} containerStyle={{margin:10}} textStyle={{alignContent:'center',alignItems:'center',justifyContent:'center'}} badgeStyle={{paddingVertical:10}}/>    
           <View style={{flexDirection:'row'}}> 
           <Button 
            disabled={this.props.status === 'Pending'?false:true} 
            onPress={() => this.modalhandler('delete')} 
            titleStyle={{color:'#000'}} 
            type='outline' 
            title='Delete'  
            buttonStyle={{borderColor:'#000',borderRadius:10,marginTop:20,marginRight:10}}
            /> 
           <Button 
           disabled={this.props.status !== 'Accepted'?true:false}   
           onPress={() => this.modalhandler('comment')}     
           titleStyle={{color:'#000'}}  
           type='outline' 
           title='comment'  
           buttonStyle={{borderColor:'#000',borderRadius:10,marginTop:20}}/> 
           </View>
           </View>
           <FlatList 
          data = {
            Object.keys(this.state.allcomment).map((e,i) => {  
              return(
                this.state.allcomment[e].comment
                  )}) 
        }
        keyExtractor = {(item, index) => item} 
        renderItem={({item}) =>
                        
        <ListItem
        Component={TouchableNativeFeedback}    
        bottomDivider 
        key={item}     
        leftAvatar={{rounded:true,avatarStyle:{borderRadius:10}, source: bgimg}}   
        title={item}    
        // onPress={()=>this.requesthandler(item._id)}
        /> 
    }
        />
           </View>
       )  
   }
}

const styles = StyleSheet.create({
  container:{
      flex:1,
    //   justifyContent:'center', 
      // alignItems:'center',   
      // alignContent:'center'
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
        requestDescription: state.customerservice.requestDescription,
        status: state.customerservice.requestStatus,
        token:state.auth.token, 
        requestdetailid: state.customerservice.requestDetailId

}}
const mapDispatchToProps = dispatch => {
  return {
    cleartoken:() => dispatch(projectaction.cleartoken())

  }
}
export default connect(mapStateToProps,mapDispatchToProps)(requestdetail)