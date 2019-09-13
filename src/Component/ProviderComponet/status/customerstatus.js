import React, { useState } from 'react';
import { ListItem, Thumbnail, Text, Left, Body, Right, Button, Badge, Content } from 'native-base';
import CustomerStatusModal from './customerstatusmodal'
import { modalToggle } from '../../../store/action/providerstatus'
import { connect } from 'react-redux'
class CustomerStatus extends React.Component {
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
    getDetails = ({ data, color }) => {
        this.setState(state => {
            return {
                data: {
                    name: data.serviceId.serviceName,
                    status: data.status,
                    color: color,
                    description: data.description,
                    serviceRequestId: data._id,
                },
            }
        }, () => {
            this.props.dispatch(modalToggle(true))
        })

    }

    render() {
        return (
            <Content>
                <ListItems filterdatas={this.props.filterdata} getDetails={this.getDetails} />
                <CustomerStatusModal data={this.state.data} />
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
        let badgeValue = data.serviceId.serviceName.charAt(0)

        return (
            <Content>
                <ListItem key={data._id} thumbnail>
                    <Left>
                        <Badge style={{ backgroundColor: 'black' }}>
                            <Text style={{ color: 'white' }}>{badgeValue}</Text>
                        </Badge>
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
                                <Text onPress={() => props.getDetails({
                                    data: data,
                                    color: statuscolor
                                })}>ChangeStatus</Text>
                            ) : null
                        }
                        {
                            data.status === 'Accepted' ? (
                                <Text onPress={() => props.getDetails(
                                    { data: data, color: statuscolor }
                                )}>ChangeStatus</Text>

                            ) : null
                        }
                    </Right>
                </ListItem>
            </Content>
        )

    })
    return listitem

}
export default connect()(CustomerStatus)