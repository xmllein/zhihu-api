class HomeCtl {
  // 首页入口
  index(ctx) {
    ctx.body = '主页';
  }
  upload(ctx){
    const file = ctx.request.files.file;
    ctx.body = { path: file.path };
  }
}

module.exports = new HomeCtl();
