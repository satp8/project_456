import * as actionType from '../action/actionType';
const initialstate = {
    value: '',
    spinner: false,
    display_service_loader: false,
    display_service_list: []
}
export default ProviderService = (state = initialstate, action) => {
    switch (action.type) {
        case actionType.PROVIDER_SERVICE_VALUE:
            return {
                ...state, value: action.payload
            }
        case actionType.PROVIDER_CREATE_SERVICE:
            console.log('create action serviced called')
            return {
                ...state, spinner: false, display_service_loader: true, value: ''
            }
        case actionType.PROVIDER_CREATE_SERVICE_LOADER:
            console.log('action loader called')
            return {
                ...state, spinner: action.payload
            }
        case actionType.PROVIDER_DIPLAY_SERVICE_LIST:
            return {
                ...state, display_service_list: action.payload, display_service_loader: false
            }
        case actionType.PROVIDER_DELETE_SERVICE_LIST:
            return {
                ...state, display_service_loader: action.payload
            }
        case actionType.PROVIDER_UPDATE_SERVICE_LIST:
            return {
                ...state, display_service_loader: action.payload
            }
        default: {
            return state
        }
    }
}