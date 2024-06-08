const { Op } = require("sequelize");
const { employe_info } = require("../../models");

const getAllEmployee = async (req, res) => {
  try {
    // Get page and limit from query parameters, default to page 1 and limit 10
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const searchText = req.query.searchText
      ? req.query.searchText.toString()
      : null;
    const designations = req.query.designation
      ? req.query.designation.split(",")
      : [];
    const employee_types = req.query.employee_type
      ? req.query.employee_type.split(",")
      : [];
    const section_departments = req.query.section_department
      ? req.query.section_department.split(",")
      : [];
    // const gender = req.query.gender || "";

    // Calculate offset for pagination
    const offset = (page - 1) * limit;

    let whereClause = {};

    // Add searchText conditions
    if (searchText) {
      whereClause[Op.or] = [
        { mobile_number: { [Op.like]: `%${searchText}%` } },
        { full_name_english: { [Op.like]: `%${searchText}%` } },
        { username: { [Op.like]: `%${searchText}%` } },
        { full_name_bangla: { [Op.like]: `%${searchText}%` } },
        { hrmis_number: { [Op.like]: `%${searchText}%` } },
        { own_district: { [Op.like]: `%${searchText}%` } },
      ];
    }

    // Add department and shift_group conditions
    if (designations.length > 0) {
      whereClause.designation = designations;
    }
    if (employee_types.length > 0) {
      whereClause.employee_type = employee_types;
    }
    if (section_departments.length > 0) {
      whereClause.section_department = section_departments;
    }
    // if (gender) {
    //   whereClause.gender = gender;
    // }

    // Fetch students with pagination and filtering
    const { count, rows: employees } = await employe_info.findAndCountAll({
      where: whereClause,
      limit,
      offset,
    });
    console.log(count);

    // Calculate total pages
    const totalPages = Math.ceil(count / limit);

    if (employees.length > 0) {
      return res.status(200).json({
        employees,
        totalPages,
        currentPage: page,
        totalEmployee: count,
      });
    } else {
      // No students found with the given searchText
      return res.status(404).json({ message: "Employee not found" });
    }
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "Error fetching students" });
  }
};

module.exports = {
  getAllEmployee,
};
