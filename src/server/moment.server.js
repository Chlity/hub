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
      statement = `SELECT m.content,m.createAt createTime,m.updateAt updateTime,JSON_OBJECT('id',u.id,'name',u.account,'avatar',u.avatar_url) user,(SELECT COUNT(*) FROM comment WHERE m.id = comment.moment_id) commentCount,(SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id = m.id) labelCount  FROM moment m LEFT JOIN user u ON m.user_id = u.id;`
      const [res] = await connection.execute(statement)
      return res
    } else {
      statement = `SELECT m.content,m.createAt createTime,m.updateAt updateTime,JSON_OBJECT('id',u.id,'name',u.account,'avatar',u.avatar_url) user,(SELECT COUNT(*) FROM comment WHERE m.id = comment.moment_id) commentCount,(SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id = m.id) labelCount  FROM moment m LEFT JOIN user u ON m.user_id = u.id LIMIT ? OFFSET ?;`
      const [res] = await connection.execute(statement, [String(limit), String(offset)])
      return res
    }
  }
  async queryMomentId(id) {
    const statement = `SELECT 
    m.id,m.content,m.createAt createTime,m.updateAt updateTime,
    JSON_OBJECT('id',u.id,'name',u.account,'avatarURL',u.avatar_url) user ,
    
    (
      SELECT
        JSON_ARRAYAGG(JSON_OBJECT('id',c.id,'content',c.content,'createTime',c.createAt,'user',JSON_OBJECT('id',cu.id,'name',cu.account,'avatarURL',u.avatar_url)))
      FROM comment c 
      LEFT JOIN user cu ON c.user_id = cu.id	
      WHERE c.moment_id = m.id	 
    ) comments, 
    (
      JSON_ARRAYAGG(JSON_OBJECT('id',l.id,'name',l.name))
    ) labels
    FROM moment m 
    LEFT JOIN user u ON m.user_id = u.id 
    LEFT JOIN moment_label ml ON  ml.moment_id = m.id
    LEFT JOIN label l ON ml.label_id = l.id
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
      const statement = `SELECT * FROM ${queryName} WHERE id = ? && user_id = ?;`
      const [res] = await connection.execute(statement, [queryId, useId])
      return !!res.length
    } catch (error) {}
  }
  async removeMonmentData(queryId) {
    const statement = 'DELETE FROM moment WHERE id = ?;'
    const [res] = await connection.execute(statement, [queryId])
    console.log(res)
    return res
  }
}
module.exports = new Momentservers()
