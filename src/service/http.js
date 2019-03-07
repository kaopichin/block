import axios from 'axios'
import qs from 'qs'
import { Toast } from 'vant';
//测试服务器

export const BASEURL = axios.defaults.baseURL = 'http://192.168.0.108:8001';
// export const BASEURL = axios.defaults.baseURL = 'http://47.91.248.188:8001';

//  拦截请求
// axios.interceptors.request.use(
//   config => {
//     const token = '7ca6c1a7936345659cfab7661439f457';
//     config.headers = {
//       'Content-Type':'application/x-www-form-urlencoded',//设置跨域头部
//       'x-auth-token':token
//     };
//     if (token) {
//       //config.params = {'token': token}
//       axios.defaults.headers.common['x-auth-token'] = token;
//     }
//
//     return config;
//   },
//   err => {
//     return Promise.reject(err);
//   }
// );



axios.interceptors.request.use(function (config) {

	return config
});

//  拦截相应
axios.interceptors.response.use(function (config) {
    return config
});


//个人服务器
// export const BASEURL = axios.defaults.baseURL = 'http:///';

export const fetch = (url, params = {}) => {
    return new Promise((resolve, reject) => {
        axios.get(url, {
                params: params
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            })
    })
}

export const get = (url, params = {}) => {
    return new Promise((resolve, reject) => {
        axios.get(url, {
                params: params
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            })
    })
}

export const post = (url, data = {}) => {
    return new Promise((resolve, reject) => {
        axios.post(url, qs.stringify(data, { arrayFormat: 'repeat' }))
            .then(response => {
                resolve(response.data)
            })
            .catch(err => {
                reject(err);
            })
    })
}

export const patch = (url, data = {}) => {
    return new Promise((resolve, reject) => {
        axios.patch(url, qs.stringify(data, { arrayFormat: 'repeat' }))
            .then(response => {
                resolve(response.data)
            })
            .catch(err => {
                reject(err);
            })
    })
}

export const put = (url, data = {}) => {
    return new Promise((resolve, reject) => {
        axios.put(url, qs.stringify(data))
            .then(response => {
                resolve(response.data)
            })
            .catch(err => {
                reject(err);
            })
    })
}
