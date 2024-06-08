const { student_info } = require("../../models");
const updateStudent = async (req, res) => {
  const { rollNumber } = req.params;
  const studentData = req.body;
  console.log(rollNumber);

  try {
    // Check if the student exists based on rollNumber
    const existingStudent = await student_info.findOne({
      where: {
        present_education_roll: rollNumber,
      },
    });

    if (!existingStudent) {
      return res.status(404).json({ message: "Student data not found." });
    } else {
      // If student exists, update the data
      await student_info.update(studentData, {
        where: {
          present_education_roll: rollNumber,
        },
      });

      return res
        .status(200)
        .json({ message: "Student data updated successfully." });
      // If student doesn't exist, create a new record
    }
  } catch (error) {
    return res.status(500).json({ message: error.message }); // Handle other errors
  }
};

module.exports = {
  updateStudent,
};
