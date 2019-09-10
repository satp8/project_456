import * as actionType from '../action/actionType';
import {updateObject} from './utility';
const initialState = {
  servicedata:'',
  bookingService:'',
  serviceName:{
    couch:0, 
    chargingStation:0,
    wrench:0, 
    bitcoin:0,
  },
  refreshing:false,
  servicedescription:'',
  description:'',
  modal:false,
  requestDescription:'',
  requestStatus:'',
  requestDetailId:'',
  connectionInfo:true 
}

const customerService = (state=initialState,action) => {
    console.log(action) 
    switch(action.type){
    
        case actionType.ADD_SERVICE: 
            return {
                ...state,
                servicedata:action.servicedata,

            }

        case actionType.BOOKING_SERVICE: 
        console.log(action.bookingService)
            return {
                ...state,
                bookingService:action.bookingService,
                
            }

        case actionType.MODAL: 
                return {
                    ...state,
                    modal:true
                }

        case actionType.MODAL_VIEW:
            return {
                ...state,
                modal:false
            }

         case actionType.ADD_CREATE_SERVICE_REQUEST: 
            console.log(action.bookingService)
                return {
                        ...state,
                        [action.id]:action.value
            }    

        case actionType.REQUEST_DETAIL:
            return {
                ...state,
                requestDescription:action.requestDescription,
                requestStatus: action.requestStatus,
                requestDetailId:action.requestDetailId
            }
        case actionType.ADD_SERVICE_INDIVIDUAL_SERVICE:
            console.log(state.serviceName)
            const updateServiceName = {[action.serviceName]: state.serviceName[action.serviceName] + 1}
            const updatedServiceName = updateObject(state.serviceName,updateServiceName)
            const updateState = {
                serviceName:updatedServiceName
            }
            console.log(updatedServiceName)
            console.log(state.serviceName)
            return updateObject(state,updateState)
              
        case actionType.MINUS_SERVICE_INDIVIDUAL_SERVICE: 
                console.log(state.serviceName)
                const removeServiceName = {[action.serviceName]: state.serviceName[action.serviceName] - 1}
                const removedServiceName = updateObject(state.serviceName,removeServiceName)
                const removeState = {
                    serviceName:removedServiceName
                }
                
                return updateObject(state,removeState)

        case actionType.CONNECTION_INFO: 
                    return {
                            ...state,
                            connectionInfo:action.connectionInfo
                }    
        default:
            return state
} 
}
export default customerService;