// ----------Third-party libraries & modules----------
const bcrypt = require("bcrypt");

// ----------Custom libraries & modules----------
const { ProductModel } = require("../models");

// ----------Controller function to create a new product----------
const CreateProduct = async (req, res) => {
  // Request body
  const { fishName, fishCode, sellerCode } = req.body;

  // New product
  const newProduct = new ProductModel({
    fishName,
    fishCode,
    sellerCode,
  });

  try {
    const savedFish = await newProduct.save();
    return res.status(201).json({
      status: true,
      success: { message: "Successfully created a new product!" },
      product: {
        id: savedFish._id,
        fishName,
        fishCode,
        sellerCode,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: false,
      error: { message: "Failed to created a new product!" },
    });
  }
};

// ----------Controller function to get product information by id----------
const GetProductById = async (req, res) => {
  // Request parameters
  const { productId } = req.params;

  try {
    // Check product exists
    const product = await ProductModel.findOne({ fishCode: productId }).exec();
    if (!product) {
      return res.status(404).json({
        status: false,
        success: { message: "No product exists for the provided id!" },
      });
    }

    return res.status(200).json({
      status: true,
      product,
      success: { message: "Successfully fetched the product!" },
    });
    
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: false,
      success: { message: "Failed to fetch the product!" },
    });
  }

  console.log(product);
};

const GetProductsBySeller = async (req, res) => {
  try {
    const { fishCode } = req.params;

    // Convert sellerCode to an integer
    
    console.log(fishCode);
    // Fetch all products
    const allProducts = await ProductModel.find({}).select("-password").exec();
    // console.log(allProducts);
    // Filter products by sellerCode
    const productsForSeller = allProducts.filter(products => products.sellerCode.includes(fishCode));

    return res.status(200).json({
      status: true,
      success: { message: "Successfully fetched products by seller!" },
      products: productsForSeller,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: false,
      error: { message: "Failed to fetch products by seller!" },
    });
  }
};



// ----------Controller function to get all products based on the seller----------
const GetAllProducts = async (req, res) => {
  // Request parameters
  // const { sellerCode } = req.params;

  try {
    const products = await ProductModel.find().exec();
    return res.status(200).json({
      status: true,
      success: { message: "Successfully fetched all products!" },
      products,
    });
  } catch (err) {
    console.log(err);
    return res.json({
      status: false,
      error: { message: "Failed to fetch all products!" },
    });
  }
};



// ----------Controller function to search all products based on the seller----------
const SearchProducts = async (req, res) => {
  // Request parameters
  const { query } = req.params;

  try {
    const regexQuery = new RegExp(decodeURIComponent(query), "i");
    const products = await ProductModel.find({
      $or: [{ fishName: regexQuery }],
    }).exec();
    return res.status(200).json({
      status: true,
      success: { message: "Successfully fetched matched products!" },
      products,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: false,
      error: { message: "Failed to fetch matched products!" },
    });
  }
};

module.exports = {
  CreateProduct,
  GetProductById,
  GetAllProducts,
  SearchProducts,
  GetProductsBySeller
};
