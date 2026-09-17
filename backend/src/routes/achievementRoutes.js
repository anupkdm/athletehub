const express = require('express');
const router = express.Router();
const { addAchievement, getAthleteAchievements } = require('../controllers/achievementController');
const { protect } = require('../middleware/auth');

router.post('/', protect, addAchievement);
router.get('/:athleteId', getAthleteAchievements);

module.exports = router;
