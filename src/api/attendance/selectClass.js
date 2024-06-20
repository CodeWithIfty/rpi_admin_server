const {
  student_info,
  attendance_teacher: TeacherModel,
  attendance,
} = require("../../models");

const selectClass = async (req, res) => {
  const {
    department,
    shift_and_group,
    subject_code,
    semester,
    teacher_email,
    date,
    time,
    room_no,
  } = req.body;

  try {
    // Find the teacher by email
    const teacher = await TeacherModel.findOne({
      where: { email: teacher_email },
    });

    if (!teacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }

    // Query students based on provided criteria
    const students = await student_info.findAll({
      where: {
        present_education_semester: semester,
        present_education_department: department,
        present_education_shift: shift_and_group,
      },
    });

    // For each student, find the attendance record
    const studentsWithAttendance = await Promise.all(
      students.map(async (student) => {
        const studentAttendance = await attendance.findOne({
          where: {
            student_id: student.present_education_roll,
            teacher_id: teacher_email, // Assuming teacher_id is the id field in TeacherModel
            subject_code: subject_code,
            date: date,
            room_no,
            semester,
            shift_and_group,
          },
        });

        return {
          ...student.dataValues,
          attendance: studentAttendance
            ? studentAttendance.status
            : "Not Recorded",
        };
      })
    );

    // Return the response with students and other relevant data
    res.json({
      message: "Students and attendance fetched successfully",
      students: studentsWithAttendance,
      total_students: students.length,
      subject_code: subject_code,
      teacher: teacher,
      date,
      time,
      room_no,
      semester,
      shift_and_group,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to fetch students and attendance" });
  }
};

module.exports = {
  selectClass,
};
