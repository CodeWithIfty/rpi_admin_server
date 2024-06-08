const {
  student_info,
  student_infos_archive,
  user,
  users_archive,
  sequelize,
} = require("../../models");

// Controller function to archive a student by roll number
const archiveSingleStudent = async (req, res) => {
  const rollNumber = req.params.rollNumber;
  console.log("rollNumber", rollNumber);

  try {
    // Find the student by roll number
    const student = await student_info.findOne({
      where: { present_education_roll: rollNumber },
    });

    // If student not found, send a 404 response
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Find the corresponding user by rollNumber
    const userRecord = await user.findOne({
      where: { rollNumber: rollNumber },
    });

    // If user not found, send a 404 response
    if (!userRecord) {
      return res.status(404).json({ message: "User not found" });
    }

    // Start a transaction
    const transaction = await sequelize.transaction();

    try {
      // Copy student data to the archive table
      await student_infos_archive.create(
        {
          ...student.get(),
        },
        { transaction }
      );

      // Copy user data to the archive table
      await users_archive.create(
        {
          ...userRecord.get(),
        },
        { transaction }
      );

      // Delete the student from the original table
      await student.destroy({ transaction });

      // Delete the user from the original table
      await userRecord.destroy({ transaction });

      // Commit the transaction
      await transaction.commit();

      // Send a success response
      res
        .status(200)
        .json({ message: "Student and user archived successfully" });
    } catch (error) {
      // If any error occurs, rollback the transaction
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    // Handle any errors
    console.error("Error archiving student and user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  archiveSingleStudent,
};
