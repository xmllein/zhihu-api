const Router = require('koa-router')
const router = new Router({prefix: '/users'})
const {find, findById, create, update, delete: del, login} = require('../controllers/users')

// 用户列表
router.get('/', find)

// 创建用户
router.post('/', create)

// 用户详情
router.get('/:id', findById)

// 更新用户
router.patch('/:id', update)

// 删除用户
router.delete('/:id', del)

// 用户登录
router.post('/login', login)


module.exports = router
