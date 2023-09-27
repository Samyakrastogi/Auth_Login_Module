const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  Name: { type: String },
  Email: { type: String },
  Age: { type: String },
  ContactNo: { type: String },
  Place: { type: String },
});

const User = mongoose.model("users", userSchema);

module.exports = User;
