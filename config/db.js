const mongoose = require('mongoose');
/**
 * Connects to MongoDB database
 * @returns {Promise} Mongoose connection promise
 */
const connectDB = async () => {
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/bookstore'
    try {
        await mongoose.connect(MONGO_URI)
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit process with failure
    }
}

module.exports = connectDB