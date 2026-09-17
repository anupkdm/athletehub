const Achievement = require('../models/Achievement');

// @desc    Add achievement
// @route   POST /api/achievements
// @access  Private (Athlete)
exports.addAchievement = async (req, res, next) => {
  try {
    const achievement = await Achievement.create({
      athlete: req.user.id,
      ...req.body
    });

    res.status(201).json({ success: true, data: achievement });
  } catch (error) {
    next(error);
  }
};

// @desc    Get achievements for an athlete
// @route   GET /api/achievements/:athleteId
// @access  Public
exports.getAthleteAchievements = async (req, res, next) => {
  try {
    const achievements = await Achievement.find({ athlete: req.params.athleteId })
      .sort({ year: -1 });

    res.json({ success: true, data: achievements });
  } catch (error) {
    next(error);
  }
};
