const express = require('express');
let app = express();
let router = express.Router();

const mid1 = (req,res,next) => {
    // console.log(req,res);
    console.log(1);
    req.requestTime = Date.now();
    next();
};
const mid2 = (req,res,next) => {
    console.log(2);
    req.requestTime = req.requestTime + "ms";
    next();
}
// 局部中间件，不使用app.use注册
const mid3 = (req,res,next) => {
    console.log(3);
    next();
}
// 全局生效中间件,对于多个中间件按使用use顺序调用中间件
app.use(mid1);
app.use(mid2);
// 第二个参数可选，为局部中间件位置
app.get('/',mid3,(req,res) => {
    let responseText = 'Hello World<br/>';
    responseText += '<small>Request at ' + req.requestTime + '</small>';
    res.send(responseText);
})

// 路由全局中间件
router.use((req,res,next) => {
    console.log('router');
    next();
});
router.get('/',(req,res) => {
    res.send('Route');
})
// 路由局部中间件
const midr1 = (req,res,next) => {
    console.log('局部路由组件');
    next();
}
router.get('/rt1',midr1,(req,res) => {
    res.send('Success');
})
app.use('/rt',router);

// 错误级别
app.use((err,req,res,next) => {
    console.log(err.message);
    res.send(err.message);
})

app.listen(3000);