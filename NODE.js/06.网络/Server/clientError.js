const http = require('http');

const server = http.createServer((req,res) => {
    res.end();
})
// 如果客户端触发了一个 'error' 事件，则它会被传递到这里
server.on('clientError',(err,socket) => {
    // 不会有 request 或 response 对象，所以发送的任何 HTTP 响应，包括响应头和内容，必须被直接写入到 socket 对象
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});
server.listen(8000);

server.on('close',() => {
    console.log('server close');
});
