// ----------Third-party libraries & modules----------
const bcrypt = require("bcrypt");

// ----------Custom libraries & modules----------
const { UserModel } = require("../models");
const { GenerateTokens } = require("../helpers");

// ----------Controller function to register a new user----------
const RegisterUser = async (req, res) => {
  // Request body
  const { fullName, emailAddress, password } = req.body;

  // Check if email already exist
  const user = await UserModel.findOne({ emailAddress }).exec();
  if (user) {
    return res.status(400).json({
      status: false,
      error: {
        message: "Email address already exist!",
      },
    });
  }

  // Password hashing
  const hashedPassword = await bcrypt.hash(password, 8);

  // Get all users
  const users = await UserModel.find().exec();

  // New user
  const newUser = new UserModel({
    userCode: users.length + 1,
    fullName,
    emailAddress,
    password: hashedPassword,
  });

  try {
    const savedUser = await newUser.save();
    return res.status(201).json({
      status: true,
      success: { message: "Successfully registered a new user!" },
      user: {
        id: savedUser._id,
        userCode: savedUser.userCode,
        fullName,
        emailAddress,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: false,
      error: { message: "Failed to register a new user!" },
    });
  }
};

// ----------Controller function to login a user----------
const LoginUser = async (req, res) => {
  // Request body
  const { emailAddress, password } = req.body;

  try {
    // Check if email already exists
    const user = await UserModel.findOne({ emailAddress }).exec();
    if (!user) {
      return res.status(401).json({
        status: false,
        error: { message: "Wrong email address!" },
      });
    }

    // Check if password matches
    const passMatch = await bcrypt.compare(password, user.password);
    if (!passMatch) {
      return res.status(401).json({
        status: false,
        error: { message: "Wrong password!" },
      });
    }

    // Generate the access token
    const { accessToken } = GenerateTokens(user);

    return res.status(200).json({
      status: true,
      accessToken,
      success: { message: "Successfully logged in the user!" },
      user: { id: user._id, userCode: user.userCode },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: false,
      error: { message: "Failed to login the user!" },
    });
  }
};

// ----------Controller function to get all users----------
const GetAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find().select(["-password"]).exec();
    return res.status(200).json({
      status: true,
      success: { message: "Successfully fetched all users!" },
      users,
    });
  } catch (err) {
    console.log(err);
    return res.json({
      status: false,
      error: { message: "Failed to fetch all users!" },
    });
  }
};

module.exports = {
  RegisterUser,
  LoginUser,
  GetAllUsers,
};
