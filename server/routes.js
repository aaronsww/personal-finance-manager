const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User, Transaction } = require("./models");
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

router.route("/me").post(authenticateJWT, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
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
    res
      .status(400)
      .send({ message: "Could not make payment due to insufficient funds." });
    return;
  } else if (amount < 0)
    res.status(400).send({ message: "Cannot pay negative amount." });

  const transaction = Transaction({
    payerId: payer.id,
    payeeId: payee.id,
    amount: amount,
    time: Date.now(),
  });

  await User.findOneAndUpdate(
    { _id: payer.id },
    { $set: { balance: (payer.balance || 0) - amount } }
  );
  await User.findOneAndUpdate(
    { _id: payee.id },
    { $set: { balance: (payee.balance || 0) + amount } }
  );

  transaction.save();
  res.send(transaction);
});

module.exports = router;
