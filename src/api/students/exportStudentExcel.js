const { Op } = require("sequelize");
const { student_info } = require("../../models");
const ExcelJS = require("exceljs");

const exportStudentExcel = async (req, res) => {
  try {
    const searchText = req.query.searchText
      ? req.query.searchText.toString()
      : null;
    const departments = req.query.department
      ? req.query.department.split(",")
      : [];
    const shift_group = req.query.shift_group
      ? req.query.shift_group.split(",")
      : [];
    const semester = req.query.semester ? req.query.semester.split(",") : [];
    const gender = req.query.gender || "";

    let whereClause = {};

    // Add searchText conditions
    if (searchText) {
      whereClause[Op.or] = [
        { present_education_roll: { [Op.like]: `%${searchText}%` } },
        { student_mobile_number: { [Op.like]: `%${searchText}%` } },
        { student_name_english: { [Op.like]: `%${searchText}%` } },
        { account_number: { [Op.like]: `%${searchText}%` } },
        { permanent_district: { [Op.like]: `%${searchText}%` } },
      ];
    }

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

    // Fetch students with filtering
    const students = await student_info.findAll({
      where: whereClause,
    });

    // Check if students are found
    if (students.length > 0) {
      // Generate Excel file
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Students");

      // Add columns to worksheet
      worksheet.columns = [
        { header: "ID", key: "id", width: 10 },
        {
          header: "Student Name (Bangla)",
          key: "student_name_bangla",
          width: 30,
        },
        {
          header: "Father's Name (Bangla)",
          key: "fathers_name_bangla",
          width: 30,
        },
        {
          header: "Mother's Name (Bangla)",
          key: "mothers_name_bangla",
          width: 30,
        },
        {
          header: "Student Name (English)",
          key: "student_name_english",
          width: 30,
        },
        {
          header: "Father's Name (English)",
          key: "fathers_name_english",
          width: 30,
        },
        {
          header: "Mother's Name (English)",
          key: "mothers_name_english",
          width: 30,
        },
        {
          header: "Student Birth Certificate Number",
          key: "student_birth_certificate_number",
          width: 30,
        },
        { header: "Father's NID", key: "fathers_nid", width: 30 },
        { header: "Mother's NID", key: "mothers_nid", width: 30 },
        { header: "Date of Birth", key: "date_of_birth", width: 15 },
        {
          header: "Father's Date of Birth",
          key: "fathers_date_of_birth",
          width: 15,
        },
        {
          header: "Mother's Date of Birth",
          key: "mothers_date_of_birth",
          width: 15,
        },
        { header: "Gender", key: "gender", width: 10 },
        { header: "Religion", key: "student_religion", width: 15 },
        { header: "Marital Status", key: "marital_status", width: 15 },
        {
          header: "Student Mobile Number",
          key: "student_mobile_number",
          width: 15,
        },
        { header: "Student Email", key: "student_email", width: 25 },
        {
          header: "Father's Mobile Number",
          key: "fathers_mobile_number",
          width: 15,
        },
        {
          header: "Mother's Mobile Number",
          key: "mothers_mobile_number",
          width: 15,
        },
        { header: "Permanent Division", key: "permanent_division", width: 15 },
        { header: "Permanent District", key: "permanent_district", width: 15 },
        { header: "Permanent Upazila", key: "permanent_upazila", width: 15 },
        { header: "Permanent Union", key: "permanent_union", width: 15 },
        {
          header: "Permanent Post Code",
          key: "permanent_post_code",
          width: 15,
        },
        { header: "Permanent Village", key: "permanent_village", width: 15 },
        { header: "Present Division", key: "present_division", width: 15 },
        { header: "Present District", key: "present_district", width: 15 },
        { header: "Present Upazila", key: "present_upazila", width: 15 },
        { header: "Present Union", key: "present_union", width: 15 },
        { header: "Present Post Code", key: "present_post_code", width: 15 },
        { header: "Present Village", key: "present_village", width: 15 },
        {
          header: "Past Education Division",
          key: "past_education_division",
          width: 15,
        },
        {
          header: "Past Education District",
          key: "past_education_district",
          width: 15,
        },
        {
          header: "Past Education Upazila",
          key: "past_education_upazila",
          width: 15,
        },
        {
          header: "Past Education Year",
          key: "past_education_year",
          width: 10,
        },
        {
          header: "Past Education Exam Name",
          key: "past_education_exam_name",
          width: 20,
        },
        {
          header: "Past Education Roll Number",
          key: "past_education_roll_number",
          width: 20,
        },
        {
          header: "Past Education Registration Number",
          key: "past_education_registration_number",
          width: 20,
        },
        {
          header: "Past Education School Name",
          key: "past_education_school_name",
          width: 30,
        },
        {
          header: "Past Education Result",
          key: "past_education_result",
          width: 15,
        },
        {
          header: "Past Education Result Without Fourth Subject",
          key: "past_education_result_without_fourth_subject",
          width: 30,
        },
        {
          header: "Past Education Board",
          key: "past_education_board",
          width: 20,
        },
        {
          header: "Past Education Group",
          key: "past_education_group",
          width: 20,
        },
        {
          header: "Present Education Division",
          key: "present_education_division",
          width: 15,
        },
        {
          header: "Present Education District",
          key: "present_education_district",
          width: 15,
        },
        {
          header: "Present Education Semester",
          key: "present_education_semester",
          width: 15,
        },
        {
          header: "Present Education Upazila",
          key: "present_education_upazila",
          width: 15,
        },
        {
          header: "Present Education Season",
          key: "present_education_season",
          width: 15,
        },
        {
          header: "Present Education Institute Name",
          key: "present_education_institute_name",
          width: 30,
        },
        {
          header: "Present Education Department",
          key: "present_education_department",
          width: 20,
        },
        {
          header: "Present Education Shift",
          key: "present_education_shift",
          width: 15,
        },
        {
          header: "Present Education Roll",
          key: "present_education_roll",
          width: 15,
        },
        {
          header: "Present Education Registration Number",
          key: "present_education_registration_number",
          width: 20,
        },
        { header: "Guardian Relation", key: "guardian_relation", width: 15 },
        {
          header: "Guardian Name (Bangla)",
          key: "guardian_name_bangla",
          width: 30,
        },
        {
          header: "Guardian Name (English)",
          key: "guardian_name_english",
          width: 30,
        },
        { header: "Guardian NID", key: "guardian_nid", width: 30 },
        {
          header: "Guardian Date of Birth",
          key: "guardian_date_of_birth",
          width: 15,
        },
        {
          header: "Guardian Mobile Number",
          key: "guardian_mobile_number",
          width: 15,
        },
        { header: "Mobile Banking", key: "mobile_banking", width: 20 },
        {
          header: "Account Holder Name (English)",
          key: "account_holder_name_english",
          width: 30,
        },
        { header: "Account Holder NID", key: "account_holder_nid", width: 30 },
        { header: "Account Number", key: "account_number", width: 20 },
        {
          header: "Who Bear Education Coast",
          key: "who_bear_education_coast",
          width: 30,
        },
        { header: "Is Student Ethnic", key: "is_student_ethnic", width: 10 },
        {
          header: "Is Student Family Freedom Fighter",
          key: "is_student_family_freedom_fighter",
          width: 10,
        },
        {
          header: "Is Student Has Another Scholarship",
          key: "is_student_has_another_scholarship",
          width: 10,
        },
        {
          header: "Is Student Physically Disabled",
          key: "is_student_physically_disabled",
          width: 10,
        },
        { header: "Student Image", key: "student_img", width: 30 },
        {
          header: "Student Blood Group",
          key: "student_blood_group",
          width: 10,
        },
      ];

      // Add rows to worksheet
      students.forEach((student) => {
        worksheet.addRow(student.toJSON());
      });

      // Write Excel file to buffer
      const buffer = await workbook.xlsx.writeBuffer();

      // Set headers and send buffer as response
      res.setHeader(
        "Content-Disposition",
        'attachment; filename="students.xlsx"'
      );
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      return res.status(200).send(buffer);
    } else {
      // No students found with the given searchText
      return res.status(404).json({ message: "Students not found" });
    }
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "Error fetching students" });
  }
};

module.exports = {
  exportStudentExcel,
};
