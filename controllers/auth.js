const {	getToken } = require("../models/user/operations.js");

const login = async ({ body: { email, password } }) =>	await getToken(email, password);

module.exports = {
	login,
};
