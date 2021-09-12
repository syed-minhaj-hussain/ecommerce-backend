const express = require("express");
const router = express.Router();

const { authVerify } = require("../middlewares/authVerify");
const {
  getWishlistController,
  postWishlistItemController,
  getSpecificWishlistItemController,
  deleteSpecificWishlistItemController,
} = require("../controllers/wishlist.controllers");

// router.use("/", authVerify);

router
  .route("/")
  .get(authVerify, getWishlistController)
  .post(authVerify, postWishlistItemController);

router
  .route("/:wishlistId")
  .get(authVerify, getSpecificWishlistItemController)
  .delete(authVerify, deleteSpecificWishlistItemController);

module.exports = { router };
