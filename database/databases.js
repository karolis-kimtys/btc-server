const Sequelize = require("sequelize");
const mongoose = require("mongoose");
require("dotenv").config("../.env");

const mysqlDB = new Sequelize(
  process.env.SQL_DB,
  process.env.SQL_USER,
  process.env.SQL_PASSWORD,
  {
    host: process.env.SQL_HOST,
    dialect: "mysql",
  }
);

mongoose
  .connect(process.env.ATLAS_URI, {
    ssl: true,
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log("Mongo DB connected!");
  })
  .catch((err) => {
    console.log(Error, err.message);
  });

module.exports = { mysqlDB, mongoose };
