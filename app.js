const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const bookRoutes = require('./routes/books');
const errorHandler = require('./middlewares/errorHandler');
const dotenv = require('dotenv')

// Initialize Express app
const app = express();
dotenv.config();

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/books', bookRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

// 404 handler
app.use((req, res, next) => {
    res.status(404).json({ message: 'Not Found' });
});

// Error handler
app.use(errorHandler);

module.exports = app;