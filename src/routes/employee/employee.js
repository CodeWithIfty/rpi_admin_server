const { getAllEmployee } = require("../../api/employee/getAllEmployee");
const checkAdmin = require("../../middlewares/checkAdmin");
const verifyToken = require("../../middlewares/verifyToken");

const router = require("express").Router();

router.get("/teachers", verifyToken, checkAdmin, getAllEmployee);
module.exports = router;
