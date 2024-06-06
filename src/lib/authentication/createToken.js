const jwt = require("jsonwebtoken");
require("dotenv").config();

const createToken = (user) => {
  try {
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });
    return token;
  } catch (error) {
    console.error("Error creating token:", error);
    throw error;
  }
};

module.exports = createToken;
