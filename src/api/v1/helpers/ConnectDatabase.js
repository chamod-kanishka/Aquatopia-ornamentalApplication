// ----------Third-party libraries and modules----------
const mongoose = require("mongoose");

// ----------Custom libraries and modules----------
const Configs = require("../../../configs");

// ----------Helper function to initialize the mongo db connection----------
const ConnectDatabase = async () => {
  return await mongoose.connect(Configs.MONGO_DB_URL);
};

module.exports = { ConnectDatabase };
