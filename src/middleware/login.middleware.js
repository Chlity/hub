const Loginservers = require('../server/login.server')
const Userserver = require('../server/user.server')
const jwt = require('jsonwebtoken')
const md5Password = require('../utils/handle-password')
const { privateKey, publicKey } = require('../config/screct')
const loginServer = async (ctx, next) => {
  ctx.body = '正在进行登录操作'
  const { account, password } = ctx.request.body
  // 1.判断用户输入的账号密码是否为空
  if (!account || !password) {
    return ctx.app.emit('error', 'account_or_password_is_null', ctx)
  }
  // 2.查询该用户是否在数据库中存在
  const res = await Userserver.selectUserIsRepeat(account)
  if (!res.length) {
    return ctx.app.emit('error', 'account_is_not_exists', ctx)
  }
  // 3.查询数据库中的密码和用户传递的密码是否一致
  if (res[0].password !== md5Password(password)) {
    return ctx.app.emit('error', 'password_is_error', ctx)
  }
  ctx.user = res[0]
  await next()
}

const tokenServer = async (ctx, next) => {
  try {
    //  获取token的信息
    const authorization = ctx.header.authorization
    if (!authorization) return ctx.app.emit('error', 'token_is_null', ctx)
    const token = authorization.replace('Bearer ', '')
    const result = jwt.verify(token, publicKey, {
      algorithms: ['RS256']
    })

    // 将token的信息保留下来
    ctx.user = result
    // 执行下一个中间件
    await next()
  } catch (error) {
    console.log(error)
    return ctx.app.emit('error', 'token_error', ctx)
  }
}

module.exports = { loginServer, tokenServer }
