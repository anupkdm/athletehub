const mongoose = require('mongoose');

const sportSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  category: { type: String, enum: ['Team', 'Individual', 'Combat', 'Racquet', 'Water', 'Other'], default: 'Team' },
  icon: { type: String, default: 'trophy' },
  description: { type: String, default: '' },
  activeAthletesCount: { type: Number, default: 0 },
  rulesSummary: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Sport', sportSchema);
