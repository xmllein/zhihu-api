const jwt = require('koa-jwt')
const Router = require('koa-router')
const router = new Router({prefix: '/questions/:questionId/answers/:answerId/comments'})
const {
  find, findById, create, update, delete: del,
  checkCommentExist, checkCommentator,
} = require('../controllers/comments')

const {secret} = require('../config')

const auth = jwt({secret})

// 评论列表
router.get('/', find)

// 创建评论
router.post('/', auth, create)

// 评论详情
router.get('/:id', checkCommentExist, findById)

// 更新评论
router.patch('/:id', auth, checkCommentExist, checkCommentator, update)

// 删除评论
router.delete('/:id', auth, checkCommentExist, checkCommentator, del)

module.exports = router
