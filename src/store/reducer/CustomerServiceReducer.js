import * as actionType from '../action/actionType';
 
const initialState = {
  servicedata:''
}

const customerService = (state=initialState,action) => {
    console.log(action) 
    switch(action.type){
    
        case actionType.ADD_SERVICE: 
            return {
                ...state,
                servicedata:action.servicedata
            }
        default:
            return state
} 
}
export default customerService;