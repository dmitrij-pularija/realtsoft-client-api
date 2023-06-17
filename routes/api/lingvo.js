const express = require("express");
const router = express.Router();

const ctrlWrapper = require("../../decorators/ctrlWrapper");
// const authenticate = require("../../middleware/authenticate");

const { get } = require("../../controllers/lingvo");

router.get("/", ctrlWrapper(get));

module.exports = router;
