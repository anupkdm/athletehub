const User = require('../models/User');
const AthleteProfile = require('../models/AthleteProfile');
const CoachProfile = require('../models/CoachProfile');
const ScoutProfile = require('../models/ScoutProfile');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'sports_talent_secret_key_2026', {
    expiresIn: '30d'
  });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role, sport, position, location, organization, age, gender } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User with this email already exists' });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role || 'Athlete'
    });

    // Create corresponding sub-profile depending on role
    if (user.role === 'Athlete') {
      await AthleteProfile.create({
        user: user._id,
        sport: sport || 'Football',
        position: position || 'Forward / Winger',
        location: typeof location === 'object' ? location : { state: 'Punjab', district: 'Ludhiana', villageCity: location || 'Khanna Village' },
        age: age || 19,
        gender: gender || 'Male'
      });
    } else if (user.role === 'Coach') {
      await CoachProfile.create({
        user: user._id,
        organization: organization || 'National Sports Academy',
        sport: sport || 'Football',
        location: 'New Delhi'
      });
    } else if (user.role === 'Scout') {
      await ScoutProfile.create({
        user: user._id,
        organization: organization || 'Global Sports Scouting Network',
        sportsOfInterest: [sport || 'Football']
      });
    }

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        isVerified: user.isVerified
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        isVerified: user.isVerified
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    let profile = null;

    if (user.role === 'Athlete') {
      profile = await AthleteProfile.findOne({ user: user._id });
    } else if (user.role === 'Coach') {
      profile = await CoachProfile.findOne({ user: user._id });
    } else if (user.role === 'Scout') {
      profile = await ScoutProfile.findOne({ user: user._id });
    }

    res.json({
      success: true,
      user,
      profile
    });
  } catch (error) {
    next(error);
  }
};
