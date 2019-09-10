import * as actionType from '../action/actionType';

const initialState = {
    email:'',
    password:'',  
    token:'',
    loading:false,
    name:'',
    error:'',
    userid:'',
    formSubmit:false,
    checked:true,
    customer:false,
    serviceProvider:false,
    serviceId:'',
    userType:'',
    userName:'' 
}

const Auth = (state=initialState,action) => {
    console.log(action)
    switch(action.type){
    
        case actionType.ADD_AUTH:
            return {
                ...state,
               [action.userid]:action.uservalue
            }
        case actionType.SIGNIN:
            return {
                ...state,
                loading:true,
                email:'',
                password:''
            }
        case actionType.SUBMIT_TOKEN:
            return {
                ...state,
                token: action.token,
                userType:action.userType,
                serviceId:action.serviceId,
                userName:action.userName,
                email:action.email
            }
        case actionType.SIGNUP_SUBMIT:
            return {
                ...state,
                // loading:true,  
                formSubmit: true,
            }
        case actionType.SIGNUP_ERROR:
            return {
                ...state,
                error: action.error
            }
        case actionType.SUBMIT_TOKEN_ERROR:
            
            return {
                ...state,
                error: action.error,
                loading:false
            }
        case actionType.LOADING_FALSE:
            return {
                ...state,  
                loading:false,
                email:'',
                password:'',
                error:'',
                name:'', 
                customer:false,
                serviceProvider:false
            }
        case actionType.SIGNUP_LOADING:
            return {
                ...state,
                loading:true
            }
        
        case actionType.CLEAR_TOKEN:
            return {
                ...state,
                token:''
            }
        
        case actionType.CHECKBOX:
            console.log(action)
            if(action.userType === 'customer' ){
                if(state.serviceProvider === false){
                    return {
                        ...state,
                        customer: !state.customer,
                        serviceProvider: state.serviceProvider
                    }
                }else if(state.serviceProvider === true){
                    return {
                        ...state,
                        customer: !state.customer, 
                        serviceProvider: !state.serviceProvider
                    } 
                }
                 
            }
            else if(action.userType === 'serviceProvider' ){ 
                if(state.customer === false){
                    return {
                        ...state,
                        customer: state.customer,
                        serviceProvider: !state.serviceProvider
                    }
                }else if(state.customer === true){
                    return {
                        ...state,
                        customer: !state.customer, 
                        serviceProvider: !state.serviceProvider
                    }
                } 
            }

        default:
            return state
    }
}

export default Auth;