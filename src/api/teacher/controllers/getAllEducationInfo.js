const EmployeeEducation = require("../../../models").EmployeeEducation;

const getAllEducationInfo = async (req, res) => {
  const username = req.user.username;

  try {
    // Find all address information with the provided username
    const addresses = await EmployeeEducation.findAll({
      where: {
        username: username,
      },
    });

    if (addresses.length > 0) {
      return res.status(200).json({ data: addresses });
    } else {
      return res
        .status(404)
        .json({ message: "Education information not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getAllEducationInfo };
