const express = require("express");
const { mysqlDB, mongoose } = require("./database/databases.js");
const routes = require("./routes/routes.js");
const cors = require("cors");
const app = express();

(async () => {
  try {
    await mysqlDB.authenticate();
    console.log("MySQL connected...");
  } catch (error) {
    console.error("Connection error:", error);
  }
})();

(async () => {
  try {
    await mongoose.connection.once("open", () => {
      console.log("MongoDB connection initiated...");
    });
  } catch (error) {
    console.error("Connection error:", error);
  }
})();

app.use(cors());
app.use(express.json());
app.use("/", routes);
app.get("/", (req, res) => {
  res.send("BTC server running!");
});

app.listen(5001, () => console.log("Server running at port 5001"));
