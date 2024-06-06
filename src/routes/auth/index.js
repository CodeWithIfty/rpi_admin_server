const {
  changePassword,
} = require("../../api/authentication/controllers/changePassword");
const createAuthCookie = require("../../api/authentication/controllers/createAuthCookie");
const {
  createUser,
} = require("../../api/authentication/controllers/createUser");
const logout = require("../../api/authentication/controllers/logout");
const { signIn } = require("../../api/authentication/controllers/signIn");
const checkAdmin = require("../../middlewares/checkAdmin");
const verifyToken = require("../../middlewares/verifyToken");

const router = require("express").Router();
router.post("/signIn", signIn);
router.post("/register", verifyToken, checkAdmin, createUser);
router.post("/changePassword", verifyToken, changePassword);
// router.post("/jwt", createAuthCookie);
router.get("/logout", logout);
module.exports = router;
