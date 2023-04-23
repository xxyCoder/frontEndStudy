const Router = require('koa-router');
const router = new Router();
const multer = require('koa-multer');
const upload = multer({dest: 'uploads/'});

router.post('/profile',upload.single('avatar'));