const { Wishlist } = require("../models/wishlist.model");

const getWishlistController = async (req, res) => {
  const {
    user: { _id },
  } = req;
  try {
    const wishlist = await Wishlist.find({ user: _id });

    res.status(200).json({ success: true, wishlist });
  } catch (err) {
    res.status(404).json({ success: false, message: "Wishlist Not Found" });
  }
};

const postWishlistItemController = async (req, res) => {
  const {
    user: { _id },
  } = req;
  const product = req.body;

  try {
    if (product) {
      const itemCreated = new Wishlist({ ...product, user: _id });
      const saveItemCreated = await itemCreated.save({ user: _id });

      res.status(200).json({
        success: true,
        saveItemCreated,
        message: "Item Added To Wishlist",
      });
    }
  } catch (err) {
    res.status(404).json({ success: false, message: "WishItem Not Found" });
  }
};

const getSpecificWishlistItemController = async (req, res) => {
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
};

const deleteSpecificWishlistItemController = async (req, res) => {
  const { prodName } = req.params;
  const { user: wishlistUser } = req;
  try {
    await Wishlist.remove({
      name: prodName,
      user: wishlistUser._id,
    });
    res
      .status(200)
      .json({ success: true, message: "Product Removed Successfully" });
  } catch (err) {
    res.status(400).json({ success: false, message: "Something Went Wrong" });
  }
};

module.exports = {
  getWishlistController,
  postWishlistItemController,
  getSpecificWishlistItemController,
  deleteSpecificWishlistItemController,
};
