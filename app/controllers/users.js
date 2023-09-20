const db = [{name: '李磊'}]

class UserCtl {
  // 用户列表
  find(ctx) {
    ctx.body = db
  }

  // 用户详情
  findById(ctx) {
    if (ctx.params.id * 1 >= db.length) {
      ctx.throw(412, '先决条件失败，id大于等于数组长度')
    }
    ctx.body = db[ctx.params.id * 1]
  }

  // 创建用户
  create(ctx) {
    ctx.verifyParams({
      name: {type: 'string', required: true},
      age: {type: 'number', required: false}
    })
    db.push(ctx.request.body)
    ctx.body = ctx.request.body
  }

  // 更新用户
  update(ctx) {
    if(ctx.params.id * 1 >= db.length) {
        ctx.throw(412, '先决条件失败，id大于等于数组长度')
    }
    ctx.verifyParams({
      name: {type: 'string', required: true},
      age: {type: 'number', required: false}
    })
    db[ctx.params.id * 1] = ctx.request.body
    ctx.body = ctx.request.body
  }

  // 删除用户
  delete(ctx) {
    if(ctx.params.id * 1 >= db.length) {
        ctx.throw(412, '先决条件失败，id大于等于数组长度')
    }
    db.splice(ctx.params.id * 1, 1)
    ctx.status = 204
  }
}

module.exports = new UserCtl()
