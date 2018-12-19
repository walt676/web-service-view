import qs from 'qs'
import axios from 'axios'

export const getToken = (loginName, password) => 
    axios({
        method:'post',
        url:'localhost:8088/login',
        data:qs.stringify({
            loginName,
            password
        })
    });