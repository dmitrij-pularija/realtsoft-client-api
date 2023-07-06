const { addClient, getClient } = require("../models/client/operations");

const add = async ({ body: { phones, name, email, userId } }) =>
  await addClient(phones, name, email, userId);
const get = async ({ body: { phone, email } }) => await getClient(phone, email);

module.exports = { add, get };