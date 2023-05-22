const http = require('http');

// 方式一
const server1 = http.createServer({
    port: 3000,
    hostname: '127.0.0.1'
},(req,res) => {
    res.end('hello world');
});
server1.listen();
server1.close();

// 方式二
const server2 = http.createServer((req,res) => {
    // 设置响应头
    res.writeHead(200,"ok",{
        'Content-Type': "text/plain"
    });
    res.write('server2');
    res.write('send');
    res.end('hello world','utf-8',() => {
        console.log('全部发送完成');
    });
})
server2.listen(3002,'127.0.0.2',510,(req,res) => {
    console.log('server2 running');
})
// 事件监听
server2.on('request',(req,res) => {
    console.log('server2被请求');
})
server2.close((res,req) => {
    console.log('server2 stop');
})

const req = http.request({
    hostname: 'www.example.com',
    port: 8080,
    path: '/',
    method: 'POST',
    headers: {
        'Content-Type': 'text/plain'
    }
},response => {
    response.on('data',chunk => {
        console.log(chunk);
    })
});

req.setHeader('Content-Type','application/json');

http.get('www.baidu.com',(response) => {
    response.on('data',chunk => {
        console.log(chunk);
    })
})