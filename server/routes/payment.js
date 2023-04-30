const router = require("express").Router();

const { User, Transaction } = require("../models");
const authenticateJWT = require("../middleware");

router.route("/transaction").get(authenticateJWT, async (req, res) => {
  const transactions = await Transaction.find({
    $or: [{ payerId: req.user.id }, { payeeId: req.user.id }],
  });
  res.json(transactions);
});

router.route("/pay").post(authenticateJWT, async (req, res) => {
  const payee = await User.findById(req.body.payeeId);
  const payer = await User.findById(req.user.id);
  const amount = req.body.amount;

  if ((payer.balance || 0) < amount) {
    res.status(400).send({
      message: "Could not initiate payment due to insufficient funds.",
    });
    return;
  } else if (amount < 0) {
    res.status(400).send({ message: "Cannot pay negative amount." });
    return;
  }

  const transaction = Transaction({
    payerId: payer.id,
    payeeId: payee.id,
    amount: amount,
    time: Date.now(),
    status: "PENDING_APPROVAL",
  });

  const result = await transaction.save();
  res.send(result);
});

router.route("/pay/verify").get(authenticateJWT, async (req, res) => {
  if (req.user.id !== transaction.payeeId) {
    res
      .status(403)
      .send({ message: "Cannot approve another user's receipt. " });
    return;
  }

  const transaction = await Transaction.findOneAndUpdate(
    { _id: req.query.id },
    { $set: { status: req.query.status ? "VERIFIED" : "REJECTED" } },
    { new: true }
  );

  if (transaction) {
    if (req.query.status) {
      await User.findOneAndUpdate(
        { _id: transaction.payerId },
        { $inc: { balance: -transaction.amount } }
      );

      await User.findOneAndUpdate(
        { _id: transaction.payeeId },
        { $inc: { balance: transaction.amount } }
      );
    }

    res.send(transaction);
  } else
    res
      .status(404)
      .send({ message: `No such transaction with id ${req.query.id}` });
});

router.route("/me/debtors/add").post(authenticateJWT, async (req, res) => {
  const debtorId = req.body.debtorId;
  const amount = req.body.amount;

  // await User.findOneAndUpdate(
  //   { _id: req.user.id },
  //   { $push: { debtors: { userId: debtorId, amount } } }
  // );

  let user = await User.findById(req.user.id);
  const debtor = user.debtors.find((debtor) => debtor.userId == debtorId);
  if (debtor) debtor.amount += amount;
  else
    user.debtors.push({
      userId: debtorId,
      amount: amount,
    });
  await user.save();

  // await User.findOneAndUpdate(
  //   { _id: debtorId },
  //   { $push: { creditors: { userId: req.user.id, amount } } }
  // );

  user = await User.findById(debtorId);
  const creditor = user.creditors.find(
    (creditor) => creditor.userId == req.user.id
  );
  if (creditor) creditor.amount += amount;
  else
    user.creditors.push({
      userId: req.user.id,
      amount: amount,
    });
  await user.save();

  res.send({ message: "Operation success" });
});

router.route("/me/balance").get(authenticateJWT, async (req, res) => {
  const result = await User.findById(req.user.id).select("balance");
  res.send(result);
});

router.route("/me/balance").patch(authenticateJWT, async (req, res) => {
  const result = await User.findOneAndUpdate(
    { _id: req.user.id },
    { $set: { balance: req.body.balance } },
    { new: true }
  );

  res.send(result);
});

router.route("/me/debtors").get(authenticateJWT, async (req, res) => {
  const user = (await User.findById(req.user.id).select("debtors")) || {};
  const debtorDetails = [];

  for (const debtor of user.debtors) {
    const user = await User.findById(debtor.userId);
    debtorDetails.push({
      _id: debtor._id,
      userId: debtor.userId,
      name: user.name,
      amount: debtor.amount,
    });
  }

  res.send(debtorDetails);
});

router.route("/me/creditors").get(authenticateJWT, async (req, res) => {
  const user = (await User.findById(req.user.id).select("creditors")) || {};
  const creditorDetails = [];

  for (const creditor of user.creditors) {
    const user = await User.findById(creditor.userId);
    creditorDetails.push({
      _id: creditor._id,
      userId: creditor.userId,
      name: user.name,
      amount: creditor.amount,
    });
  }

  res.send(creditorDetails);
});

module.exports = router;
