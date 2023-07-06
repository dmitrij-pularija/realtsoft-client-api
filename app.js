const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const clientRouter = require("./routes/api/client");
const inquiryRouter = require("./routes/api/inquiry");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/client", clientRouter);
app.use("/api/inquiry/create", inquiryRouter);

app.use((_, res, __) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, _, res, __) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;