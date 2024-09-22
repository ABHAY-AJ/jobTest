const express = require("express");
const { protect, authorize } = require("../middleware/auth");
const { getTpoApplications,filterTpoApplications, reviewTpoApplication } = require("../controller/tpoApplicationControl");
const router = express.Router();

router.get('/tpo/all-tpo-application/:id',protect,authorize("TPO"),getTpoApplications);
router.get('/tpo/tpo-applications/:id/filter',protect,authorize("TPO"),filterTpoApplications);

router.put('/tpo/tpo-applications/:id/review',protect,authorize("TPO"),reviewTpoApplication);

module.exports = router;