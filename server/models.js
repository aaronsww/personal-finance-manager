const mongoose = require("mongoose");

const ObjectId = mongoose.Types.ObjectId;

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

const Transaction = mongoose.model(
  "Transaction",
  new mongoose.Schema({
    date: Date,
    payerId: ObjectId,
    payeeId: ObjectId,
    amount: Number,
  })
);

module.exports = { User, Transaction };
