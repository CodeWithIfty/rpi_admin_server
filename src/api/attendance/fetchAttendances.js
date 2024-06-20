const { attendance } = require("../../models");

const fetchAttendances = async (req, res) => {
  const { studentId, subject_code, teacher_id, date } = req.body;

  try {
    // Search for existing attendance records
    const existingAttendances = await attendance.findAll({
      where: {
        student_id: studentId,
        teacher_id: teacher_id,
        subject_code: subject_code,
        date: date,
      },
    });

    if (existingAttendances.length > 0) {
      return res.status(200).json({
        message: "Attendances fetched successfully",
        attendances: existingAttendances,
      });
    } else {
      return res.status(404).json({
        message: "No attendance records found for the given criteria",
      });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to fetch attendances" });
  }
};

module.exports = {
  fetchAttendances,
};
