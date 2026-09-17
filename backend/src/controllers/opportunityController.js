const Opportunity = require('../models/Opportunity');
const User = require('../models/User');

// @desc    Get all opportunities with search & filters
// @route   GET /api/opportunities
// @access  Public
exports.getOpportunities = async (req, res, next) => {
  try {
    const { search, sport, type, location, status } = req.query;

    const query = {};

    if (sport && sport !== 'All') {
      query.sport = new RegExp(sport, 'i');
    }

    if (type && type !== 'All') {
      query.type = type;
    }

    if (status) {
      query.status = status;
    }

    if (location) {
      query.location = new RegExp(location, 'i');
    }

    let opportunities = await Opportunity.find(query)
      .populate('creator', 'name email avatar role')
      .sort({ createdAt: -1 });

    if (search) {
      const searchRegex = new RegExp(search, 'i');
      opportunities = opportunities.filter(o =>
        o.title.match(searchRegex) ||
        o.organization.match(searchRegex) ||
        o.description.match(searchRegex) ||
        o.location.match(searchRegex)
      );
    }

    res.json({
      success: true,
      count: opportunities.length,
      data: opportunities
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single opportunity detail
// @route   GET /api/opportunities/:id
// @access  Public
exports.getOpportunityById = async (req, res, next) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id).populate('creator', 'name email avatar role');

    if (!opportunity) {
      return res.status(404).json({ success: false, message: 'Opportunity not found' });
    }

    res.json({
      success: true,
      data: opportunity
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new opportunity
// @route   POST /api/opportunities
// @access  Private (Coach / Scout / Admin)
exports.createOpportunity = async (req, res, next) => {
  try {
    const opportunity = await Opportunity.create({
      ...req.body,
      creator: req.user.id,
      organization: req.body.organization || req.user.name
    });

    res.status(201).json({
      success: true,
      data: opportunity
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update opportunity
// @route   PUT /api/opportunities/:id
// @access  Private (Creator / Admin)
exports.updateOpportunity = async (req, res, next) => {
  try {
    let opportunity = await Opportunity.findById(req.params.id);

    if (!opportunity) {
      return res.status(404).json({ success: false, message: 'Opportunity not found' });
    }

    if (opportunity.creator.toString() !== req.user.id && req.user.role !== 'Admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to update this opportunity' });
    }

    opportunity = await Opportunity.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.json({
      success: true,
      data: opportunity
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Save/Unsave opportunity for current user
// @route   POST /api/opportunities/:id/save
// @access  Private
exports.toggleSaveOpportunity = async (req, res, next) => {
  try {
    const opportunityId = req.params.id;
    const user = await User.findById(req.user.id);

    const isSaved = user.savedOpportunities.includes(opportunityId);

    if (isSaved) {
      user.savedOpportunities = user.savedOpportunities.filter(id => id.toString() !== opportunityId);
    } else {
      user.savedOpportunities.push(opportunityId);
    }

    await user.save();

    res.json({
      success: true,
      saved: !isSaved,
      savedOpportunities: user.savedOpportunities
    });
  } catch (error) {
    next(error);
  }
};
