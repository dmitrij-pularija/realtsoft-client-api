const axios = require("axios");
const querystring = require("querystring");
const { generateSign } = require("../../utils/signature");

const { API_KEY, API_SECRET } = process.env;

const addInquiry = async (
  userId,
  deal,
  realtyType,
  category,
  name,
  priceKind,
  clientId,
  sourceKind
) => {
  const params = {
    responsible_user_id: userId,
    deal,
    realty_type: realtyType,
    category,
    name,
    price_kind: priceKind,
    client_id: clientId,
    source_kind: sourceKind,
  };
  const formData = querystring.stringify(params);
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    auth: API_KEY + ":" + generateSign("inquiry/create", params, API_SECRET),
  };
  console.log(
    "auth:",
    API_KEY + ":" + generateSign("inquiry/create", params, API_SECRET)
  );

  const { data } = await axios.post("/api/inquiry/create", formData, {
    headers,
  });

  return data;
};

module.exports = { addInquiry };