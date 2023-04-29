const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    balance: Number,
    debtors: Array,
    creditors: Array,
  })
);

// const Transaction = mongoose.model("Transaction");

module.exports = {
  User,
};
