const Userserver = require('../server/user.server')
class Usercontroller {
  async create(ctx, next) {
    const user = ctx.request.body
    const res = await Userserver.create(user)
    ctx.body = {
      message: '注册成功',
      data: res
    }
  }
}

module.exports = new Usercontroller()
