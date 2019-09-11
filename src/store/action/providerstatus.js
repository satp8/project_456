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
export const UpdateStatus = (data) => {
    return dispatch => {
        fetch('http://13.127.108.174:3000/uc/changeStatus', {
            method: 'PUT',
            headers: {
                'x-access-token': '7vvld0kdly',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then((res) => res.json())
            .then((res) => {
                if (res.status === 200 && res.message === 'Status Changed') {
                    Alert.alert(
                        'Success',
                        'Status Updated Succesfully',
                        [
                            {
                                text: 'OK',
                            },
                        ],
                        { cancelable: false },
                    ); 
                    dispatch({
                        type: actionType.PROVIDER_STATUS_UPDATE,
                        payload: false
                    })

                } else if (res.status === 404 && res.message === 'Cannot change status') {
                    Alert.alert(
                        'Try Again',
                        'Status Cannot be Changed',
                        [
                            {
                                text: 'OK',
                            },
                        ],
                        { cancelable: false },
                    );
                }

            })
            .catch((err) => alert(err.message))
    }
}
export const status_details = () => {
    return dispatch => {
        fetch('http://13.127.108.174:3000/uc/getAllServiceRequest', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': '7vvld0kdly',
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