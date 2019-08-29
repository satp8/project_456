import {createStore,combineReducers,compose,applyMiddleware} from 'redux';
import Authreducer from './Authreducer';
import CustomerService from './CustomerServiceReducer';
import thunk from 'redux-thunk'; 

const rootreducer = combineReducers({

    auth: Authreducer,
    customerservice: CustomerService 
})

const configuration = () => {
    const composeEnhancer = compose;
    return createStore(rootreducer,composeEnhancer(applyMiddleware(thunk)))
}

export default configuration;