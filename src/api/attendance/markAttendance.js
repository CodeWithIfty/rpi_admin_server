const { attendance } = require("../../models");

const markAttendance = async (req, res) => {
  const {
    studentId,
    subject_code,
    status,
    teacher_id,
    date,
    time,
    room_no,
    semester,
    shift_and_group,
  } = req.body;

  try {
    // Search for existing attendance record
    const existingAttendance = await attendance.findOne({
      where: {
        student_id: studentId,
        teacher_id: teacher_id,
        subject_code: subject_code,
        date: date,
        room_no,
        semester,
        shift_and_group,
      },
    });

    if (existingAttendance) {
      // Update the existing attendance record
      existingAttendance.status = status;
      await existingAttendance.save();

      return res.status(200).json({
        message: "Attendance updated successfully",
        attendance: existingAttendance,
      });
    } else {
      // Create a new attendance record
      const newAttendance = await attendance.create({
        student_id: studentId,
        teacher_id,
        subject_code: subject_code,
        status: status,
        date: date, // Use provided date
        time: time, // Use provided time
        room_no,
        semester,
        shift_and_group,
      });

      return res.status(201).json({
        message: "Attendance recorded successfully",
        attendance: newAttendance,
      });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to record attendance" });
  }
};

module.exports = {
  markAttendance,
};
