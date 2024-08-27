const express = require('express');
const { createInternship, updateInternship, deleteInternship, applyForInternship,getAllInternships,getInternshipById } = require('../controller/internshipControl');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();



router.get('/all-internships',protect,getAllInternships);
router.get('/internship/:id',protect,getInternshipById);

router.post('/internships', protect, authorize('HR', 'TPO'), createInternship);
router.put('/internships/:id', protect, authorize('HR', 'TPO'), updateInternship);
router.delete('/internships/:id', protect, authorize('HR', 'TPO'), deleteInternship);

router.post('/internships/:id/apply', protect, authorize('Student'), applyForInternship);

module.exports = router;
