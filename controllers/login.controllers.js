const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcryptjs");

const { User } = require("../models/user.model");
const { loginValidaton } = require("../validation");

const loginController = async (req, res) => {
  const data = req.body;
  const { error } = loginValidaton(data);
  if (error) {
    return res.json({ message: error.details[0].message });
  }
  try {
    const user = await User.findOne({ email: data.email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User doesn't exist" });
    }
    const validateUserPassword = await bcrypt.compare(
      data.password,
      user.password
    );
    if (!validateUserPassword) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized User!!" });
    }
    const authtoken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res
      .status(200)
      .json({ success: true, message: "User Credentials Verified", authtoken });
  } catch (err) {
    return res.json({
      message: "Something Went Wrong! Please Try Again After Some Time",
    });
  }
};
module.exports = { loginController };
