const variables = {
  port: process.env.PORT,
  db_hostname: process.env.HOST_NAME,
  db_username: process.env.USER_NAME,
  db_passname: process.env.PASS_NAME,
  db_dbname: process.env.DB_NAME,
	userTable: process.env.TABLE_USER,
  logsTable: process.env.TABLE_LOGS,
  author: process.env.AUTHOR,
  dateFormat: process.env.DATE_FORMAT,
  dateTimeFormat: process.env.DATETIME_FORMAT
};

module.exports = variables;
