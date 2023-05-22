# http常用方法
1. http.createServer([options],[,requestListener]);
    - options: 对象
        {
            port: 监听端口,
            hostname: 主机名,
            timeout: 响应超时时间
        }
    - requestListener: 函数，有服务器请求的时候执行回调函数
        (resquest,response) => {}

2. server.listen(port[,hostname][,backlog],[,callback]);
    - port: 监听端口
    - hostname: 监听主机
    - backlog: 服务器等待连接的最大数量，默认是511
    - callback: 开始监听的时候调用回调函数

3. server.close([callbacks])
    - 停止服务器，执行回调函数

4. server.on(event, listener)
    - 添加事件监听器
    - event 事件名
    - listener 监听函数

5. response.writeHead(statusCode[, statusMessage][, headers]) 
    - 设置响应头
    - statusCode 响应状态吗
    - statusMessage 响应消息，如果不提供该参数，则默认使用与给定状态码相对应的默认消息
    - headers 需要添加的响应头

6. response.write(chunk[, encoding][, callback])
    - 向客户端发送数据块
    - chunk 数据
    - encoding 编码方式
    - callback 表示数据块已经被完全写入到底层操作系统后会被调用
    - 多次调用该函数，发送的数据块被组合成一个完整的响应内容，只是将数据写入到内存缓冲区中，并不会立即将它们发送给客户端。实际上，只有当缓冲区已满或者调用 response.end() 方法时，才会将所有缓冲的数据一次性发送给客户端。

7. response.end([data][, encoding][, callback]) 
    - 结束响应
    - data 数据，会和缓存区中的数据合并
    - encoding 编码方式
    - callback 表示数据块已经被完全写入到底层操作系统后会被调用

8. request.setHeader(name, value)
    - 设置响应头
    - name 响应字段名
    - value 对应的值

9. request.getHeader(name): 获取请求头信息。
10. request.method: 获取 HTTP 请求的方法，例如 GET、POST 等。
11. request.url: 获取 HTTP 请求的 URL 地址。
12. request.on(event, listener): 添加事件监听器，例如 data、end 等事件。

# 发送请求
1. http.get()   
    - 仅支持get方法

2. http.request()
    - 支持所有方法