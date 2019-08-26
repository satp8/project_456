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
    Customer:false,
    serviceProvider:false
}

const Auth = (state=initialState,action) => {
    console.log(action)
    switch(action.type){
        // case actionType.AUTH_CREATE:
        //     return {
        //         ...state,
        //         token: action.token
        //     }

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
                token: action.token
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
                password:''
            }
        case actionType.SIGNUP_LOADING:
            return {
                ...state,
                loading:true
            }
        
        case actionType.CHECKBOX:
            if(action.usertype === 'Customer'){
                return {
                    ...state,
                    Customer: !state.Customer
                }
            }else if(action.usertype === 'serviceProvider'){
                return {
                    ...state,
                    serviceProvider: !state.serviceProvider
                }
            }

        default:
            return state
    }
}

export default Auth;