const express = require('express');
const router = express.Router();
const { getOpportunities, getOpportunityById, createOpportunity, updateOpportunity, toggleSaveOpportunity } = require('../controllers/opportunityController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', getOpportunities);
router.get('/:id', getOpportunityById);
router.post('/', protect, authorize('Coach', 'Scout', 'Admin'), createOpportunity);
router.put('/:id', protect, authorize('Coach', 'Scout', 'Admin'), updateOpportunity);
router.post('/:id/save', protect, toggleSaveOpportunity);

module.exports = router;
