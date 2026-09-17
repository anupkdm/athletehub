const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  athlete: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: { type: String, required: true },
  category: { type: String, enum: ['District', 'State', 'National', 'International', 'School/College'], required: true },
  year: { type: Number, required: true },
  organization: { type: String, default: '' },
  description: { type: String, default: '' },
  certificateUrl: { type: String, default: '' },
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Achievement', achievementSchema);
