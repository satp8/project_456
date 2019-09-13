import React, { Component } from 'react'
import CustomerDetails from './customerdetails'


export default class searchResult extends Component {
    render() {
        let searchdata = this.props.data;
        let searchtext = this.props.searchText
        console.log(searchdata, searchtext)
        
        let filterdata = searchdata.filter((data) => {
            if (data.customerId.userName.startsWith(searchtext)) {
                return true
            }
            else {
                return false
            }
        })
        return (
            <CustomerDetails filterdata={filterdata} />
        )
    }
}
