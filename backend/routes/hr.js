const express = require("express");
const { protect, authorize } = require("../middleware/auth");
const { getApplications,filterApplications, reviewApplication,getApplicationsForJob} = require("../controller/applicationControl");
const router = express.Router();

router.get('/hr/all-application',protect,authorize("HR"),getApplications);
router.get('/hr/applications/:id/filter',protect,authorize("HR"),filterApplications);
router.get('/jobs/:jobId/applications', protect, authorize('HR', 'masterAdmin'), getApplicationsForJob);

router.put('/hr/applications/:id/review',protect,authorize("HR"),reviewApplication);

module.exports = router;