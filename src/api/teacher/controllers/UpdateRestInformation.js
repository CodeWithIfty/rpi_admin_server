const EmployeeRestAndRecreation =
  require("../../../models").EmployeeRestAndRecreation;

const UpdateRestInformation = async (req, res) => {
  const id = req.params.id;
  try {
    // Find the existing address information by ID
    const existingAddress = await EmployeeRestAndRecreation.findByPk(id);

    if (!existingAddress) {
      return res.status(404).json({ message: "Address not found" });
    }

    // Update the existing address information with data from req.body
    await existingAddress.update(req.body);

    return res.status(200).json({
      message: "Address updated successfully",
      data: existingAddress,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { UpdateRestInformation };
