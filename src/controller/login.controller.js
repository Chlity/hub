const jwt = require('jsonwebtoken')
const { privateKey, publicKey } = require('../config/screct')

class logincontroller {
  login(ctx, next) {
    const { id, account } = ctx.user
    // const publicKey = fs.readFileSync('../config/keys/publicKey')
    const token = jwt.sign({ id, account }, privateKey, {
      expiresIn: 60 * 24 * 60,
      algorithm: 'RS256'
    })
    ctx.body = {
      code: 0,
      data: { id, account, token }
    }
  }
  test(ctx, next) {}
}

module.exports = new logincontroller()
