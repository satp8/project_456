import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://rn-project1.firebaseio.com/'
})

export default instance;