const Koarouter = require('@koa/router')
const { hanleupload } = require('../middleware/file.middleware')
const Filecontroller = require('../controller/file.controller')
const { tokenServer } = require('../middleware/login.middleware')
const fileRouter = new Koarouter({ prefix: '/file' })
fileRouter.post('/avatar', tokenServer, hanleupload, Filecontroller.upload)
fileRouter.get('/avatar/:userId', Filecontroller.fetch)

module.exports = fileRouter
