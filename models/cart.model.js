const mongoose = require("mongoose");
const { Schema } = mongoose;

const CartSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    cart: [],
  },
  { timestamps: { createdAt: "created_at" } }
);

const Cart = mongoose.model("Cart", CartSchema);
module.exports = { Cart };
