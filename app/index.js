const Koa = require('koa')
const koaBody = require('koa-body')
const error = require('koa-json-error')
const parameter = require('koa-parameter')
const mongoose = require('mongoose')
const path = require('path')
const app = new Koa()
// 路由入口
const routing = require('./routes')
const {connectionStr} = require('./config')

// 连接数据库
mongoose.connect(connectionStr, {useNewUrlParser: true, useUnifiedTopology: true,})
const db = mongoose.connection

db.once('open', () => {
  console.log('连接数据库成功')
})

db.on('error', console.error.bind(console, '连接数据库失败'))

// 错误处理中间件
// 生产环境下的错误处理（排除stack字段）
app.use(error({
  postFormat: (e, {stack, ...rest}) => process.env.NODE_ENV === 'production' ? rest : {stack, ...rest}
}))

// 解析参数 与 上传文件
app.use(koaBody({
  // 多文件上传
  multipart: true,
  formidable: {
    // 上传目录
    uploadDir: path.join(__dirname, '/public/uploads'),
    // 保留文件扩展名
    keepExtensions: true
  }
}))
// 校验参数
app.use(parameter(app))
// 路由
routing(app)
app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})
