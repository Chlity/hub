const fs = require('fs')

// 默认情况下相对目录和node程序的启动目录有关系
const privateKey = fs.readFileSync('./src/config/keys/private.key')
const publicKey = fs.readFileSync('./src/config/keys/public.key')

module.exports = {
  privateKey,
  publicKey
}
