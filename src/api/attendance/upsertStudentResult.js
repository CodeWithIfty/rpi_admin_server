"use strict";

const { student_result: StudentResult } = require("../../models");

const upsertStudentResult = async (req, res) => {
  const { studentId, semester, result } = req.body;

  if (!studentId || !semester || !result) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const validSemesters = [
    "first_semester",
    "second_semester",
    "third_semester",
    "fourth_semester",
    "fifth_semester",
    "sixth_semester",
    "seventh_semester",
    "eighth_semester",
  ];

  if (!validSemesters.includes(semester)) {
    return res.status(400).json({ error: "Invalid semester name" });
  }

  try {
    // Find the student result by student_id
    let studentResult = await StudentResult.findOne({
      where: { student_id: studentId },
    });

    if (studentResult) {
      // Update the existing student result
      studentResult[semester] = result;
      await studentResult.save();
      res.status(200).json({
        message: "Student result updated successfully",
        studentResult,
      });
    } else {
      // Create a new student result
      studentResult = await StudentResult.create({
        student_id: studentId,
        [semester]: result,
      });
      res.status(201).json({
        message: "Student result created successfully",
        studentResult,
      });
    }
  } catch (error) {
    console.error("Error upserting student result:", error);
    res.status(500).json({ error: "Failed to upsert student result" });
  }
};

module.exports = {
  upsertStudentResult,
};
