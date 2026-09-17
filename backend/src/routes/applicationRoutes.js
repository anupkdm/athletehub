const express = require('express');
const router = express.Router();
const { applyToOpportunity, getApplications, updateApplicationStatus } = require('../controllers/applicationController');
const { protect, authorize } = require('../middleware/auth');

router.post('/', protect, authorize('Athlete'), applyToOpportunity);
router.get('/', protect, getApplications);
router.put('/:id/status', protect, authorize('Coach', 'Scout', 'Admin'), updateApplicationStatus);

module.exports = router;
