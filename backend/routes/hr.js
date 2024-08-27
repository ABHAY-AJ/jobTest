const express = require("express");
const { protect, authorize } = require("../middleware/auth");
const { getApplications,filterApplications, reviewApplication } = require("../controller/applicationControl");
const router = express.Router();

router.get('/hr/all-application',protect,authorize("HR"),getApplications);
router.get('/hr/applications/:id/filter',protect,authorize("HR"),filterApplications);

router.put('/hr/applications/:id/review',protect,authorize("HR"),reviewApplication);

module.exports = router;