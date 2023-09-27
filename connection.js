require('dotenv').config();
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database Connected successfully!");
  })
  .catch((err) => {
    console.log("Error connecting to database" + err);
  });

module.exports = mongoose;