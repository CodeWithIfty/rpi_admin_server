const {
  CreateAddressInformation,
} = require("../../api/teacher/controllers/CreateAddressInformation");
const {
  CreateAwardInformation,
} = require("../../api/teacher/controllers/CreateAwardInformation");
const {
  CreateChildreenInformation,
} = require("../../api/teacher/controllers/CreateChildreenInformation");
const {
  CreateDutyInformation,
} = require("../../api/teacher/controllers/CreateDutyInformation");
const {
  CreateEducationInformation,
} = require("../../api/teacher/controllers/CreateEducationInformation");
const {
  CreateEmploymentInformation,
} = require("../../api/teacher/controllers/CreateEmploymentInformation");
const {
  CreateMembershipInformation,
} = require("../../api/teacher/controllers/CreateMembershipInformation");
const {
  CreatePublicationInformation,
} = require("../../api/teacher/controllers/CreatePublicationInformation");
const {
  CreateRestInformation,
} = require("../../api/teacher/controllers/CreateRestInformation");
const {
  CreateTourInformation,
} = require("../../api/teacher/controllers/CreateTourInformation");
const {
  CreateTrainingInformation,
} = require("../../api/teacher/controllers/CreateTrainingInformation");
const {
  UpdateAddressInformation,
} = require("../../api/teacher/controllers/UpdateAddressInformation");
const {
  UpdateAwardInformation,
} = require("../../api/teacher/controllers/UpdateAwardInformation");
const {
  UpdateChildrenInformation,
} = require("../../api/teacher/controllers/UpdateChildrenInformation");
const {
  UpdateDutyInformation,
} = require("../../api/teacher/controllers/UpdateDutyInformation");
const {
  UpdateEducationInformation,
} = require("../../api/teacher/controllers/UpdateEducationInformation");
const {
  UpdateEmploymentInformation,
} = require("../../api/teacher/controllers/UpdateEmploymentInformation");
const {
  UpdateMembershipInformation,
} = require("../../api/teacher/controllers/UpdateMembershipInformation");
const {
  UpdatePublicationInformation,
} = require("../../api/teacher/controllers/UpdatePublicationInformation");
const {
  UpdateRestInformation,
} = require("../../api/teacher/controllers/UpdateRestInformation");
const {
  UpdateTourInformation,
} = require("../../api/teacher/controllers/UpdateTourInformation");
const {
  UpdateTrainingInformation,
} = require("../../api/teacher/controllers/UpdateTrainingInformation");
const {
  getAllAddressInfo,
} = require("../../api/teacher/controllers/getAllAddressInfo");
const {
  getAllAwardInfo,
} = require("../../api/teacher/controllers/getAllAwardInfo");
const {
  getAllChildrenInfo,
} = require("../../api/teacher/controllers/getAllChildrenInfo");
const {
  getAllDutyInfo,
} = require("../../api/teacher/controllers/getAllDutyInfo");
const {
  getAllEducationInfo,
} = require("../../api/teacher/controllers/getAllEducationInfo");
const {
  getAllEmploymentInfo,
} = require("../../api/teacher/controllers/getAllEmploymentInfo");
const {
  getAllMembershipInfo,
} = require("../../api/teacher/controllers/getAllMembershipInfo");
const {
  getAllPublicationInfo,
} = require("../../api/teacher/controllers/getAllPublicationInfo");
const {
  getAllRestInfo,
} = require("../../api/teacher/controllers/getAllRestInfo");
const {
  getAllTourInfo,
} = require("../../api/teacher/controllers/getAllTourInfo");
const {
  getAllTrainingInfo,
} = require("../../api/teacher/controllers/getAllTrainingInfo");
const {
  getNomineeInfo,
} = require("../../api/teacher/controllers/getNomineeInfo");
const {
  getSingleAddressInfo,
} = require("../../api/teacher/controllers/getSingleAddressInfo");
const {
  getSingleAwardInfo,
} = require("../../api/teacher/controllers/getSingleAwardInfo");
const {
  getSingleChildrenInfo,
} = require("../../api/teacher/controllers/getSingleChildrenInfo");
const {
  getSingleDutyInfo,
} = require("../../api/teacher/controllers/getSingleDutyInfo");
const {
  getSingleEducationInfo,
} = require("../../api/teacher/controllers/getSingleEducationInfo");
const {
  getSingleEmploymentInfo,
} = require("../../api/teacher/controllers/getSingleEmploymentInfo");
const {
  getSingleMembershipInfo,
} = require("../../api/teacher/controllers/getSingleMembershipInfo");
const {
  getSinglePublicationInfo,
} = require("../../api/teacher/controllers/getSinglePublicationInfo");
const {
  getSingleRestInfo,
} = require("../../api/teacher/controllers/getSingleRestInfo");
const {
  getSingleTourInfo,
} = require("../../api/teacher/controllers/getSingleTourInfo");
const {
  getSingleTrainingInfo,
} = require("../../api/teacher/controllers/getSingleTrainingInfo");
const {
  getSpouseInfo,
} = require("../../api/teacher/controllers/getSpouseInfo");
const {
  getTeacherInfo,
} = require("../../api/teacher/controllers/getTeacherInfo");
const {
  updateOrCreateNomineeInfo,
} = require("../../api/teacher/controllers/updateOrCreateNomineeInfo");
const {
  updateOrCreateSpouseInfo,
} = require("../../api/teacher/controllers/updateOrCreateSpouseInfo");
const {
  updateOrCreateTeacher,
} = require("../../api/teacher/controllers/updateOrCreateTeacher");
const verifyToken = require("../../middlewares/verifyToken");

const router = require("express").Router();

router.get("/teacher", verifyToken, getTeacherInfo);

router.put("/teacher", verifyToken, updateOrCreateTeacher);

router.get("/spouse-info", verifyToken, getSpouseInfo);
router.put("/spouse-info", verifyToken, updateOrCreateSpouseInfo);

router.get("/nominee-info", verifyToken, getNomineeInfo);
router.put("/nominee-info", verifyToken, updateOrCreateNomineeInfo);

router.get("/all-address-info", verifyToken, getAllAddressInfo);
router.get("/single-address-info/:id", verifyToken, getSingleAddressInfo);
router.post("/address-info", verifyToken, CreateAddressInformation);
router.put("/update-address-info/:id", verifyToken, UpdateAddressInformation);

router.get("/all-children-info", verifyToken, getAllChildrenInfo);
router.get("/single-children-info/:id", verifyToken, getSingleChildrenInfo);
router.post("/children-info", verifyToken, CreateChildreenInformation);
router.put("/update-children-info/:id", verifyToken, UpdateChildrenInformation);

router.get("/all-education-info", verifyToken, getAllEducationInfo);
router.get("/single-education-info/:id", verifyToken, getSingleEducationInfo);
router.post("/education-info", verifyToken, CreateEducationInformation);
router.put(
  "/update-education-info/:id",
  verifyToken,
  UpdateEducationInformation
);

router.get("/all-training-info", verifyToken, getAllTrainingInfo);
router.get("/single-training-info/:id", verifyToken, getSingleTrainingInfo);
router.post("/training-info", verifyToken, CreateTrainingInformation);
router.put("/update-training-info/:id", verifyToken, UpdateTrainingInformation);

router.get("/all-award-info", verifyToken, getAllAwardInfo);
router.get("/single-award-info/:id", verifyToken, getSingleAwardInfo);
router.post("/award-info", verifyToken, CreateAwardInformation);
router.put("/update-award-info/:id", verifyToken, UpdateAwardInformation);

router.get("/all-publication-info", verifyToken, getAllPublicationInfo);
router.get(
  "/single-publication-info/:id",
  verifyToken,
  getSinglePublicationInfo
);
router.post("/publication-info", verifyToken, CreatePublicationInformation);
router.put(
  "/update-publication-info/:id",
  verifyToken,
  UpdatePublicationInformation
);

router.get("/all-employment-info", verifyToken, getAllEmploymentInfo);
router.get("/single-employment-info/:id", verifyToken, getSingleEmploymentInfo);
router.post("/employment-info", verifyToken, CreateEmploymentInformation);
router.put(
  "/update-employment-info/:id",
  verifyToken,
  UpdateEmploymentInformation
);

router.get("/all-membership-info", verifyToken, getAllMembershipInfo);
router.get("/single-membership-info/:id", verifyToken, getSingleMembershipInfo);
router.post("/membership-info", verifyToken, CreateMembershipInformation);
router.put(
  "/update-membership-info/:id",
  verifyToken,
  UpdateMembershipInformation
);

router.get("/all-duty-info", verifyToken, getAllDutyInfo);
router.get("/single-duty-info/:id", verifyToken, getSingleDutyInfo);
router.post("/duty-info", verifyToken, CreateDutyInformation);
router.put("/update-duty-info/:id", verifyToken, UpdateDutyInformation);

router.get("/all-tour-info", verifyToken, getAllTourInfo);
router.get("/single-tour-info/:id", verifyToken, getSingleTourInfo);
router.post("/tour-info", verifyToken, CreateTourInformation);
router.put("/update-tour-info/:id", verifyToken, UpdateTourInformation);

router.get("/all-rest-info", verifyToken, getAllRestInfo);
router.get("/single-rest-info/:id", verifyToken, getSingleRestInfo);
router.post("/rest-info", verifyToken, CreateRestInformation);
router.put("/update-rest-info/:id", verifyToken, UpdateRestInformation);

module.exports = router;
