const addAdmission = require("../../api/payments/addAdmission");
const { deleteAdmission } = require("../../api/payments/deleteAdmission");
const { getAllAdmission } = require("../../api/payments/getAllAdmission");
const getAllPayments = require("../../api/payments/getAllPayments");

const router = require("express").Router();

// router.post("/addStudentPayment", addStudentPayment);
router.get("/admissions", getAllAdmission);
router.post("/admission", addAdmission);
router.delete("/admission/:id", deleteAdmission);
router.get("/payments", getAllPayments);
// router.get("/getPayments", verifyToken, getPayments);

module.exports = router;
