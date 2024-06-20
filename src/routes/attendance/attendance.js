const { fetchAttendances } = require("../../api/attendance/fetchAttendances");
const { getAllData } = require("../../api/attendance/getAllData");
const { getAllGroup } = require("../../api/attendance/getAllGroup");
const { getAllSemester } = require("../../api/attendance/getAllSemester");
const { getAllShifts } = require("../../api/attendance/getAllShifts");
const { getSubjects } = require("../../api/attendance/getSubjects");
const { markAttendance } = require("../../api/attendance/markAttendance");
const { selectClass } = require("../../api/attendance/selectClass");
const {
  updateStudentSemester,
} = require("../../api/attendance/updateStudentSemester");
const {
  upsertStudentResult,
} = require("../../api/attendance/upsertStudentResult");

const router = require("express").Router();

router.post("/fetch-attendances", fetchAttendances); // No verifyToken middleware here
router.get("/data", getAllData); // No verifyToken middleware here
router.get("/shifts", getAllShifts); // No verifyToken middleware here
router.post("/subjects", getSubjects); // No verifyToken middleware here
router.get("/semesters", getAllSemester); // No verifyToken middleware here
router.get("/groups", getAllGroup); // No verifyToken middleware here
router.post("/select-class", selectClass); // No verifyToken middleware here
router.post("/mark-attendance", markAttendance); // No verifyToken middleware here
router.post("/upsert-result", upsertStudentResult); // No verifyToken middleware here
router.get("/update-semester", updateStudentSemester); // No verifyToken middleware here

module.exports = router;
