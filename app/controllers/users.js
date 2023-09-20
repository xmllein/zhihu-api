const jsonwebtoken = require('jsonwebtoken')
const User = require('../models/users')
const {secret} = require('../config')

class UserCtl {
  // 用户列表
  async find(ctx) {
    ctx.body = await User.find()
  }

  // 用户详情
  async findById(ctx) {
    const user = await User.findById(ctx.params.id)
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

  // 更新用户
  async update(ctx) {
    ctx.verifyParams({
      name: {type: 'string', required: true},
      password: {type: 'string', required: false}
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
