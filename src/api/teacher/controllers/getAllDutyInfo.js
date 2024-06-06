const EmployeeActingDuty = require("../../../models").EmployeeActingDuty;

const getAllDutyInfo = async (req, res) => {
  const username = req.user.username;

  try {
    // Find all address information with the provided username
    const addresses = await EmployeeActingDuty.findAll({
      where: {
        username: username,
      },
    });

    if (addresses.length > 0) {
      return res.status(200).json({ data: addresses });
    } else {
      return res.status(404).json({ message: "Address information not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getAllDutyInfo };
