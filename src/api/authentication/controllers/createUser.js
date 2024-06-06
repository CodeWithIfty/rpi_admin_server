const CryptoJS = require("crypto-js");
const { admin_user } = require("../../../models");

const createUser = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    // Check if the username is already used
    const isUsernameUsed = await admin_user.findOne({
      where: {
        username: username,
      },
    });

    if (isUsernameUsed) {
      return res.status(400).json({ message: "Username already exists." });
    } else {
      // Hash the password using crypto-js module (SHA256 hashing algorithm)
      const hashedPassword = CryptoJS.SHA256(password).toString();

      // Create the user with the hashed password
      const newUser = await admin_user.create({
        username: username,
        password: hashedPassword,
        role: role,
      });

      return res.status(201).json({
        message: "User created.",
        user: { username: newUser.username, role: newUser.role },
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createUser,
};
