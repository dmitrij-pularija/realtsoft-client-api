const express = require("express");
const router = express.Router();

const ctrlWrapper = require("../../decorators/ctrlWrapper");
const { add } = require("../../controllers/client");

router.post("/", ctrlWrapper(add));

module.exports = router;