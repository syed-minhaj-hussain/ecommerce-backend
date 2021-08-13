const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductSchema = new Schema({ name: String, price: Number });

const Product = mongoose.model("Product", ProductSchema);

module.exports = { Product };
