const http = require('http');
const url = require('url');

// 1. 创建服务器对象，当服务器被访问的时候，执行回调函数
const server = http.createServer((request,response) => {
    // 3. 获取请求行信息
    console.log(request.method + ' ' + request.url + ' http' + request.httpVersion);
    // 4. 获取请求头信息
    console.log(request.headers);
    // 5. 获取请求体
    let body = '';
    request.on('data',chunk => {
        data += chunk;
    })
    console.log(body);
    // 6. 解析url的请求路径与参数
    let res = url.parse(request.url,true);
    let pathname = res.pathname;
    let username = res.query.username;
    console.log(pathname + ' ' + username);
    response.end('hello');
});
// 2. 监听端口，启动服务器
server.listen(3000,() => {
    console.log('server running');
})