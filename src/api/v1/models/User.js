// ----------Third-party libraries & modules----------
const mongoose = require("mongoose");

// ----------User schema----------
const UserSchema = new mongoose.Schema(
  {
    userCode: {
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
