const express = require("express");
const { extend } = require("lodash");
const router = express.Router();

const { authVerify } = require("../middlewares/authVerify");
const { Cart } = require("../models/cart.model");
// const { findCartItemById } = require("../middlewares/findCartItemById");

router.use("/", authVerify);
router
  .route("/")
  .get(async (req, res) => {
    const {
      user: { _id },
    } = req;
    try {
      const cartItems = await Cart.find({ user: _id });

      res.status(200).json({ success: true, cartItems });
    } catch (err) {
      res.status(404).json({ success: false, message: "Cart Not Found" });
    }
  })
  .post(async (req, res) => {
    const {
      user: { _id },
    } = req;
    const product = req.body;
    try {
      if (product) {
        const itemCreated = new Cart({ ...product, user: _id });
        const saveItemCreated = await itemCreated.save();
        res.status(200).json({
          success: true,
          saveItemCreated,
          message: "Item Added To Cart",
        });
      }
    } catch (err) {
      res.status(404).json({ success: false, message: "CartItem Not Found" });
    }
  });

// router.param("cartId", findCartItemById);
router
  .route("/:cartId")
  .get(async (req, res) => {
    const { cartId } = req.params;
    const { user: cartUser } = req;
    try {
      console.log({ cartUser, cartId });
      const cartItem = await Cart.findOne({ _id: cartId, user: cartUser._id });
      console.log({ cartItem });
      res.status(200).json({ cartItem });
    } catch (err) {
      res.status(400).json({ success: false, message: "Something Went Wrong" });
    }
  })
  .patch(async (req, res) => {
    const { cartId } = req.params;
    const { user: cartUser } = req;
    const { quantity } = req.body;
    try {
      console.log({ cartUser, cartId, quantity });
      const updateCartItem = await Cart.updateOne(
        {
          _id: cartId,
          user: cartUser._id,
        },
        { $set: { quantity } }
      );
      res.status(200).json({
        success: true,
        updateCartItem,
        message: "Product Updated Successfully",
      });
    } catch (err) {
      res.status(400).json({ success: false, message: "Something Went Wrong" });
    }
  })
  .delete(async (req, res) => {
    const { cartId } = req.params;
    const { user: cartUser } = req;

    try {
      await Cart.remove({
        _id: cartId,
        user: cartUser._id,
      });
      res
        .status(200)
        .json({ success: true, message: "Product Removed Successfully" });
    } catch (err) {
      res.status(400).json({ success: false, message: "Something Went Wrong" });
    }
  });

module.exports = { router };

// new
("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTFjMGYwMTI1MjU0YzM2MjAwNDQwODYiLCJpYXQiOjE2MjkyMjg4MTYsImV4cCI6MTYyOTMxNTIxNn0.QoE6euVuPgBmcTHdA46a8ctFzUrlt-Bad-1Q0yAib2k");

// old
("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTFiZmY4ZDU5MDUzMTJjNGM3NzI4NmIiLCJpYXQiOjE2MjkyMjY3ODYsImV4cCI6MTYyOTMxMzE4Nn0.Aq66AeDNRFm55RZZUapqGn_K4-S6ZBzr23Ylg3xXVXI");
