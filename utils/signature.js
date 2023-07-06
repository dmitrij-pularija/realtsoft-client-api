const { createHash, createHmac } = require("crypto");
// const querystring = require('querystring');

const generateSign = (method, params, secret) => {
  function buildQuery(params) {
    const sortedParams = Object.keys(params).sort();

    function encodeParams(key, value) {
      if (Array.isArray(value)) {
        return value
          .map(function (element) {
            return encodeParams(key + "[0]", element);
          })
          .join("&");
      } else if (typeof value === "object") {
        return Object.keys(value)
          .map(function (subKey) {
            return encodeParams(key + "[" + subKey + "]", value[subKey]);
          })
          .join("&");
      } else {
        return encodeURIComponent(key) + "=" + encodeURIComponent(value);
      }
    }

    const queryString = sortedParams
      .map(function (key) {
        return encodeParams(key, params[key]).replace(/%20/g, '+');
      })
      .join("&");

    // console.log("queryString", queryString);
    return queryString;
  }

  const data =
    method + createHash("md5").update(buildQuery(params)).digest("hex");
//   console.log("md5",createHash('md5').update(buildQuery(params)).digest('hex'));
  const hmac = createHmac("sha1", secret).update(data).digest("hex");
  const signature = Buffer.from(hmac).toString("base64");
//   console.log("hmac:", hmac);
  return signature;
};

module.exports = { generateSign };