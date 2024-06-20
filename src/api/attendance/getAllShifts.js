const { shift } = require("../../models");
const getAllShifts = async (req, res) => {
  try {
    const shifts = await shift.findAll();
    res.status(200).json(shifts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch shifts" });
  }
};
module.exports = {
  getAllShifts,
};
