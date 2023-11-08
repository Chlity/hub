const Momentservers = require('../server/moment.server')
const verifyPermission = async (ctx, next) => {
  const keys = Object.keys(ctx.params)[0]
  const queryName = keys.replace('Id', '')
  const res = await Momentservers.queryPermission(queryName, ctx.params.momentId, ctx.user.id)
  if (!res) {
    return ctx.app.emit('error', 'no_permission_modify', ctx)
  }
  await next()
}

module.exports = { verifyPermission }
