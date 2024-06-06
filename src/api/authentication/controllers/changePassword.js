const CryptoJS = require("crypto-js");
const user = require("../../../models").teachers;
require("dotenv").config();

const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const phone_number = req.user.phone_number; // Assuming you have a way to get the logged-in user ID
  console.log(phone_number);

  try {
    // Fetch the user by ID
    const existingUser = await user.findOne({ where: { phone_number } });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if the current password matches the stored hashed password
    const currentHashedPassword = existingUser.password;
    const hashedCurrentPassword = CryptoJS.SHA256(currentPassword).toString();

    if (hashedCurrentPassword !== currentHashedPassword) {
      return res.status(404).json({ message: "Incorrect current password." });
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
