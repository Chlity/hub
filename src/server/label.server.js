const connection = require('../app/database')
class Labelservers {
  async createLabel(name) {
    try {
      const statement = 'INSERT INTO label (name) VALUES (?);'
      const res = await connection.execute(statement, [name])
      return res
    } catch (error) {
      return false
    }
  }
  async queryLabel(name) {
    const statement = 'SELECT * FROM label WHERE name = ?'
    const [res] = await connection.execute(statement, [name])
    return res[0]
  }
  async hasLabel(moment_id, labels) {
    const statement = 'SELECT * FROM moment_label WHERE moment_id = ? && label_id = ?;'
    const [res] = await connection.execute(statement, [moment_id, labels])
    return !!res.length
  }
  async addLabelss(momentId, labels) {
    const statement = 'INSERT INTO moment_label (moment_id,label_id) VALUES (?,?);'
    const res = await connection.execute(statement, [momentId, labels])
    return res
  }
}

module.exports = new Labelservers()
