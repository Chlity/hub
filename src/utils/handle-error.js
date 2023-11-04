const app = require('../app/index')

app.on('error', (err, ctx) => {
  let code = 0
  let message = ''
  switch (err) {
    case 'account_or_password_is_null':
      code = -1001
      message = '输入的账号或密码为空，请重新输入'
      break
    case 'account_is_exists':
      code = -1002
      message = '输入的账号已存在，请重新输入'
  }
  ctx.body = {
    code,
    message
  }
})
