const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
// 根路由
const router = new Router()
// 用户路由
const userRouter = new Router({prefix: '/users'})

const auth = async (ctx, next) => {
  if (ctx.url !== '/users') {
    ctx.throw(401)
  }
  await next()
}

router.get('/', (ctx) => {
  ctx.body = '这是主页'
})


// 用户列表页面
userRouter.get('/', auth, (ctx) => {
  ctx.body = [
    {name: '李磊'},
    {name: '韩梅梅'}
  ]
})

// 创建用户
userRouter.post('/', (ctx) => {
  ctx.body = {name: '李雷'}
})

// 获取用户详情
userRouter.get('/:id', (ctx) => {
  ctx.body = `这是用户 ${ctx.params.id}`
})

// 修改用户
userRouter.put('/:id', (ctx) => {
  ctx.body = `这是全部修改用户 ${ctx.params.id}`
})

userRouter.patch('/:id', (ctx) => {
    ctx.body = `这是部分修改用户 ${ctx.params.id}`
})

// 删除用户
userRouter.delete('/:id', (ctx) => {
  ctx.body = `这是删除用户 ${ctx.params.id}`
  // ctx.status = 204
})

// 使用路由
app.use(router.routes())
app.use(userRouter.routes())
// 允许使用路由的方法
app.use(userRouter.allowedMethods())


app.listen(3000)
