import * as actionType from './actionType';
import axios from 'axios';
export const createService = (data, accesstoken) => {
    let url = "http://13.127.108.174:3000/uc/addService"
    const requestBody = {
        serviceName: data
    }
    const config = {
        headers: {
            "Accept": "application/json",
            'x-access-token': accesstoken,
            "Content-type": "application/json",
        }
    }
    return dispatch => {
        axios.post(url, JSON.stringify(requestBody), config)
            .then((result) => {
                if (result.data.status === 200 && result.data.message === 'service Added') {
                    dispatch({
                        type: actionType.PROVIDER_CREATE_SERVICE,
                        payload: result
                    })
                 alert('Service Added Sucessfully')   
                }
            }).catch((err) => {
                alert('Create Service Failed Try Again!')
            })

    }
}
export const providerDisplayList = (token) => {
    return dispatch => {
        axios.get('http://13.127.108.174:3000/uc/serviceList', {
            headers: {
                'x-access-token': token,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(response => {
                if (response.status === 200 && response.data.message === 'List of Services') {
                    let filterdata = response.data.data.filter((element, index, array) => {
                        if (element.serviceProviderId === '5d6610b1340460458c104dcd') {
                            return element
                        }
                    })
                    console.log('list response', response)
                    dispatch({
                        type: actionType.PROVIDER_DIPLAY_SERVICE_LIST,
                        payload: filterdata
                    })

                }
                else { 
                    alert('list response',response.data.message)
                }
            }).catch(err => {
                alert('Error While Fetching Service')
            })
    }
}
export const providerDeleteService = (data, token) => {
    return dispatch => {
        fetch('http://13.127.108.174:3000/uc/deleteService', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token,
            },
            body: JSON.stringify({ serviceId: data })
        })
            .then(res => res.json())
            .then(res => {
                if (res.status != 404) {
                    dispatch({
                        type: actionType.PROVIDER_DELETE_SERVICE_LIST,
                        payload: true
                    })
                    alert(res.message)
                }
                else {
                    alert(res.message)
                }
            })
            .catch(err => {
                alert('Error while deleting Service')
            })
    }
}
export const providerUpdateService = (id, value, token) => {
    return dispatch => {
        fetch('http://13.127.108.174:3000/uc/updateService', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token,
            },
            body: JSON.stringify({
                serviceId: id,
                serviceName: value
            })
        })
            .then(res => res.json()) // OR res.json()
            .then(res => {
                dispatch({
                    type: actionType.PROVIDER_UPDATE_SERVICE_LIST,
                    payload: true
                })
                alert(res.message)
            })
            .catch(err => {
                alert('Failed to Update Service')
            })
    }

}
export const providerServiceValue = (data) => {
    return {
        type: actionType.PROVIDER_SERVICE_VALUE,
        payload: data

    }
}
export const providerServiceLoader = (data) => {
    return {
        type: actionType.PROVIDER_CREATE_SERVICE_LOADER,
        payload: data
    }
}

