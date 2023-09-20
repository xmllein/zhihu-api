const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const app = new Koa()
// 路由入口
const routing = require('./routes')

app.use(bodyParser())
routing(app)
app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})
