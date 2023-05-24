const path = require('path');
const fs = require('fs');

// 1. 路径拼接
// 第一个参数使用绝对路径，后面参数使用相对路径
console.log(path.resolve(__dirname,'./index.html'));
console.log(path.resolve(__dirname,'index.html'));
console.log(path.resolve(__dirname,'index.html','/test'));
console.log(path.resolve('/index.html'));

const str = path.resolve(__dirname,'index.html');
// 2. 获取路径的目录名
console.log(path.dirname(str));

// 3. 获取路径的扩展名
console.log(path.extname(str));

// 4. 路径合并
console.log(path.join('/user','xxy','id','001'));