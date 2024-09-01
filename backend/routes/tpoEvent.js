const express = require('express');
const { createTpoEvent, updateTpoEvent, deleteTpoEvent, applyForTpoEvent, getAllTpoEvent, getTpoEventById } = require('../controller/tpoEvent');

const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('all-tpo-events', getAllTpoEvent);
router.get('/tpo-event/:id',protect, getTpoEventById);

router.post('/tpo-events',protect,authorize('TPO'),createTpoEvent);
router.put('/tpo-events/:id', protect, authorize('TPO'), updateTpoEvent);
router.delete('/tpo-events/:id', protect, authorize('TPO'), deleteTpoEvent);


router.post('/tpo-events/:eventId/apply', protect, authorize('Student'), applyForTpoEvent); // Only Students can apply for jobs

module.exports = router;