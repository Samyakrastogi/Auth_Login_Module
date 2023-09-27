const mongoose = require("mongoose");

const authSchema = mongoose.Schema({
  username: { type: String },
  password: { type: String },
});

const authUsers = mongoose.model("authUsers", authSchema);

module.exports = authUsers;
