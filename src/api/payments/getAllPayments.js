const { Op } = require("sequelize");
const { StudentPayment, Admission, student_info } = require("../../models");

const getAllPayments = async (req, res) => {
  try {
    // Get page and limit from query parameters, default to page 1 and limit 10
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const searchText = req.query.searchText
      ? req.query.searchText.toString()
      : null;
    const paymentStatuses = req.query.status ? req.query.status.split(",") : [];
    const paymentMethods = req.query.payment_method
      ? req.query.payment_method.split(",")
      : [];
    const presentEducationDepartments = req.query.departments
      ? req.query.departments.split(",")
      : [];
    const presentEducationSemesters = req.query.semesters
      ? req.query.semesters.split(",")
      : [];
    const admissions = req.query.admissions
      ? req.query.admissions.split(",")
      : [];

    // Calculate offset for pagination
    const offset = (page - 1) * limit;

    // Build where clause for StudentPayment
    let paymentWhereClause = {};

    // Add searchText conditions to paymentWhereClause
    if (searchText) {
      paymentWhereClause[Op.or] = [
        { studentId: { [Op.like]: `%${searchText}%` } },
        { transactionId: { [Op.like]: `%${searchText}%` } },
        { amount: { [Op.like]: `%${searchText}%` } },
        { payment_method: { [Op.like]: `%${searchText}%` } },
      ];
    }

    // Add status and payment method conditions to paymentWhereClause
    if (paymentStatuses.length > 0) {
      paymentWhereClause.status = {
        [Op.in]: paymentStatuses.map((status) => status === "Paid"),
      };
    }
    if (paymentMethods.length > 0) {
      paymentWhereClause.payment_method = { [Op.in]: paymentMethods };
    }
    if (admissions.length > 0) {
      paymentWhereClause.admissionId = { [Op.in]: admissions };
    }

    // Build where clause for student_info
    let studentWhereClause = {};

    // Add present_education_department condition to studentWhereClause
    if (presentEducationDepartments.length > 0) {
      studentWhereClause.present_education_department = {
        [Op.in]: presentEducationDepartments,
      };
    }
    if (presentEducationSemesters.length > 0) {
      studentWhereClause.present_education_semester = {
        [Op.in]: presentEducationSemesters,
      };
    }

    // Fetch payments with associated admission and student data, pagination and filtering
    const { count, rows: payments } = await StudentPayment.findAndCountAll({
      where: paymentWhereClause,
      include: [
        {
          model: Admission,
          attributes: ["name"], // Include specific fields from Admission
        },
        {
          model: student_info,
          attributes: [
            "student_name_english",
            "student_mobile_number",
            "student_img",
            "present_education_semester",
            "present_education_department",
          ], // Include specific fields from student_info
          required: true, // Ensures only payments with associated student_info are returned
          where: studentWhereClause,
        },
      ],
      limit,
      offset,
    });

    // Calculate total pages
    const totalPages = Math.ceil(count / limit);

    if (payments.length > 0) {
      return res.status(200).json({
        payments,
        totalPages,
        currentPage: page,
        totalPayments: count,
      });
    } else {
      // No payments found with the given filters
      return res.status(404).json({ message: "No payments found" });
    }
  } catch (error) {
    console.error("Error fetching payments:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = getAllPayments;
