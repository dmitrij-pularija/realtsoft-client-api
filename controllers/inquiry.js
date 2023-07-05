const { getWordList } = require("../models/inquiry/operations");

const add = async ({ query: { prefix, srcLang, pageSize }}) => await getWordList(prefix, srcLang, pageSize);

module.exports = { add };