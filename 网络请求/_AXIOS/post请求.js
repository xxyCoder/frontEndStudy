const axios = require('axios');
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

axios({
    method: 'post',
    url: 'https://www.fastmock.site/mock/b14de69b50f7811e41c8b9c3754d9c06/axios/axios-post',
    data: {
        firstName: '张',
        lastName: '三'
    }
}).then(resp => {
    console.log(resp.status);
});