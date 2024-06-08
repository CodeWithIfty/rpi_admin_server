const CryptoJS = require("crypto-js");
const { user } = require("../../models");
require("dotenv").config();

const changePassword = async (req, res) => {
  const { newPassword } = req.body;
  const { rollNumber } = req.params; // Assuming you have a way to get the logged-in user ID

  try {
    // Fetch the user by ID
    const existingUser = await user.findOne({ where: { rollNumber } });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found." });
    }

    // Hash the new password
    const hashedNewPassword = CryptoJS.SHA256(newPassword).toString();

    // Update the user's password with the new hashed password
    await existingUser.update({ password: hashedNewPassword });

    return res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  changePassword,
};
