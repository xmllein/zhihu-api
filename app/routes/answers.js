const jwt = require('koa-jwt');
const Router = require('koa-router');
const router = new Router({ prefix: '/questions/:questionId/answers' });
const {
  find, findById, create, update, delete: del,
  checkAnswerExist, checkAnswerer,
} = require('../controllers/answers');

const { secret } = require('../config');

const auth = jwt({ secret });

// 获取答案列表
router.get('/', find);
// 创建答案
router.post('/', auth, create);
// 获取特定答案详情
router.get('/:id', checkAnswerExist, findById);
// 更新答案
router.patch('/:id', auth, checkAnswerExist, checkAnswerer, update);
// 删除答案
router.delete('/:id', auth, checkAnswerExist, checkAnswerer, del);

module.exports = router;/**/
