const KoaRouter = require('@koa/router')
const Labercontroller = require('../controller/label.controller')
const { tokenServer } = require('../middleware/login.middleware')

const labelRouter = new KoaRouter({ prefix: '/label' })

labelRouter.post('/', tokenServer, Labercontroller.create)

module.exports = labelRouter
