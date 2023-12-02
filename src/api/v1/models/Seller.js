// ----------Third-party libraries & modules----------
const mongoose = require("mongoose");

// ----------Seller schema----------
const SellerSchema = new mongoose.Schema(
  {
    sellerCode: {
      type: Number,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    emailAddress: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    fishCode: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Seller", SellerSchema);
