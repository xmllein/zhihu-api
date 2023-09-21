const Question = require('../models/questions')

class QuestionsCtl {
  // 获取问题列表
  async find(ctx) {
    const {per_page = 10} = ctx.query
    const page = Math.max(ctx.query.page * 1, 1) - 1
    const perPage = Math.max(per_page * 1, 1)
    const q = new RegExp(ctx.query.q)
    ctx.body = await Question
        .find({$or: [{title: q}, {description: q}]})
        .limit(perPage).skip(page * perPage)
  }

  // 检查问题是否存在
  async checkQuestionExist(ctx, next) {
    const question = await Question.findById(ctx.params.id).select('+questioner')
    if (!question) {
      ctx.throw(404, '问题不存在')
    }
    ctx.state.question = question
    await next()
  }

  // 获取特定问题详情
  async findById(ctx) {
    const {fields = ''} = ctx.query
    const selectFields = fields.split(';').filter(f => f).map(f => ' +' + f).join('')
    const question = await Question.findById(ctx.params.id).select(selectFields).populate('questioner')
    ctx.body = question
  }

  // 创建问题
  async create(ctx) {
    ctx.verifyParams({
      title: {type: 'string', required: true},
      description: {type: 'string', required: false},
    })
    const question = await new Question({...ctx.request.body, questioner: ctx.state.user._id}).save()
    ctx.body = question
  }

  // 检查提问者是否是当前用户
  async checkQuestioner(ctx, next) {
    const {question} = ctx.state
    if (question.questioner.toString() !== ctx.state.user._id) {
      ctx.throw(403, '没有权限')
    }
    await next()
  }

  // 更新问题
  async update(ctx) {
    ctx.verifyParams({
      title: {type: 'string', required: false},
      description: {type: 'string', required: false},
    })
    const question = await Question.findByIdAndUpdate(ctx.params.id, ctx.request.body)
    ctx.body = question
  }

  // 删除问题
  async delete(ctx) {
    await Question.findByIdAndRemove(ctx.params.id)
    ctx.status = 204
  }
}

module.exports = new QuestionsCtl()
