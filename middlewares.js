const { Product } = require("./models/product.model");

const errorHandler = (err, req, res, next) =>
  res.status(500).json({
    success: false,
    message: "Something Went Wrong! Try After Some Time",
  });

const routeNotFoundHandler = (req, res) =>
  res.status(404).json({ message: "Route Not Found!" });

const getProductById = async (req, res, next, productId) => {
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(400)
        .json({ success: false, message: "Product Not Found!" });
    }
    req.product = product;
    next();
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Something Went Wrong!" });
  }
};

module.exports = { errorHandler, routeNotFoundHandler, getProductById };
