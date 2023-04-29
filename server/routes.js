const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("./models");
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
  });

  const result = await user.save();
  res.send(result);
});

router.route("/auth/signin").post(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  const result = await bcrypt.compare(req.body.password, user?.password);

  if (result) {
    const token = jwt.sign(
      { email: user.email, id: user.id },
      process.env.JWT_SECRET_KEY
    );
    res.json({ token });
  } else res.status(400).send({ message: "Received invalid credentials." });
});

router.route("/user/search").get(async (req, res) => {
  const users = await User.find({ name: { $regex: req.query.name } }).select(
    "-password"
  );
  res.json(users);
});

router.route("/me").post(authenticateJWT, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
});

module.exports = router;
