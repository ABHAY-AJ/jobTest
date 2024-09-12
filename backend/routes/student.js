
const express = require("express");
const router = express.Router();

const {getAppliedJobsAndInternships, getStudentApplications,getStudentTpoApplications} = require("../controller/studentControl");
const { protect, authorize } = require('../middleware/auth');



router.get('/applied', protect, authorize('Student'), getAppliedJobsAndInternships);
router.get('/applied-application',protect,authorize("Student"),getStudentApplications,getStudentTpoApplications);

module.exports = router;