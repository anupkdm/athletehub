const Performance = require('../models/Performance');
const AthleteProfile = require('../models/AthleteProfile');

// @desc    Add performance metric for current athlete
// @route   POST /api/performance
// @access  Private (Athlete)
exports.addPerformance = async (req, res, next) => {
  try {
    const { metricName, metricValue, unit, notes } = req.body;

    const perf = await Performance.create({
      athlete: req.user.id,
      metricName,
      metricValue,
      unit,
      notes: notes || ''
    });

    res.status(201).json({ success: true, data: perf });
  } catch (error) {
    next(error);
  }
};

// @desc    Get performance metrics for athlete
// @route   GET /api/performance/:athleteId
// @access  Public
exports.getAthletePerformances = async (req, res, next) => {
  try {
    const performances = await Performance.find({ athlete: req.params.athleteId })
      .sort({ testDate: -1 });

    res.json({ success: true, data: performances });
  } catch (error) {
    next(error);
  }
};
