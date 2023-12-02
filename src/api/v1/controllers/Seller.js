// ----------Third-party libraries & modules----------
const bcrypt = require("bcrypt");

// ----------Custom libraries & modules----------
const { SellerModel } = require("../models");

// ----------Controller function to register a new seller----------
const RegisterSeller = async (req, res) => {
  // Request body
  const { fullName, emailAddress, password } = req.body;

  // Check if email already exist
  const seller = await SellerModel.findOne({ emailAddress }).exec();
  if (seller) {
    return res.status(400).json({
      status: false,
      error: {
        message: "Email address already exist!",
      },
    });
  }

  // Password hashing
  const hashedPassword = await bcrypt.hash(password, 8);

  // Get all sellers
  const sellers = await SellerModel.find().exec();

  // New user
  const newSeller = new SellerModel({
    sellerCode: sellers.length + 1,
    fullName,
    emailAddress,
    password: hashedPassword,
  });

  try {
    const savedSeller = await newSeller.save();
    return res.status(201).json({
      status: true,
      success: { message: "Successfully registered a new seller!" },
      seller: {
        id: savedSeller._id,
        sellerCode: savedSeller.sellerCode,
        fullName,
        emailAddress,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: false,
      error: { message: "Failed to register a new seller!" },
    });
  }
};

// ----------Controller function to get seller information by id----------
const GetSellerById = async (req, res) => {
  // Request parameters
  const { sellerId } = req.params;

  console.log(sellerId);

  try {
    // Check seller exists
    const seller = await SellerModel.findOne({
      sellerCode: parseInt(sellerId),
    }).exec();
    if (!seller) {
      return res.status(404).json({
        status: false,
        success: { message: "No seller exists for the provided id!" },
      });
    }

    return res.status(200).json({
      status: true,
      seller,
      success: { message: "Successfully fetched the seller!" },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: false,
      success: { message: "Failed to fetch the seller!" },
    });
  }
};

const EditSellerById = async (req, res) => {
  // Request parameters
  const { sellerId } = req.params;
  const { fishCode } = req.body;

  try {
    // Check if the seller exists
    const seller = await SellerModel.findOne({ sellerCode: parseInt(sellerId) });

    if (!seller) {
      return res.status(404).json({
        status: false,
        success: { message: "No seller exists for the provided id!" },
      });
    }

    if (fishCode) seller.fishCode = fishCode;

    // Save the updated seller
    const updatedSeller = await seller.save();

    return res.status(200).json({
      status: true,
      seller: updatedSeller,
      success: { message: "Successfully updated the seller!" }, // Updated success message
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: false,
      error: { message: "Failed to update the seller!" }, // Updated error message
    });
  }
};


// ----------Controller function to get all sellers----------
const GetAllSellers = async (req, res) => {
  try {
    const sellers = await SellerModel.find().select(["-password"]).exec();
    return res.status(200).json({
      status: true,
      success: { message: "Successfully fetched all sellers!" },
      sellers,
    });
  } catch (err) {
    console.log(err);
    return res.json({
      status: false,
      error: { message: "Failed to fetch all sellers!" },
    });
  }
};

// ----------Controller function to get all products based on the seller----------
const GetSellersByProduct = async (req, res) => {
  // Request parameters
  const { fishCode } = req.params;

  try {
    const sellers = await SellerModel.find({fishCode: parseInt(fishCode),}).select(["-password"]).exec();
    return res.status(200).json({
      status: true,
      success: { message: "Successfully fetched all sellers by fish!" },
      sellers,
    });
  } catch (err) {
    console.log(err);
    return res.json({
      status: false,
      error: { message: "Failed to fetch all sellers by fish!" },
    });
  }
};

// ----------Controller function to search all sellers----------
const SearchSellers = async (req, res) => {
  // Request parameters
  const { query } = req.params;

  try {
    const regexQuery = new RegExp(decodeURIComponent(query), "i");
    const sellers = await SellerModel.find({
      $or: [{ fullName: regexQuery }],
    })
      .select(["-password"])
      .exec();
    return res.status(200).json({
      status: true,
      success: { message: "Successfully fetched matched sellers!" },
      sellers,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: false,
      error: { message: "Failed to fetch matched sellers!" },
    });
  }
};

module.exports = {
  RegisterSeller,
  GetSellerById,
  EditSellerById,
  GetAllSellers,
  SearchSellers,
  GetSellersByProduct
};
