# ServerResponse
- response.writeHead(statusCode[,statusMessage][,headers])
    - 状态码，可选状态描述，响应头
    - 发送一个响应头给请求
- response.write(chunk[,encoding][,callback])
    - 如果该方法被调用且 response.writeHead() 没有被调用，则它会切换到隐式响应头模式并刷新隐式响应头。
    - chunk 可以是一个字符串或一个 buffer。 如果 chunk 是一个字符串，则第二个参数指定如何将它编码成一个字节流。 encoding 默认为 'utf8'。 当数据块被刷新时，callback 会被调用。
- response.end([data][,encoding][,callback]);
    - 该方法会通知服务器，所有响应头和响应主体都已被发送，即服务器将其视为已完成
- response.getHeader(name)
    - 读取一个已入队列但尚未发送到客户端的响应头
- response.headersSent
    - 如果响应体已经发送，则返回true
- response.remveHeader(name)
    - 从隐式发送的队列中移除一个响应头
- response.setHeader(name,value)
    - 一个隐式的响应头设置值。 如果该响应头已存在，则值会被覆盖
    - response.setHeader() 设置的响应头会与 response.writeHead() 设置的响应头合并，且 response.writeHead() 的优先。

# ClientRequest
- request.end([data,[encoding][,callback]])
    - 结束发送请求。 如果部分请求主体还未被发送，则会刷新它们到流中。 如果请求是分块的，则会发送终止字符 
- request.flushHeaders()
    - 刷新请求头
- request.getHeader()
    - 读出请求头，注意:参数name是大小写敏感的
- request.removeHeader(name)
    - 移除一个已经在 headers 对象里面的 header
- request.setHeader(name,value)
    - 为 headers 对象设置一个单一的 header 值。如果该 header 已经存在了，则将会被替换