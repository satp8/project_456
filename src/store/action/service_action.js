import * as actionType from './actionType';
import axios from 'axios';
export const createService = (data, token) => {
    console.log(token)
    console.log('service action create called')
    let data1 = {
        headers: {
            "x-access-token": "8g4onr57pf6",
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: {
            "serviceName": "Electronic"
        }
    }
    axios.post('http://13.127.108.174:3000/uc/addService',data1)
    .catch((error) => {
        console.log(error)
    }).then((res) => {
            console.log(res)
        })
        .catch((error) => {
            console.log('Request failed', error);
        });
}


