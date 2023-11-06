const connection = require('../app/database')
class CommentServers {
  async sendingComment(momentId, userId, content) {
    const statement = 'INSERT INTO comment (content,moment_id,user_id) VALUES (?,?,?);'
    const [res] = await connection.execute(statement, [content, momentId, userId])
    return res
  }
  async replyComment(momentId, userId, commentId, content) {
    const statement = 'INSERT INTO comment (content,moment_id,comment_id,user_id) VALUES (?,?,?,?);'
    const [res] = await connection.execute(statement, [content, momentId, commentId, userId])
    return res
  }
}

module.exports = new CommentServers()
