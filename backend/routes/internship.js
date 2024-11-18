const express = require('express');
const { createInternship, updateInternship, deleteInternship, applyForInternship,getAllInternships,getInternshipById } = require('../controller/internshipControl');
const { protect, authorize } = require('../middleware/auth');
const {getAllInternshipsByHR} = require("../controller/internshipControl");

const router = express.Router();


router.get('/all-internships',getAllInternships);
router.get('/internships/hr', protect, authorize('HR'), getAllInternshipsByHR);

router.get('/internship/:id',getInternshipById);

router.post('/internships', protect, authorize('HR', 'TPO'), createInternship);
router.put('/internships/:id', protect, authorize('HR', 'TPO'), updateInternship);
router.delete('/internships/:id', protect, authorize('HR', 'TPO'), deleteInternship);

router.post('/internships/:id/apply', protect, authorize('Student'), applyForInternship);

module.exports = router;