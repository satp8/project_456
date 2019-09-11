import React, { Component } from 'react';
import CustomerDetails from './customerdetails'
class CustomerView extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        let seen = new Set();
        let filterdata
        let { statusdetails } = this.props

        statusdetails.filter(item => {
            if (item.key === 'ServiceRequest') {
                filterdata = item.value.filter((data) => {
                    if (seen.has(data.customerId._id)) {
                        return false
                    }
                    else {
                        seen.add(data.customerId._id)
                        return data
                    }
                })
            }
            else {
                return false
            }
        });

        return (
            
            <CustomerDetails filterdata={filterdata} />
        )


    }
}
export default CustomerView;

