const express = require("express");
const router = express.Router();

const ctrlWrapper = require("../../decorators/ctrlWrapper");
const { add, get } = require("../../controllers/client");

router.get("/index", ctrlWrapper(get));
router.post("/create", ctrlWrapper(add));

module.exports = router;