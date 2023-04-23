const express = require('express');
const app = express();
const port = 3000;

// app.METHOD(PATH, HANDLER)
app.get('/',(req,res) => {
    res.send("Hello World");
});

app.post('/',(req,res) => {
    res.send('Got a post');
});

app.put('/user',(req,res) => {
    console.log('got a put');
})

app.delete('/user',(req,res) => {
    res.send('got a delete');
})

// 获取动态参数
app.get('/user1/:id/:name',(req,res) => {
    // 返回参数对象
    res.send(req.params);
})
app.get('/user2',(req,res) => {
    res.send(req.query);
})

// 托管静态文件 express.static(root, [options])
// app.use(express.static('../public'));
// 挂载前缀
app.use('/static',express.static('../public'));

app.listen(port,() => {
    console.log(`visit ${port}`);
});