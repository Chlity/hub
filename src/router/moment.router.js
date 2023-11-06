const KoaRouter = require('@koa/router')
const momentRouter = new KoaRouter({ prefix: '/moment' })
const Momentserver = require('../controller/moment.controller')
const { tokenServer } = require('../middleware/login.middleware')
const { verifyPermission } = require('../middleware/permission.middleware')

momentRouter.post('/', tokenServer, Momentserver.create)
momentRouter.get('/list', Momentserver.queryAll)
momentRouter.get('/:id', Momentserver.queryId)
momentRouter.patch('/:momentId', tokenServer, verifyPermission, Momentserver.modifyMonment)
momentRouter.delete('/:momentId', tokenServer, verifyPermission, Momentserver.deleteMonment)

module.exports = momentRouter
