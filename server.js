const express = require('express');
const connectDB = require('./config/db');
const helmet = require('helmet');
const xss = require('xss-clean');
const app = express();
console.log('Successfully loaded modules');

// Connect to database
connectDB();
console.log('Successfully connected to DB');

// Initialize Helmet & xss-clean
app.use(helmet());
app.use(xss());
console.log('Successfully initialized security');

// Initialize middleware
app.use(express.json({ extended: false, limit: '10kb' }));
console.log('Successfully initialized middleware');

// Routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profiles', require('./routes/api/profiles'));
app.use('/api/users', require('./routes/api/users'));
console.log('Successfully connected to routes');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
