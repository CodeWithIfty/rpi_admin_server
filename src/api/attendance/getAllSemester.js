const { semester } = require("../../models");
const getAllSemester = async (req, res) => {
  try {
    const semesters = await semester.findAll();
    res.status(200).json(semesters);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Semesters" });
  }
};
module.exports = {
  getAllSemester,
};
