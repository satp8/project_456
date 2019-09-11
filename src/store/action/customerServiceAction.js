import * as actionType from './actionType';
import axios from 'axios';

export const add_service = (servicedata) => {
    console.log(servicedata) 
    return dispatch => {
        dispatch({
            type: actionType.ADD_SERVICE,
            servicedata:servicedata,
        })
    } 
}

export const booking_service = (servicedata) => {
    console.log(servicedata) 
    return dispatch => {
        dispatch({
            type: actionType.BOOKING_SERVICE,
            bookingService:servicedata,
        })
    } 
}

export const add_individual_service = (indservice) => {
    console.log(indservice) 
    return dispatch => {
        dispatch({
            type: actionType.ADD_SERVICE_INDIVIDUAL_SERVICE,
            serviceName:indservice
        })
    } 
}

export const minus_individual_service = (indservice) => {
    console.log(indservice) 
    return dispatch => {
        dispatch({
            type: actionType.MINUS_SERVICE_INDIVIDUAL_SERVICE,
            serviceName:indservice
        })
    } 
}

export const create_service_request = (description,serviceId,serviceRequestId,token) => {
    console.log(description,serviceId,serviceRequestId,token) 
    return dispatch => {
        
      
        fetch('http://13.127.108.174:3000/uc/createRequest',{
            method:'POST',
            headers:{
                'x-access-token': token,  
                'content-Type':'application/json'
            },
            body:JSON.stringify({ 
                description: description,
                serviceId: serviceId,
                serviceRequestId: serviceRequestId           
            })
        })
        .then((response) => { 
           console.log(response.json()) 
        })

        dispatch({
            type: actionType.MODAL,
        })

    } 

}

export const modalView= (userid,value) => { 
    // console.log(indservice) 
    return dispatch => {
        dispatch({
            type: actionType.MODAL_VIEW
        })
    } 
}

export const add_create_service_request = (userid,value) => {
    // console.log(indservice) 
    return dispatch => {
        dispatch({
            type: actionType.ADD_CREATE_SERVICE_REQUEST,
            id:userid,
            value:value
        })
    } 
}

export const requestDetail = (response) => {
    console.log(response.data.data[0])
    return dispatch => {
        dispatch({
            type:actionType.REQUEST_DETAIL,
            requestDescription: response.data.data[0].description,
            requestStatus: response.data.data[0].status,
            requestDetailId: response.data.data[0]._id

        })
    }
}

export const isConnected= (connectionInfo) => { 
    // console.log(indservice) 
    return dispatch => {
        dispatch({
            type: actionType.CONNECTION_INFO,
            connectionInfo:connectionInfo
        })
    } 
}