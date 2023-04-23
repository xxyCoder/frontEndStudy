const serve = require('koa-static');
const Koa = require('koa');
const path = require('path');
const app = new Koa();
console.log(path.resolve(__dirname,'./public'))
app.use(
    serve(
        path.resolve(__dirname,'./public'),
        {
            maxAge: 30 * 24 * 60 * 60 * 1000
        }
    )
)
app.listen(3000);