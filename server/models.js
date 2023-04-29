const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    balance: Number,
    debtors: Array,
    creditors: Array,
  })
);

module.exports = {
  User,
};
