import * as actionType from './actionType';
import axiosdata from  '../../../axios/axios';
import axios from 'axios';
 
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
            returnSecureToken: true
        }
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDeHDYkXvZ82lFpNeX-MsnDOxYpiq2em-s',data)
        .then((response) => {
            //  console.log(response.data.idToken)
             dispatch(submit_token(response.data.idToken))
        })
        .catch((error) => {
            //  console.log(error.response.data.error.message)  
             dispatch(submit_token_error(error.response.data.error.message))
        }) 
 
    } 
}    

export const submit_token = (idToken) => {
    return dispatch => {
        dispatch({
            type:actionType.SUBMIT_TOKEN,
            token: idToken
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
export const signup_form_submission = (userid,uservalue) => {
    return dispatch => {
        dispatch(add_auth(userid,uservalue))
    }
}
export const signup_form_database = (name,email,password) => {
    let data = {
        name:name,
        email:email,
        password:password
    }
    return dispatch => {
        dispatch(signup_loading())
        axios.post('https://rn-project1.firebaseio.com/form.json',data)
        .then(()=>{
           dispatch(signup(email,password))
        })
        .catch((error)=>{
            dispatch(signup_error(error.response.data.error.message))
        })
    }
}

export const signup = (email,password) => {
    return dispatch => {
      let data = {
          email:email,
          password:password
      }
      axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDeHDYkXvZ82lFpNeX-MsnDOxYpiq2em-s',data)
      .then((response) => {
        //   console.log(response.data.idToken,response.data.localId)
        dispatch(signup_submit())
      })
      .catch(error => {
          console.log(error.response.data.error.message)  
      })
    }
}
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
