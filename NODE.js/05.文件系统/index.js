const fs = require('fs');

// 写文件，异步
fs.writeFile('./tmp/hello.txt',"abcdefghijklmnopqrstuvwxyz",err => {
    if(err) {
        console.log(err);
    }
    else {
        console.log('没有错误')
    }
});

// 读文件，异步
fs.readFile('./tmp/hello.txt',(err,data) => {
    if(data) {
        console.log('success');
        console.log(data);
    }
    if(err) {
        console.log('有错误');
        console.log(err);
    }
});

// 测试权限
fs.access('./tmp/hello.txt',fs.constants.R_OK | fs.constants.W_OK,err => {
    if(err) {
        console.log('can not write or read')
    } else {
        console.log('yes');
    }
})

// 异步追加数据
fs.appendFile('./tmp/hello.txt','123456789',err => {
    if(err) {
        console.log('fail');
    } else {
        console.log('success');
    }
});

// 拷贝
fs.copyFile('./tmp/hello.txt','./tmp/hello1.txt',err => {
    if(err) {
        console.log('copy fail');
    } else {
        console.log('copy success');
    }
});

// 创建目录
fs.mkdir('./tmp/tmpdir',err => {
    console.log(err);
});

// 打开文件
let buf = Buffer.alloc(10);
fs.open('./tmp/hello.txt','a+',(err,fd) => {
    if(fd) {
        fs.read(fd,buf,0,10,0,(err,bytesRead,buffer) => {
            console.log('----');
            console.log(bytesRead);
            console.log(buffer);
            console.log('----');
        })
    }
})