const Labelservers = require('../server/label.server')
class Labercontroller {
  async create(ctx, next) {
    const { name } = ctx.request.body
    const res = await Labelservers.createLabel(name)
    if (!res) {
      return ctx.app.emit('error', 'label_repeat', ctx)
    }
    ctx.body = {
      code: 0,
      message: '创建标签成功',
      data: res
    }
  }
  async addLabels(ctx, next) {
    const { labels } = ctx
    const { momentId } = ctx.params
    for (const item of labels) {
      const res = await Labelservers.hasLabel(momentId, item.id)
      if (!res) {
        const val = await Labelservers.addLabelss(momentId, item.id)
      }
    }
    ctx.body = {
      code: 0,
      message: '给动态添加标签成功'
    }
  }
}

module.exports = new Labercontroller()
