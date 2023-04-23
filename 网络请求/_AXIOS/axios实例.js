const axios = require('axios');
const instance = axios.create({
    baseURL: 'https://www.fastmock.site/mock/b14de69b50f7811e41c8b9c3754d9c06/axios',
    headers: {'X-Custom-Header':'foobar'}
});