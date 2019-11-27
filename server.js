const express = require('express');
const connectDB = require('./config/db');
const helmet = require('helmet');
const xss = require('xss-clean');
const app = express();

// Connect to database
connectDB();

// Initialize Helmet & xss-clean
app.use(helmet());
app.use(xss());

// Initialize middleware
app.use(express.json({ extended: false, limit: '10kb' }));

// Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profiles', require('./routes/api/profiles'));
app.use('/api/posts', require('./routes/api/posts'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
