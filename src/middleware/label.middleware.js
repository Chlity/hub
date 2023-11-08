const Labelservers = require('../server/label.server')
const verifyLabelsExists = async (ctx, next) => {
  const newLabels = []
  for (name of ctx.request.body.name) {
    const res = await Labelservers.queryLabel(name)
    const labelobj = { name }
    if (res) {
      labelobj.id = res.id
    } else {
      const val = await Labelservers.createLabel(name)
      const values = await Labelservers.queryLabel(name)
      labelobj.id = values.id
    }
    newLabels.push(labelobj)
  }
  ctx.labels = newLabels
  await next()
}

module.exports = { verifyLabelsExists }
