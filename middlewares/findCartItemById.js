const { Cart } = require("../models/cart.model");
const findCartItemById = async (req, res, next, cartId) => {
  try {
    const cartItem = await Cart.findById(cartId);
    if (!cartItem) {
      return res
        .status(400)
        .json({ success: false, message: "CartItem Not Found!" });
    }
    req.cartItem = cartItem;
    next();
  } catch (err) {
    res.status(404).json({ success: false, message: "CartItem Not Found" });
  }
};

module.exports = { findCartItemById };
