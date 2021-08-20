const express = require("express");
const router = express.Router();

const { authVerify } = require("../middlewares/authVerify");
const {
  getCartItemsController,
  postCartItemController,
  getSpecificCartItemController,
  updateSpecificCartItemController,
  deleteSpecificCartItemController,
} = require("../controllers/cart.controllers");

// router.use("/", authVerify);
router
  .route("/")
  .get(authVerify, getCartItemsController)
  .post(authVerify, postCartItemController);

router
  .route("/:cartId")
  .get(authVerify, getSpecificCartItemController)
  .patch(authVerify, updateSpecificCartItemController)
  .delete(authVerify, deleteSpecificCartItemController);

module.exports = { router };
