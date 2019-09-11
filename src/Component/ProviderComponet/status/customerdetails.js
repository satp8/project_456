import React, { Component } from 'react';
import { ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base'
import {TouchableOpacity} from 'react-native'
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
function CustomerDetails(props) {
    const listitem = props.filterdata.map((data) => {
        return (
            <ListItem key={data._id} thumbnail >
                <Left>
                    <Thumbnail circle source={require('../../../../asset/user.jpg')} />
                </Left>

                <Body>
                    <Text>{data.customerId.userName}</Text>
                    <Text note numberOfLines={1}>{data.customerId.email}</Text>
                </Body>
                <Right>
                    <TouchableOpacity onPress={this._onPressButton}>
                        <Icon
                            name='ios-arrow-dropright'
                            size={30}
                            color='#6190E8'
                            onPress={(value) => {
                                props.navigation.navigate('StatusDetails', {
                                    userId: data.customerId._id,
                                    userName: data.customerId.userName
                                })

                            }}
                        />
                    </TouchableOpacity>
                </Right>
            </ListItem >
        )


    })
    return listitem

}
export default withNavigation(CustomerDetails)