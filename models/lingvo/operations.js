const axios = require("axios");
const { BASE_URL, API_KEY } = process.env;

let tokenExpirationTime = null;
axios.defaults.baseURL = BASE_URL;

const setHeader = async () => {
  if (Date.now() > tokenExpirationTime) {
  const { data } = await axios.post(
    "/api/v1.1/authenticate",
    {},
    {
      headers: {
        Authorization: `Basic ${API_KEY}`,
      },
    }
  );
  tokenExpirationTime = Date.now() + (23 * 60 * 60 * 1000);
  axios.defaults.headers.common.Authorization = `Bearer ${data}`;
  }
};


const getWordList = async (prefix, srcLang, pageSize) => {
  await setHeader();

  const { data: { Headings } } = await axios
  .get("/api/v1/WordList", {
    params: {
      prefix,
      srcLang,
      dstLang: srcLang,
      pageSize,
    },
  });

  const data = Headings.length ? Headings.map(({ Heading }) => ({ Heading })) : [];
  return data ;
};

module.exports = { getWordList };