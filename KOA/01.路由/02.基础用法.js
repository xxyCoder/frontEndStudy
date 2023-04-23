const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const router = new Router();

router.get('/404',async (ctx,next) => {
    ctx.body = 'page not found';
    ctx.status = 404;
});
router.post('/users',async (ctx,next) => {
    ctx.body = 'add new user';
})
.del('/users/:id',(ctx,next) => {
    ctx.body = `delete a user`;
})
.put('/users/:id',async (ctx,next) => {
    ctx.body = `modify a user`;
    await next();
})
.get('/users/:id',(ctx,next) => {
    ctx.body = `get a user `;
})
.all('/users/:id',(ctx,next) => {
    console.log('all');
})

// 多中间件
router.get('/posts',(ctx,next) => {
    console.log(1);
    next();
    console.log(4);
},(ctx,next) => {
    console.log(2);
    next();
    console.log(3);
})

app.use(router.routes());
app.listen(3000);