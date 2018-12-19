import axios from 'axios';
var qs = require('qs');

var instance  = axios.create({
    headers:  {'content-type': 'application/x-www-form-urlencoded'}
});

let base = 'http://localhost:8081/';

export const getDialog = params =>{return instance.get(base+'/dialogue',{params: params});};
export const getAIContent = params =>{
    return instance.get('http://www.tuling123.com/openapi/api',{ params: params });
}