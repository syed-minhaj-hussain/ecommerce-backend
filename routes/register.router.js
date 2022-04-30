const express = require("express");
const router = express.Router();

const { postController } = require("../controllers/register.controllers");

router.route("/").post(postController);

module.exports = { router };
