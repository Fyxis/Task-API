const md5 = require("md5");
const variables = require("./variables");

const hashPassword = (password) => {
	const a = md5("pass") + md5("word"),
		b = md5(password),
		c = md5("!!" + variables.author + "!!"),
		d = md5("^^" + a + "^^" + b + "^^" + c),
		result = md5(d) + password + md5(d);
	return result;
};

module.exports = {
	hashPassword,
};
