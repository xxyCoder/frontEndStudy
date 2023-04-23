# koa-static
- 接收两个参数 root和opts
    root为字符串类型，用于指定静态资源的相对路径
    opts为对象类型，对静态资源进行配置
        maxage 最大缓存时长 单位为毫秒 默认0
        hidden 是否允许传输隐藏文件 默认false
        index 默认的文件名 默认值index.html
        defer 是否推迟响应 会先等待其他中间件完成后执行
        gzip 如果支持，则使用gzip压缩
        setHeaders 设置响应头
        extensions 匹配资源找不到的时候根据传入的数组参数依次匹配，返回第一个找到的