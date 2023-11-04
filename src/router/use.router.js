const KoaRouter = require('@koa/router')
const Usercontroller = require('../controller/user.controller')
const useRouter = new KoaRouter({ prefix: '/users' })

const { userServer, handlePassword } = require('../middleware/user.middleware')

useRouter.post('/', userServer, handlePassword, Usercontroller.create)

module.exports = useRouter
