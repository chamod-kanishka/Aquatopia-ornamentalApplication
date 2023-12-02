// ----------Third-party libraries & modules----------
const mongoose = require("mongoose");

// ----------Product schema----------
const ProductSchema = new mongoose.Schema(
  {
    fishName: {
      type: String,
      required: true,
    },
    fishCode: {
      type: Number,
      required: true,
    },
    sellerCode: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", ProductSchema);
