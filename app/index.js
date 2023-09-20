const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const app = new Koa()
// 路由入口
const routing = require('./routes')

// 错误处理中间件
app.use(async (ctx, next) => {
  try{
    await next()
  }catch (err){
    ctx.status = err.status || err.statusCode || 500
    ctx.body = {
      message: err.message
    }
  }
})

app.use(bodyParser())
routing(app)
app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})
