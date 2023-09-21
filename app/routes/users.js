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
  unfollow,
  listFollowingTopics,
  followTopic,
  unfollowTopic,
  listQuestions,
  listLikingAnswers,
  likeAnswer,
  unlikeAnswer,
  listDislikingAnswers,
  dislikeAnswer,
  undislikeAnswer,
} = require('../controllers/users')

// 话题
const {checkTopicExist} = require('../controllers/topics')
// 答案
const {checkAnswerExist} = require('../controllers/answers')
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

// 获取某个用户的关注话题列表
router.get('/:id/followingTopics', listFollowingTopics)

// 关注某个话题
router.put('/followingTopics/:id', auth, checkTopicExist, followTopic)

// 取消关注某个话题
router.delete('/followingTopics/:id', auth, checkTopicExist, unfollowTopic)

// 获取某个用户的问题列表
router.get('/:id/questions', listQuestions)

// 获取某个用户赞过的答案列表
router.get('/:id/likingAnswers', listLikingAnswers)

// 赞答案
router.put('/likingAnswers/:id', auth, checkAnswerExist, likeAnswer, undislikeAnswer)

// 取消赞答案
router.delete('/likingAnswers/:id', auth, checkAnswerExist, unlikeAnswer)

// 获取某个用户踩过的答案列表
router.get('/:id/dislikingAnswers', listDislikingAnswers)

// 踩答案
router.put('/dislikingAnswers/:id', auth, checkAnswerExist, dislikeAnswer, unlikeAnswer)

// 取消踩答案
router.delete('/dislikingAnswers/:id', auth, checkAnswerExist, undislikeAnswer)


module.exports = router
