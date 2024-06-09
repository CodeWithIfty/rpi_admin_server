const addAdmission = require("../../api/payments/addAdmission");
const { deleteAdmission } = require("../../api/payments/deleteAdmission");
const { exportPaymentExcel } = require("../../api/payments/exportPaymentExcel");
const { getAllAdmission } = require("../../api/payments/getAllAdmission");
const getAllPayments = require("../../api/payments/getAllPayments");
const { sendPaymentSms } = require("../../api/payments/sendPaymentSms");

const router = require("express").Router();

// router.post("/addStudentPayment", addStudentPayment);
router.get("/admissions", getAllAdmission);
router.post("/admission", addAdmission);
router.delete("/admission/:id", deleteAdmission);
router.get("/payments", getAllPayments);
router.get("/export-payments-excel", exportPaymentExcel);
router.get("/send-payments-sms", sendPaymentSms);
// router.get("/getPayments", verifyToken, getPayments);

module.exports = router;
