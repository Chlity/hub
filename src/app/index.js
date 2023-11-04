const Koa = require('koa')
const app = new Koa()
const useRouter = require('../router/use.router')
const bodyParser = require('koa-bodyparser')
app.use(bodyParser())
app.use(useRouter.routes())

app.use(useRouter.allowedMethods()) // 如果没有对应的请求方式 返回客户端 method Method Not Allowed

module.exports = app
