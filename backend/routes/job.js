const express = require('express');
const { createJob, updateJob, deleteJob, applyForJob, getAllJobs, getJobById } = require('../controller/jobControl');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();


router.get('/all-jobs',getAllJobs);
router.get('/job/:id',protect,getJobById);
// Apply protect middleware to ensure only authenticated users can access these routes
router.post('/jobs', protect, authorize('HR', 'TPO'), createJob); // Only HR and TPO can create jobs
router.put('/jobs/:id', protect, authorize('HR', 'TPO'), updateJob); // Only HR and TPO can update jobs
router.delete('/jobs/:id', protect, authorize('HR', 'TPO'), deleteJob); // Only HR and TPO can delete jobs

router.post('/jobs/:jobId/apply', protect, authorize('Student'), applyForJob); // Only Students can apply for jobs

module.exports = router;
