import React, { useState } from 'react';
import { ListItem, Thumbnail, Text, Left, Body, Right, Button, Badge, Content } from 'native-base';
import CustomerStatusModal from './customerstatusmodal'

export default class CustomerStatus extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visibleModal: false,
            data: {
                name: '',
                status: '',
                color: '',
                description: '',
                serviceRequestId: ''

            }
        }
    }
    getDetails = (data, status_color) => {
        this.setState((prevstate) => {
            return {
                data: {
                    name: data.serviceId.serviceName,
                    status: data.status,
                    color: status_color,
                    description: data.description,
                    serviceRequestId: data._id,
                },

                visibleModal: true,
            }
        }, () => {
            console.log(this.state)
        })

    }
    toggleModal = (data) => {
        console.log('close modal called')
        this.setState({
            visibleModal: data
        })
    }
    render() {
        return (
            <Content>
                <ListItems filterdatas={this.props.filterdata} getDetails={(data, color) => this.getDetails(data, color)} />

                <CustomerStatusModal visible={this.state.visibleModal} closeModal={() => this.toggleModal} data={this.state.data} />
            </Content>
        )
    }
}
function ListItems(props) {
    const listitem = props.filterdatas.map((data) => {
        let statuscolor = ''
        switch (data.status) {
            case 'Accepted':
                statuscolor = 'green'
                break
            case 'Rejected':
                statuscolor = 'red'
                break
            case 'Pending':
                statuscolor = 'black'
                break
            case 'Completed':
                statuscolor = "green"
                break
        }
        return (
            <Content>
                <ListItem key={data._id} thumbnail>
                    <Left>
                        <Thumbnail circle source={require('../../../../asset/user.jpg')} />
                    </Left>
                    <Body>
                        <Text>{data.serviceId.serviceName}</Text>
                        <Text note numberOfLines={2}>{data.description}</Text>
                    </Body>
                    <Right>
                        <Badge style={{ backgroundColor: statuscolor }}>
                            <Text style={{ color: 'white' }}>{data.status}</Text>
                        </Badge>

                        {
                            data.status === 'Pending' ? (
                                <Text onPress={() => props.getDetails(data, statuscolor)}>ChangeStatus</Text>
                            ) : null
                        }
                        {
                            data.status === 'Accepted' ? (
                                <Text onPress={() => props.getDetails(data, statuscolor)}>ChangeStatus</Text>

                            ) : null
                        }
                    </Right>
                </ListItem>
            </Content>
        )

    })
    return listitem

}