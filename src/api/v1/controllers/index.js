// ----------Imports----------
const { RegisterUser, LoginUser, GetAllUsers } = require("./User");

const {
  RegisterSeller,
  GetSellerById,
  GetAllSellers,
  SearchSellers,
  GetSellersByProduct
} = require("./Seller");

const {
  CreateProduct,
  GetProductById,
  GetAllProducts,
  SearchProducts,
} = require("./Product");

// ----------Exports----------
module.exports = {
  RegisterUser,
  LoginUser,
  GetAllUsers,
  RegisterSeller,
  GetSellerById,
  GetAllSellers,
  SearchSellers,
  GetSellersByProduct,
  CreateProduct,
  GetProductById,
  GetAllProducts,
  SearchProducts,
};
