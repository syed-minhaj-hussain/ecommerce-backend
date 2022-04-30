const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: "Name cannot be empty! ",
      trim: true,
    },
    price: {
      type: Number,
      required: "Price cannot be empty / null",
    },
    quantity: {
      type: Number,
      default: 1,
    },
    category: {
      type: String,
      required: "Category cannot be empty / null",
    },
    images: {
      type: Object,
      required: "Please Add Images",
    },
    intro: {
      type: String,
      trim: true,
      required: "Give Some Idea About Product!",
      minlength: 25,
    },
    description: {
      type: String,
      required: "Description Can't Be Empty!",
      trim: true,
      minlength: 35,
    },
    summary: {
      type: Array,
      required: "Summary Must Required!",
    },
    additionalInfo: {
      type: Object,
      required: "Please Provide Additional Information of the Product",
    },
    inStock: {
      type: Boolean,
      required: true,
    },
    fastDelivery: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: { createdAt: "created_at" } }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = { Product };
