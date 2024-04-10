const variables = require("../utilities/variables");
const dbConnection = require("../config/dbConnection");
let SQL;

const getAllAccount = () => {
	SQL = `SELECT * FROM ${variables.userTable}`;
	return dbConnection.execute(SQL);
};

const getLastAccount = () => {
  SQL = `SELECT * FROM ${variables.userTable} WHERE id_user = (SELECT MAX(id_user) FROM ${variables.userTable})`;
  return dbConnection.execute(SQL)
}

const registerAccount = (username, email, password, dateBirth) => {
	SQL = `INSERT INTO ${variables.userTable} (username, email, date_of_birth, password) VALUES ('${username}', '${email}', '${dateBirth}', '${password}')`;
	return dbConnection.execute(SQL);
};

module.exports = { getAllAccount, getLastAccount, registerAccount };
