const express = require('express');
const router = express.Router();
const { getAthletes, getAthleteById, updateProfile, toggleSaveAthlete } = require('../controllers/athleteController');
const { protect } = require('../middleware/auth');

router.get('/', getAthletes);
router.get('/:id', getAthleteById);
router.put('/profile', protect, updateProfile);
router.post('/:id/save', protect, toggleSaveAthlete);

module.exports = router;
