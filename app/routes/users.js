const Router = require('koa-router')
const router = new Router({prefix: '/users'})
const {find, findById, create, update, delete: del} = require('../controllers/users')

// 用户列表
router.get('/', find)

// 创建用户
router.post('/', create)

// 用户详情
router.get('/:id', findById)

// 更新用户
router.put('/:id', update)

// 删除用户
router.delete('/:id', del)


module.exports = router
