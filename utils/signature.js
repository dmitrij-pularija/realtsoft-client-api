const { createHash, createHmac } = require("crypto");

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
        return encodeParams(key, params[key]).replace(/%20/g, "+");
      })
      .join("&");

    return queryString;
  }

  const data =
    method + createHash("md5").update(buildQuery(params)).digest("hex");
  const hmac = createHmac("sha1", secret).update(data).digest("hex");
  const signature = Buffer.from(hmac).toString("base64");
  return signature;
};

module.exports = { generateSign };