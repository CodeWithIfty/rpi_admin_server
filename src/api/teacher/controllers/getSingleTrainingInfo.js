const EmployeeTraining = require("../../../models").EmployeeTraining;

const getSingleTrainingInfo = async (req, res) => {
  const id = req.params.id;

  try {
    // Find all address information with the provided username
    const address = await EmployeeTraining.findOne({
      where: {
        id: id,
      },
    });

    if (address) {
      return res.status(200).json({ data: address });
    } else {
      return res.status(404).json({ message: "Address information not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getSingleTrainingInfo };
