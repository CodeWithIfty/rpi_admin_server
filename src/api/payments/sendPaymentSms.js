const { Op } = require("sequelize");
const { StudentPayment, Admission, student_info } = require("../../models");
const axios = require("axios");

const sendPaymentSms = async (req, res) => {
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
    console.log("payments____________", payments);

    // Check if payments are found
    if (payments.length > 0) {
      // Extract mobile numbers from payments
      const phoneNumbers = payments.map(
        (payment) => payment.student_info.student_mobile_number
      );
      console.log("phoneNumbers", phoneNumbers);
      // Send SMS to all student mobile numbers
      await sendSMS(
        phoneNumbers,
        "Your payment details are available. Please check your account."
      );

      return res
        .status(200)
        .json({ message: "SMS sent to all students successfully" });
    } else {
      // No payments found with the given filters
      return res.status(404).json({ message: "Payments not found" });
    }
  } catch (error) {
    console.error("Error exporting payments to Excel:", error);
    res.status(500).json({ message: "Error exporting payments to Excel" });
  }
};

const generateRandomString = (length) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};
const sendSMS = async (phoneNumbers, message) => {
  console.log(phoneNumbers);
  try {
    const clienttransid = generateRandomString(16);
    const smsData = {
      username: "lislam1234",
      password: "Rajpoly23105$",
      apicode: "5",
      msisdn: phoneNumbers,
      countrycode: "880",
      cli: "AcademicRPI",
      messagetype: "1",
      message: message,
      clienttransid: clienttransid, // You may set clienttransid here
      bill_msisdn: "8801969908410",
      tran_type: "T",
      request_type: "S",
      rn_code: "91",
    };

    const response = await axios.post(
      "https://corpsms.banglalink.net/bl/api/v1/smsapigw/",
      smsData
    );
    console.log("response__________", response);

    console.log("SMS sent successfully:", response?.data);
    return response.data;
  } catch (error) {
    console.error("Error sending SMS:", error?.response?.data);
    throw new Error("Error sending SMS");
  }
};

module.exports = {
  sendPaymentSms,
};
