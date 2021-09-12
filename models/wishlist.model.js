const mongoose = require("mongoose");
const { Schema } = mongoose;

const wishlistSchema = new Schema(
  {
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
    prodId: String,
    // wishlist: [],
  },
  { timestamps: { createdAt: "created_at" } }
);

const Wishlist = mongoose.model("Wishlist", wishlistSchema);
module.exports = { Wishlist };
