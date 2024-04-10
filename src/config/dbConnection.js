const db = require('mysql2')
const { db_hostname, db_username, db_passname, db_dbname } = require('../utilities/variables')

const dbConnect = db.createPool({
  host: db_hostname,
  user: db_username,
  password: db_passname,
  database: db_dbname,
})

module.exports = dbConnect.promise()