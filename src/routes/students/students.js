const {
  archiveSingleStudent,
} = require("../../api/students/archiveSingleStudent");
const { changePassword } = require("../../api/students/changePassword");
const { getAllStudents } = require("../../api/students/getAllStudents");
const { getArchiveStudents } = require("../../api/students/getArchiveStudents");
const getSingleStudentData = require("../../api/students/getSingleStudentData");
const {
  restoreArchiveSingleStudent,
} = require("../../api/students/restoreArchiveSingleStudent");
const { updateStudent } = require("../../api/students/updateStudent");

const router = require("express").Router();

router.get("/student/:rollNumber", getSingleStudentData);
router.get("/students", getAllStudents);
router.get("/archive-students", getArchiveStudents);
router.delete("/student/:rollNumber", archiveSingleStudent);
router.post("/restore-student/:rollNumber", restoreArchiveSingleStudent);
router.put("/update-student/:rollNumber", updateStudent);
router.put("/change-password/:rollNumber", changePassword);
module.exports = router;
