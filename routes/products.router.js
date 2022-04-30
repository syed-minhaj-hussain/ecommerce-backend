const express = require("express");
const router = express.Router();

const { authVerify } = require("../middlewares/authVerify");
const { findProductById } = require("../middlewares/findProductById");
const {
  getProductsController,
  postProductsController,
  getSpecificProductController,
  updateSpecificProductController,
  deleteSpecificProductController,
} = require("../controllers/products.controllers");

router
  .route("/")
  .get(getProductsController)
  .post(authVerify, postProductsController);

router.param("productId", findProductById);
router
  .route("/:productId")
  .get(getSpecificProductController)
  .post(authVerify, updateSpecificProductController)
  .delete(authVerify, deleteSpecificProductController);

module.exports = { router };
