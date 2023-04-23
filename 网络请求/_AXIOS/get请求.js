const axios = require('axios');
// 不写method，默认为get
axios({
    method: 'get',
    url: 'https://www.fastmock.site/mock/b14de69b50f7811e41c8b9c3754d9c06/axios/axios-get'
})
.then(resp => {
    console.log(resp.data)
});