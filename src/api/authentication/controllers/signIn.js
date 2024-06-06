const { admin_user } = require("../../../models");
const CryptoJS = require("crypto-js");
const createToken = require("../../../lib/authentication/createToken");

const signIn = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Check if the user exists with the provided username
    const user = await admin_user.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify the password
    const passwordMatch = verifyPassword(password, user.password);

    if (passwordMatch) {
      const userData = {
        username: user.username,
        role: user.role,
        // Any other user data you want to include
      };

      const token = createToken(userData);

      // Set expiration time for the cookie (in milliseconds)
      const expiration = 24 * 60 * 60 * 1000; // 1 day (adjust as needed)

      res
        .status(200)
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
          expires: new Date(Date.now() + expiration),
        })
        .send({ success: true, role: user.role });
    } else {
      // Incorrect password
      return res.status(401).json({ message: "Incorrect password" });
    }
  } catch (error) {
    console.error("Error signing in:", error);
    return res.status(500).json({ message: "Error signing in" });
  }
};

// Function to verify the password
const verifyPassword = (inputPassword, storedPassword) => {
  // Hash the input password
  const hashedInputPassword = CryptoJS.SHA256(inputPassword).toString();
  // Compare the hashed input password with the stored password
  return hashedInputPassword === storedPassword;
};

module.exports = {
  signIn,
};
