const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const error = require('koa-json-error')
const parameter = require('koa-parameter')
const app = new Koa()
// 路由入口
const routing = require('./routes')

// 错误处理中间件
// 生产环境下的错误处理（排除stack字段）
app.use(error({
    postFormat: (e, {stack, ...rest}) => process.env.NODE_ENV === 'production' ? rest : {stack, ...rest}
}))

// 解析参数
app.use(bodyParser())
// 校验参数
app.use(parameter(app))
// 路由
routing(app)
app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})
