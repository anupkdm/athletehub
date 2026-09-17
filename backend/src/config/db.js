const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/sports_talent_db';
    
    // Attempt standard connection
    try {
      const conn = await mongoose.connect(mongoURI, {
        serverSelectionTimeoutMS: 3000
      });
      console.log(`[Database] Connected to MongoDB: ${conn.connection.host}`);
      return conn;
    } catch (err) {
      console.warn(`[Database] Could not connect to primary URI (${mongoURI}): ${err.message}`);
      console.log('[Database] Initializing MongoDB Memory Server fallback for instant offline execution...');
      
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongoServer = await MongoMemoryServer.create();
      const memUri = mongoServer.getUri();
      
      const conn = await mongoose.connect(memUri);
      console.log(`[Database] Connected to In-Memory MongoDB: ${memUri}`);
      return conn;
    }
  } catch (error) {
    console.error(`[Database Error] Connection failed: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
