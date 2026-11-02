// ============================================================
// Job Application Tracker - Express Server Entry Point
// ============================================================

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// ── Middleware ──────────────────────────────────────────────
const allowedOrigins = [
  "http://localhost:3000",
  "https://job-application-tracker-xazn.onrender.com",
  "https://job-application-tracker-frontend-docker.onrender.com"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.options("*", cors({
  origin: allowedOrigins,
  credentials: true
}));
// ── Routes ──────────────────────────────────────────────────
app.use('/api/auth',         require('./routes/authRoutes'));
app.use('/api/applications', require('./routes/applicationRoutes'));
app.use('/api/dashboard',    require('./routes/dashboardRoutes'));

// ── Health check ────────────────────────────────────────────
app.get('/', (req, res) => res.json({ message: 'Job Tracker API running ' }));

// ── Global error handler ─────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Server error',
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
