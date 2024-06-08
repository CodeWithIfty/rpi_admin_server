const {
  student_info,
  student_infos_archive,
  user,
  users_archive,
  sequelize,
} = require("../../models");

// Controller function to restore a student by roll number
const restoreArchiveSingleStudent = async (req, res) => {
  const rollNumber = req.params.rollNumber;

  try {
    // Find the archived student by roll number
    const archivedStudent = await student_infos_archive.findOne({
      where: { present_education_roll: rollNumber },
    });

    // If archived student not found, send a 404 response
    if (!archivedStudent) {
      return res.status(404).json({ message: "Archived student not found" });
    }

    const archivedUser = await users_archive.findOne({
      where: { rollNumber: rollNumber },
    });

    // If archived user not found, send a 404 response
    if (!archivedUser) {
      return res.status(404).json({ message: "Archived user not found" });
    }

    // Start a transaction
    const transaction = await sequelize.transaction();

    try {
      // Copy archived student data back to the original table
      await student_info.create(
        {
          ...archivedStudent.get(),
        },
        { transaction }
      );

      // Copy archived user data back to the original table
      await user.create(
        {
          ...archivedUser.get(),
        },
        { transaction }
      );

      // Delete the archived student from the archive table
      await archivedStudent.destroy({ transaction });

      // Delete the archived user from the archive table
      await archivedUser.destroy({ transaction });

      // Commit the transaction
      await transaction.commit();

      // Send a success response
      res
        .status(200)
        .json({ message: "Student and user restored successfully" });
    } catch (error) {
      // If any error occurs, rollback the transaction
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    // Handle any errors
    console.error("Error restoring student and user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  restoreArchiveSingleStudent,
};
