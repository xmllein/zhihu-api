const jwt = require('koa-jwt')
const Router = require('koa-router')
const router = new Router({prefix: '/topics'})
const {
  find, findById, create, update, checkTopicExist, listTopicFollowers, listQuestions
} = require('../controllers/topics')

const {secret} = require('../config')

const auth = jwt({secret})

// 话题列表
router.get('/', find)

// 新建话题
router.post('/', auth, create)

// 话题详情
router.get('/:id', checkTopicExist, findById)

// 更新话题
router.patch('/:id', auth, checkTopicExist, update)

// 关注话题用户
router.get('/:id/followers', checkTopicExist, listTopicFollowers)

// 获取话题的问题列表
router.get('/:id/questions', checkTopicExist, listQuestions)

module.exports = router
