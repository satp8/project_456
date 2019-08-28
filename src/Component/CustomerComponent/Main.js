import React,{Component} from 'react';
import {Text,View,FlatList} from 'react-native';
import {Image,Card,ListItem} from 'react-native-elements';
// import bgimg from '../../../asset/download.jpeg';

class Main extends Component { 
   
        state = [
          {
            name: 'Amy Farha',
            subtitle: 'Vice President'
          },
          {
            name: 'Chris Jackson',
            avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
            subtitle: 'Vice Chairman'
          },
        ]
        
        keyExtractor = (item, index) => index.toString()
        
        renderItem = ({ item }) => (
          <ListItem
            bottomDivider={true} 
            title={item.name}
            subtitle={item.subtitle}
            rightAvatar={{
              source: item.avatar_url && { uri: item.avatar_url },
              title: item.name[0]
            }}
          />
        )
        
        render () {
          return (
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state} 
              renderItem={this.renderItem}
            />
          )
        }
       
}  

export default Main;