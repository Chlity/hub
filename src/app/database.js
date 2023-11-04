const mysql2 = require('mysql2')
const connectionPool = mysql2.createPool({
  host: 'localhost',
  port: '3306',
  database: 'hub',
  user: 'root',
  password: 'z2878578668',
  connectionLimit: 10
})

connectionPool.getConnection((err, connection) => {
  if (err) {
    console.log('获取连接失败', err)
    return
  }

  connection.connect(err => {
    if (err) {
      console.log('连接数据库失败', err)
    } else {
      console.log('连接数据库成功')
    }
  })
})

const connection = connectionPool.promise()

module.exports = connection
