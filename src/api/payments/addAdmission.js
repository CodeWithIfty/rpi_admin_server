const { Admission } = require("../../models");
const addAdmission = async (req, res) => {
  const { name, semesters } = req.body;
  try {
    const admission = await Admission.create({ name, semesters });
    res.status(201).json(admission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = addAdmission;
