const jwt = require('koa-jwt')
const Router = require('koa-router')
const router = new Router({prefix: '/users'})
const {
  find,
  findById,
  create,
  update,
  delete: del,
  login,
  checkOwner,
  listFollowers,
  listFollowing,
  checkUserExist,
  follow,
  unfollow
} = require('../controllers/users')
const {secret} = require('../config')

// 用户认证中间件
const auth = jwt({secret})

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

// 获取某个用户的粉丝列表
router.get('/:id/followers', listFollowers)

// 获取某个用户的关注列表
router.get('/:id/following', listFollowing)

// 关注某个用户
router.put('/following/:id', auth, checkUserExist, follow)

// 取消关注某个用户
router.delete('/following/:id', auth, checkUserExist, unfollow)


module.exports = router
