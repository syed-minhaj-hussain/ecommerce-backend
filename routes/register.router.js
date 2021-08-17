const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { registerValidaton } = require("../validation");
const { User } = require("../models/user.model");

router.route("/").post(async (req, res) => {
  const data = req.body;
  const { error } = registerValidaton(data);
  if (error) {
    return res.status(401).json({ message: error.details[0].message });
  }
  try {
    const user = new User(data);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    res
      .status(201)
      .json({ success: true, message: "user created successfully!" });
  } catch (err) {
    console.log({ err: err.message });
  }
});

module.exports = { router };
