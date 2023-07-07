const axios = require("axios");
const { generateSign } = require("../../utils/signature");

const querystring = require("querystring");
const { BASE_URL, API_KEY, API_SECRET } = process.env;

axios.defaults.baseURL = BASE_URL;

const addClient = async (phones, name, email, userId) => {
  const params = { phones: [phones], name, email, responsible_user_id: userId };
  const formData = querystring.stringify({
    "phones[]": phones,
    name,
    email,
    responsible_user_id: userId,
  });
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    auth: API_KEY + ":" + generateSign("client/create", params, API_SECRET),
  };
  const { data } = await axios.post("/api/client/create", formData, {
    headers,
  });
  return data;
};

const getClient = async (phone, email) => {
  const params = { phone, email };
  const headers = {
    auth: API_KEY + ":" + generateSign("client/index", params, API_SECRET),
  };
  const { data } = await axios.get("/api/client/index", { headers, params });
  return data;
};

module.exports = { addClient, getClient };