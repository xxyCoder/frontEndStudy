const Koa = require('koa');
const app = new Koa();
const Router = require('./Router')
const router = new Router();


// app.use(async (ctx,next) => {
//     const { url,method } = ctx;
//     if(url === '/404' && method === 'GET') {
//         ctx.body = 'Page not found';
//         ctx.status = 404;
//     } else {
//         ctx.body = 'Default content';
//         ctx.status = 200;
//     }
//     await next();
// });
router.get('/404',(ctx,next) => {
    ctx.body = 'Page not found';
    ctx.status = 404;
});
router.post('/404',(ctx,next) => {
    ctx.body = 'Page not found';
    ctx.status = 404;
});
app.use(router.routes());
app.listen(3000);