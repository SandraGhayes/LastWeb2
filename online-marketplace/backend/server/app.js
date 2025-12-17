const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const routes = require('./src/routes'); // adjust if your routes folder is different
require('dotenv').config();

const app = express();

// ====================
// 1️⃣ CORS CONFIG
// ====================
const allowedOrigins = ['http://localhost:3001', 'http://localhost:5175'];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      // optional: allow all for dev, or fail
      // return callback(new Error('The CORS policy for this site does not allow access from the specified Origin.'), false);
      // For dev simplicity, let's strictly allow listed origins or just return the origin if valid
      return callback(null, false);
    }
    return callback(null, true);
  },
  credentials: true,
}));

// Handle preflight requests for all routes
app.options('*', cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  credentials: true
}));

// ====================
// 2️⃣ MIDDLEWARES
// ====================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ====================
// 3️⃣ ROUTES
// ====================
app.use('/api', routes);

// ====================
// 4️⃣ ERROR HANDLING
// ====================
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// ====================
// 5️⃣ DATABASE CONNECTION
// ====================
const mongoURL = process.env.MONGO_URL || 'mongodb://localhost:27017/marketPlace';
mongoose.connect(mongoURL)
  .then(() => console.log('Connected to MongoDB:', mongoURL))
  .catch(err => {
    console.error('MongoDB connection error', err);
    process.exit(1);
  });

// ====================
// 6️⃣ START SERVER
// ====================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
