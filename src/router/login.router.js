const KoaRouter = require('@koa/router')
const logincontroller = require('../controller/login.controller')
const { loginServer, tokenServer } = require('../middleware/login.middleware')

const loginRouter = new KoaRouter({ prefix: '/login' })
loginRouter.post('/', loginServer, logincontroller.login)
loginRouter.get('/test', tokenServer, logincontroller.test)
module.exports = loginRouter
