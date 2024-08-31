const express = require('express');
const { createTpoInternship, updateTpoInternship, deleteTpoInternship, applyForTpoInternship,getAllTpoInternships,getTpoInternshipById } = require('../controller/tpoInternship');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();



router.get('/all-tpo-internships',protect,getAllTpoInternships);
router.get('/tpo-internship/:id',protect,getTpoInternshipById);

router.post('/tpo-internships', protect, authorize('TPO'), createTpoInternship);
router.put('/tpo-internships/:id', protect, authorize('TPO'), updateTpoInternship);
router.delete('/tpo-internships/:id', protect, authorize('TPO'), deleteTpoInternship);

router.post('/tpo-internships/:id/apply', protect, authorize('Student'), applyForTpoInternship);

module.exports = router;
