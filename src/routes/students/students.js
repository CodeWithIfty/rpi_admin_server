const { getAllStudents } = require("../../api/students/getAllStudents");

const router = require("express").Router();

router.get("/students", getAllStudents);
module.exports = router;
