const mongoose = require('mongoose');

const athleteProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  sport: {
    type: String,
    required: true,
    trim: true
  },
  secondarySport: {
    type: String,
    default: ''
  },
  position: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    state: { type: String, required: true },
    district: { type: String, default: '' },
    villageCity: { type: String, required: true }
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },
  heightCm: { type: Number, default: 175 },
  weightKg: { type: Number, default: 70 },
  experienceYears: { type: Number, default: 2 },
  bio: { type: String, default: '' },
  skills: [{ type: String }],
  availability: {
    type: String,
    enum: ['Immediate', 'Within 1 Month', 'Seasonal', 'Not Available'],
    default: 'Immediate'
  },
  verificationBadge: {
    type: Boolean,
    default: false
  },
  videos: [{
    title: String,
    url: String,
    thumbnail: String
  }],
  certificates: [{
    title: String,
    issuedBy: String,
    year: Number,
    fileUrl: String
  }],
  stats: {
    overallScore: { type: Number, default: 85 },
    sprintSpeedKmh: { type: Number, default: 32.5 },
    verticalJumpCm: { type: Number, default: 65 },
    staminaIndex: { type: Number, default: 88 },
    agilityScore: { type: Number, default: 82 }
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AthleteProfile', athleteProfileSchema);
