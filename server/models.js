const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.Types.ObjectId;

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    balance: Number,
    debtors: [
      {
        userId: ObjectId,
        amount: Number,
      },
    ],
    creditors: [
      {
        userId: ObjectId,
        amount: Number,
      },
    ],
  })
);

const Transaction = mongoose.model(
  "Transaction",
  new mongoose.Schema({
    time: Date,
    payerId: ObjectId,
    payeeId: ObjectId,
    amount: Number,
    status: String,
  })
);

const Group = mongoose.model(
  "Group",
  new mongoose.Schema({
    name: String,
    users: Array,
  })
);

module.exports = { User, Transaction, Group };
