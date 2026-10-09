const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const { CLIENT_ORIGIN, NODE_ENV } = require('./config/env');
const errorHandler = require('./middleware/errorHandler');
const notFoundHandler = require('./middleware/notFoundHandler');

// Route imports
const healthRoutes = require('./routes/healthRoutes');
const airportRoutes = require('./routes/airportRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const hotspotRoutes = require('./routes/hotspotRoutes');
const operationRoutes = require('./routes/operationRoutes');
const simulationRoutes = require('./routes/simulationRoutes');
const comparisonRoutes = require('./routes/comparisonRoutes');
const methodologyRoutes = require('./routes/methodologyRoutes');

const app = express();

// Security headers
app.use(helmet());

// Logging
if (NODE_ENV !== 'test') {
  app.use(morgan(NODE_ENV === 'production' ? 'combined' : 'dev'));
}

// CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g. mobile apps, curl, server-to-server) or localhost
    if (!origin || origin.includes('localhost') || origin === CLIENT_ORIGIN) {
      return callback(null, true);
    }
    return callback(null, true); // Permissive for hackathon review environments
  },
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting (generous for hackathon testing)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // 1000 requests per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests, please try again later.',
    errors: ['Rate limit exceeded']
  }
});
app.use('/api', apiLimiter);

// API Routes
app.use('/api', healthRoutes);
app.use('/api', airportRoutes);
app.use('/api', dashboardRoutes);
app.use('/api', hotspotRoutes);
app.use('/api', operationRoutes);
app.use('/api', simulationRoutes);
app.use('/api', comparisonRoutes);
app.use('/api', methodologyRoutes);

// Fallback 404 handler
app.use(notFoundHandler);

// Centralized error handler
app.use(errorHandler);

module.exports = app;

