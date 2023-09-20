const Router = require('koa-router')
const router = new Router()
const {index } = require('../controllers/home')

// 首页入口
router.get('/', index);

module.exports = router
