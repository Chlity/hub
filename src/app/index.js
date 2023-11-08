const Koa = require('koa')
const app = new Koa()
const useRouter = require('../router/use.router')
const loginRouter = require('../router/login.router')
const momentRouter = require('../router/moment.router')
const commentRouter = require('../router/comment.router')
const labelRouter = require('../router/label.router')
const fileRouter = require('../router/file.router')
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

app.use(labelRouter.routes())
app.use(labelRouter.allowedMethods())

app.use(fileRouter.routes())
app.use(fileRouter.allowedMethods())

module.exports = app
