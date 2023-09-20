const jsonwebtoken = require('jsonwebtoken')
const User = require('../models/users')
const {secret} = require('../config')

class UserCtl {
  // 用户列表
  async find(ctx) {
    // 每页默认10条
    const {per_page = 10} = ctx.query
    // 页码默认1
    const page = Math.max(ctx.query.page * 1, 1) - 1
    // 每页条数
    const perPage = Math.max(per_page * 1, 1)

    // 总数
    const total = await User.countDocuments()
    // 用户名 模糊搜索
    const list = await User.find({
      name: new RegExp(ctx.query.q)
    }).limit(perPage).skip(page * perPage)
    ctx.body = {
      total,
      page: page + 1,
      per_page: perPage,
      list
    }
  }

  // 用户详情
  async findById(ctx) {

    // 如果用户自定义字段
    const {fields} = ctx.query
    //fields=employments;educations;locations 转 employee educations locations
    const selectFields = fields.split(';').filter(f => f).map(f => ' +' + f).join('')

    const user = await User.findById(ctx.params.id).select(selectFields)
    if (!user) {
      ctx.throw(404, '用户不存在')
    }
    ctx.body = user
  }

  // 创建用户
  async create(ctx) {
    ctx.verifyParams({
      name: {type: 'string', required: true},
      password: {type: 'string', required: true}
    })
    // 获取参数
    const {name} = ctx.request.body
    // 判断用户是否已存在
    const repeatedUser = await User.findOne({name})
    if (repeatedUser) {
      ctx.throw(409, '用户已存在')
    }
    ctx.body = await new User(ctx.request.body).save()
  }

  // 检查用户是否自己数据
  async checkOwner(ctx, next) {
    if (ctx.params.id !== ctx.state.user._id) {
      ctx.throw(403, '没有权限')
    }
    await next()
  }

  // 更新用户
  async update(ctx) {
    ctx.verifyParams({
      name: {type: 'string', required: true},
      password: {type: 'string', required: false},
      avatar_url: {type: 'string', required: false},
      gender: {type: 'string', required: false},
      headline: {type: 'string', required: false},
      locations: {type: 'array', itemType: 'string', required: false},
      business: {type: 'string', required: false},
      employments: {type: 'array', itemType: 'object', required: false},
      educations: {type: 'array', itemType: 'object', required: false},
    })
    const user = await User.findByIdAndUpdate(ctx.params.id, ctx.request.body)
    if (!user) {
      ctx.throw(404, '用户不存在')
    }
    ctx.body = user
  }

  // 用户登录
  async login(ctx) {
    ctx.verifyParams({
      name: {type: 'string', required: true},
      password: {type: 'string', required: true}
    })
    // 用户是否存在
    const user = await User.findOne(ctx.request.body)
    if (!user) {
      ctx.throw(401, '用户名或密码不正确')
    }
    // 获取用户 _id, name
    const {_id, name} = user
    // 生成token
    const token = jsonwebtoken.sign({_id, name}, secret, {expiresIn: '1d'})
    // 返回数据
    ctx.body = {token}
  }

  // 某个用户粉丝列表
  async listFollowing(ctx) {
    // populate('following') 表示将 following 字段从 id 转为用户信息
    const user = await User.findById(ctx.params.id).select('+following').populate('following')
    if (!user) {
      ctx.throw(404, '用户不存在')
    }
    ctx.body = user.following
  }

  // 某个用户关注列表
  async listFollowers(ctx) {
    // populate('followers') 表示将 followers 字段从 id 转为用户信息
    const users = await User.find({following: ctx.params.id})
    ctx.body = users
  }

  // 校验用户是否存在
  async checkUserExist(ctx, next) {
    const user = await User.findById(ctx.params.id)
    if (!user) {
      ctx.throw(404, '用户不存在')
    }
    await next()
  }

  // 关注用户
  async follow(ctx) {
    // 当前用户
    const me = await User.findById(ctx.state.user._id).select('+following')
    // 判断当前用户是否已关注该用户
    if (!me.following.map(id => id.toString()).includes(ctx.params.id)) {
      me.following.push(ctx.params.id)
      me.save()
    }
    ctx.status = 204
  }

  // 取消关注用户
  async unfollow(ctx) {
    // 当前用户
    const me = await User.findById(ctx.state.user._id).select('+following')
    // 当前用户关注列表中的索引
    const index = me.following.map(id => id.toString()).indexOf(ctx.params.id)
    // 已经关注
    if (index > -1) {
      // 取消关注
      me.following.splice(index, 1)
      me.save()
    }
    ctx.status = 204
  }

  // 删除用户
  async delete(ctx) {
    const user = await User.findByIdAndRemove(ctx.params.id)
    if (!user) {
      ctx.throw(404, '用户不存在')
    }
    ctx.status = 204
  }
}

module.exports = new UserCtl()
