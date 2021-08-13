const express = require("express");
const { extend } = require("lodash");
const { Product } = require("../models/product.model");
const { getProductById } = require("../middlewares");
const router = express.Router();

router
  .route("/")
  .get(async (req, res) => {
    try {
      const products = await Product.find({});
      if (!products) {
        return res
          .status(404)
          .json({ success: false, message: "Product Not Found!" });
      }
      res.status(200).json({ products, success: true });
    } catch (err) {
      res
        .status(404)
        .json({ success: false, message: "Something Went Wrong!" });
    }
  })
  .post(async (req, res) => {
    try {
      const newProduct = req.body;
      const addProduct = new Product(newProduct);
      const productAdded = await addProduct.save();
      res.status(200).json({ productAdded, success: true });
    } catch (err) {
      console.log({ err });
      res
        .status(400)
        .json({ success: false, message: "Something Went Wrong!" });
    }
  });

router.param("productId", getProductById);
router
  .route("/:productId")
  .get((req, res) => {
    let { product } = req;
    product.__v = undefined;
    res.status(201).json({ product, success: true });
  })
  .post(async (req, res) => {
    let { product } = req;
    const updatedProductDetail = req.body;
    console.log(updatedProductDetail);
    product = extend(product, updatedProductDetail);
    product = await product.save();
    res.status(200).json({
      success: true,
      message: "Product Successfully Updated!",
    });
  })
  .delete(async (req, res) => {
    let { product } = req;
    const deletedProduct = await product.remove();
    res.status(200).json({
      success: true,
      message: "Product Successfully Deleted",
      deletedProduct,
    });
  });

module.exports = { router };
