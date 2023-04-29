const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User, Transaction, Group } = require("./models");
const authenticateJWT = require("./middleware");

router.route("/auth/signup").post(async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(req.body.password, salt);

  if (await User.findOne({ email: req.body.email })) {
    res
      .status(400)
      .send({ message: "An account is already registered with this email." });
    return;
  }

  const user = User({
    name: req.body.name,
    email: req.body.email,
    password: encryptedPassword,
    balance: 0,
  });

  const result = await user.save();
  res.send(result);
});

router.route("/auth/signin").post(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  const result = await bcrypt.compare(req.body.password, user?.password || "");

  if (result) {
    const token = jwt.sign(
      { email: user.email, id: user.id },
      process.env.JWT_SECRET_KEY
    );
    res.json({ token });
  } else res.status(400).send({ message: "Received invalid credentials." });
});

router.route("/user/search").get(async (req, res) => {
  const users = await User.find({
    name: { $regex: req.query.name || "", $options: "i" },
  }).select("-password");
  res.json(users);
});

router.route("/me").get(authenticateJWT, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  user.groups = await User.find({ "users.id": req.user.id });

  res.json(user);
});

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

router.route("/group/create").post(authenticateJWT, (req, res) => {
  const group = Group({
    name: req.body.name,
    users: req.body.users,
  });

  group.save();
  res.send(group);
});

router.route("/me/debtors/add").post(authenticateJWT, async (req, res) => {
  const debtorId = req.body.debtorId;
  const amount = req.body.amount;

  await User.findOneAndUpdate(
    { _id: req.user.id },
    { $push: { debtors: { userId: debtorId, amount } } }
  );

  await User.findOneAndUpdate(
    { _id: debtorId },
    { $push: { creditors: { userId: req.user.id, amount } } }
  );

  res.send({ message: "Operation success" });
});

module.exports = router;
