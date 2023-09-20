const fs = require('fs')

/**
 * 读取当前目录下的所有路由文件，并注册到app上
 * @param app
 */
module.exports = (app) => {
  fs.readdirSync(__dirname).forEach(file => {
    // 如果是当前文件，则跳过
    if(file === 'index.js') return
    const route = require(`./${file}`)
    // 注册路由
    app.use(route.routes()).use(route.allowedMethods())
  })
}
