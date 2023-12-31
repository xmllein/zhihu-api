const path = require('path')

class HomeCtl {
  // 首页入口
  index(ctx) {
    ctx.body = '主页'
  }

  upload(ctx) {
    const file = ctx.request.files.file
    const basename = path.basename(file.path)
    ctx.body = {url: `${ctx.origin}/uploads/${basename}`}
  }
}

module.exports = new HomeCtl()
