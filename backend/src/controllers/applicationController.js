const Application = require('../models/Application');
const Opportunity = require('../models/Opportunity');
const Notification = require('../models/Notification');

// @desc    Apply to an opportunity
// @route   POST /api/applications
// @access  Private (Athlete)
exports.applyToOpportunity = async (req, res, next) => {
  try {
    const { opportunityId, coverNote } = req.body;

    const opportunity = await Opportunity.findById(opportunityId);
    if (!opportunity) {
      return res.status(404).json({ success: false, message: 'Opportunity not found' });
    }

    const existingApp = await Application.findOne({
      opportunity: opportunityId,
      athlete: req.user.id
    });

    if (existingApp) {
      return res.status(400).json({ success: false, message: 'You have already applied for this opportunity' });
    }

    const application = await Application.create({
      opportunity: opportunityId,
      athlete: req.user.id,
      coverNote: coverNote || ''
    });

    // Increment applicants counter
    opportunity.applicantsCount += 1;
    await opportunity.save();

    // Create notification for opportunity creator
    await Notification.create({
      user: opportunity.creator,
      title: 'New Application Received',
      message: `${req.user.name} applied for "${opportunity.title}"`,
      link: '/dashboard'
    });

    res.status(201).json({
      success: true,
      data: application
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current athlete's applications OR applications for coach's opportunities
// @route   GET /api/applications
// @access  Private
exports.getApplications = async (req, res, next) => {
  try {
    let applications;

    if (req.user.role === 'Athlete') {
      applications = await Application.find({ athlete: req.user.id })
        .populate('opportunity')
        .sort({ appliedAt: -1 });
    } else if (['Coach', 'Scout', 'Admin'].includes(req.user.role)) {
      let oppQuery = {};
      if (req.user.role !== 'Admin') {
        oppQuery.creator = req.user.id;
      }
      const myOpportunities = await Opportunity.find(oppQuery).select('_id');
      const oppIds = myOpportunities.map(o => o._id);

      applications = await Application.find({ opportunity: { $in: oppIds } })
        .populate('opportunity')
        .populate({
          path: 'athlete',
          select: 'name email avatar phone'
        })
        .sort({ appliedAt: -1 });
    }

    res.json({
      success: true,
      count: applications.length,
      data: applications
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update application status (Pending | Under Review | Shortlisted | Accepted | Rejected)
// @route   PUT /api/applications/:id/status
// @access  Private (Coach / Scout / Admin)
exports.updateApplicationStatus = async (req, res, next) => {
  try {
    const { status, feedback } = req.body;

    const application = await Application.findById(req.params.id)
      .populate('opportunity')
      .populate('athlete');

    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    application.status = status;
    if (feedback) application.feedback = feedback;
    await application.save();

    // Create notification for applicant
    await Notification.create({
      user: application.athlete._id,
      title: `Application Status Updated: ${status}`,
      message: `Your application status for "${application.opportunity.title}" has been updated to "${status}".`,
      link: '/dashboard'
    });

    res.json({
      success: true,
      data: application
    });
  } catch (error) {
    next(error);
  }
};
