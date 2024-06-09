const { Op } = require("sequelize");
const { StudentPayment, Admission, student_info } = require("../../models");
const ExcelJS = require("exceljs");

const exportPaymentExcel = async (req, res) => {
  try {
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
    const payments = await StudentPayment.findAll({
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
    });

    // Check if payments are found
    if (payments.length > 0) {
      // Generate Excel file
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Payments");

      // Add columns to worksheet
      worksheet.columns = [
        { header: "ID", key: "id", width: 10 },
        { header: "Student ID", key: "studentId", width: 15 },
        { header: "Admission Name", key: "admissionName", width: 30 },
        { header: "Amount", key: "amount", width: 15 },
        { header: "Status", key: "status", width: 15 },
        { header: "Transaction ID", key: "transactionId", width: 30 },
        { header: "Start Date", key: "start_date", width: 15 },
        { header: "End Date", key: "end_date", width: 15 },
        { header: "Payment Method", key: "payment_method", width: 20 },
        {
          header: "Student Name (English)",
          key: "student_name_english",
          width: 30,
        },
        {
          header: "Student Mobile Number",
          key: "student_mobile_number",
          width: 15,
        },
        { header: "Student Image", key: "student_img", width: 30 },
        {
          header: "Present Education Semester",
          key: "present_education_semester",
          width: 20,
        },
        {
          header: "Present Education Department",
          key: "present_education_department",
          width: 20,
        },
      ];

      // Add rows to worksheet
      payments.forEach((payment) => {
        worksheet.addRow({
          id: payment.id,
          studentId: payment.studentId,
          admissionName: payment.Admission ? payment.Admission.name : "",
          amount: payment.amount,
          status: payment.status ? "Paid" : "Unpaid",
          transactionId: payment.transactionId,
          start_date: payment.start_date,
          end_date: payment.end_date,
          payment_method: payment.payment_method,
          student_name_english: payment.student_info.student_name_english,
          student_mobile_number: payment.student_info.student_mobile_number,
          student_img: payment.student_info.student_img,
          present_education_semester:
            payment.student_info.present_education_semester,
          present_education_department:
            payment.student_info.present_education_department,
        });
      });

      // Write Excel file to buffer
      const buffer = await workbook.xlsx.writeBuffer();

      // Set headers and send buffer as response
      res.setHeader(
        "Content-Disposition",
        'attachment; filename="payments.xlsx"'
      );
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      return res.status(200).send(buffer);
    } else {
      // No payments found with the given filters
      return res.status(404).json({ message: "Payments not found" });
    }
  } catch (error) {
    console.error("Error exporting payments to Excel:", error);
    res.status(500).json({ message: "Error exporting payments to Excel" });
  }
};

module.exports = {
  exportPaymentExcel,
};
