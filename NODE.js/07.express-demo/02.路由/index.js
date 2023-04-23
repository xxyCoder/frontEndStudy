const express = require('express');
let app = express();
// 使用模块
const router = require('./router.js');

// 匹配 abd ad ？ 表示0或1
app.get('/ab?d',(req,res) => {
    res.send("success");
})

// 匹配 abcd abbcd abbbbcd... + 表示至少一个
app.get('/ab+cd',(req,res) => {
    res.send('success');
})

// * 表示无穷个 x ... y
app.get('/x*y',(req,res) => {
    res.send('success');
})

// 作为整体
app.get('/qw(er)?t',(req,res) => {
    res.send('success');
})

// /a /a/
app.get('/a/',(req,res) => {
    res.send('sucess');
})

// 注册路由模块
// app.use(router);
// 添加前缀
app.use('/rt',router);

app.listen(3000);