# koa-multer
- 实现文件上传
- 接收一个对象
    dest or storage: 上传文件的存储地址
    忽略options对象 上传文件被保存到内存中，不会写入磁盘
    fileFilter 文件过滤器 控制那些文件可以被接收
    limits 限制上传数据
- single(filename)
    接收一个一filename参数命名的文件
- fields(fields)
    接收一个数组，每个数组是一个对象 有 name ,maxCount属性
- none
    只接受文本域
- any
    任何类型