const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Load environment variables
dotenv.config();

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static uploads directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/athletes', require('./routes/athleteRoutes'));
app.use('/api/opportunities', require('./routes/opportunityRoutes'));
app.use('/api/applications', require('./routes/applicationRoutes'));
app.use('/api/sports', require('./routes/sportsRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/performance', require('./routes/performanceRoutes'));
app.use('/api/achievements', require('./routes/achievementRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

// Root Health Check Route
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    platform: 'Full-Stack Sports Talent Identification API',
    timestamp: new Date()
  });
});

// Central Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`[Server] Sports Talent Identification Platform API running on port ${PORT}`);
});
