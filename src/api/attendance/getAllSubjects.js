const { subject } = require("../../models");
const getAllSubjects = async (req, res) => {
  try {
    const subjects = await subject.findAll();
    res.json(subjects);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to fetch subjects" });
  }
};

module.exports = {
  getAllSubjects,
};
