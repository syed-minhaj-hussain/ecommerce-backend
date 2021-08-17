const express = require("express");
const { extend } = require("lodash");
const router = express.Router();

const { Product } = require("../models/product.model");
const { findProductById } = require("../middlewares/findProductById");
const { authVerify } = require("../middlewares/authVerify");
router
  .route("/")
  .get(async (req, res) => {
    try {
      const products = await Product.find({});
      if (!products) {
        return res
          .status(404)
          .json({ success: false, message: "products not found" });
      }
      res.json({ products });
    } catch (err) {
      res.status(400).json({ success: false, message: "products not found" });
    }
  })
  .post(authVerify, async (req, res) => {
    const newProduct = req.body;
    const product = new Product(newProduct);
    try {
      const savedproduct = await product.save();
      res.status(200).json({
        ...savedproduct,
        success: true,
        message: "Product Added Successfully",
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: "product addition failed",
        errorMessage: err.message,
      });
    }
  });

router.param("productId", findProductById);
router
  .route("/:productId")
  .get((req, res) => {
    const { product } = req;
    console.log(product);
    res.json({ product });
  })
  .post(authVerify, async (req, res) => {
    let { product } = req;
    const updatedProductDetail = req.body;
    try {
      product = extend(product, updatedProductDetail);
      const updatedProduct = await product.save();
      return res.status(200).json({
        updatedProduct,
        success: true,
        message: "Product Updated Successfully",
      });
    } catch (err) {
      res.status(400).json({ success: false, message: "products not found" });
    }
  })
  .delete(authVerify, async (req, res) => {
    let { product } = req;
    try {
      const deletedProduct = await product.remove();
      res.json({ success: true, message: "Product Successfully Deleted!" });
    } catch (err) {
      res.status(400).json({ success: false, message: "products not found" });
    }
  });

module.exports = { router };
