class HomeCtl {
  // 首页入口
  index(ctx) {
    ctx.body = '主页';
  }
}

module.exports = new HomeCtl();
