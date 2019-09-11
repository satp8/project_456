import * as actionType from './actionType';
import axiosdata from  '../../../axios/axios';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
 
export const add_auth = (userid,uservalue) => {
    return dispatch => {
        dispatch({
            type:actionType.ADD_AUTH,
            userid:userid,
            uservalue:uservalue 
        })
    }
}

export const signin  = (email,password) => {
    console.log(email,password)
    
    return dispatch => {
        dispatch({
            type:actionType.SIGNIN,   
    }) 
              
        let data ={
            email: email,
            password:password,
        }
        axios.post('http://13.127.108.174:3000/uc/loginUser',data)
        .then((response) => { 
             console.log(response)
             let error;
             
             if(response.data.message){
                error = response.data.message  
                dispatch(submit_token_error(error))
             }
            let userType = response.data.data[0].value.userType
            let token = response.data.data[0].value.token     
            let serviceId = response.data.data[0].value._id 
            let userName = response.data.data[0].value.userName
            let email = response.data.data[0].value.email  
            console.log(error) 
            if(token){ 
                dispatch(submit_token(userType,token,serviceId,userName,email))  
                dispatch(submit_token_error(error))
                AsyncStorage.setItem('usertoken',token)  
                AsyncStorage.setItem('usertype',userType) 
            }
            if(error) {
                dispatch(submit_token_error(error))
            }
        }) 
        .catch(error => {
            dispatch(networkError())
            console.log(error.Error)
        })
    } 
}    

export const submit_token = (userType,token,serviceId,userName,email) => {
    return dispatch => {
        dispatch({
            type:actionType.SUBMIT_TOKEN,
            token: token,
            userType:userType,
            serviceId:serviceId,
            userName:userName,
            email:email
        })
    }
}

export const cleartoken = () => {
    return dispatch => {
        dispatch({
            type:actionType.CLEAR_TOKEN
        })
    }
}

export const submit_token_error = (error) => {
    return dispatch => {
        dispatch({
            type: actionType.SUBMIT_TOKEN_ERROR,
            error:error
        })
    }
}

export const networkError = () => {
    return dispatch => {
        dispatch({
            type:actionType.NETWORK_ERROR
        })
    }
}
export const signup_form_submission = (userid,uservalue) => {
    return dispatch => {
        dispatch(add_auth(userid,uservalue))
    }
}
export const signup_form_database = (name,email,password,role) => {
    let data = {
        userName:name,
        email:email,
        password:password,
        userType:role
    }
    return dispatch => {
        dispatch(signup_loading())
        console.log(name,email,password,role)
        axios.post('http://13.127.108.174:3000/uc/registerUser',data)
        .then((res)=>{
            console.log(res) 
            //    dispatch(signup(email,password))
               dispatch(signup_error(res.data.message)) 
 
            })
        .catch((error)=>{
                console.log(error)
                dispatch(signup_error(error)) 
                dispatch(networkError())
            }) 
        } 
}

// export const signup = (email,password) => {
//     return dispatch => {
//       let data = {
//           email:email,
//           password:password
//       }
//       axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDeHDYkXvZ82lFpNeX-MsnDOxYpiq2em-s',data)
//       .then((response) => {
//         //   console.log(response.data.idToken,response.data.localId)
//         dispatch(signup_submit())  
//       })
//       .catch(error => {
//           console.log(error.response.data.error.message)  
//       })
//     }
// }
export const signup_loading = () => {
    return dispatch => {
        dispatch({
            type:actionType.SIGNUP_LOADING,  
        })
    }
}

export const signup_submit = () => {
    return dispatch => {
        dispatch({
            type:actionType.SIGNUP_SUBMIT,
        })
    }
}

export const signup_error = (error) => {
    return dispatch => {
        dispatch({ 
            type:actionType.SIGNUP_ERROR,
            error:error
        })
    }
}

export const loading_false = () => {
    return dispatch => {
        dispatch({
            type:actionType.LOADING_FALSE,
        })
    }
}

export const checkbox = (userType) => {
    return dispatch => {
        dispatch({
            type:actionType.CHECKBOX,
            userType:userType,
           
        })
    }
}
