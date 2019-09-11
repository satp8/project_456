import * as actionType from '../action/actionType';
const initialState = {
    statusdetails: {},
    loader: false,
    updatestatusloader: false,
    statusvalue: '',
    refresh: false
}

const customerService = (state = initialState, action) => {
    switch (action.type) {
        case actionType.PROVIDER_LISTSTATUS_LOADER:
            return {
                ...state,
                loader: action.payload
            }
        case actionType.PROVIDER_STATUS_DETAILS:
            return {
                ...state,
                loader: false,
                statusdetails: action.payload
            }
        case actionType.PROVIDER_STATUS_UPDATE_LOADER:
            return {
                ...state,
                updatestatusloader: action.payload
            }
        case actionType.PROVIDER_STATUS_UPDATE:
            return {
                ...state,
                updatestatusloader: action.payload
            }
        case actionType.PROCIDER_STATUS_VALUE:
            return {
                ...state,
                statusvalue: action.payload

            }
        case actionType.PROVIDER_STATUS_REFRESH:
            return {
                ...state, refresh: action.payload
            }
        default:
            return state
    }
}
export default customerService;