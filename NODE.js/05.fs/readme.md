# 写入文件
1. fs.writeFile(file, data[, options], callback)：异步写入数据到文件中
    - file 文件路径
    - data 写入的数据
    - options，可以指定编码、模式和标志等设置
        - encoding  文件编码方式
        - mode  文件权限
        - flag  指定文件打开方式
    - callback，回调函数，当写入完成后执行

2. fs.appendFile(file, data[, options], callback)：将数据异步追加到文件中。
3. fs.writeFileSync(file,data[,options])    同步的方式
4. fs.createWriteStream(file)   创建流对象
    - 调用对象.write写入数据
    - 调用对象.close关闭流

# 读出文件
1. fs.readFile(path[, options], callback)：异步读取文件内容
2. fs.readFileSync()    同步读取
3. fs.createReadStream()    创建流对象
    调用on方法监听data，将每次监听的数据进行拼接

# 操作文件
- fs.rename(oldPath, newPath, callback)：异步重命名文件或文件夹
- fs.unlink(path, callback)：异步删除文件或文件夹
- fs.rm(path, callback) 异步删除文件
- fs.open(path[, flags[, mode]], callback)：异步打开文件或创建一个新文件

# 操作目录
- fs.mkdir(path[, options], callback)：异步创建一个新目录
    recursive 指定是否递归创建
- fs.readdir(path[, options], callback)：异步读取目录的内容
- fs.rmdir(path[, options], callback)    删除目录
    recursive 指定是否递归删除

# 查看文件
- fs.stat(path, callback)：异步获取文件或文件夹的状态信息