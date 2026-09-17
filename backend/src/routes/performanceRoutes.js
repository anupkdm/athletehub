const express = require('express');
const router = express.Router();
const { addPerformance, getAthletePerformances } = require('../controllers/performanceController');
const { protect } = require('../middleware/auth');

router.post('/', protect, addPerformance);
router.get('/:athleteId', getAthletePerformances);

module.exports = router;
