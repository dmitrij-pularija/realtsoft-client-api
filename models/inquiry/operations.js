const axios = require("axios");
const querystring = require("querystring");
const { generateSign } = require("../../utils/signature");

const { API_KEY, API_SECRET } = process.env;
let counter = 1;

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
    responsible_user_id: counter.toString(),
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
  if (counter < 5) {
    counter = counter + 1;
  } else {
    counter = 1;
  }
  return data;
};

module.exports = { addInquiry };