const User = require('../models/User');
const AthleteProfile = require('../models/AthleteProfile');
const Opportunity = require('../models/Opportunity');
const Application = require('../models/Application');
const ContactMessage = require('../models/ContactMessage');

// @desc    Get Admin Dashboard Stats
// @route   GET /api/admin/stats
// @access  Private (Admin)
exports.getAdminStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalAthletes = await User.countDocuments({ role: 'Athlete' });
    const totalCoaches = await User.countDocuments({ role: 'Coach' });
    const totalScouts = await User.countDocuments({ role: 'Scout' });
    const totalOpportunities = await Opportunity.countDocuments();
    const totalApplications = await Application.countDocuments();
    const pendingContacts = await ContactMessage.countDocuments({ status: 'New' });

    res.json({
      success: true,
      data: {
        totalUsers,
        totalAthletes,
        totalCoaches,
        totalScouts,
        totalOpportunities,
        totalApplications,
        pendingContacts
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all users (Admin view)
// @route   GET /api/admin/users
// @access  Private (Admin)
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json({ success: true, count: users.length, data: users });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle athlete verification status
// @route   PUT /api/admin/users/:id/verify
// @access  Private (Admin)
exports.toggleVerifyUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.isVerified = !user.isVerified;
    await user.save();

    if (user.role === 'Athlete') {
      await AthleteProfile.findOneAndUpdate(
        { user: user._id },
        { verificationBadge: user.isVerified }
      );
    }

    res.json({
      success: true,
      message: `User verification status updated to ${user.isVerified}`,
      isVerified: user.isVerified
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get contact form submissions
// @route   GET /api/admin/contacts
// @access  Private (Admin)
exports.getContactMessages = async (req, res, next) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json({ success: true, data: messages });
  } catch (error) {
    next(error);
  }
};
