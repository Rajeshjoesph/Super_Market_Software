const mongoose = require("mongoose");
const dotEnv = require("dotenv").config();
const { DB_HOST, DB_USER, DB_PASS } = process.env;

const connection = () =>
  mongoose
    .connect(DB_HOST, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("Database connection...");
    })
    .catch((err) => {
      console.log(err);
    });

module.exports = connection;
