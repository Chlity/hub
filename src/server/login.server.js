const connection = require('../app/database')
class Loginservers {
  // async userIsExists(account) {
  //   const statement = 'SELECT * FROM `user` WHERE account = ?;'
  //   const [values] = await connection.execute(statement, [account])
  //   return values
  // }
}

module.exports = new Loginservers()
