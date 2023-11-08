const KoaRouter = require('@koa/router')
const momentRouter = new KoaRouter({ prefix: '/moment' })
const Momentserver = require('../controller/moment.controller')
const { tokenServer } = require('../middleware/login.middleware')
const { verifyPermission } = require('../middleware/permission.middleware')
const { verifyLabelsExists } = require('../middleware/label.middleware')
const Labercontroller = require('../controller/label.controller')

momentRouter.post('/', tokenServer, Momentserver.create)
momentRouter.get('/list', Momentserver.queryAll)
momentRouter.get('/:id', Momentserver.queryId)
momentRouter.patch('/:momentId', tokenServer, verifyPermission, Momentserver.modifyMonment)
momentRouter.delete('/:momentId', tokenServer, verifyPermission, Momentserver.deleteMonment)
momentRouter.post('/:momentId/labels', tokenServer, verifyPermission, verifyLabelsExists, Labercontroller.addLabels)

module.exports = momentRouter
