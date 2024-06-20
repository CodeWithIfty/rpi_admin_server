const { subject } = require("../../models");

const getSubjects = async (req, res) => {
  console.log(req.body);
  const { department, semester } = req.body;
  console.log(
    "Fetching subjects for department and semester:",
    department,
    semester
  );
  try {
    const subjects = await subject.findAll({
      where: {
        department,
        semester,
      },
    });
    res.json(subjects);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to fetch subjects" });
  }
};

module.exports = {
  getSubjects,
};
