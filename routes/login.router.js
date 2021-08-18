const express = require("express");
const router = express.Router();

const { loginController } = require("../controllers/login.controllers");

router.route("/").post(loginController);

module.exports = { router };
