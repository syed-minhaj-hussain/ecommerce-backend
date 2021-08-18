const express = require("express");
const router = express.Router();

const { authVerify } = require("../middlewares/authVerify");
const {
  getWishlistController,
  postWishlistItemController,
  getSpecificWishlistItemController,
  deleteSpecificWishlistItemController,
} = require("../controllers/wishlist.controllers");

router.use("/", authVerify);

router.route("/").get(getWishlistController).post(postWishlistItemController);

router
  .route("/:wishlistId")
  .get(getSpecificWishlistItemController)
  .delete(deleteSpecificWishlistItemController);

module.exports = { router };
