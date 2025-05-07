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

const sendEmailController = require('../controller/email/sendEmai')
const getEmailController = require('../controller/email/getEmails')
const { sendEmailMsgController } = require('../controller/email/sendEmailMsg')
const storeEmailMsgController = require('../controller/email/storeSendMsg')
const getSendMessagesController = require('../controller/email/getsendMsg')

const addFeedbackController = require('../controller/feedback/addfeedback')
const getAllFeedbacksController = require('../controller/feedback/getallfeedback')
const deleteFeedbackController = require('../controller/feedback/deletefeedback')
const { updateFeedback } = require('../controller/feedback/updatefeedback')




router.post("/signup", userSignUpController);
router.post("/signin", userSignInController);
router.get("/user-details",autherToken,userDetailsController)
router.get("/user-logout",userLogout)

//admin penel
router.get("/all-user-details",autherToken,allUsersDetails)
router.post("/update-user-role",autherToken,updateUser)

//collector
router.post("/collector-form",CreateCollectorController)
router.get("/get-collector",getCollectorController)
router.post('/update-collector',autherToken,updateCollectorController)

//email
router.post("/send-email",sendEmailController)
router.get("/get-emails",getEmailController)
router.post("/send-message",sendEmailMsgController)
router.post("/store-message",storeEmailMsgController)
router.get("/get-send-message",getSendMessagesController)

//feedback
router.post("/add-feedback",addFeedbackController)
router.get("/get-feedback",getAllFeedbacksController)
router.post("/update-feedback/:id",updateFeedback)
router.post("/delete-feedback",deleteFeedbackController)

module.exports = router;
