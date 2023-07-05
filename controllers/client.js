const { addClient } = require("../models/client/operations");

const add = async ({ body: { phones, name, email, userId }}) => await addClient(phones, name, email, userId);

module.exports = { add };