const AthleteProfile = require('../models/AthleteProfile');
const User = require('../models/User');
const Performance = require('../models/Performance');
const Achievement = require('../models/Achievement');

// @desc    Get all athletes with filtering & search
// @route   GET /api/athletes
// @access  Public
exports.getAthletes = async (req, res, next) => {
  try {
    const { search, sport, location, gender, availability, minScore, page = 1, limit = 12 } = req.query;

    const query = {};

    if (sport && sport !== 'All') {
      query.sport = new RegExp(sport, 'i');
    }

    if (gender && gender !== 'All') {
      query.gender = gender;
    }

    if (availability && availability !== 'All') {
      query.availability = availability;
    }

    if (minScore) {
      query['stats.overallScore'] = { $gte: Number(minScore) };
    }

    if (location) {
      query.$or = [
        { 'location.state': new RegExp(location, 'i') },
        { 'location.district': new RegExp(location, 'i') },
        { 'location.villageCity': new RegExp(location, 'i') }
      ];
    }

    let athleteProfiles = await AthleteProfile.find(query)
      .populate('user', 'name email avatar isVerified phone')
      .sort({ 'stats.overallScore': -1 });

    if (search) {
      const searchRegex = new RegExp(search, 'i');
      athleteProfiles = athleteProfiles.filter(p => 
        p.user?.name.match(searchRegex) ||
        p.sport.match(searchRegex) ||
        p.position.match(searchRegex) ||
        p.location.villageCity?.match(searchRegex)
      );
    }

    const startIndex = (page - 1) * limit;
    const paginatedProfiles = athleteProfiles.slice(startIndex, startIndex + Number(limit));

    res.json({
      success: true,
      count: athleteProfiles.length,
      page: Number(page),
      pages: Math.ceil(athleteProfiles.length / limit),
      data: paginatedProfiles
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get athlete by ID or user ID
// @route   GET /api/athletes/:id
// @access  Public
exports.getAthleteById = async (req, res, next) => {
  try {
    let profile = await AthleteProfile.findById(req.params.id).populate('user', 'name email avatar isVerified phone');
    
    if (!profile) {
      profile = await AthleteProfile.findOne({ user: req.params.id }).populate('user', 'name email avatar isVerified phone');
    }

    if (!profile) {
      return res.status(404).json({ success: false, message: 'Athlete profile not found' });
    }

    const performances = await Performance.find({ athlete: profile.user._id }).sort({ testDate: -1 });
    const achievements = await Achievement.find({ athlete: profile.user._id }).sort({ year: -1 });

    res.json({
      success: true,
      data: profile,
      performances,
      achievements
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update current athlete profile
// @route   PUT /api/athletes/profile
// @access  Private (Athlete)
exports.updateProfile = async (req, res, next) => {
  try {
    let profile = await AthleteProfile.findOne({ user: req.user.id });

    if (!profile) {
      profile = new AthleteProfile({ user: req.user.id, ...req.body });
    } else {
      Object.assign(profile, req.body);
    }

    await profile.save();

    res.json({
      success: true,
      data: profile
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Save / Unsave athlete to user watchlist
// @route   POST /api/athletes/:id/save
// @access  Private (Coach/Scout)
exports.toggleSaveAthlete = async (req, res, next) => {
  try {
    const targetUserId = req.params.id;
    const user = await User.findById(req.user.id);

    const isSaved = user.savedAthletes.includes(targetUserId);

    if (isSaved) {
      user.savedAthletes = user.savedAthletes.filter(id => id.toString() !== targetUserId);
    } else {
      user.savedAthletes.push(targetUserId);
    }

    await user.save();

    res.json({
      success: true,
      saved: !isSaved,
      savedAthletes: user.savedAthletes
    });
  } catch (error) {
    next(error);
  }
};
