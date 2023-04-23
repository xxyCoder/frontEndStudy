const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const router = new Router({
    prefix: '/users'
});
router.get('/:id',ctx => {
    console.log(ctx.params);
    let { id } = ctx.params;
    ctx.body = `get user who id is ${id}`;
    ctx.status = 200;
});

app.use(router.routes());
app.listen(3000);