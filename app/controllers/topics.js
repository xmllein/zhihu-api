const Topic = require('../models/topics')

class TopicsCtl {

  // 获取话题列表
  async find(ctx) {
    ctx.body = await Topic.find()
  }

  // 获取话题详情
  async findById(ctx) {
    const {fields = ''} = ctx.query
    const selectFields = fields.split(';').filter(f => f).map(f => ' +' + f).join('')
    const topic = await Topic.findById(ctx.params.id).select(selectFields)
    ctx.body = topic
  }

  // 新建话题
  async create(ctx) {
    ctx.verifyParams({
      name: {type: 'string', required: true},
      avatar_url: {type: 'string', required: false},
      introduction: {type: 'string', required: false},
    })
    const topic = await new Topic(ctx.request.body).save()
    ctx.body = topic
  }

  // 更新话题
  async update(ctx) {
    ctx.verifyParams({
      name: {type: 'string', required: false},
      avatar_url: {type: 'string', required: false},
      introduction: {type: 'string', required: false},
    })
    const topic = await Topic.findByIdAndUpdate(ctx.params.id, ctx.request.body)
    ctx.body = topic
  }
}

module.exports = new TopicsCtl()
