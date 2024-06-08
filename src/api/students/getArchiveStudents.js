const { Op } = require("sequelize");
const { student_infos_archive } = require("../../models");

const getArchiveStudents = async (req, res) => {
  try {
    // Get page and limit from query parameters, default to page 1 and limit 10
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
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

    // Calculate offset for pagination
    const offset = (page - 1) * limit;

    let whereClause = {};

    // Add searchText conditions
    if (searchText) {
      whereClause[Op.or] = [
        { present_education_roll: { [Op.like]: `%${searchText}%` } },
        { student_mobile_number: { [Op.like]: `%${searchText}%` } },
        { student_name_english: { [Op.like]: `%${searchText}%` } },
        { account_number: { [Op.like]: `%${searchText}%` } },
        { permanent_district: { [Op.like]: `%${searchText}%` } },
        // { present_district: { [Op.like]: `%${searchText}%` } },
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

    // Fetch students with pagination and filtering
    const { count, rows: students } =
      await student_infos_archive.findAndCountAll({
        where: whereClause,
        limit,
        offset,
      });

    // Calculate total pages
    const totalPages = Math.ceil(count / limit);

    if (students.length > 0) {
      return res.status(200).json({ students, totalPages, currentPage: page });
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
  getArchiveStudents,
};
