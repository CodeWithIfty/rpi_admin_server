const { Admission } = require("../../models");

const deleteAdmission = async (req, res) => {
  try {
    const { id } = req.params; // Get id from request parameters

    // Check if the admission with the given id exists
    const admission = await Admission.findByPk(id);
    if (!admission) {
      return res.status(404).json({ message: "Admission not found" });
    }

    // Delete the admission
    await Admission.destroy({ where: { id } });

    return res.status(200).json({ message: "Admission deleted successfully" });
  } catch (error) {
    console.error("Error deleting admission:", error);
    return res.status(500).json({ message: "Error deleting admission" });
  }
};

module.exports = {
  deleteAdmission,
};
