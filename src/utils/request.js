import Vue from 'vue';
import urlConfig from './urlConfig';
const Fly=require("flyio/dist/npm/wx");
const request = new Fly();
const apiUrl = urlConfig.apiUrl;
const comUrl = urlConfig.comUrl;
// request.config.baseURL = "http://localhost:3000/"

request.interceptors.request.use((config)=>{

});

request.interceptors.response.use((config)=>{
  console.log(config)
},
(err, promise)=>{
  return promise.resolve()
});

export function ajaxGet (href, data, option=false) {
  let baseURL = option ? comUrl : apiUrl ;
  return request.get(href, data, {baseURL: baseURL});
};

export function ajaxPost (href, data, option=false) {
  let baseURL = option ? comUrl : apiUrl ;
  return request.post(href, data, {baseURL: baseURL});
}

export default request;