const {
  student_result: StudentResult,
  student_info: StudentInfo,
} = require("../../models");
const axios = require("axios");

const updateStudentSemester = async (req, res) => {
  const departments = req.query.department
    ? req.query.department.split(",")
    : [];
  const shift_group = req.query.shift_group
    ? req.query.shift_group.split(",")
    : [];
  const semester = req.query.semester ? req.query.semester.split(",") : [];
  const gender = req.query.gender || "";

  let whereClause = {};

  // Add department and shift_group conditions
  if (departments.length > 0) {
    whereClause.present_education_department = departments;
  }
  if (shift_group.length > 0) {
    whereClause.present_education_shift = shift_group;
  }
  if (semester.length > 0) {
    whereClause.present_education_semester = semester;
  }
  if (gender) {
    whereClause.gender = gender;
  }

  try {
    // Fetch students with filtering
    const students = await StudentInfo.findAll({ where: whereClause });

    if (!students.length) {
      return res
        .status(404)
        .json({ error: "No students found with the given criteria." });
    }

    const results = [];

    for (const student of students) {
      const roll = student.present_education_roll;

      // Check if roll is a valid 6-digit number
      if (!/^\d{6}$/.test(roll)) {
        results.push({
          studentId: roll,
          error: "Invalid roll number",
        });
        continue;
      }

      // Search for the student result using student_id
      let studentResult = await StudentResult.findOne({
        where: { student_id: parseInt(roll) },
      });

      if (!studentResult) {
        try {
          const response = await axios.get(
            `https://apis.rpi.gov.bd/dataapi/getStudentResult.php?roll=${roll}`
          );

          if (response.data.error) {
            results.push({
              studentId: roll,
              error: response.data.error,
            });
            continue;
          } else {
            const semesterResults = response.data.semester_results;
            const result = {
              first_semester:
                semesterResults.find((r) => r.semester === 1) || {},
              second_semester:
                semesterResults.find((r) => r.semester === 2) || {},
              third_semester:
                semesterResults.find((r) => r.semester === 3) || {},
              fourth_semester:
                semesterResults.find((r) => r.semester === 4) || {},
              fifth_semester:
                semesterResults.find((r) => r.semester === 5) || {},
              sixth_semester:
                semesterResults.find((r) => r.semester === 6) || {},
              seventh_semester:
                semesterResults.find((r) => r.semester === 7) || {},
              eighth_semester:
                semesterResults.find((r) => r.semester === 8) || {},
            };
            // Save the result into the database
            studentResult = await StudentResult.create({
              student_id: parseInt(roll),
              results: result,
            });
          }
        } catch (axiosError) {
          results.push({
            studentId: roll,
            error: "Error fetching student result data",
          });
          continue;
        }
      }

      let studentResultData;
      try {
        studentResultData = JSON.parse(studentResult.results);
      } catch (e) {
        results.push({
          studentId: student.present_education_roll,
          message: "Invalid result data, unable to parse JSON",
          studentResult,
          student,
        });
        continue;
      }

      const semesterToUpdate = determineSemesterToUpdate(studentResultData);

      if (!semesterToUpdate) {
        results.push({
          studentId: student.present_education_roll,
          message: "No update needed, student remains in current semester",
          studentResult,
          student,
        });
        continue;
      }

      // Update the student's present_education_semester based on the determined semesterToUpdate
      await student.update({ present_education_semester: semesterToUpdate });

      results.push({
        studentId: student.present_education_roll,
        message: `Student's semester updated to ${semesterToUpdate}`,
        studentResult,
        student,
      });
    }

    res.status(200).json(results);
  } catch (error) {
    console.error("Error updating semester:", error);
    res
      .status(500)
      .json({ error: "Failed to update semester for some students" });
  }
};

// Helper function to determine semesterToUpdate based on studentResult
function determineSemesterToUpdate(studentResult) {
  // Define the order of semesters
  const semesters = [
    "first_semester",
    "second_semester",
    "third_semester",
    "fourth_semester",
    "fifth_semester",
    "sixth_semester",
    "seventh_semester",
    "eighth_semester",
  ];

  // Define the names of semesters
  const semesterNames = [
    "ডিপ্লোমা ১ম পর্ব",
    "ডিপ্লোমা ২য় পর্ব",
    "ডিপ্লোমা ৩য় পর্ব",
    "ডিপ্লোমা ৪র্থ পর্ব",
    "ডিপ্লোমা ৫ম পর্ব",
    "ডিপ্লোমা ৬ষ্ঠ পর্ব",
    "ডিপ্লোমা ৭ম পর্ব",
    "ডিপ্লোমা ৮ম পর্ব",
  ];

  let allSemestersEmpty = true;
  let lastPassedSemesterIndex = -1;

  for (let i = 0; i < semesters.length; i++) {
    const semester = semesters[i];
    const result = studentResult[semester];

    // Check if the result object exists and is not empty
    if (result && Object.keys(result).length > 0) {
      allSemestersEmpty = false;

      // Check if there are any failed subjects
      let reappearedSubjectsCount = 0;

      if (result.exam_results && result.exam_results.length > 0) {
        for (const exam of result.exam_results) {
          if (exam.gpa || exam.cgpa) {
            lastPassedSemesterIndex = i;
          }

          reappearedSubjectsCount +=
            exam.reffereds?.filter((r) => !r.passed && r.subject_semester === i)
              .length || 0;
        }

        if (reappearedSubjectsCount > 3) {
          return semesterNames[i]; // Return the Bengali semester name
        } else {
          // Increment the lastPassedSemesterIndex to indicate the next semester
          lastPassedSemesterIndex = i;
        }
      }
    }
  }

  if (allSemestersEmpty) {
    return null;
  } else if (lastPassedSemesterIndex === semesters.length - 1) {
    return "Appeared";
  } else {
    return semesterNames[lastPassedSemesterIndex + 1] || "Appeared";
  }
}

module.exports = {
  updateStudentSemester,
};
