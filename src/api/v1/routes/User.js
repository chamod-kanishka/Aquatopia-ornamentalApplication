// ----------Third-party libraries & modules----------
const express = require("express");

// ----------Custom libraries & modules----------
const { RegisterUser, LoginUser, GetAllUsers } = require("../controllers");

// Initialize the router
const router = express.Router();

// Register user
router.post("/register", RegisterUser);

// Login user
router.post("/login", LoginUser);

// Get all users
router.get("/all", GetAllUsers);

module.exports = router;
