const Koa = require('koa')
const app = new Koa()
const useRouter = require('../router/use.router')
const loginRouter = require('../router/login.router')
const momentRouter = require('../router/moment.router')
const commentRouter = require('../router/comment.router')
const bodyParser = require('koa-bodyparser')
app.use(bodyParser())
app.use(useRouter.routes())
app.use(useRouter.allowedMethods()) // 如果没有对应的请求方式 返回客户端 method Method Not Allowed

app.use(loginRouter.routes())
app.use(loginRouter.allowedMethods())

app.use(momentRouter.routes())
app.use(momentRouter.allowedMethods())

app.use(commentRouter.routes())
app.use(commentRouter.allowedMethods())

module.exports = app
