const KoaRouter = require('@koa/router')
const { tokenServer } = require('../middleware/login.middleware')
const Commentcontroller = require('../controller/comment.controller')
const commentRouter = new KoaRouter({ prefix: '/comment' })
commentRouter.post('/', tokenServer, Commentcontroller.create)
commentRouter.post('/reply', tokenServer, Commentcontroller.reply)

module.exports = commentRouter
