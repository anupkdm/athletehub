const mongoose = require('mongoose');

const opportunitySchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: { type: String, required: true },
  type: {
    type: String,
    enum: ['Sports Trial', 'Talent Hunt', 'Training Camp', 'Competition', 'Championship'],
    required: true
  },
  sport: { type: String, required: true },
  organization: { type: String, required: true },
  location: { type: String, required: true },
  deadline: { type: Date, required: true },
  startDate: { type: Date },
  description: { type: String, required: true },
  requirements: [{ type: String }],
  eligibilityAgeMin: { type: Number, default: 12 },
  eligibilityAgeMax: { type: Number, default: 28 },
  contactEmail: { type: String, default: '' },
  status: { type: String, enum: ['Open', 'Closed', 'Upcoming', 'Draft'], default: 'Open' },
  applicantsCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Opportunity', opportunitySchema);
