const mongoose = require('mongoose');

const performanceSchema = new mongoose.Schema({
  athlete: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  metricName: { type: String, required: true }, // e.g. 100m Sprint, Vertical Jump, Shuttle Run
  metricValue: { type: Number, required: true },
  unit: { type: String, required: true }, // e.g. sec, cm, km/h, reps
  testDate: { type: Date, default: Date.now },
  verifiedBy: { type: String, default: 'Self Reported' },
  notes: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Performance', performanceSchema);
