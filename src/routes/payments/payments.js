const addAdmission = require("../../api/payments/addAdmission");
const { getAllAdmission } = require("../../api/payments/getAllAdmission");
const getAllPayments = require("../../api/payments/getAllPayments");

const router = require("express").Router();

// router.post("/addStudentPayment", addStudentPayment);
router.post("/admission", addAdmission);
router.get("/admissions", getAllAdmission);
router.get("/payments", getAllPayments);
// router.get("/getPayments", verifyToken, getPayments);

module.exports = router;
