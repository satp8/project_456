import * as actionType from './actionType';

export const add_service = (servicedata) => {
    console.log(servicedata) 
    return dispatch => {
        dispatch({
            type: actionType.ADD_SERVICE,
            servicedata:servicedata
        })
    } 
}