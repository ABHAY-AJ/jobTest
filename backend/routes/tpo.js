const express = require("express");
const { protect, authorize } = require("../middleware/auth");
const { getTpoApplications,filterTpoApplications, reviewTpoApplication } = require("../controller/tpoApplicationControl");
const router = express.Router();

router.get('/tpo/all-tpo-application/:id',protect,authorize("TPO","HR"),getTpoApplications);
router.get('/tpo/tpo-applications/:id/filter',protect,authorize("TPO"),filterTpoApplications);

router.put('/tpo/tpo-applications/:applicationId/review',protect,authorize("TPO","HR"),reviewTpoApplication);

module.exports = router;