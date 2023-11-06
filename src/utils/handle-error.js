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
      break
    case 'account_is_not_exists':
      code = -1003
      message = '输入的账号不存在，请重新输入'
      break
    case 'password_is_error':
      code = -1004
      message = '输入的密码错误，请重新输入'
      break
    case 'token_error':
      code = -1005
      message = 'token过期或错误~'
      break
    case 'token_is_null':
      code = -1006
      message = '未传入token'
      break
    case 'no_permission_modify':
      code = -1007
      message = '没有权限修改'
      break
  }
  ctx.body = {
    code,
    message
  }
})
