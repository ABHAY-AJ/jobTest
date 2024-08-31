const express = require('express');
const { createTpoJob, updateTpoJob, deleteTpoJob, applyForTpoJob, getAllTpoJobs, getTpoJobById } = require('../controller/tpoJob');

const { protect, authorize } = require('../middleware/auth');

const router = express.Router();


router.get('/all-tpo-jobs',getAllTpoJobs);
router.get('/tpo-job/:id',protect,getTpoJobById);
// Apply protect middleware to ensure only authenticated users can access these routes
router.post('/tpo-jobs', protect, authorize('TPO'), createTpoJob); // Only HR and TPO can create jobs
router.put('/tpo-jobs/:id', protect, authorize('TPO'), updateTpoJob); // Only HR and TPO can update jobs
router.delete('/tpo-jobs/:id', protect, authorize('TPO'), deleteTpoJob); // Only HR and TPO can delete jobs

router.post('/tpo-jobs/:jobId/apply', protect, authorize('Student'), applyForTpoJob); // Only Students can apply for jobs

module.exports = router;
