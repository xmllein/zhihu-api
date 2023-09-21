const jwt = require('koa-jwt')
const Router = require('koa-router')
const router = new Router({prefix: '/questions'})
const {
  find, findById, create, update, delete: del,
  checkQuestionExist, checkQuestioner,
} = require('../controllers/questions')

const {secret} = require('../config')

const auth = jwt({secret})

// 获取问题列表
router.get('/', find)

// 创建问题
router.post('/', auth, create)

// 获取特定问题详情
router.get('/:id', checkQuestionExist, findById)

// 更新问题
router.patch('/:id', auth, checkQuestionExist, checkQuestioner, update)

// 删除问题
router.delete('/:id', auth, checkQuestionExist, checkQuestioner, del)

module.exports = router
