const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  balance: Number,
  debtors: Array,
  creditors: Array
});

const User = mongoose.model("User", userSchema);