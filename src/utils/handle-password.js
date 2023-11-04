const crypto = require('crypto')

function md5Password(password) {
  const md5 = crypto.createHash('md5')
  const md5Pwd = md5.update(password).digest('hex')
  return md5Pwd
}

module.exports = md5Password
