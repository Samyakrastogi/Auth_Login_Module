const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String },
  email: { type: String },
  password: {type : String},
  age: { type: String },
  contactNo: { type: String },
  place: { type: String },
  token: {type : String, default : ''}
});

const User = mongoose.model("users", userSchema);

module.exports = User;
