// ----------Third-party libraries & modules----------
const jwt = require("jsonwebtoken");

// ----------Custom libraries & modules----------
const Configs = require("../../../configs");

// ----------Helper function to generate the access token----------
const GenerateTokens = (user) => {
  try {
    // Create the payload
    const payload = { id: user._id, userType: user.userType };

    // Generate the access token
    const accessToken = jwt.sign(payload, Configs.JWT_ACCESS_KEY, {
      expiresIn: "30d",
    });

    return { status: true, accessToken };
  } catch (err) {
    console.log(err);
    return { status: false, accessToken: null };
  }
};

// ----------Helper function to verify the access token----------
const VerifyTokens = (token) => {
  try {
    const user = jwt.verify(token, Configs.JWT_ACCESS_KEY);

    return { status: true, tokenDetails: user };
  } catch (err) {
    console.log(err);
    return { status: false, tokenDetails: null };
  }
};

module.exports = { GenerateTokens, VerifyTokens };
