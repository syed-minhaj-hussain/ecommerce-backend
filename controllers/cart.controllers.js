const { Cart } = require("../models/cart.model");

const getCartItemsController = async (req, res) => {
  const {
    user: { _id },
  } = req;
  try {
    const cartItems = await Cart.find({ user: _id });

    res.status(200).json({ success: true, cartItems });
  } catch (err) {
    res.status(404).json({ success: false, message: "Cart Not Found" });
  }
};

const postCartItemController = async (req, res) => {
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
};

const getSpecificCartItemController = async (req, res) => {
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
};

const updateSpecificCartItemController = async (req, res) => {
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
};

const deleteSpecificCartItemController = async (req, res) => {
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
};

module.exports = {
  getCartItemsController,
  postCartItemController,
  getSpecificCartItemController,
  updateSpecificCartItemController,
  deleteSpecificCartItemController,
};
