const mongoose = require("mongoose");
const { Schema } = mongoose;

// create product schema
const productSchema = new Schema({
  name: {
    type: String,
    required: [true, "field required"],
    minlength: 3,
    maxlength: 50,
  },
  price: { type: Number, required: true, min: 1000, max: 1000000 },
  stock: Number,
  status: { type: Boolean, default: true },
});

// create model schema for product
const Product = model("Product", productSchema);

module.exports = Product;
