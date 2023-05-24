const fs = require('fs');   // file system

// 1. 写文件，异步 写入成功则err = null
fs.writeFile('./tmp/hello.txt',"abcdefghijklmnopqrstuvwxyz",err => {
    if(err) {
        console.log(err);
    }
    else {
        console.log('没有错误')
    }
});

// 2. 写文件，同步
fs.writeFileSync('./tmp/hello.txt','6666');

console.log("异步不等待，继续执行");

// 3. 追加写入 异步
fs.appendFile('./tmp/hello.txt','xxyCoder',err => {
    if(err) {
        console.log('追加失败');
    } else {
        console.log('追加成功');
    }
})
fs.writeFile('./tmp/hello.txt','xxyCoder',{flag: 'a'},err => {
    if(err) {
        console.log('追加失败');
    } else {
        console.log('追加成功');
    }
})

// 4. 创建写入流对象
const ws = fs.createWriteStream('./tmp/stream.txt');
ws.write("xxyCoder\r\n");
ws.write("6666")
ws.close();

// 5. 读文件，异步
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

// 6. 流式读取文件
const rs = fs.createReadStream('./tmp/hello.txt');
rs.on('data',chunk => { // 每次读取min(64kb,文件剩余长度) 读取是一块一块读，读完一块(chunk)接着下一块读取
    console.log(chunk.length,'readStream');
});

// 7. 文件重命名和移动
fs.rename('./tmp/test.txt','./tmp/test1.txt',err => {
    if(err) {
        console.log('重命名失败');
    } else {
        console.log('重命名成功');
    }
})
fs.rename('./tmp/test1.txt','./tmp/tmpdir/test.txt',err => {
    if(err) {
        console.log('移动失败');
    } else {
        console.log('移动成功');
    }
})

// 8. 文件删除
fs.unlink('./tmp/tmpdir/test.txt',err => {
    if(err) {
        console.log('删除失败');
    } else {
        console.log('删除成功');
    }
})
fs.rm('./tmp/test2.txt',err => {
    if(err) {
        console.log('删除失败1');
    } else {
        console.log('删除成功1');
    }
})

// 9. 创建目录
fs.mkdir('./tmp/tmpdir',err => {
    if(err) {
        console.log('创建失败');
    } else {
        console.log('创建成功');
    }
});
// 9.1 递归创建
fs.mkdir('./tmp/a/b/c',{recursive: true},err => {
    if(err) {
        console.log('递归创建失败');
    } else {
        console.log('递归创建成功');
    }
})

// 10. 读取目录
fs.readdir('./tmp/',(err,data) => {
    if(err) {
        console.log('读取目录失败');
    } else {
        console.log('读取目录成功',data);
    }
})

// 11. 删除文件夹
fs.rmdir('./tmp/a/b/c',err => { // 删除目录的时候要确保该目录下内容为空
    if(err) {
        console.log('删除目录失败');
    } else {
        console.log('删除目录成功');
    }
})
// 11.1 递归删除
fs.rm('./tmp/a',{recursive: true},err => {
    if(err) {
        console.log('递归删除失败');
    } else {
        console.log('递归删除成功');
    }
})

// 12. 查看文件状态
fs.stat('./tmp/hello1.txt',(err,data) => {
    if(err) {
        console.log('查看失败');
    } else {
        console.log('查看成功',data);
    }
})

// 13. 测试权限
fs.access('./tmp/hello.txt',fs.constants.R_OK | fs.constants.W_OK,err => {
    if(err) {
        console.log('can not write or read')
    } else {
        console.log('yes');
    }
})

// 14. 拷贝
fs.copyFile('./tmp/hello.txt','./tmp/hello1.txt',err => {
    if(err) {
        console.log('copy fail');
    } else {
        console.log('copy success');
    }
});

// 15. 打开文件
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