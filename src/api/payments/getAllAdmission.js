const { Op } = require("sequelize");
const { Admission } = require("../../models");

const getAllAdmission = async (req, res) => {
  try {
    // Get page and limit from query parameters, default to page 1 and limit 10
    const all = req.query.all === "true";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const searchText = req.query.searchText
      ? req.query.searchText.toString()
      : null;
    const semester = req.query.semester ? req.query.semester.split(",") : [];

    const offset = (page - 1) * limit;

    let whereClause = {};

    // Add searchText conditions
    if (searchText) {
      whereClause[Op.or] = [{ name: { [Op.like]: `%${searchText}%` } }];
    }

    if (semester.length > 0) {
      whereClause.present_education_semester = semester;
    }
    if (all) {
      // Fetch students with pagination and filtering
      const students = await Admission.findAll();
      return res.status(200).json({ students });
    }
    // Fetch students with pagination and filtering
    const { count, rows: students } = await Admission.findAndCountAll({
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
  getAllAdmission,
};
