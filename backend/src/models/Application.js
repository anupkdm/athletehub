const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  opportunity: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Opportunity',
    required: true
  },
  athlete: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  coverNote: { type: String, default: '' },
  status: {
    type: String,
    enum: ['Pending', 'Under Review', 'Shortlisted', 'Accepted', 'Rejected'],
    default: 'Pending'
  },
  feedback: { type: String, default: '' },
  appliedAt: { type: Date, default: Date.now }
});

applicationSchema.index({ opportunity: 1, athlete: 1 }, { unique: true });

module.exports = mongoose.model('Application', applicationSchema);
