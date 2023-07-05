const axios = require("axios");
const { createHash, createHmac } = require('crypto');
const querystring = require('querystring');
const { BASE_URL, API_KEY, API_SECRET} = process.env;

axios.defaults.baseURL = BASE_URL;

function generateSign(method, params, secret) {
  function buildQuery(params) {
    const sortedParams = Object.keys(params).sort();

    function encodeParams(key, value) {
      if (Array.isArray(value)) {
        return value.map(function(element) {
          return encodeParams(key + '[0]', element);
        }).join('&');
      } else if (typeof value === 'object') {
        return Object.keys(value).map(function(subKey) {
          return encodeParams(key + '[' + subKey + ']', value[subKey]);
        }).join('&');
      } else {
        return encodeURIComponent(key) + '=' + encodeURIComponent(value);
      }
    }

    const queryString = sortedParams.map(function(key) {
      return encodeParams(key, params[key]);
    }).join('&');

    // console.log("queryString", queryString);
    return queryString;
  }

  const data = method + createHash('md5').update(buildQuery(params)).digest('hex');
  // console.log("md5",createHash('md5').update(buildQuery(params)).digest('hex'));
  const hmac = createHmac('sha1', secret).update(data).digest('hex');
  const signature = Buffer.from(hmac).toString('base64');
  // console.log("hmac:", hmac);
  return signature;
}

const addClient = async ( phones, name, email, userId ) => {
  const params = {phones: [phones], name, email, responsible_user_id: userId};
  const formData = querystring.stringify({"phones[]": phones, name, email, responsible_user_id: userId});
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'auth': API_KEY + ':' + generateSign('client/create', params, API_SECRET)
  };
  // console.log("auth:", API_KEY + ":" + generateSign("client/create", params, API_SECRET));
  // const { model } = await axios.post("/api/client/create", formData, headers );
  const { data } = await axios.post('/api/client/create', formData, { headers });
  return data;
};

module.exports = { addClient };