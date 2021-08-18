const express = require("express");
const router = express.Router();

const { authVerify } = require("../middlewares/authVerify");
const { Wishlist } = require("../models/wishlist.model");

router.use("/", authVerify);

router
  .route("/")
  .get(async (req, res) => {
    const {
      user: { _id },
    } = req;
    try {
      const wishlist = await Wishlist.find({ user: _id });

      res.status(200).json({ success: true, wishlist });
    } catch (err) {
      res.status(404).json({ success: false, message: "Wishlist Not Found" });
    }
  })
  .post(async (req, res) => {
    const {
      user: { _id },
    } = req;
    const product = req.body;
    try {
      if (product) {
        const itemCreated = new Wishlist({ ...product, user: _id });
        const saveItemCreated = await itemCreated.save();
        res.status(200).json({
          success: true,
          saveItemCreated,
          message: "Item Added To Wishlist",
        });
      }
    } catch (err) {
      res.status(404).json({ success: false, message: "WishItem Not Found" });
    }
  });

router
  .route("/:wishlistId")
  .get(async (req, res) => {
    const { wishlistId } = req.params;
    const { user: wishlistUser } = req;
    try {
      console.log({ wishlistUser, wishlistId });
      const wishlistItem = await Wishlist.findOne({
        _id: wishlistId,
        user: wishlistUser._id,
      });
      console.log({ wishlistItem });
      res.status(200).json({ wishlistItem });
    } catch (err) {
      res.status(400).json({ success: false, message: "Something Went Wrong" });
    }
  })
  .patch(async (req, res) => {
    const { wishlistId } = req.params;
    const { user: wishlistUser } = req;
    const { quantity } = req.body;
    try {
      console.log({ wishlistUser, wishlistId, quantity });
      const updateWishlistItem = await Wishlist.updateOne(
        {
          _id: wishlistId,
          user: wishlistUser._id,
        },
        { $set: { quantity } }
      );
      res.status(200).json({
        success: true,
        updateWishlistItem,
        message: "Product Updated Successfully",
      });
    } catch (err) {
      res.status(400).json({ success: false, message: "Something Went Wrong" });
    }
  })
  .delete(async (req, res) => {
    const { wishlistId } = req.params;
    const { user: wishlistUser } = req;

    try {
      await Wishlist.remove({
        _id: wishlistId,
        user: wishlistUser._id,
      });
      res
        .status(200)
        .json({ success: true, message: "Product Removed Successfully" });
    } catch (err) {
      res.status(400).json({ success: false, message: "Something Went Wrong" });
    }
  });

module.exports = { router };
