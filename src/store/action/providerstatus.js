import * as actionType from '../action/actionType';
import { Alert } from 'react-native'
export const Loader = () => {
    return {
        type: actionType.PROVIDER_LISTSTATUS_LOADER,
        payload: true
    }
}
export const UpdateStatusLoader = () => {
    return {
        type: actionType.PROVIDER_STATUS_UPDATE_LOADER,
        payload: true
    }
}
export const UpdateValue = (value) => {
    return {
        type: actionType.PROCIDER_STATUS_VALUE,
        payload: value
    }
}
export const refreshStatus = (value) => {
    return {
        type: actionType.PROVIDER_STATUS_REFRESH,
        payload: value
    }
}
export const modalToggle = (value) => {
    return {
        type: actionType.PROVIDER_STATUS_MODAL,
        payload: value
    }
}
export const setCustomerDetails = (data) => {
    return {
        type : actionType.PROVIDER_CUSTOMER_DETAILS,
        payload: data
    }
}
export const UpdateStatus = (data, token) => {
    return dispatch => {
        fetch('http://13.127.108.174:3000/uc/changeStatus', {
            method: 'PUT',
            headers: {
                'x-access-token': token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then((res) => res.json())
            .then((res) => {
                if (res.status === 200 && res.message === 'Status Changed') {
                    let sucessdata = {
                        statusloader: false,
                        modalloader : false
                    }
                    Alert.alert(
                        'Success',
                        'Status Updated Succesfully',
                        [
                            {
                                text: 'OK',
                                onPress: () => dispatch({type: actionType.PROVIDER_STATUS_UPDATE, payload: sucessdata})

                            },

                        ],
                        { cancelable: false },
                    );


                } else if (res.status === 404 || res.message === 'Cannot change status') {
                    let faileddata = {
                        statusloader: false,
                        modalloader : true
                    }
                    Alert.alert(
                        'Try Again',
                        'Status Cannot be Changed',
                        [
                            {
                                text: 'OK',
                                onPress: () => dispatch({type: actionType.PROVIDER_STATUS_UPDATE, payload: faileddata})
                            },
                        ],
                        { cancelable: false },
                    );
                }


            })
            .catch((err) => alert(err.message))
    }
}
export const status_details = (token) => {
    return dispatch => {
        fetch('http://13.127.108.174:3000/uc/getAllServiceRequest', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token,
            }
        }).then(res => res.json())
            .then(data => {
                dispatch({
                    type: actionType.PROVIDER_STATUS_DETAILS,
                    payload: data
                })
            })
    }

}