const Momentservers = require('../server/moment.server')
const verifyPermission = async (ctx, next) => {
  const keys = Object.keys(ctx.params)[0]
  const queryName = keys.replace('Id', '')
  console.log(queryName, ctx.params.momentId, ctx.user.id)
  const res = await Momentservers.queryPermission(queryName, ctx.params.momentId, ctx.user.id)
  console.log(res)
  if (!res) {
    return ctx.app.emit('error', 'no_permission_modify', ctx)
  }
  await next()
}

module.exports = { verifyPermission }
