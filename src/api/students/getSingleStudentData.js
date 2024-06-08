const { student_info } = require("../../models");

const getSingleStudentData = async (req, res) => {
  const { rollNumber } = req.params;
  try {
    const student = await student_info.findOne({
      where: { present_education_roll: rollNumber },
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ data: student });
  } catch (error) {
    console.error("Error retrieving student data:", error);
    res.status(500).json({ message: "Error retrieving student data" });
  }
};

module.exports = getSingleStudentData;
