const connection = require('../app/database')

class Userserver {
  async create(user) {
    const { account, password } = user
    // const statement = `INSERT INTO user (account,password) VALUES (user.account,user.password)`
    // connection.execute()
    //   .then(res => {
    //     console.log(res)
    //   })
    const statement = `INSERT INTO user (account,password) VALUES (?,?)`
    const [result] = await connection.execute(statement, [account, password])
    return result
  }
  async selectUserIsRepeat(name) {
    const statement = 'SELECT * FROM `user` WHERE account = ?;'
    const [values] = await connection.execute(statement, [name])
    return values
  }
}

module.exports = new Userserver()
