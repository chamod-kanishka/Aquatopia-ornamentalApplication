// ----------Third-party libraries & modules----------
const express = require("express");

// ----------Custom libraries & modules----------
const {
  CreateProduct,
  GetProductById,
  GetAllProducts,
  SearchProducts,
  
} = require("../controllers");

const { GetProductsBySeller } = require("../../v1/controllers/Product");

// Initialize the router
const router = express.Router();

// Create a product
router.post("/create", CreateProduct);

// Get product information by id
router.get("/one/:productId", GetProductById);

// Get all products
router.get("/all", GetAllProducts);

// Get all products
// router.get("/all/:fishCode", GetAllProducts);

// Search all products
router.get("/all/search/:query", SearchProducts);

// Get all products
router.get("/all/:fishCode", GetProductsBySeller);

module.exports = router;
