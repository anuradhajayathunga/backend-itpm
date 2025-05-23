const express = require("express");

const router = express.Router();

const userSignUpController = require("../controller/user/userSignUp");
const userSignInController = require("../controller/user/userSignin");
const userDetailsController = require("../controller/user/userDetails");
const autherToken = require("../middleware/autherToken");
const userLogout = require("../controller/user/userLogout");
const allUsersDetails = require("../controller/user/allUserDetails");
const updateUser = require("../controller/user/updateUser");

const CreateCollectorController = require("../controller/collector/createCollector");
const getCollectorController = require("../controller/collector/getCollectorDetails");
const updateCollectorController = require("../controller/collector/updateCollector");

const sendEmailController = require("../controller/email/sendEmai");
const getEmailController = require("../controller/email/getEmails");
const { sendEmailMsgController } = require("../controller/email/sendEmailMsg");
const storeEmailMsgController = require("../controller/email/storeSendMsg");
const getSendMessagesController = require("../controller/email/getsendMsg");
//feedback
const addFeedbackController = require("../controller/feedback/addfeedback");
const getAllFeedbacksController = require("../controller/feedback/getallfeedback");
const deleteFeedbackController = require("../controller/feedback/deletefeedback");
const { updateFeedback } = require("../controller/feedback/updatefeedback");
// Import controllers
const CreateWasteCollectionController = require("../controller/waste/createWasteCollection");
const GetAllWasteCollectionsController = require("../controller/waste/getAllWasteCollections");
const GetUserWasteCollectionsController = require("../controller/waste/getUserWasteCollections");
const GetWasteCollectionByIdController = require("../controller/waste/getWasteCollectionById");
const UpdateWasteCollectionController = require("../controller/waste/updateWasteCollection");
const UpdateWasteCollectionStatusController = require("../controller/waste/updateWasteCollectionStatus");
const DeleteWasteCollectionController = require("../controller/waste/deleteWasteCollection");
//task
const { getCollectorTasks, assignTask } = require("../controller/task/assignTask");
//feedback with complaine
const submissionController = require('../controller/feedback/submissionController');




router.post("/signup", userSignUpController);
router.post("/signin", userSignInController);
router.get("/user-details", autherToken, userDetailsController);
router.get("/user-logout", userLogout);
//admin penel
router.get("/all-user-details", autherToken, allUsersDetails);
router.post("/update-user-role", autherToken, updateUser);

//collector
router.post("/collector-form", CreateCollectorController);
router.get("/get-collector", getCollectorController);
router.post("/update-collector", autherToken, updateCollectorController);

//email
router.post("/send-email", sendEmailController);
router.get("/get-emails", getEmailController);
router.post("/send-message", sendEmailMsgController);
router.post("/store-message", storeEmailMsgController);
router.get("/get-send-message", getSendMessagesController);

// GET all waste collection records
router.get("/get-allwaste", GetAllWasteCollectionsController);

// GET all waste collection records for a user
router.get("/get-userwaste", GetUserWasteCollectionsController);

// GET a single waste collection record
router.get("/get-wastcollec/:id", GetWasteCollectionByIdController);

// POST/Create a new waste collection record
router.post("/send-waste", CreateWasteCollectionController);

// PUT/Update a waste collection record
router.put("/update-waste/:id", UpdateWasteCollectionController);

// PUT/Update the status of a waste collection record
router.put(
  "/update-waste-state/:id/status",
  UpdateWasteCollectionStatusController
);

// DELETE a waste collection record
router.delete("/delete-wastereq/:id", DeleteWasteCollectionController);

//feedback
router.post("/add-feedback", addFeedbackController);
router.get("/get-feedback", getAllFeedbacksController);
router.post("/update-feedback/:id", updateFeedback);
router.post("/delete-feedback", deleteFeedbackController);

// feedback with complaine
router.post('/feedbacks', submissionController.createSubmission);
router.get('/all-feedbacks', submissionController.getAllSubmissions);
router.put('/feeedbacksbyid/:id', submissionController.updateSubmission);
router.delete('/delete-feedbacks/:id', submissionController.deleteSubmission);

//task
router.post("/tasks/assign", assignTask);
router.get("/tasks/:email", getCollectorTasks);

module.exports = router;
