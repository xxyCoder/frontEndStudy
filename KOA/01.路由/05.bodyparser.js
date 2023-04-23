const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const router = new Router();

let app = new Koa();
app.use(bodyParser());  // 需放在路由前

router.get('/user',(cxt,next) => {
    cxt.body = 
    `<form action="/user/login" method="post">
        <input name="name" type="text" placeholder="请输入用户名"/>
        <br/>
        <input name="password" type="password" placeholder="请输入密码"/>
        <br/>
        <input type="submit" value="go"/>
    </form>`;
});

router.post('/user/login',async (ctx,next) => {
    // 解析后的数据会存储在ctx.request.body中
    let { name,password } = ctx.request.body;
    if(name === 'admin' && password === '123456') {
        ctx.body = `hello ${name}`;
    } else {
        ctx.body = 'error';
    }
})

app.use(router.routes());
app.listen(3000);