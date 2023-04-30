const router = require("express").Router()

const { Group } = require("../models");
const authenticateJWT = require("../middleware");

router.route("/group/create").post(authenticateJWT, (req, res) => {
  const group = Group({
    name: req.body.name,
    members: req.body.users,
  });

  group.save();
  res.send(group);
});

router.route("/group/members").post(authenticateJWT, async (req, res) => {
  const group = await Group.findById(req.body.groupId);
  const members = group.members || [];

  if (members.find((member) => member.memberId == req.body.memberId)) {
    res.status(400).send({ message: "Member is already in the group." });
    return;
  } else members.push({ memberId: req.body.memberId });

  group.members = members;

  const result = await group.save();
  res.send(result);
});

router.route("/group/members").delete(authenticateJWT, async (req, res) => {
  const group = await Group.findById(req.body.groupId);
  const members = group.members || [];

  group.members = members.filter(
    (member) => member.memberId != req.body.memberId
  );

  const result = await group.save();
  res.send(result);
});

router.route("/group").delete(authenticateJWT, async (req, res) => {
  const result = await Group.findByIdAndDelete(req.body.groupId);
  res.send(result);
});

module.exports = router;