const moment = require("moment");
const authModel = require("../models/authModel");
const utils = require("../utilities/utils");
const variables = require("../utilities/variables");

const registerAccount = async (req, res) => {
	const { username, email, password, dateBirth } = req.body;
	try {
		let data;
		
		[data] = await authModel.getAllAccount();
		const user = data.find((a) => a.username === username || a.email === email);
		if (user) {
			return res.status(400).json({
				status: 400,
				message: "USERNAME OR EMAIL ALREADY EXIST",
			});
		}

		const hashPassword = utils.hashPassword(password);
		const formattedDateBirth = moment(dateBirth).format(variables.dateFormat);

		await authModel.registerAccount(
			username,
			email,
			hashPassword,
			formattedDateBirth
		);

		[data] = await authModel.getLastAccount();

		data.forEach((a) => {
			a.date_of_birth = moment(a.date_of_birth).format(variables.dateFormat)
			a.joined_date = moment(a.joined_date).format(variables.dateTimeFormat);
			a.updated_at = moment(a.updated_at).format(variables.dateTimeFormat)
		});

		return res.status(200).json({
			status: 200,
			message: "SUCCESS CREATED USER",
			data: data[0],
		});
	} catch (error) {
		return res.status(500).json({
			status: 500,
			message: "SERVER ERROR",
			messageServer: error,
		});
	}
};

const loginAccount = async (req, res) => {
	const { identifier, password } = req.body
	try {
		let data;

		[data] = await authModel.getAllAccount();
		const user = data.find((a) => a.username === identifier || a.email === identifier);

		if (!user) {
			return res.status(500).json({
				status: 500,
				message: `USER NOT FOUND`,
			});
		}

		const hashedPassword = utils.hashPassword(password);

		if (user.password == hashedPassword) {
			user.date_of_birth = moment(user.date_of_birth).format(variables.dateFormat);
			user.joined_date = moment(user.joined_date).format(variables.dateTimeFormat);
			user.updated_at = moment(user.updated_at).format(variables.dateTimeFormat);

			return res.status(200).json({
				status: 200,
				message: "LOGIN SUCCESS",
				data: user,
			});
		}

		return res.status(200).json({
			status: 200,
			message: "INVALID PASSWORD",
		});

	} catch (error) {
		return res.status(500).json({
			status: 500,
			message: "SERVER ERROR",
			messageServer: error
		})
	}
}

module.exports = {
	registerAccount,
	loginAccount
};
