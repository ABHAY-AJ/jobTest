const express = require("express");
const { protect, authorize } = require("../middleware/auth");
const { getApplications,filterApplications, reviewApplication,getApplicationsForJob,getStudentProfile} = require("../controller/applicationControl");
const router = express.Router();

router.get('/hr/all-application/:id',getApplications);
router.get('/hr/applications/:id/filter',protect,authorize("HR"),filterApplications);
router.get('/jobs/:jobId/applications', protect, authorize('HR', 'masterAdmin'), getApplicationsForJob);
router.get('/students/:studentId/profile', getStudentProfile);

router.put('/hr/applications/:applicationId/review',reviewApplication);

module.exports = router;