import {createStore,combineReducers,compose,applyMiddleware} from 'redux';
import Authreducer from './Authreducer';
import CustomerService from './CustomerServiceReducer';
import ProviderService from './provider_service'
import ProviderStatus from './provider_status_reducer'
import thunk from 'redux-thunk'; 

const rootreducer = combineReducers({

    auth: Authreducer,
    customerservice: CustomerService,
    providerservice : ProviderService,
    providerstatus : ProviderStatus
})

const configuration = () => {
    const composeEnhancer = compose;
    return createStore(rootreducer,composeEnhancer(applyMiddleware(thunk)))
}

export default configuration;