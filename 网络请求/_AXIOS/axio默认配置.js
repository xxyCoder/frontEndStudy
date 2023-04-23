const axios = require('axios');
// 全局默认配置
axios.default.baseURL = 'https://www.fastmock.site/mock/b14de69b50f7811e41c8b9c3754d9c06/axios';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 自定义实例默认配置
const instance = axios.create({
    baseURL: 'https://www.fastmock.site/mock/b14de69b50f7811e41c8b9c3754d9c06/axios'
});
instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;