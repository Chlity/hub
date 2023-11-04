const { SERVER_PROT } = require('./config/sever')
// 1.导入app
const app = require('./app/index')
require('./utils/handle-error')

// 2.将app启动起来
app.listen(SERVER_PROT, () => {
  console.log('服务器开启成功~')
})
