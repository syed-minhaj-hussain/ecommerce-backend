const express = require("express");
const mongoose = require("mongoose");
const { Product } = require("../models/product.model");
const router = express.Router();

router
  .route("/")
  .get(async (req, res) => {
    try {
      const products = await Product.find({});
      console.log(products);
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
      console.log(newProduct);
      const addProduct = new Product(newProduct);
      const productAdded = await addProduct.save();
      res.status(200).json({ productAdded, success: true });
    } catch (err) {
      res
        .status(400)
        .json({ success: false, message: "Something Went Wrong!" });
    }
  });

module.exports = { router };
