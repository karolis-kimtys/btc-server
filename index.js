const express = require("express");
const { mysqlDB, mongoose } = require("./database/databases.js");
const routes = require("./routes/routes.js");
const cors = require("cors");
const app = express();
const path = require("path");

const favicon = require("serve-favicon");
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

require("dotenv").config({ path: "./.env" });
const port = process.env.PORT || 5001;

// (async () => {
//   try {
//     await mysqlDB.authenticate();
//     console.log("MySQL connected...");
//   } catch (error) {
//     console.error("Connection error:", error);
//   }
// })();

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

app.listen(port, () => console.log(`Server running at port ${port}`));
