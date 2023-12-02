// ----------Third-party libraries and modules----------
const express = require("express");
const cors = require("cors");
require("dotenv/config");

// ----------Custom libraries and modules----------
const Configs = require("./configs");
const { ConnectDatabase } = require("./api/v1/helpers");
const { UserRoutes, SellerRoutes, ProductRoutes } = require("./api/v1/routes");

// ----------Global instances----------
const app = express();
const PORT = Configs.DEV_PORT || 3308;

// ----------Common middleware----------
// Use cors
app.use(cors());

// Accept json
app.use(express.json());

// Allow access uploads folder
app.use("/uploads", express.static("./uploads/"));

// ----------Main routes----------
// Base route
app.get("/", (req, res) => {
  res.status(200).json({ success: { message: `Welcome to the server!` } });
});

// User route
app.use("/api/users", UserRoutes);

// Seller route
app.use("/api/sellers", SellerRoutes);

// Product route
app.use("/api/products", ProductRoutes);

// Error route
app.use((req, res) => {
  res.status(404).json({ error: { message: `Not found!` } });
});

// ----------Initialize the connection----------
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);

  // Initialize the db connection
  ConnectDatabase()
    .then(() => console.log("Connected to DB!"))
    .catch((err) => console.log(err));
});
