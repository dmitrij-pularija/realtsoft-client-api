const { addInquiry } = require("../models/inquiry/operations");

const add = async ({
  body: {
    userId,
    deal,
    realtyType,
    category,
    name,
    priceKind,
    clientId,
    sourceKind 
  },
}) =>
  await addInquiry(
    userId,
    deal,
    realtyType,
    category,
    name,
    priceKind,
    clientId,
    sourceKind
  );

module.exports = { add };