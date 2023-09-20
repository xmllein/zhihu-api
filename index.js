const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const app = new Koa()
// 根路由
const router = new Router()
// 用户路由
const userRouter = new Router({prefix: '/users'})

// 模拟数据库
const db = [{name: '李磊'}, {name: '韩梅梅'}]

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
  ctx.body = db
})

// 创建用户
userRouter.post('/', (ctx) => {
  db.push(ctx.request.body)
  ctx.body = ctx.request.body
})

// 获取用户详情
userRouter.get('/:id', (ctx) => {
  ctx.body = db[ctx.params.id * 1]
})

// 修改用户
userRouter.put('/:id', (ctx) => {
  db[ctx.params.id * 1] = ctx.request.body
  ctx.body = ctx.request.body
})

userRouter.patch('/:id', (ctx) => {
  db[ctx.params.id * 1] = ctx.request.body
  ctx.body = ctx.request.body
})

// 删除用户
userRouter.delete('/:id', (ctx) => {
  db.splice(ctx.params.id * 1, 1)
  ctx.status = 204
})

// 获取http 请求参数
app.use(bodyParser())
// 使用路由
app.use(router.routes())
app.use(userRouter.routes())
// 允许使用路由的方法
app.use(userRouter.allowedMethods())


app.listen(3000)
