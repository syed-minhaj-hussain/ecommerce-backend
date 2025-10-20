const { Cart } = require("../models/cart.model");

const getCartItemsController = async (req, res) => {
  const {
    user: { _id },
  } = req;
  try {
    const cart = await Cart.find({ user: _id });
    let userCart;

    if (!cart.length) {
      userCart = { _id, cart };
    } else {
      userCart = cart[0];
    }

    res.status(200).json({ success: true, cart: userCart });
  } catch (err) {
    res.status(404).json({ success: false, message: "Cart Not Found" });
  }
};

const postCartItemController = async (req, res) => {
  const {
    user: { _id },
  } = req;
  const cart = req.body;
  try {
    if (cart) {
      /*
    With upsert: true, a new document is created if one isn't found.
    upsert:false means only update existing
    **/
      const options = { new: true, upsert: true };
      let saveCart = await Cart.findOneAndUpdate(
        { user: _id },
        { cart },
        options
      );
      const data = { _id: saveCart._id, cart: saveCart.cart };
      res.status(200).json({
        success: true,
        data,
      });
    }
  } catch (err) {
    console.log({ err });
    res.status(404).json({ success: false, message: "CartItem Not Found" });
  }
};

module.exports = {
  getCartItemsController,
  postCartItemController,
};
