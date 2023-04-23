const axios = require('axios');
// 请求拦截器
const myRequestInterceptors = axios.interceptors.request.use(config => {
    console.log(config);
    console.log('请求拦截器');
    // 发生请求之前做什么....
    return config;
},err => {
    console.log(err);
    // 对请求错误做什么...
    return Promise.reject(err);
});
// 清除拦截器
axios.interceptors.request.eject(myRequestInterceptors);

axios({
    method: 'get',
    url: 'https://www.fastmock.site/mock/b14de69b50f7811e41c8b9c3754d9c06/axios/axios-get'
})
.then(resp => {
    console.log(resp.data)
});

// 响应拦截器
const myResponseInterceptors = axios.interceptors.response.use(resp => {
    // 2xx都会触发该函数
    // 对响应数据做什么...
    console.log('响应拦截器');
    return resp;
},err => {
    // 超出2xx范围都会触发该函数
    // 对响应错误做些什么...
    return Promise.reject(err);
});
// 清除拦截器
axios.interceptors.response.eject(myResponseInterceptors);

axios.post('https://www.fastmock.site/mock/b14de69b50f7811e41c8b9c3754d9c06/axios/axios-post',
{
    firstName: '张',
    lastName: '三'
})
.then(resp => {
    console.log(resp.status);
})
.catch(err => {
    console.log(err);
});

