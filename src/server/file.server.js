const connection = require('../app/database')
class Fileserver {
  async uploadImgInfo(id, filename, mimetype, size) {
    const statement = 'INSERT INTO avatar (filename, mimetype, size, user_id) VALUES (?,?,?,?);'
    const [res] = await connection.execute(statement, [filename, mimetype, size, id])
    return res
  }
  async fetchImge(userId) {
    const statement = 'SELECT * FROM avatar WHERE user_id = ?;'
    const [res] = await connection.execute(statement, [userId])
    return res[res.length - 1]
  }
  async updateUserAvatar(id, urlPath) {
    const statement = 'UPDATE user SET avatar_url = ? WHERE id = ?;'
    await connection.execute(statement, [urlPath, id])
  }
}

module.exports = new Fileserver()
