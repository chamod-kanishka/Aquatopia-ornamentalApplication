// ----------Third-party libraries & modules----------
const express = require("express");


// ----------Custom libraries & modules----------
const {
  RegisterSeller,
  GetSellerById,
  GetAllSellers,
  SearchSellers,
  GetSellersByProduct
} = require("../controllers");

const { EditSellerById } = require("../../v1/controllers/Seller");

// Your other route definitions



// Initialize the router
const router = express.Router();

// Register seller
router.post("/register", RegisterSeller);

// Get seller information by id
router.get("/one/:sellerId", GetSellerById);

// Edit seller information by id
router.patch("/one/edit/:sellerId", EditSellerById);

// Get all sellers
router.get("/all", GetAllSellers);

// Search all sellers
router.get("/all/search/:query", SearchSellers);

// Get all products
router.get("/all/:fishCode", GetSellersByProduct);

module.exports = router;
