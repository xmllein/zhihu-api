const Router = require('koa-router')
const router = new Router()
const {index, upload } = require('../controllers/home')

// 首页入口
router.get('/', index);

// 文件上传
router.post('/upload', upload);

module.exports = router
