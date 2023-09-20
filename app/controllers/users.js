const db = [{name: '李磊'}]

class UserCtl {
  // 用户列表
  find(ctx) {
    ctx.body = db
  }

  // 用户详情
  findById(ctx) {
    ctx.body = db[ctx.params.id * 1]
  }

  // 创建用户
  create(ctx) {
    db.push(ctx.request.body)
    ctx.body = ctx.request.body
  }

  // 更新用户
  update(ctx) {
    db[ctx.params.id * 1] = ctx.request.body
    ctx.body = ctx.request.body
  }

  // 删除用户
  delete(ctx) {
    db.splice(ctx.params.id * 1, 1)
    ctx.status = 204
  }
}

module.exports = new UserCtl()
