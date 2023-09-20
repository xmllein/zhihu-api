const Koa = require('koa')
const app = new Koa()

app.use(async (ctx, next) => {
  console.log(1)
  next() // 下一个中间件
    console.log(2)
  ctx.body = 'Hello Zhihu API'

})

// 下一个中间件
app.use(async (ctx, next) => {
  console.log(3)
  next()
  console.log(4)
})

// 下一个中间件
app.use(async (ctx, next) => {
  console.log(5)
})

// 输出： 1 3 5 4 2

app.listen(3000)
