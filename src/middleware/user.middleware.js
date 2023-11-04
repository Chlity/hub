const Userserver = require('../server/user.server')
const md5Password = require('../utils/handle-password')
const userServer = async (ctx, next) => {
  const { account, password } = ctx.request.body
  if (!account || !password) {
    return ctx.app.emit('error', 'account_or_password_is_null', ctx)
  }

  const val = await Userserver.selectUserIsRepeat(account)
  if (val.length) {
    return ctx.app.emit('error', 'account_is_exists', ctx)
  }
  await next()
}

const handlePassword = async (ctx, next) => {
  const { password } = ctx.request.body
  ctx.request.body.password = md5Password(password)
  await next()
}

module.exports = { userServer, handlePassword }
