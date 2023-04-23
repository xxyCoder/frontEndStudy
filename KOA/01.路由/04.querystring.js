const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const router = new Router();

router.get('/home',async (ctx,next) => {
    console.log(ctx.request.query);
    console.log(ctx.request.querystring);
    ctx.body = '<h1>Home page</h1>'
})
router.get('/home/:id/:name',async (ctx,next) => {
    console.log(ctx.params);
    ctx.body = 'params';
})

app.use(router.routes());
app.listen(3000);