const mongoose = require('mongoose');

const scoutProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  organization: { type: String, required: true },
  region: { type: String, default: 'National' },
  sportsOfInterest: [{ type: String }],
  verificationStatus: { type: String, enum: ['Pending', 'Verified', 'Rejected'], default: 'Verified' },
  bio: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ScoutProfile', scoutProfileSchema);
