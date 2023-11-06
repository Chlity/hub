const Momentservers = require('../server/moment.server')
class Momentserver {
  async create(ctx, next) {
    // 1.获取动态内容
    const { content } = ctx.request.body

    // 2.获取发送动态的id人
    const { id } = ctx.user
    ctx.body = '动态列表'

    // 3.操作数据库
    const res = await Momentservers.createMoment(id, content)

    ctx.body = {
      code: 0,
      message: '发布动态成功',
      data: res
    }
  }
  async queryAll(ctx, next) {
    const res = await Momentservers.queryAllMoment(ctx.query.limit, ctx.query.offset)
    ctx.body = {
      code: 0,
      message: '获取所有动态列表成功',
      data: res
    }
  }
  async queryId(ctx, next) {
    const res = await Momentservers.queryMomentId(ctx.params.id)
    ctx.body = {
      code: 0,
      data: res[0]
    }
  }
  async modifyMonment(ctx, next) {
    const res = await Momentservers.modifyMonmentData(ctx.params.momentId, ctx.request.body.content)
    ctx.body = {
      code: 0,
      message: '动态修改成功'
    }
  }
  async deleteMonment(ctx, next) {
    const res = await Momentservers.removeMonmentData(ctx.params.momentId)
    ctx.body = {
      code: 0,
      message: '动态删除成功'
    }
  }
}

module.exports = new Momentserver()
