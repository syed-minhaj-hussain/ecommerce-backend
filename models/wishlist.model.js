const mongoose = require("mongoose");
const { Schema } = mongoose;

const wishlistSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: String,
  description: String,
  intro: String,
  additionalInfo: {},
  images: {},
  summary: [],
  price: Number,
  category: String,
  inStock: Boolean,
  fastDelivery: Boolean,
  quantity: Number,
});

const Cart = mongoose.model("Cart", wishlistSchema);
module.exports = { Cart };
