const { Cart } = require("../models/cart.model");

const getCartItemsController = async (req, res) => {
  const {
    user: { _id },
  } = req;
  try {
    const cartItems = await Cart.find({ user: _id });

    res.status(200).json(cartItems);
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
      const savedCart = await Cart.findOneAndUpdate(
        { user: _id },
        { cart: cart },
        { useFindAndModify: false },
        async (err, doc) => {
          console.log({ err });
          console.log({ doc });
          if (!doc) {
            const createCart = new Cart({ user: _id, cart: cart });
            try {
              const saveCart = await createCart.save();
              res.status(200).json({ succes: true, saveCart });
            } catch (err) {
              res
                .status(400)
                .json({ success: false, message: "Something Went Wrong" });
            }
          }
        }
      );
      res.status(200).json({ savedCart });
    }
  } catch (err) {
    res.status(404).json({ success: false, message: "CartItem Not Found" });
  }
};

module.exports = {
  getCartItemsController,
  postCartItemController,
};
