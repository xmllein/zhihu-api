const Comment = require('../models/comments')

class CommentsCtl {
  // 评论列表
  async find(ctx) {
    const {per_page = 10} = ctx.query
    const page = Math.max(ctx.query.page * 1, 1) - 1
    const perPage = Math.max(per_page * 1, 1)
    const q = new RegExp(ctx.query.q)
    const {questionId, answerId} = ctx.params
    const { rootCommentId } = ctx.query;
    ctx.body = await Comment
        .find({content: q, questionId, answerId, rootCommentId})
        .limit(perPage).skip(page * perPage)
        .populate('commentator replyTo')
  }

  // 检查评论是否存在
  async checkCommentExist(ctx, next) {
    const comment = await Comment.findById(ctx.params.id).select('+commentator')
    if (!comment) {
      ctx.throw(404, '评论不存在')
    }
    if (ctx.params.questionId && comment.questionId.toString() !== ctx.params.questionId) {
      ctx.throw(404, '该问题下没有此评论')
    }
    if (ctx.params.answerId && comment.answerId.toString() !== ctx.params.answerId) {
      ctx.throw(404, '该答案下没有此评论')
    }
    ctx.state.comment = comment
    await next()
  }

  // 评论详情
  async findById(ctx) {
    const {fields = ''} = ctx.query
    const selectFields = fields.split(';').filter(f => f).map(f => ' +' + f).join('')
    const comment = await Comment.findById(ctx.params.id).select(selectFields).populate('commentator')
    ctx.body = comment
  }

  // 创建评论
  async create(ctx) {
    ctx.verifyParams({
      content: {type: 'string', required: true},
      rootCommentId: {type: 'string', required: false},
      replyTo: {type: 'string', required: false},
    })
    const commentator = ctx.state.user._id
    const {questionId, answerId} = ctx.params
    const comment = await new Comment({...ctx.request.body, commentator, questionId, answerId}).save()
    ctx.body = comment
  }

  // 检查评论者是否是当前用户
  async checkCommentator(ctx, next) {
    const {comment} = ctx.state
    if (comment.commentator.toString() !== ctx.state.user._id) {
      ctx.throw(403, '没有权限')
    }
    await next()
  }

  // 更新评论
  async update(ctx) {
    ctx.verifyParams({
      content: {type: 'string', required: false},
    })

    const {content} = ctx.request.body
    await ctx.state.comment.updateOne({content})
    ctx.body = ctx.state.comment
  }

  // 删除评论
  async delete(ctx) {
    await Comment.findByIdAndRemove(ctx.params.id)
    ctx.status = 204
  }
}

module.exports = new CommentsCtl()
