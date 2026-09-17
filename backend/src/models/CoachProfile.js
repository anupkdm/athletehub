const mongoose = require('mongoose');

const coachProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  organization: { type: String, required: true },
  sport: { type: String, required: true },
  experienceYears: { type: Number, default: 5 },
  location: { type: String, required: true },
  credentials: [{ type: String }],
  bio: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CoachProfile', coachProfileSchema);
