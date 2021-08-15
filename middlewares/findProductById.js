const { Product } = require("../models/product.model");

const findProductById = async (req, res, next, productId) => {
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(400)
        .json({ success: false, message: "Product Not Found" });
    }
    req.product = product;
    next();
  } catch (err) {
    res.status(400).json({ success: false, message: "Product Not Found" });
  }
};

module.exports = { findProductById };
