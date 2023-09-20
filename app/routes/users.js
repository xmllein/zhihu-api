const jsonwebtoken = require('jsonwebtoken')
const Router = require('koa-router')
const router = new Router({prefix: '/users'})
const {find, findById, create, update, delete: del, login, checkOwner} = require('../controllers/users')
const {secret} = require('../config')

// 用户认证中间件
const auth = async (ctx, next) => {
  const {authorization = ''} = ctx.request.header
  // 获取token
  const token = authorization.replace('Bearer ', '')
  try {
    // 验证token
    const user = jsonwebtoken.verify(token, secret)
    // 将用户信息挂载到ctx.state上
    ctx.state.user = user
  } catch (err) {
    ctx.throw(401, err.message)
  }
  await next()
}

// 用户列表
router.get('/', find)

// 创建用户
router.post('/', create)

// 用户详情
router.get('/:id', findById)

// 更新用户
router.patch('/:id', auth, checkOwner, update)

// 删除用户
router.delete('/:id', auth, checkOwner, del)

// 用户登录
router.post('/login', login)


module.exports = router
