const express = require("express");
const router = express.Router();

// const authenticate = require("../../middleware/authenticate");


const authWrapper = require("../../decorators/authWrapper");

const { login } = require("../../controllers/auth.js");

router.post("/", authWrapper(login));

module.exports = router;
