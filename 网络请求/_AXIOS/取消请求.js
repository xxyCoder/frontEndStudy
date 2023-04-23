const axios = require('axios');
const controller = new AbortController();

axios({
    method: 'get',
    url: 'https://www.fastmock.site/mock/b14de69b50f7811e41c8b9c3754d9c06/axios/axios-get'
})
.then(resp => {
    console.log(resp.data)
});

// 取消请求
controller.abort();