const { getWordList } = require("../models/lingvo/operations");

const get = async ({ query: { prefix, srcLang, pageSize }}) => await getWordList(prefix, srcLang, pageSize);

module.exports = { get };