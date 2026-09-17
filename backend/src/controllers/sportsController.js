const Sport = require('../models/Sport');

// @desc    Get all sports categories
// @route   GET /api/sports
// @access  Public
exports.getSports = async (req, res, next) => {
  try {
    const sports = await Sport.find().sort({ name: 1 });
    res.json({
      success: true,
      count: sports.length,
      data: sports
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get Sports News feed (mocked structure, easily connected to real news APIs)
// @route   GET /api/sports/news
// @access  Public
exports.getSportsNews = async (req, res, next) => {
  try {
    const mockNews = [
      {
        id: '1',
        title: 'National Grassroots Football Combine Announced for Rural Youth',
        category: 'Scouting Event',
        source: 'Sports Talent Identification Desk',
        date: '2026-09-15',
        summary: 'Over 50 scout representatives from national clubs gather to evaluate under-20 village talent across 12 states.',
        image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=600',
        url: '#'
      },
      {
        id: '2',
        title: 'New AI Biometric Tracking Metric Adopted for Athletics Trials',
        category: 'Technology',
        source: 'Sports Tech Insights',
        date: '2026-09-12',
        summary: 'Objective biomechanical gait analysis helps eliminate regional recruitment bias in track and field trials.',
        image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=600',
        url: '#'
      },
      {
        id: '3',
        title: 'Underserved Boxer from Odisha Village Secures State Scholarship',
        category: 'Success Story',
        source: 'Rural Talent Express',
        date: '2026-09-10',
        summary: 'Discovered through verified performance video uploads, 18-year-old sprinter secures elite residential training.',
        image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&q=80&w=600',
        url: '#'
      },
      {
        id: '4',
        title: 'Women’s Kabaddi Open Championship Registration Now Live',
        category: 'Championship',
        source: 'National Kabaddi Association',
        date: '2026-09-08',
        summary: 'Talented raiders and defenders from all districts can apply directly with certified video achievements.',
        image: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&q=80&w=600',
        url: '#'
      }
    ];

    res.json({
      success: true,
      count: mockNews.length,
      data: mockNews
    });
  } catch (error) {
    next(error);
  }
};
