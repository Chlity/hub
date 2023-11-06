const connection = require('../app/database')
class Momentservers {
  async createMoment(id, content) {
    const statement = 'INSERT into `moment` (user_id,content) values (?,?);'
    const [res] = await connection.execute(statement, [id, content])
    return res
  }
  async queryAllMoment(limit, offset) {
    let statement = ''
    if (!limit || !offset) {
      statement = `SELECT m.content,m.createAt createTime,m.updateAt updateTime,JSON_OBJECT('id',u.id,'name',u.account) user,(SELECT COUNT(*) FROM comment WHERE m.id = comment.moment_id) commentCount  FROM moment m LEFT JOIN user u ON m.user_id = u.id;`
      const [res] = await connection.execute(statement)
      return res
    } else {
      statement = `SELECT m.content,m.createAt createTime,m.updateAt updateTime,JSON_OBJECT('id',u.id,'name',u.account) user,(SELECT COUNT(*) FROM comment WHERE m.id = comment.moment_id) commentCount FROM moment m LEFT JOIN user u ON m.user_id = u.id LIMIT ? OFFSET ?;`
      const [res] = await connection.execute(statement, [String(limit), String(offset)])
      return res
    }
  }
  async queryMomentId(id) {
    const statement = `SELECT 
    m.id,m.content,m.createAt createTime,m.updateAt updateTime,
    JSON_OBJECT('id',u.id,'name',u.account) user ,
    JSON_ARRAYAGG(JSON_OBJECT('id',c.id,'content',c.content,'createTime',c.createAt,'user',JSON_OBJECT('id',cu.id,'name',cu.account))) comments FROM moment m 
    LEFT JOIN user u ON m.user_id = u.id 
    LEFT JOIN comment c ON c.moment_id = m.id
    LEFT JOIN user cu ON  cu.id = c.user_id
    WHERE m.id = ?
    GROUP BY m.id;`
    const res = connection.execute(statement, [String(id)])
    return res
  }
  async modifyMonmentData(id, content) {
    const statement = 'UPDATE moment SET content = ? WHERE id = ?;'
    const res = await connection.execute(statement, [content, id])
    return res
  }
  async queryPermission(queryName, queryId, useId) {
    try {
      console.log(queryName, queryId, useId)
      const statement = `SELECT * FROM ${queryName} WHERE id = ? && user_id = ?;`
      const [res] = await connection.execute(statement, [queryId, useId])
      return !!res.length
    } catch (error) {
      console.log(error)
    }
  }
  async removeMonmentData(queryId) {
    const statement = 'DELETE FROM moment WHERE id = ?;'
    const [res] = await connection.execute(statement, [queryId])
    return res
  }
}
module.exports = new Momentservers()
