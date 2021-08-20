const express = require("express");
const router = express.Router();

const { authVerify } = require("../middlewares/authVerify");
const {
  getCartItemsController,
  postCartItemController,
} = require("../controllers/cart.controllers");

// router.use("/", authVerify);
router
  .route("/")
  .get(authVerify, getCartItemsController)
  .post(authVerify, postCartItemController);

module.exports = { router };
